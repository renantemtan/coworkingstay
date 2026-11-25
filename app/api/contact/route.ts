import { NextResponse } from 'next/server';
import { z } from 'zod';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';
import { deliverContactInquiry } from '@/lib/lead-delivery';

const contactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.').max(120),
  email: z.string().trim().email('Please enter a valid email address.').max(160),
  subject: z.string().trim().min(2, 'Please enter a subject.').max(200),
  message: z
    .string()
    .trim()
    .min(10, 'Please include a few more details in your message.')
    .max(5000),
  consent: z.literal(true, {
    errorMap: () => ({
      message: 'Please agree to the Privacy Notice before submitting.',
    }),
  }),
  website: z.string().max(200).optional(),
});

export async function POST(request: Request) {
  const ip = getClientIp(request.headers);
  const rate = checkRateLimit(`contact:${ip}`, 5, 60_000);

  if (!rate.allowed) {
    return NextResponse.json(
      {
        ok: false,
        error: `Too many requests. Please wait ${rate.retryAfterSeconds} seconds and try again.`,
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

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0]?.message || 'Please check your form inputs.';
    return NextResponse.json({ ok: false, error: firstIssue }, { status: 400 });
  }

  // Honeypot trap: silently succeed so automated bots do not retry
  if (parsed.data.website && parsed.data.website.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const result = await deliverContactInquiry({
    name: parsed.data.name,
    email: parsed.data.email,
    subject: parsed.data.subject,
    message: parsed.data.message,
  });

  if (!result.delivered) {
    return NextResponse.json(
      {
        ok: false,
        detail: process.env.NODE_ENV !== 'production' ? result.detail : undefined,
        error:
          result.reason === 'not_configured'
            ? 'Direct form delivery is being finalized. Please email us directly at worknwave@coworkingstay.com.'
            : 'We could not send your message right now. Please try again or email worknwave@coworkingstay.com.',
      },
      { status: 503 }
    );
  }

  return NextResponse.json({ ok: true });
}
