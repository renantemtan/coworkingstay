import type { Metadata } from 'next';
import { getAllLocations, getBrandConfig } from '@/lib/content-loader';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/sections/hero';
import { PillarsSection } from '@/components/sections/pillars';
import { LocationsGrid } from '@/components/sections/locations-grid';
import { HardwareSpecs } from '@/components/sections/hardware-specs';
import { TargetAudience } from '@/components/sections/target-audience';
import { BookingSection } from '@/components/sections/booking';
import { OrganizationSchema } from '@/components/seo/structured-data';

export async function generateMetadata(): Promise<Metadata> {
  const brand = await getBrandConfig();
  return {
    description: brand.identity.mainTag,
    alternates: {
      canonical: '/',
    },
  };
}

export default async function Home() {
  const locations = await getAllLocations();

  const brand = await getBrandConfig();

  return (
    <div className="min-h-screen bg-white">
      <OrganizationSchema />
      <Header locations={locations} />
      <main>
        <HeroSection identity={brand.identity} />
        <div id="locations" className="scroll-mt-24">
          <LocationsGrid locations={locations} />
        </div>
        <PillarsSection pillars={brand.pillars} />
        <TargetAudience personas={brand.personas} />
        <HardwareSpecs amenities={brand.amenities} />
        <BookingSection plans={brand.membershipPlans} />
      </main>
      <Footer locations={locations} />
    </div>
  );
}
