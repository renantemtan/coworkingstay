import { NextResponse } from 'next/server';
import { z } from 'zod';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';
import {
  calculateNights,
  calculateStayEstimate,
  generateBookingReference,
  WORK_N_WAVE_PRICING,
} from '@/lib/pricing';
import { deliverBookingRequest } from '@/lib/lead-delivery';

const datePattern = /^\d{4}-\d{2}-\d{2}$/;

const bookingRequestSchema = z
  .object({
    locationSlug: z.string().trim().min(1).max(120).default('work-n-wave-puerto-galera'),
    locationName: z.string().trim().min(1).max(120).default("Work 'n Wave"),
    guestName: z.string().trim().min(2, 'Please enter your full name.').max(120),
    guestEmail: z.string().trim().email('Please enter a valid email address.').max(160),
    guestPhone: z
      .string()
      .trim()
      .min(6, 'Please enter a valid mobile or WhatsApp number.')
      .max(40)
      .regex(/^[0-9+\-\s()]+$/, 'Phone number contains invalid characters.'),
    checkInDate: z.string().regex(datePattern, 'Please select a valid check-in date.'),
    checkOutDate: z.string().regex(datePattern, 'Please select a valid check-out date.'),
    rooms: z
      .number()
      .int()
      .min(WORK_N_WAVE_PRICING.minRooms, 'Please select at least 1 room.')
      .max(
        WORK_N_WAVE_PRICING.maxRooms,
        `Up to ${WORK_N_WAVE_PRICING.maxRooms} rooms can be booked per request.`
      ),
    guests: z.number().int().min(1, 'Please select at least 1 guest.'),
    currency: z.enum(['PHP', 'USD']).default('PHP'),
    notes: z.string().trim().max(2000).optional().default(''),
    consent: z.literal(true, {
      errorMap: () => ({
        message: 'Please agree to the Privacy Notice before submitting your booking request.',
      }),
    }),
    website: z.string().max(200).optional(),
  })
  .superRefine((data, ctx) => {
    const nights = calculateNights(data.checkInDate, data.checkOutDate);
    if (nights < 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['checkOutDate'],
        message: 'Check-out date must be after check-in date.',
      });
    }
    if (data.guests < data.rooms) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['guests'],
        message: 'Number of guests must be at least equal to the number of rooms.',
      });
    }
    const maxGuests = data.rooms * WORK_N_WAVE_PRICING.maxGuestsPerRoom;
    if (data.guests > maxGuests) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['guests'],
        message: `Maximum ${WORK_N_WAVE_PRICING.maxGuestsPerRoom} guests per room (${maxGuests} guests for ${data.rooms} room${data.rooms > 1 ? 's' : ''}).`,
      });
    }
  });

export async function POST(request: Request) {
  const ip = getClientIp(request.headers);
  const rate = checkRateLimit(`booking:${ip}`, 5, 60_000);

  if (!rate.allowed) {
    return NextResponse.json(
      {
        ok: false,
        error: `Too many booking requests. Please wait ${rate.retryAfterSeconds} seconds and try again.`,
      },
      {
        status: 429,
        headers: { 'Retry-After': String(rate.retryAfterSeconds) },
      }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Invalid request payload.' },
      { status: 400 }
    );
  }

  const parsed = bookingRequestSchema.safeParse(body);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0]?.message || 'Please check your booking details.';
    return NextResponse.json({ ok: false, error: firstIssue }, { status: 400 });
  }

  // Honeypot trap
  if (parsed.data.website && parsed.data.website.trim().length > 0) {
    return NextResponse.json({ ok: true, referenceCode: generateBookingReference() });
  }

  const nights = calculateNights(parsed.data.checkInDate, parsed.data.checkOutDate);
  const estimate = calculateStayEstimate({
    rooms: parsed.data.rooms,
    guests: parsed.data.guests,
    nights,
  });

  if (!estimate) {
    return NextResponse.json(
      { ok: false, error: 'Unable to calculate stay pricing for the selected dates and occupancy.' },
      { status: 400 }
    );
  }

  const referenceCode = generateBookingReference();

  const result = await deliverBookingRequest({
    referenceCode,
    locationName: parsed.data.locationName,
    locationSlug: parsed.data.locationSlug,
    guestName: parsed.data.guestName,
    guestEmail: parsed.data.guestEmail,
    guestPhone: parsed.data.guestPhone,
    checkInDate: parsed.data.checkInDate,
    checkOutDate: parsed.data.checkOutDate,
    nights: estimate.nights,
    rooms: estimate.rooms,
    guests: estimate.guests,
    currency: parsed.data.currency,
    nightlyRatePhp: estimate.nightlyRatePhp,
    totalPhp: estimate.totalPhp,
    depositPhp: estimate.depositPhp,
    nightlyRateUsd: estimate.nightlyRateUsd,
    totalUsd: estimate.totalUsd,
    depositUsd: estimate.depositUsd,
    notes: parsed.data.notes,
  });

  if (!result.delivered) {
    return NextResponse.json(
      {
        ok: false,
        detail: process.env.NODE_ENV !== 'production' ? result.detail : undefined,
        error:
          result.reason === 'not_configured'
            ? 'Direct booking submission is being finalized. Please email us directly at worknwave@coworkingstay.com.'
            : 'We could not send your booking request right now. Please try again or email worknwave@coworkingstay.com.',
      },
      { status: 503 }
    );
  }

  return NextResponse.json({
    ok: true,
    referenceCode,
    estimate,
  });
}
