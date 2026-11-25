export function isLocationComingSoon(status?: string): boolean {
  const normalized = (status || '').trim().toLowerCase();
  return normalized === 'coming soon' || normalized === 'soon';
}

export function isLocationOperational(status?: string): boolean {
  const normalized = (status || '').trim().toLowerCase();
  return normalized === 'open' || normalized === 'soft open';
}
