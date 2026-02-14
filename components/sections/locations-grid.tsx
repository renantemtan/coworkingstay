'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Location } from '@/types/content';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface LocationsGridProps {
  locations: Location[];
}

export function LocationsGrid({ locations }: LocationsGridProps) {
  return (
    <section className="bg-muted/30 px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div
          className="mb-16 text-center"
        >
          <h2 className="font-sora text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Discover Our Locations
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Carefully curated spaces in the most inspiring settings
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {locations.map((location, index) => (
            <div
              key={location.id}
            >
              <Link href={`/locations/${location.slug}`}>
                <Card className="group overflow-hidden transition-all hover:shadow-lg">
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden bg-muted">
                    <div className="h-full w-full bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
                    <div className="absolute right-4 top-4">
                      <Badge variant={location.status === 'Open' ? 'default' : 'secondary'}>
                        {location.status}
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-sora text-xl font-bold text-foreground group-hover:text-primary">
                      {location.name}
                    </h3>
                    <p className="mt-2 font-caveat text-lg text-primary">{location.tagline}</p>
                    <p className="mt-4 line-clamp-2 text-sm text-muted-foreground">{location.description}</p>

                    {/* Features */}
                    <div className="mt-6 space-y-2 border-t border-border/40 pt-6">
                      {location.features.slice(0, 3).map((feature, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                          {feature}
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <Button
                      asChild
                      variant="ghost"
                      className="mt-6 w-full gap-2 text-primary hover:bg-primary/5"
                    >
                      <span>
                        Learn More
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </Button>
                  </div>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
