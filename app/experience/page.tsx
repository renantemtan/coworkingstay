import type { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { getBrandConfig, getAllLocations } from '@/lib/content-loader';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PillarsSection } from '@/components/sections/pillars';
import { TargetAudience } from '@/components/sections/target-audience';

export async function generateMetadata(): Promise<Metadata> {
  const brand = await getBrandConfig();
  return {
    title: `The ${brand.identity.name} Experience — ${brand.pillars.map(p => p.title).join(', ')}`,
    description: brand.identity.mission,
    alternates: {
      canonical: '/experience',
    },
  };
}



export default async function ExperiencePage() {
  const brand = await getBrandConfig();
  const locations = await getAllLocations();

  return (
    <div className="min-h-screen bg-white">
      <Header locations={locations} />
      <main>
        {/* Hero */}
        <section className="border-b border-border/40 px-4 pt-20 pb-12 sm:px-6 sm:pt-28 sm:pb-16 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="font-sora text-4xl font-bold text-foreground sm:text-5xl">
              Our Mission
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              {brand.identity.mission}
            </p>
          </div>
        </section>

        {/* The Experience Section (Pillars & UVP) */}
        <PillarsSection
          pillars={brand.pillars}
          uvp={brand.identity.uniqueValueProposition}
          mission=""
        />

        {/* Built For People Like You Section */}
        <TargetAudience personas={brand.personas} />

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
