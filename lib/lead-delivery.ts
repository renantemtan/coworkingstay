import { lookup } from 'node:dns/promises';
import nodemailer from 'nodemailer';
import { getDb } from '@/lib/db';
import {
  contactInquiries,
  waitlistSignups,
  bookingRequests,
} from '@/lib/db/schema';

export interface ContactInquiryPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface WaitlistSignupPayload {
  name: string;
  email: string;
  countryName: string;
  countryIso: string;
  dialPrefix: string;
  phone: string;
  locationName: string;
}

export interface BookingRequestPayload {
  referenceCode: string;
  locationName: string;
  locationSlug: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkInDate: string;
  checkOutDate: string;
  nights: number;
  rooms: number;
  guests: number;
  currency: 'PHP' | 'USD';
  nightlyRatePhp: number;
  totalPhp: number;
  depositPhp: number;
  nightlyRateUsd: number;
  totalUsd: number;
  depositUsd: number;
  notes: string;
}

export interface DeliveryResult {
  delivered: boolean;
  reason?: 'not_configured' | 'provider_error';
  detail?: string;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatPhp(amount: number): string {
  return `₱${amount.toLocaleString('en-US')}`;
}

function formatUsd(amount: number): string {
  return `$${amount.toLocaleString('en-US')}`;
}

function formatSelectedCurrency(
  currency: 'PHP' | 'USD',
  php: number,
  usd: number
): string {
  return currency === 'USD' ? formatUsd(usd) : formatPhp(php);
}

function getTeamReplyTo(): string {
  return (
    process.env.CONTACT_RECEIVER_EMAIL?.trim() ||
    process.env.SMTP_USER?.trim() ||
    'worknwave@coworkingstay.com'
  );
}

interface EmailMessage {
  to?: string;
  subject: string;
  replyTo: string;
  html: string;
  text: string;
}

function isSmtpConfigured(): boolean {
  return Boolean(
    process.env.SMTP_HOST?.trim() &&
      process.env.SMTP_USER?.trim() &&
      process.env.SMTP_PASS?.trim()
  );
}

async function sendViaSmtp(params: EmailMessage): Promise<boolean> {
  if (!isSmtpConfigured()) return false;

  const host = process.env.SMTP_HOST!.trim();
  const port = Number(process.env.SMTP_PORT?.trim() || '465');
  const secure =
    process.env.SMTP_SECURE !== undefined
      ? process.env.SMTP_SECURE.trim().toLowerCase() === 'true'
      : port === 465;
  const user = process.env.SMTP_USER!.trim();
  const pass = process.env.SMTP_PASS!.trim();

  const from =
    process.env.CONTACT_FROM_EMAIL?.trim() || `CoWorkingStay <${user}>`;
  const to =
    params.to?.trim() ||
    process.env.CONTACT_RECEIVER_EMAIL?.trim() ||
    user ||
    'worknwave@coworkingstay.com';

  // Resolve via OS getaddrinfo (IPv4) to avoid c-ares EDNS timeouts on Windows/ISPs,
  // while preserving full SNI and TLS certificate verification via tls.servername.
  let connectHost = host;
  try {
    const resolved = await lookup(host, { family: 4 });
    if (resolved?.address) {
      connectHost = resolved.address;
    }
  } catch {
    // Fall back to hostname if OS lookup fails
  }

  const transporter = nodemailer.createTransport({
    host: connectHost,
    port,
    secure,
    auth: { user, pass },
    tls: { servername: host },
    connectionTimeout: 15_000,
    greetingTimeout: 15_000,
  });

  await transporter.sendMail({
    from,
    to,
    replyTo: params.replyTo,
    subject: params.subject,
    html: params.html,
    text: params.text,
  });

  return true;
}

async function sendViaResend(params: EmailMessage): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) return false;

  const from =
    process.env.CONTACT_FROM_EMAIL?.trim() ||
    'CoWorkingStay Website <onboarding@resend.dev>';
  const to =
    params.to?.trim() ||
    process.env.CONTACT_RECEIVER_EMAIL?.trim() ||
    'worknwave@coworkingstay.com';

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: params.replyTo,
      subject: params.subject,
      html: params.html,
      text: params.text,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => '');
    console.error('[lead-delivery] Resend error:', response.status, errorText);
    throw new Error(`Resend request failed with status ${response.status}`);
  }

  return true;
}

async function sendViaWebhook(payload: Record<string, unknown>): Promise<boolean> {
  const webhookUrl = process.env.LEAD_WEBHOOK_URL?.trim();
  if (!webhookUrl) return false;

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => '');
    console.error('[lead-delivery] Webhook error:', response.status, errorText);
    throw new Error(`Webhook request failed with status ${response.status}`);
  }

  return true;
}

async function runDeliveryChannels(
  emailParams: EmailMessage,
  webhookPayload: Record<string, unknown>,
  persistToDb: () => Promise<boolean>,
  guestConfirmation?: EmailMessage
): Promise<DeliveryResult> {
  const hasDb = Boolean(process.env.DATABASE_URL?.trim());
  const hasSmtp = isSmtpConfigured();
  const hasResend = Boolean(process.env.RESEND_API_KEY?.trim());
  const hasWebhook = Boolean(process.env.LEAD_WEBHOOK_URL?.trim());

  if (!hasDb && !hasSmtp && !hasResend && !hasWebhook) {
    if (process.env.NODE_ENV !== 'production') {
      console.info('[lead-delivery][dev] Submission received:', webhookPayload);
      return { delivered: true };
    }
    return { delivered: false, reason: 'not_configured' };
  }

  const tasks: Promise<boolean>[] = [];

  if (hasDb) {
    tasks.push(persistToDb());
  }
  if (hasSmtp) {
    tasks.push(sendViaSmtp(emailParams));
  } else if (hasResend) {
    tasks.push(sendViaResend(emailParams));
  }
  if (hasWebhook) {
    tasks.push(sendViaWebhook(webhookPayload));
  }

  const settled = await Promise.allSettled(tasks);
  const anySucceeded = settled.some(
    (result) => result.status === 'fulfilled' && result.value === true
  );

  const failures: string[] = [];
  for (const result of settled) {
    if (result.status === 'rejected') {
      console.error('[lead-delivery] Channel failed:', result.reason);
      const err = result.reason as { code?: string; responseCode?: number; message?: string };
      failures.push(
        [err?.code, err?.responseCode, err?.message].filter(Boolean).join(' | ') || String(result.reason)
      );
    } else if (result.value === false) {
      failures.push('A delivery channel returned no result (check env configuration).');
    }
  }

  if (!anySucceeded) {
    return { delivered: false, reason: 'provider_error', detail: failures.join(' ; ') };
  }

  // Send best-effort confirmation email to the guest without blocking/failing the submission
  if (guestConfirmation?.to) {
    try {
      if (hasSmtp) {
        await sendViaSmtp(guestConfirmation);
      } else if (hasResend) {
        await sendViaResend(guestConfirmation);
      }
    } catch (err) {
      console.error('[lead-delivery] Guest confirmation email failed:', err);
    }
  }

  return { delivered: true };
}

export async function deliverContactInquiry(
  data: ContactInquiryPayload
): Promise<DeliveryResult> {
  const submittedAt = new Date().toISOString();
  const safeName = escapeHtml(data.name);
  const safeEmail = escapeHtml(data.email);
  const safeSubject = escapeHtml(data.subject);
  const safeMessage = escapeHtml(data.message).replace(/\n/g, '<br />');

  return runDeliveryChannels(
    {
      subject: `[CoWorkingStay] ${data.subject}`,
      replyTo: data.email,
      text: [
        `New Contact Inquiry (${submittedAt})`,
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Subject: ${data.subject}`,
        '',
        data.message,
      ].join('\n'),
      html: `
        <div style="font-family: Inter, Arial, sans-serif; color: #333F50; line-height: 1.6;">
          <h2 style="color: #0C4A96; margin-bottom: 16px;">New Contact Inquiry</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
          <p><strong>Subject:</strong> ${safeSubject}</p>
          <hr style="border: none; border-top: 1px solid #D6DCE5; margin: 16px 0;" />
          <p>${safeMessage}</p>
          <p style="font-size: 12px; color: #64748B; margin-top: 24px;">Submitted at ${submittedAt}</p>
        </div>
      `,
    },
    {
      type: 'contact',
      submittedAt,
      ...data,
    },
    async () => {
      const db = getDb();
      if (!db) return false;
      await db.insert(contactInquiries).values({
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
        consentGiven: true,
      });
      return true;
    },
    {
      to: data.email,
      replyTo: getTeamReplyTo(),
      subject: `We Received Your Message — CoWorkingStay`,
      text: [
        `Hi ${data.name},`,
        '',
        `Thank you for reaching out to CoWorkingStay. We have received your message regarding "${data.subject}" and our team will get back to you shortly.`,
        '',
        'Your message:',
        data.message,
        '',
        'If you need immediate assistance, you can reply directly to this email.',
        '',
        'Warm regards,',
        'CoWorkingStay Team',
        'https://coworkingstay.com',
      ].join('\n'),
      html: `
        <div style="font-family: Inter, Arial, sans-serif; color: #333F50; line-height: 1.6; max-width: 600px;">
          <h2 style="color: #0C4A96; margin-bottom: 12px;">We Received Your Message</h2>
          <p>Hi ${safeName},</p>
          <p>Thank you for reaching out to <strong>CoWorkingStay</strong>. We have received your inquiry regarding <strong>${safeSubject}</strong> and our team will get back to you shortly.</p>
          <div style="background: #F8FAFC; border: 1px solid #D6DCE5; border-radius: 12px; padding: 16px; margin: 16px 0;">
            <p style="margin: 0 0 6px; font-size: 12px; color: #64748B; text-transform: uppercase; letter-spacing: 0.05em;"><strong>Your Message</strong></p>
            <p style="margin: 0;">${safeMessage}</p>
          </div>
          <p>If you have additional details to share, simply reply directly to this email.</p>
          <p style="margin-top: 24px;">Warm regards,<br /><strong>CoWorkingStay Team</strong><br /><a href="https://coworkingstay.com" style="color: #03B1F7;">coworkingstay.com</a></p>
        </div>
      `,
    }
  );
}

export async function deliverWaitlistSignup(
  data: WaitlistSignupPayload
): Promise<DeliveryResult> {
  const submittedAt = new Date().toISOString();
  const formattedPhone = data.dialPrefix
    ? `${data.dialPrefix} ${data.phone}`.trim()
    : data.phone;

  const safeName = escapeHtml(data.name);
  const safeEmail = escapeHtml(data.email);
  const safeLocation = escapeHtml(data.locationName);
  const safeCountry = escapeHtml(`${data.countryName} (${data.countryIso})`);
  const safePhone = escapeHtml(formattedPhone);

  return runDeliveryChannels(
    {
      subject: `[Waitlist] ${data.locationName} — ${data.name}`,
      replyTo: data.email,
      text: [
        `New Waitlist Signup (${submittedAt})`,
        `Location: ${data.locationName}`,
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Country: ${data.countryName} (${data.countryIso})`,
        `Phone: ${formattedPhone}`,
      ].join('\n'),
      html: `
        <div style="font-family: Inter, Arial, sans-serif; color: #333F50; line-height: 1.6;">
          <h2 style="color: #0C4A96; margin-bottom: 16px;">New Waitlist Signup</h2>
          <p><strong>Location:</strong> ${safeLocation}</p>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
          <p><strong>Country:</strong> ${safeCountry}</p>
          <p><strong>Phone:</strong> ${safePhone}</p>
          <p style="font-size: 12px; color: #64748B; margin-top: 24px;">Submitted at ${submittedAt}</p>
        </div>
      `,
    },
    {
      type: 'waitlist',
      submittedAt,
      ...data,
      formattedPhone,
    },
    async () => {
      const db = getDb();
      if (!db) return false;
      await db.insert(waitlistSignups).values({
        name: data.name,
        email: data.email,
        countryName: data.countryName,
        countryIso: data.countryIso,
        dialPrefix: data.dialPrefix,
        phone: data.phone,
        formattedPhone,
        locationName: data.locationName,
        consentGiven: true,
      });
      return true;
    },
    {
      to: data.email,
      replyTo: getTeamReplyTo(),
      subject: `You're on the Waitlist for ${data.locationName} — CoWorkingStay`,
      text: [
        `Hi ${data.name},`,
        '',
        `Thanks for joining the waitlist for ${data.locationName}! You'll be among the first to know as soon as bookings open.`,
        '',
        'Warm regards,',
        'CoWorkingStay Team',
        'https://coworkingstay.com',
      ].join('\n'),
      html: `
        <div style="font-family: Inter, Arial, sans-serif; color: #333F50; line-height: 1.6; max-width: 600px;">
          <h2 style="color: #0C4A96; margin-bottom: 12px;">You&apos;re on the Waitlist!</h2>
          <p>Hi ${safeName},</p>
          <p>Thanks for your interest in <strong>${safeLocation}</strong>. You&apos;re officially on our early-access list, and we&apos;ll notify you as soon as bookings open.</p>
          <p style="margin-top: 24px;">Warm regards,<br /><strong>CoWorkingStay Team</strong><br /><a href="https://coworkingstay.com" style="color: #03B1F7;">coworkingstay.com</a></p>
        </div>
      `,
    }
  );
}

export async function deliverBookingRequest(
  data: BookingRequestPayload
): Promise<DeliveryResult> {
  const submittedAt = new Date().toISOString();
  const safeRef = escapeHtml(data.referenceCode);
  const safeLocation = escapeHtml(data.locationName);
  const safeName = escapeHtml(data.guestName);
  const safeEmail = escapeHtml(data.guestEmail);
  const safePhone = escapeHtml(data.guestPhone);
  const safeNotes = escapeHtml(data.notes || 'None').replace(/\n/g, '<br />');

  return runDeliveryChannels(
    {
      subject: `[Booking Request ${data.referenceCode}] ${data.locationName} — ${data.checkInDate} to ${data.checkOutDate}`,
      replyTo: data.guestEmail,
      text: [
        `New Booking Request (${submittedAt})`,
        `Reference: ${data.referenceCode}`,
        `Location: ${data.locationName}`,
        `Guest: ${data.guestName} (${data.guestEmail} / ${data.guestPhone})`,
        `Check-in: ${data.checkInDate} | Check-out: ${data.checkOutDate} (${data.nights} night${data.nights > 1 ? 's' : ''})`,
        `Rooms: ${data.rooms} | Guests: ${data.guests}`,
        `Preferred Currency: ${data.currency}`,
        `Nightly Rate: ${formatPhp(data.nightlyRatePhp)} (${formatUsd(data.nightlyRateUsd)})`,
        `Estimated Total: ${formatPhp(data.totalPhp)} (${formatUsd(data.totalUsd)})`,
        `50% Deposit Due to Confirm: ${formatPhp(data.depositPhp)} (${formatUsd(data.depositUsd)})`,
        `Inclusions: Coworking space included; no breakfast included. Subject to availability.`,
        '',
        `Notes: ${data.notes || 'None'}`,
      ].join('\n'),
      html: `
        <div style="font-family: Inter, Arial, sans-serif; color: #333F50; line-height: 1.6; max-width: 600px;">
          <h2 style="color: #0C4A96; margin-bottom: 8px;">New Booking Request</h2>
          <p style="margin-top: 0; color: #03B1F7; font-weight: 700;">Reference: ${safeRef}</p>
          <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
            <tr><td style="padding: 6px 0;"><strong>Location:</strong></td><td>${safeLocation}</td></tr>
            <tr><td style="padding: 6px 0;"><strong>Guest Name:</strong></td><td>${safeName}</td></tr>
            <tr><td style="padding: 6px 0;"><strong>Email:</strong></td><td><a href="mailto:${safeEmail}">${safeEmail}</a></td></tr>
            <tr><td style="padding: 6px 0;"><strong>Phone:</strong></td><td>${safePhone}</td></tr>
            <tr><td style="padding: 6px 0;"><strong>Dates:</strong></td><td>${data.checkInDate} → ${data.checkOutDate} (${data.nights} night${data.nights > 1 ? 's' : ''})</td></tr>
            <tr><td style="padding: 6px 0;"><strong>Rooms &amp; Guests:</strong></td><td>${data.rooms} room${data.rooms > 1 ? 's' : ''}, ${data.guests} guest${data.guests > 1 ? 's' : ''}</td></tr>
            <tr><td style="padding: 6px 0;"><strong>Preferred Currency:</strong></td><td>${data.currency}</td></tr>
          </table>
          <div style="background: #F8FAFC; border: 1px solid #D6DCE5; border-radius: 12px; padding: 16px; margin: 16px 0;">
            <p style="margin: 0 0 6px;"><strong>Nightly Rate:</strong> ${formatPhp(data.nightlyRatePhp)} / ${formatUsd(data.nightlyRateUsd)}</p>
            <p style="margin: 0 0 6px;"><strong>Estimated Total (${data.nights} night${data.nights > 1 ? 's' : ''}):</strong> ${formatPhp(data.totalPhp)} / ${formatUsd(data.totalUsd)}</p>
            <p style="margin: 0;"><strong>50% Reservation Deposit:</strong> ${formatPhp(data.depositPhp)} / ${formatUsd(data.depositUsd)}</p>
            <p style="margin: 10px 0 0; font-size: 12px; color: #64748B;">Includes coworking space access. No breakfast included. Subject to room availability.</p>
          </div>
          <p><strong>Notes / Special Requests:</strong><br />${safeNotes}</p>
          <p style="font-size: 12px; color: #64748B; margin-top: 24px;">Submitted at ${submittedAt}</p>
        </div>
      `,
    },
    {
      type: 'booking_request',
      submittedAt,
      ...data,
    },
    async () => {
      const db = getDb();
      if (!db) return false;
      await db.insert(bookingRequests).values({
        referenceCode: data.referenceCode,
        locationName: data.locationName,
        locationSlug: data.locationSlug,
        guestName: data.guestName,
        guestEmail: data.guestEmail,
        guestPhone: data.guestPhone,
        checkInDate: data.checkInDate,
        checkOutDate: data.checkOutDate,
        nights: data.nights,
        rooms: data.rooms,
        guests: data.guests,
        currency: data.currency,
        nightlyRatePhp: data.nightlyRatePhp,
        totalPhp: data.totalPhp,
        depositPhp: data.depositPhp,
        nightlyRateUsd: data.nightlyRateUsd,
        totalUsd: data.totalUsd,
        depositUsd: data.depositUsd,
        notes: data.notes,
        consentGiven: true,
      });
      return true;
    },
    {
      to: data.guestEmail,
      replyTo: getTeamReplyTo(),
      subject: `Booking Request Received (${data.referenceCode}) — ${data.locationName}`,
      text: [
        `Hi ${data.guestName},`,
        '',
        `Thank you for your booking request at ${data.locationName}!`,
        `Reference Code: ${data.referenceCode}`,
        '',
        'Stay Summary:',
        `- Check-in: ${data.checkInDate}`,
        `- Check-out: ${data.checkOutDate} (${data.nights} night${data.nights > 1 ? 's' : ''})`,
        `- Rooms & Guests: ${data.rooms} room${data.rooms > 1 ? 's' : ''}, ${data.guests} guest${data.guests > 1 ? 's' : ''}`,
        `- Nightly Rate: ${formatSelectedCurrency(data.currency, data.nightlyRatePhp, data.nightlyRateUsd)}`,
        `- Estimated Total: ${formatSelectedCurrency(data.currency, data.totalPhp, data.totalUsd)}`,
        `- 50% Reservation Deposit: ${formatSelectedCurrency(data.currency, data.depositPhp, data.depositUsd)}`,
        '',
        'Inclusions: Coworking space access included. No breakfast included.',
        '',
        'Next Steps:',
        'Please note that this is a booking request and not yet a confirmed reservation. Our team will verify room availability and reply with payment instructions for the 50% reservation deposit.',
        '',
        'Need to adjust your dates or add a note? Simply reply directly to this email.',
        '',
        'Warm regards,',
        `${data.locationName} — CoWorkingStay`,
        'https://coworkingstay.com',
      ].join('\n'),
      html: `
        <div style="font-family: Inter, Arial, sans-serif; color: #333F50; line-height: 1.6; max-width: 600px;">
          <h2 style="color: #0C4A96; margin-bottom: 6px;">Booking Request Received</h2>
          <p style="margin-top: 0; color: #03B1F7; font-weight: 700;">Reference: ${safeRef}</p>
          <p>Hi ${safeName},</p>
          <p>Thank you for requesting a stay at <strong>${safeLocation}</strong>! Here is a summary of your request:</p>
          <div style="background: #F8FAFC; border: 1px solid #D6DCE5; border-radius: 12px; padding: 16px; margin: 16px 0;">
            <p style="margin: 0 0 6px;"><strong>Dates:</strong> ${data.checkInDate} → ${data.checkOutDate} (${data.nights} night${data.nights > 1 ? 's' : ''})</p>
            <p style="margin: 0 0 6px;"><strong>Rooms &amp; Guests:</strong> ${data.rooms} room${data.rooms > 1 ? 's' : ''}, ${data.guests} guest${data.guests > 1 ? 's' : ''}</p>
            <p style="margin: 0 0 6px;"><strong>Nightly Rate:</strong> ${formatSelectedCurrency(data.currency, data.nightlyRatePhp, data.nightlyRateUsd)}</p>
            <p style="margin: 0 0 6px;"><strong>Estimated Total:</strong> ${formatSelectedCurrency(data.currency, data.totalPhp, data.totalUsd)}</p>
            <p style="margin: 0;"><strong>50% Reservation Deposit:</strong> ${formatSelectedCurrency(data.currency, data.depositPhp, data.depositUsd)}</p>
            <p style="margin: 10px 0 0; font-size: 12px; color: #64748B;">Includes coworking space access. No breakfast included.</p>
          </div>
          <p><strong>What happens next?</strong><br />This is a booking request and is not yet confirmed. Our team will check room availability and reply with payment instructions for the 50% deposit to lock in your stay.</p>
          <p>Need to update your request? Just reply directly to this email.</p>
          <p style="margin-top: 24px;">Warm regards,<br /><strong>${safeLocation} — CoWorkingStay</strong><br /><a href="https://coworkingstay.com" style="color: #03B1F7;">coworkingstay.com</a></p>
        </div>
      `,
    }
  );
}
