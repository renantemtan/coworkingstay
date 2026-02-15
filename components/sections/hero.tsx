'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import type { BrandIdentity } from '@/types/content';

interface HeroSectionProps {
  identity: BrandIdentity;
}

export function HeroSection({ identity }: HeroSectionProps) {
  const [shineKey, setShineKey] = useState(0);

  const triggerShine = useCallback(() => {
    setShineKey((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        triggerShine();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [triggerShine]);

  const scrollToLocations = () => {
    const el = document.getElementById('locations');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/hero-bg.webp)' }}
      />
      {/* Blue-toned professional overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0C4A96]/50 via-[#0C4A96]/35 to-[#0C4A96]/55" />

      {/* Shine sweep — silver angled line left to right */}


      {/* Content box */}
      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl border border-white/50 bg-black/30 backdrop-blur-sm px-8 py-12 sm:px-12 sm:py-16 text-center overflow-hidden"
        >
          {/* Shine sweep inside box */}
          <div key={shineKey} className="absolute inset-0 pointer-events-none z-30">
            <div className="hero-shine-sweep" />
          </div>
          {/* Logo + Tagline */}
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-8">
            <img
              src="/logos/cws_logo_black_lightborder.svg"
              alt="CoWorkingStay"
              className="h-20 w-auto sm:h-28 lg:h-32"
            />
            <h1 className="font-sora text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl sm:text-left">
              {identity.mainTag.split('starts here')[0]}
              <br />
              <span style={{ color: '#03B1F7' }}>
                starts here.
              </span>
            </h1>
          </div>

          <p className="mx-auto mt-6 max-w-2xl text-xl text-white/85 sm:text-2xl font-inter font-normal">
            {identity.subTag}
          </p>

          <div className="mt-10">
            <Button
              size="lg"
              onClick={scrollToLocations}
              className="gap-2 font-semibold text-base text-white px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: '#E53652',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#C82D45'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#E53652'; }}
            >
              Find your spot
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator — icon only */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center"
        >
          <div className="h-8 w-5 rounded-full border-2 border-white/30 p-1">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="h-1.5 w-1.5 rounded-full bg-white/60"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
