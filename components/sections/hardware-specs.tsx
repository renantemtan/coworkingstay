'use client';

import { motion } from 'framer-motion';
import { Wifi, Lock, Monitor, Users } from 'lucide-react';

const specs = [
  {
    icon: Wifi,
    title: 'High-Speed Internet',
    description: 'Blazing fast fiber connectivity for uninterrupted productivity',
  },
  {
    icon: Monitor,
    title: 'Professional Setup',
    description: 'Ergonomic desks, dual monitors, and standing desk options',
  },
  {
    icon: Lock,
    title: 'Secure Spaces',
    description: 'Private offices and lockable storage for sensitive work',
  },
  {
    icon: Users,
    title: 'Collaborative Hubs',
    description: 'Open coworking spaces designed for community and connection',
  },
];

export function HardwareSpecs() {
  return (
    <section className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="font-sora text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            World-Class Amenities
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Everything you need for your most productive workdays
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {specs.map((spec, index) => {
            const Icon = spec.icon;
            return (
              <motion.div
                key={spec.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glassmorphism rounded-2xl p-6 text-center transition-all hover:shadow-lg"
              >
                <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-sora font-semibold text-foreground">{spec.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{spec.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
