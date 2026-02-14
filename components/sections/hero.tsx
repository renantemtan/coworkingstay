'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
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
        style={{ backgroundImage: 'url(/hero-bg.png)' }}
      />
      {/* Lighter overlay — lets more of the background show through */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/25 to-black/40" />

      {/* Content box with frosted backdrop */}
      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="rounded-3xl bg-black/50 backdrop-blur-md px-8 py-12 sm:px-12 sm:py-16 text-center"
        >
          <h1 className="font-sora text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Your best workday{' '}
            <span style={{ color: '#0158F5' }}>
              starts here.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/85 sm:text-xl">
            Designed for those who refuse to choose between future results and today&apos;s reality.
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

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-white/50 uppercase tracking-widest">Scroll</span>
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
