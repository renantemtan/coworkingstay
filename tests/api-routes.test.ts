import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST as contactPost } from '@/app/api/contact/route';
import { POST as waitlistPost } from '@/app/api/waitlist/route';
import { POST as bookingsPost } from '@/app/api/bookings/route';

function jsonRequest(url: string, body: Record<string, unknown>, ip: string): Request {
  return new Request(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-forwarded-for': ip,
    },
    body: JSON.stringify(body),
  });
}

describe('Lead & Booking API Route Handlers', () => {
  beforeEach(() => {
    vi.spyOn(console, 'info').mockImplementation(() => {});
    // Isolate unit tests from local .env.local credentials so tests never hit live SMTP/DB
    delete process.env.SMTP_HOST;
    delete process.env.SMTP_USER;
    delete process.env.SMTP_PASS;
    delete process.env.RESEND_API_KEY;
    delete process.env.LEAD_WEBHOOK_URL;
    delete process.env.DATABASE_URL;
  });

  it('rejects /api/contact without privacy consent', async () => {
    const res = await contactPost(
      jsonRequest(
        'http://localhost/api/contact',
        {
          name: 'Ana Cruz',
          email: 'ana@example.com',
          subject: 'General Question',
          message: 'Asking about conference room availability.',
          consent: false,
        },
        '192.0.2.1'
      )
    );
    expect(res.status).toBe(400);
  });

  it('accepts valid /api/contact with consent', async () => {
    const res = await contactPost(
      jsonRequest(
        'http://localhost/api/contact',
        {
          name: 'Ana Cruz',
          email: 'ana@example.com',
          subject: 'General Question',
          message: 'Asking about conference room availability next week.',
          consent: true,
        },
        '192.0.2.2'
      )
    );
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
  });

  it('validates /api/waitlist phone and consent', async () => {
    const badRes = await waitlistPost(
      jsonRequest(
        'http://localhost/api/waitlist',
        {
          name: 'Leo Tan',
          email: 'leo@example.com',
          countryName: 'Philippines',
          countryIso: 'PHL',
          dialPrefix: '+63',
          phone: 'invalid',
          locationName: "Work 'n Lake",
          consent: true,
        },
        '192.0.2.3'
      )
    );
    expect(badRes.status).toBe(400);

    const okRes = await waitlistPost(
      jsonRequest(
        'http://localhost/api/waitlist',
        {
          name: 'Leo Tan',
          email: 'leo@example.com',
          countryName: 'Philippines',
          countryIso: 'PHL',
          dialPrefix: '+63',
          phone: '917 555 1234',
          locationName: "Work 'n Lake",
          consent: true,
        },
        '192.0.2.4'
      )
    );
    expect(okRes.status).toBe(200);
  });

  it('calculates authoritative pricing on /api/bookings and rejects >8 rooms', async () => {
    const tooManyRooms = await bookingsPost(
      jsonRequest(
        'http://localhost/api/bookings',
        {
          locationSlug: 'work-n-wave-puerto-galera',
          locationName: "Work 'n Wave",
          guestName: 'Team Lead',
          guestEmail: 'lead@example.com',
          guestPhone: '+63 917 111 2222',
          checkInDate: '2026-12-10',
          checkOutDate: '2026-12-12',
          rooms: 9,
          guests: 10,
          currency: 'PHP',
          consent: true,
        },
        '192.0.2.5'
      )
    );
    expect(tooManyRooms.status).toBe(400);

    const validBooking = await bookingsPost(
      jsonRequest(
        'http://localhost/api/bookings',
        {
          locationSlug: 'work-n-wave-puerto-galera',
          locationName: "Work 'n Wave",
          guestName: 'Team Lead',
          guestEmail: 'lead@example.com',
          guestPhone: '+63 917 111 2222',
          checkInDate: '2026-12-10',
          checkOutDate: '2026-12-12',
          rooms: 2,
          guests: 4,
          currency: 'USD',
          notes: 'Need two quiet workstations',
          consent: true,
        },
        '192.0.2.6'
      )
    );
    expect(validBooking.status).toBe(200);
    const json = (await validBooking.json()) as {
      ok: boolean;
      referenceCode: string;
      estimate: { totalPhp: number; totalUsd: number; depositUsd: number };
    };
    expect(json.ok).toBe(true);
    expect(json.referenceCode).toMatch(/^CWS-\d{8}-[A-Z0-9]{4}$/);
    // 2 rooms, 4 guests => 2 * 3890 = 7780 PHP/night * 2 nights = 15560 PHP; 2 * 75 = 150 USD/night * 2 = 300 USD
    expect(json.estimate.totalPhp).toBe(15560);
    expect(json.estimate.totalUsd).toBe(300);
    expect(json.estimate.depositUsd).toBe(150);
  });
});
