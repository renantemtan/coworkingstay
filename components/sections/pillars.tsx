'use client';

import React from "react"
import type { Pillar } from '@/types/content';
import {
  Zap, Wind, Network, Users, Lightbulb, Globe, TrendingUp, Heart,
  Target, Eye, Shield, Leaf
} from 'lucide-react';
import { cn } from "@/lib/utils";

const pillarIconMap: Record<string, React.ReactNode> = {
  Zap: <Zap className="h-8 w-8" />,
  Wind: <Wind className="h-8 w-8" />,
  Network: <Network className="h-8 w-8" />,
  Users: <Users className="h-8 w-8" />,
  Lightbulb: <Lightbulb className="h-8 w-8" />,
  Globe: <Globe className="h-8 w-8" />,
  TrendingUp: <TrendingUp className="h-8 w-8" />,
  Heart: <Heart className="h-8 w-8" />,
};

/* Distinct icons for each UVP item */
const uvpIcons = [
  <Target key="0" className="h-6 w-6" />,
  <Shield key="1" className="h-6 w-6" />,
  <Eye key="2" className="h-6 w-6" />,
  <Leaf key="3" className="h-6 w-6" />,
];

interface PillarsSectionProps {
  pillars: Pillar[];
  uvp: string[];
  mission: string;
}

export function PillarsSection({ pillars, uvp, mission }: PillarsSectionProps) {
  return (
    <section className="relative overflow-hidden bg-[#f8f9fb] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header — small, left-aligned */}
        <div className="mb-12">
          <h2 className="font-sora text-xl font-bold tracking-tight text-foreground sm:text-2xl uppercase">
            The Experience
          </h2>
        </div>

        {/* Unique Value Proposition — big, impactful */}
        <div className="mb-20">
          <div className="grid gap-6 sm:grid-cols-2">
            {uvp.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0C4A96]/10 text-[#0C4A96]">
                  {uvpIcons[index] || <Zap className="h-6 w-6" />}
                </div>
                <p className="text-base sm:text-lg leading-snug text-gray-800 font-inter">
                  {item.includes('—') ? (
                    <><span className="font-bold">{item.split('—')[0]}</span>—{item.split('—').slice(1).join('—')}</>
                  ) : item.includes(' — ') ? (
                    <><span className="font-bold">{item.split(' — ')[0]}</span> — {item.split(' — ').slice(1).join(' — ')}</>
                  ) : (
                    <span className="font-semibold">{item}</span>
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mission — non-italic, darker, no quotes */}
        <div className="mx-auto max-w-3xl text-center mb-20">
          <p className="font-inter text-lg sm:text-xl leading-relaxed text-gray-700">
            {mission}
          </p>
        </div>

        {/* Pillars — impactful layout */}
        <div className="grid gap-12 md:grid-cols-3 max-w-6xl mx-auto">
          {pillars.map((pillar, index) => (
            <div key={pillar.id} className="flex flex-col items-center text-center">
              <div
                className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-3xl shadow-lg"
                style={{ backgroundColor: `${pillar.color}18`, color: pillar.color }}
              >
                {pillar.icon && pillarIconMap[pillar.icon] ? pillarIconMap[pillar.icon] : <Zap className="h-8 w-8" />}
              </div>
              <div className="inline-flex items-center gap-2 mb-3 px-3 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase bg-gray-100 text-gray-500">
                0{index + 1}
              </div>
              <h3 className="font-sora text-3xl font-bold tracking-tight text-foreground mb-2">
                {pillar.title}
              </h3>
              <p
                className="font-caveat text-4xl sm:text-5xl mb-4"
                style={{ color: pillar.color }}
              >
                {pillar.promise}
              </p>
              {pillar.description && (
                <p className="text-base leading-7 text-muted-foreground font-inter">
                  {pillar.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
