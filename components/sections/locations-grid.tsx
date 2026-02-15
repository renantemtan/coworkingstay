'use client';

import Link from 'next/link';
import type { Location } from '@/types/content';
import { ArrowRight, Handshake } from 'lucide-react';

interface LocationsGridProps {
  locations: Location[];
}

export function LocationsGrid({ locations }: LocationsGridProps) {
  const isComingSoon = (status: string) =>
    status.toLowerCase() === 'coming soon' || status.toLowerCase() === 'soon';
  const isSoftOpen = (status: string) =>
    status.toLowerCase() === 'soft open';
  const isOpen = (status: string) =>
    status.toLowerCase() === 'open';

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-10">
          <h2 className="font-sora text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Sanctuaries for the Focused
          </h2>
          <p className="mt-3 text-lg leading-8 text-muted-foreground font-inter">
            Choose your backdrop. The productivity is standard.
          </p>
        </div>

        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:items-stretch">
          {locations.map((location) => (
            <div
              key={location.id}
              className="group relative isolate flex flex-col justify-end overflow-hidden rounded-3xl bg-gray-900 px-7 pb-7 pt-72 sm:pt-52 lg:pt-72 ring-1 ring-inset ring-gray-900/10"
            >
              {/* Full background image */}
              <img
                src={location.image}
                alt={location.name}
                className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />

              {/* Status badge */}
              <div className="absolute top-4 right-4">
                {isOpen(location.status) || isSoftOpen(location.status) ? (
                  <span className="inline-flex items-center rounded-full bg-[#03B1F7] px-3 py-1 text-xs font-semibold tracking-wide text-white">
                    {location.status}
                  </span>
                ) : (
                  <span className="inline-flex items-center rounded-full bg-black/40 backdrop-blur-md px-3 py-1 text-xs font-semibold tracking-wide text-white border border-white/20">
                    {location.status}
                  </span>
                )}
              </div>

              {/* Card content */}
              <h3 className="text-2xl font-bold leading-tight text-white font-sora">
                {location.name}
              </h3>
              <p className="mt-2 text-3xl sm:text-4xl font-caveat text-[#03B1F7]" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.5)' }}>
                {location.tagline}
              </p>

              {/* Features */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {(location.features || []).map((feat, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white/90 ring-1 ring-inset ring-white/15"
                  >
                    {feat}
                  </span>
                ))}
              </div>

              {/* Actions row */}
              <div className="mt-5 flex items-center gap-2 flex-wrap">
                <Link
                  href={`/locations/${location.slug}`}
                  className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all ${isComingSoon(location.status)
                    ? 'bg-[#03B1F7] text-white hover:bg-[#029ADE]'
                    : 'bg-[#0158F5] text-white hover:bg-[#0148CC]'
                    }`}
                >
                  {location.cta || 'Explore'}
                  <ArrowRight className="h-4 w-4" />
                </Link>

                {/* Investor link for coming soon locations */}
                {isComingSoon(location.status) && (
                  <Link
                    href="/contact?subject=Investment+Inquiry"
                    className="inline-flex items-center gap-1.5 rounded-xl bg-white/10 backdrop-blur-sm px-4 py-2.5 text-xs font-medium text-white/80 border border-white/20 hover:bg-white/20 hover:text-white transition-all"
                  >
                    <Handshake className="h-3.5 w-3.5" />
                    Investor Inquiry
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
