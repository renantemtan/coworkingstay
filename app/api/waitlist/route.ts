import { NextResponse } from 'next/server';
import { z } from 'zod';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';
import { deliverWaitlistSignup } from '@/lib/lead-delivery';

const waitlistSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your full name.').max(120),
  email: z.string().trim().email('Please enter a valid email address.').max(160),
  countryName: z.string().trim().min(1).max(100),
  countryIso: z.string().trim().min(2).max(5),
  dialPrefix: z.string().trim().max(12),
  phone: z
    .string()
    .trim()
    .min(5, 'Please enter a valid phone number.')
    .max(30)
    .regex(/^[0-9+\-\s()]+$/, 'Phone number contains invalid characters.'),
  locationName: z.string().trim().max(120).optional().default('Upcoming Locations'),
  consent: z.literal(true, {
    errorMap: () => ({
      message: 'Please agree to the Privacy Notice before joining the waitlist.',
    }),
  }),
  website: z.string().max(200).optional(),
});

export async function POST(request: Request) {
  const ip = getClientIp(request.headers);
  const rate = checkRateLimit(`waitlist:${ip}`, 5, 60_000);

  if (!rate.allowed) {
    return NextResponse.json(
      {
        ok: false,
        error: `Too many attempts. Please wait ${rate.retryAfterSeconds} seconds and try again.`,
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

  const parsed = waitlistSchema.safeParse(body);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0]?.message || 'Please check your details.';
    return NextResponse.json({ ok: false, error: firstIssue }, { status: 400 });
  }

  // Honeypot trap
  if (parsed.data.website && parsed.data.website.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const result = await deliverWaitlistSignup({
    name: parsed.data.name,
    email: parsed.data.email,
    countryName: parsed.data.countryName,
    countryIso: parsed.data.countryIso,
    dialPrefix: parsed.data.dialPrefix,
    phone: parsed.data.phone,
    locationName: parsed.data.locationName || 'Upcoming Locations',
  });

  if (!result.delivered) {
    return NextResponse.json(
      {
        ok: false,
        detail: process.env.NODE_ENV !== 'production' ? result.detail : undefined,
        error:
          result.reason === 'not_configured'
            ? 'Waitlist registration is being finalized. Please email worknwave@coworkingstay.com to reserve your spot.'
            : 'We could not complete your signup right now. Please try again shortly.',
      },
      { status: 503 }
    );
  }

  return NextResponse.json({ ok: true });
}
