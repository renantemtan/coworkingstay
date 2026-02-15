'use client';

import React from "react"
import { motion } from 'framer-motion';
import type { Pillar } from '@/types/content';
import { Zap, Wind, Network, Users, Lightbulb, Globe, TrendingUp, Heart } from 'lucide-react';
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ReactNode> = {
  Zap: <Zap className="h-12 w-12" />,
  Wind: <Wind className="h-12 w-12" />,
  Network: <Network className="h-12 w-12" />,
  Users: <Users className="h-12 w-12" />,
  Lightbulb: <Lightbulb className="h-12 w-12" />,
  Globe: <Globe className="h-12 w-12" />,
  TrendingUp: <TrendingUp className="h-12 w-12" />,
  Heart: <Heart className="h-12 w-12" />,
};

interface PillarsSectionProps {
  pillars: Pillar[];
}

export function PillarsSection({ pillars }: PillarsSectionProps) {
  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-24">
          <h2 className="font-sora text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            The CoWorkingStay Experience
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground font-inter">
            We don't just offer desks. We offer a system for living.
          </p>
        </div>

        <div className="flex flex-col gap-24 lg:gap-32">
          {pillars.map((pillar, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={pillar.id}
                className={cn(
                  "flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-24",
                  !isEven && "lg:flex-row-reverse"
                )}
              >
                {/* Visual Side */}
                <div className="flex-1 relative">
                  <div
                    className="aspect-square w-full max-w-md mx-auto rounded-[3rem] overflow-hidden relative flex items-center justify-center shadow-2xl skew-y-3"
                    style={{ backgroundColor: `${pillar.color}15` }} // 15 = low opacity hex
                  >
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage: `radial-gradient(circle at center, ${pillar.color} 0%, transparent 70%)`
                      }}
                    />
                    <div
                      className="relative z-10 p-8 rounded-3xl bg-white shadow-xl transform -skew-y-3 hover:scale-110 transition-transform duration-500"
                      style={{ color: pillar.color }}
                    >
                      {pillar.icon && iconMap[pillar.icon] ? iconMap[pillar.icon] : <Zap className="h-12 w-12" />}
                    </div>
                  </div>
                </div>

                {/* Text Side */}
                <div className="flex-1 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full text-sm font-bold tracking-wider uppercase bg-gray-100 text-gray-600">
                    0{index + 1}
                  </div>
                  <h3 className="font-sora text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-2">
                    {pillar.title}
                  </h3>
                  <p
                    className="font-caveat text-3xl sm:text-4xl mb-6"
                    style={{ color: pillar.color }}
                  >
                    {pillar.promise}
                  </p>
                  <p className="text-lg leading-8 text-muted-foreground font-inter">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
