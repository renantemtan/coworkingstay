'use client';

import { motion } from 'framer-motion';
import { Wifi, Zap, Monitor, Mic2 } from 'lucide-react';
import type { Amenity } from '@/types/content';

const iconMap: Record<string, any> = {
  Wifi,
  Zap,
  Monitor,
  Mic2
};

interface HardwareSpecsProps {
  amenities: Amenity[];
}

export function HardwareSpecs({ amenities }: HardwareSpecsProps) {
  return (
    <section className="bg-[#0C4A96] py-24 sm:py-32 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="font-sora text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Standard Amenities
          </h2>
          <p className="mt-4 text-lg leading-8 text-blue-100 font-inter">
            The infrastructure you expect in the city, now in paradise.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {amenities.map((spec, index) => {
            const Icon = iconMap[spec.icon] || Zap;
            return (
              <motion.div
                key={spec.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/10 hover:bg-white/15 transition-colors"
              >
                <div className="mb-6 inline-flex rounded-2xl bg-[#03B1F7] p-3 text-white shadow-lg shadow-blue-900/20">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-sora text-xl font-bold text-white">{spec.title}</h3>
                <p className="mt-3 text-base leading-7 text-blue-100 font-inter">{spec.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
