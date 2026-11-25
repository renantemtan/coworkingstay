'use client';

type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (
      command: 'event',
      eventName: string,
      eventParams?: EventParams
    ) => void;
  }
}

export function trackEvent(eventName: string, params?: EventParams) {
  if (typeof window === 'undefined') return;
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
}
