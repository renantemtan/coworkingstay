import type { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { getExperiencePage, getAllLocations } from '@/lib/content-loader';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Lightbulb, Globe, TrendingUp, Heart, Zap, Shield, Smile } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export const metadata: Metadata = {
  title: 'The CoWorkingStay Experience — Performance, Freedom, Synergy',
  description:
    'Built on 3 pillars: Performance, Freedom, and Synergy. Professional-grade workspaces in nature-rich Philippine destinations for remote workers, digital nomads, and high performers.',
  alternates: {
    canonical: '/experience',
  },
};

const iconMap: Record<string, LucideIcon> = {
  Users,
  Lightbulb,
  Globe,
  TrendingUp,
  Heart,
  Zap,
  Shield,
  Smile,
};

export default async function ExperiencePage() {
  const experience = await getExperiencePage();
  const locations = await getAllLocations();

  return (
    <div className="min-h-screen bg-white">
      <Header locations={locations} />
      <main>
        {/* Hero */}
        <section className="border-b border-border/40 px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="font-sora text-4xl font-bold text-foreground sm:text-5xl">
              {experience.mission.title}
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              {experience.mission.description}
            </p>
          </div>
        </section>

        {/* Pillars Grid */}
        <section className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 md:grid-cols-2">
              {experience.pillars.map((pillar, index) => {
                const Icon = iconMap[pillar.icon] || Lightbulb;
                return (
                  <Card key={index} className="p-8 transition-all hover:shadow-lg">
                    <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-sora text-2xl font-bold text-foreground">{pillar.title}</h3>
                    <p className="mt-4 text-muted-foreground">{pillar.description}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Community Values */}
        <section className="bg-muted/30 px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-sora text-3xl font-bold text-foreground">Our Values</h2>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {experience.communityValues.map((value, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Heart className="h-6 w-6" />
                  </div>
                  <h3 className="font-sora font-semibold text-foreground">{value}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-sora text-2xl font-bold text-foreground sm:text-3xl">
              Ready to Experience It Yourself?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Choose a location and start your journey with CoWorkingStay.
            </p>
            <Button asChild size="lg" className="mt-8 bg-primary hover:bg-blue-600">
              <a href="/#locations">Explore Locations</a>
            </Button>
          </div>
        </section>
      </main>
      <Footer locations={locations} />
    </div>
  );
}
