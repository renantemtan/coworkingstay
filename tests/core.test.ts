import { describe, it, expect } from 'vitest';
import {
  calculateNights,
  calculateStayEstimate,
  getOccupancyRateTable,
} from '@/lib/pricing';
import { isLocationComingSoon, isLocationOperational } from '@/lib/location-status';
import { getLiveSocialEntries } from '@/lib/socials';
import { checkRateLimit } from '@/lib/rate-limit';

describe('Room pricing calculator (Work n Wave PHP + Option 2 USD)', () => {
  it('returns the exact 1-4 person single-room ladder', () => {
    const table = getOccupancyRateTable();
    expect(table).toEqual([
      { guests: 1, label: '1 person / room', php: 2890, usd: 55 },
      { guests: 2, label: '2 persons / room', php: 3890, usd: 75 },
      { guests: 3, label: '3 persons / room', php: 4890, usd: 95 },
      { guests: 4, label: '4 persons / room', php: 5890, usd: 115 },
    ]);
  });

  it('computes multi-room group totals and 50% deposit accurately', () => {
    // 2 rooms, 5 guests (e.g. 3 + 2), 3 nights:
    // Nightly PHP = 4890 + 3890 = 8780 -> 3 nights = 26340, 50% deposit = 13170
    // Nightly USD = 95 + 75 = 170 -> 3 nights = 510, 50% deposit = 255
    const estimate = calculateStayEstimate({ rooms: 2, guests: 5, nights: 3 });
    expect(estimate).toEqual({
      nights: 3,
      rooms: 2,
      guests: 5,
      nightlyRatePhp: 8780,
      totalPhp: 26340,
      depositPhp: 13170,
      nightlyRateUsd: 170,
      totalUsd: 510,
      depositUsd: 255,
    });
  });

  it('enforces 1-8 rooms and max 4 guests per room bounds', () => {
    expect(calculateStayEstimate({ rooms: 0, guests: 1, nights: 1 })).toBeNull();
    expect(calculateStayEstimate({ rooms: 9, guests: 9, nights: 1 })).toBeNull();
    expect(calculateStayEstimate({ rooms: 2, guests: 1, nights: 1 })).toBeNull();
    expect(calculateStayEstimate({ rooms: 2, guests: 9, nights: 1 })).toBeNull();
    expect(calculateStayEstimate({ rooms: 8, guests: 32, nights: 2 })).not.toBeNull();
  });

  it('computes calendar nights safely in UTC', () => {
    expect(calculateNights('2026-12-01', '2026-12-04')).toBe(3);
    expect(calculateNights('2026-12-04', '2026-12-04')).toBe(0);
    expect(calculateNights('2026-12-05', '2026-12-04')).toBe(0);
    expect(calculateNights('invalid', '2026-12-04')).toBe(0);
  });
});

describe('Location status helpers', () => {
  it('classifies operational vs coming soon statuses case-insensitively', () => {
    expect(isLocationOperational('soft open')).toBe(true);
    expect(isLocationOperational('Open')).toBe(true);
    expect(isLocationOperational('coming soon')).toBe(false);
    expect(isLocationComingSoon('coming soon')).toBe(true);
    expect(isLocationComingSoon('Soon')).toBe(true);
    expect(isLocationComingSoon('soft open')).toBe(false);
  });
});

describe('Social URL filtering', () => {
  it('filters out tbd, empty, and hash placeholders', () => {
    const entries = getLiveSocialEntries({
      facebook: 'tbd',
      instagram: '#',
      linkedin: 'https://linkedin.com/company/coworkingstay',
      tiktok: '',
    });
    expect(entries).toEqual([
      {
        platform: 'linkedin',
        label: 'LinkedIn',
        url: 'https://linkedin.com/company/coworkingstay',
      },
    ]);
  });
});

describe('Rate limiter', () => {
  it('allows up to maxRequests and blocks the next request', () => {
    const key = `test-rate-${Date.now()}`;
    expect(checkRateLimit(key, 2, 60_000).allowed).toBe(true);
    expect(checkRateLimit(key, 2, 60_000).allowed).toBe(true);
    const blocked = checkRateLimit(key, 2, 60_000);
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfterSeconds).toBeGreaterThan(0);
  });
});
