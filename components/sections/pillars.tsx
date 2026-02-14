'use client';

import React from "react"
import { motion } from 'framer-motion';
import type { Pillar } from '@/types/content';
import { Zap, Wind, Network, Users, Lightbulb, Globe, TrendingUp, Heart } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Zap: <Zap className="h-8 w-8" />,
  Wind: <Wind className="h-8 w-8" />,
  Network: <Network className="h-8 w-8" />,
  Users: <Users className="h-8 w-8" />,
  Lightbulb: <Lightbulb className="h-8 w-8" />,
  Globe: <Globe className="h-8 w-8" />,
  TrendingUp: <TrendingUp className="h-8 w-8" />,
  Heart: <Heart className="h-8 w-8" />,
};

interface PillarsSectionProps {
  pillars: Pillar[];
}

export function PillarsSection({ pillars }: PillarsSectionProps) {
  return (
    <section className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div
          className="mb-16 text-center"
        >
          <h2 className="font-sora text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            The 3 Pillars of CoWorkingStay
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Work, freedom, and community perfectly synchronized
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {pillars.map((pillar, index) => (
            <div
              key={pillar.id}
              className="group glassmorphism rounded-3xl p-8 transition-all hover:shadow-xl"
            >
              <div
                className="mb-6 inline-flex rounded-2xl p-3 text-white"
                style={{ backgroundColor: pillar.color }}
              >
                {iconMap[pillar.icon]}
              </div>
              <h3 className="font-sora text-2xl font-bold text-foreground">{pillar.title}</h3>
              <p className="mt-4 text-muted-foreground">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
