'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Zap, Check } from 'lucide-react';
import Link from 'next/link';
import type { MembershipPlan } from '@/types/content';

interface BookingSectionProps {
  plans: MembershipPlan[];
}

export function BookingSection({ plans }: BookingSectionProps) {
  return (
    <section id="booking" className="bg-white px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <h2 className="font-sora text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Unlock Your Best Work
          </h2>
          <p className="mt-6 text-lg text-muted-foreground font-inter">
            Flexible options. No hidden fees. Just pure productivity.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3 lg:gap-12">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex"
            >
              <div
                className={`flex w-full flex-col rounded-3xl p-8 transition-all hover:shadow-xl ${plan.highlight
                    ? 'bg-gray-900 text-white ring-1 ring-gray-900 shadow-2xl scale-105 z-10'
                    : 'bg-white text-gray-900 ring-1 ring-gray-200 hover:ring-gray-300'
                  }`}
              >
                <div className="mb-8">
                  <h3 className={`font-sora text-xl font-bold ${plan.highlight ? 'text-white' : 'text-gray-900'}`}>{plan.title}</h3>
                  <p className={`mt-4 text-sm leading-6 ${plan.highlight ? 'text-gray-300' : 'text-gray-500'}`}>{plan.description}</p>
                  <div className="mt-6 flex items-baseline gap-x-1">
                    <span className="font-sora text-4xl font-bold tracking-tight">{plan.price}</span>
                    <span className={`text-sm font-semibold leading-6 ${plan.highlight ? 'text-gray-300' : 'text-gray-500'}`}>{plan.period}</span>
                  </div>
                </div>

                <ul role="list" className={`mt-2 mb-8 space-y-3 text-sm leading-6 ${plan.highlight ? 'text-gray-300' : 'text-gray-600'} flex-1`}>
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <Check className={`h-6 w-5 flex-none ${plan.highlight ? 'text-[#03B1F7]' : 'text-blue-600'}`} aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link href={`/contact?subject=${encodeURIComponent(plan.title)}`} className="w-full">
                  <Button
                    size="lg"
                    className={`w-full rounded-xl py-6 font-semibold shadow-sm ${plan.highlight
                        ? 'bg-[#03B1F7] hover:bg-[#03B1F7]/90 text-white focus-visible:outline-[#03B1F7]'
                        : 'bg-blue-50 text-blue-600 hover:bg-blue-100 ring-1 ring-inset ring-blue-200 hover:ring-blue-300'
                      }`}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enterprise / Contact CTA */}
        <div className="mt-24 rounded-3xl bg-gray-50 py-16 px-6 sm:p-16 ring-1 ring-inset ring-gray-900/5 lg:flex lg:items-center lg:justify-between">
          <div className="lg:w-0 lg:flex-1">
            <h3 className="font-sora text-3xl font-bold tracking-tight text-gray-900">Need a custom plan for your team?</h3>
            <p className="mt-4 text-lg text-gray-600 font-inter">
              We offer tailored packages for startups, retreats, and remote teams.
            </p>
          </div>
          <div className="mt-10 lg:mt-0 lg:flex-shrink-0 lg:flex lg:items-center lg:gap-4">
            <Link href="/contact">
              <Button size="lg" className="rounded-xl py-6 bg-gray-900 text-white hover:bg-gray-800">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
