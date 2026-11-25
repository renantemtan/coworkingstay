export type CurrencyCode = 'PHP' | 'USD';

export interface RoomRateTier {
  guests: number;
  label: string;
  php: number;
  usd: number;
}

export interface RoomPricingConfig {
  basePhp: number;
  extraGuestPhp: number;
  baseUsd: number;
  extraGuestUsd: number;
  maxGuestsPerRoom: number;
  minRooms: number;
  maxRooms: number;
  depositRatio: number;
  inclusions: string;
  exclusions: string;
  availabilityNote: string;
}

export const WORK_N_WAVE_PRICING: RoomPricingConfig = {
  basePhp: 2890,
  extraGuestPhp: 1000,
  baseUsd: 55,
  extraGuestUsd: 20,
  maxGuestsPerRoom: 4,
  minRooms: 1,
  maxRooms: 8,
  depositRatio: 0.5,
  inclusions: 'Includes coworking space access',
  exclusions: 'No breakfast included',
  availabilityNote: '1 to 8 rooms per request, subject to availability',
};

export function getOccupancyRateTable(
  config: RoomPricingConfig = WORK_N_WAVE_PRICING
): RoomRateTier[] {
  return Array.from({ length: config.maxGuestsPerRoom }, (_, idx) => {
    const guests = idx + 1;
    const extra = guests - 1;
    return {
      guests,
      label: guests === 1 ? '1 person / room' : `${guests} persons / room`,
      php: config.basePhp + extra * config.extraGuestPhp,
      usd: config.baseUsd + extra * config.extraGuestUsd,
    };
  });
}

export function calculateNights(checkInDate: string, checkOutDate: string): number {
  const matchIn = /^(\d{4})-(\d{2})-(\d{2})$/.exec(checkInDate);
  const matchOut = /^(\d{4})-(\d{2})-(\d{2})$/.exec(checkOutDate);
  if (!matchIn || !matchOut) return 0;

  const startMs = Date.UTC(Number(matchIn[1]), Number(matchIn[2]) - 1, Number(matchIn[3]));
  const endMs = Date.UTC(Number(matchOut[1]), Number(matchOut[2]) - 1, Number(matchOut[3]));

  const diffDays = Math.round((endMs - startMs) / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
}

export interface StayEstimate {
  nights: number;
  rooms: number;
  guests: number;
  nightlyRatePhp: number;
  totalPhp: number;
  depositPhp: number;
  nightlyRateUsd: number;
  totalUsd: number;
  depositUsd: number;
}

export function calculateStayEstimate(params: {
  rooms: number;
  guests: number;
  nights: number;
  config?: RoomPricingConfig;
}): StayEstimate | null {
  const config = params.config || WORK_N_WAVE_PRICING;
  const { rooms, guests, nights } = params;

  if (
    !Number.isInteger(rooms) ||
    rooms < config.minRooms ||
    rooms > config.maxRooms
  ) {
    return null;
  }

  if (
    !Number.isInteger(guests) ||
    guests < rooms ||
    guests > rooms * config.maxGuestsPerRoom
  ) {
    return null;
  }

  if (!Number.isInteger(nights) || nights < 1 || nights > 365) {
    return null;
  }

  const extraGuests = guests - rooms;
  const nightlyRatePhp = rooms * config.basePhp + extraGuests * config.extraGuestPhp;
  const nightlyRateUsd = rooms * config.baseUsd + extraGuests * config.extraGuestUsd;
  const totalPhp = nightlyRatePhp * nights;
  const totalUsd = nightlyRateUsd * nights;

  return {
    nights,
    rooms,
    guests,
    nightlyRatePhp,
    totalPhp,
    depositPhp: Math.round(totalPhp * config.depositRatio),
    nightlyRateUsd,
    totalUsd,
    depositUsd: Math.round(totalUsd * config.depositRatio),
  };
}

export function formatCurrency(amount: number, currency: CurrencyCode): string {
  if (currency === 'USD') {
    return `$${amount.toLocaleString('en-US')}`;
  }
  return `₱${amount.toLocaleString('en-US')}`;
}

export function generateBookingReference(): string {
  const now = new Date();
  const y = now.getUTCFullYear();
  const m = String(now.getUTCMonth() + 1).padStart(2, '0');
  const d = String(now.getUTCDate()).padStart(2, '0');
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `CWS-${y}${m}${d}-${suffix}`;
}
