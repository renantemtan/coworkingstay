'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Calendar, Users, Zap } from 'lucide-react';

export function BookingSection() {
  return (
    <section id="booking" className="bg-gradient-to-b from-white to-muted/20 px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="font-sora text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Start Your Journey Today
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Choose the perfect membership for your work style
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              title: 'Day Pass',
              price: '$29',
              description: 'Perfect for visitors and occasional workers',
              features: [
                'Full day access',
                'High-speed internet',
                'Coworking space',
                'Coffee & refreshments',
              ],
              cta: 'Book Day Pass',
              highlight: false,
            },
            {
              title: 'Monthly',
              price: '$299',
              description: 'Ideal for regular professionals',
              features: [
                'Unlimited access',
                'Priority support',
                'Community events',
                'Professional address',
                'Private locker',
              ],
              cta: 'Get Monthly',
              highlight: true,
            },
            {
              title: 'Annual',
              price: '$2,990',
              description: 'Best value for committed members',
              features: [
                'Everything in Monthly',
                '2 free private office days',
                'Exclusive workshops',
                'Annual retreat',
                'Networking events',
              ],
              cta: 'Get Annual',
              highlight: false,
            },
          ].map((plan, index) => (
            <motion.div
              key={plan.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card
                className={`relative flex flex-col p-8 transition-all ${
                  plan.highlight ? 'border-2 border-primary shadow-xl' : ''
                } hover:shadow-lg`}
              >
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-primary px-4 py-1 text-xs font-bold text-white rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                <h3 className="font-sora text-2xl font-bold text-foreground">{plan.title}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="font-sora text-4xl font-bold text-primary">{plan.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>

                <ul className="mt-8 flex-1 space-y-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Zap className="h-5 w-5 flex-shrink-0 text-primary" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`mt-8 w-full ${
                    plan.highlight
                      ? 'bg-primary hover:bg-blue-600 text-white'
                      : 'border border-primary bg-transparent text-primary hover:bg-primary/5'
                  }`}
                >
                  {plan.cta}
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground">
            All plans include 24/7 access, community events, and professional network. No long-term commitment required.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
