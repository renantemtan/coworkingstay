import type { Metadata } from 'next';
import { getAllLocations, getExperiencePage } from '@/lib/content-loader';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/sections/hero';
import { PillarsSection } from '@/components/sections/pillars';
import { LocationsGrid } from '@/components/sections/locations-grid';
import { HardwareSpecs } from '@/components/sections/hardware-specs';
import { BookingSection } from '@/components/sections/booking';
import { OrganizationSchema } from '@/components/seo/structured-data';

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
};

export default async function Home() {
  const locations = await getAllLocations();
  const experience = await getExperiencePage();

  return (
    <div className="min-h-screen bg-white">
      <OrganizationSchema />
      <Header locations={locations} />
      <main>
        <HeroSection />
        <PillarsSection pillars={experience.pillars} />
        <div id="locations" className="scroll-mt-24">
          <LocationsGrid locations={locations} />
        </div>
        <HardwareSpecs />
        <BookingSection />
      </main>
      <Footer locations={locations} />
    </div>
  );
}
