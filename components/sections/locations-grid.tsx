'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Location } from '@/types/content';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Wifi, Coffee, Users } from 'lucide-react';

interface LocationsGridProps {
  locations: Location[];
}

export function LocationsGrid({ locations }: LocationsGridProps) {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="font-sora text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Sanctuaries for the Focused
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground font-inter">
            Choose your backdrop. The productivity is standard.
          </p>
        </div>

        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {locations.map((location) => (
            <Link key={location.id} href={`/locations/${location.slug}`} className="group relative isolate flex flex-col justify-end overflow-hidden rounded-3xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80 aspect-[3/4] h-full">
              <img
                src={location.image}
                alt={location.name}
                className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
              <div className="absolute inset-0 -z-10 rounded-3xl ring-1 ring-inset ring-gray-900/10" />

              <div className="absolute top-4 right-4">
                <Badge
                  variant={location.status === 'Open' || location.status === 'Soft Open' ? 'default' : 'secondary'}
                  className={location.status === 'Open' || location.status === 'Soft Open' ? 'bg-[#03B1F7] hover:bg-[#03B1F7]/90 text-white border-none' : 'bg-white/20 backdrop-blur-md text-white border-white/30'}
                >
                  {location.status}
                </Badge>
              </div>

              <h3 className="mt-3 text-2xl font-bold leading-6 text-white font-sora">
                {location.name}
              </h3>
              <p className="mt-2 text-xl font-caveat text-[#03B1F7]">
                {location.tagline}
              </p>

              <div className="mt-4 flex flex-wrap gap-2 opacity-80 text-sm text-gray-300 font-inter">
                {/* Icons or short features */}
                {(location.features || []).map((feat, i) => (
                  <span key={i} className="inline-flex items-center rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-medium text-white ring-1 ring-inset ring-white/20">
                    {feat}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-2 text-sm font-semibold leading-6 text-white transition-all group-hover:gap-3">
                Explore location <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
