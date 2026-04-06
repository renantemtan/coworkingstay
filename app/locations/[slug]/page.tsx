import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { getLocation, getAllLocations } from '@/lib/content-loader';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle2, MapPin, Wifi, Lock } from 'lucide-react';
import { LocalBusinessSchema } from '@/components/seo/structured-data';

// Modular Location Components
import { LocationHero } from '@/components/sections/location/location-hero';
import { LocationOverview } from '@/components/sections/location/location-overview';
import { LocationCoworking } from '@/components/sections/location/location-coworking';
import { LocationAccommodation } from '@/components/sections/location/location-accommodation';
import { LocationWorkPlay } from '@/components/sections/location/location-work-play';
import { LocationTargetMarket } from '@/components/sections/location/location-target-market';
import { LocationLoyalty } from '@/components/sections/location/location-loyalty';
import { LocationGallery } from '@/components/sections/location/location-gallery';
import { LocationGettingHere } from '@/components/sections/location/location-getting-here';
import { LocationPoliciesSection } from '@/components/sections/location/location-policies';
import { LocationContactSection } from '@/components/sections/location/location-contact';
import { getBrandConfig } from '@/lib/content-loader';

interface LocationPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata(props: LocationPageProps): Promise<Metadata> {
  const params = await props.params;
  const location = await getLocation(params.slug);

  if (!location) {
    return {
      title: 'Location not found',
    };
  }

  return {
    title: `${location.name} — Coworking Space Hotel in ${location.name.replace("Work 'n ", "")}`,
    description: `${location.tagline} ${(location.description || '').substring(0, 120)}. Coworking hotel with focus zones, failover internet, and power backup.`,
    openGraph: {
      title: `${location.name} | CoWorkingStay`,
      description: location.tagline,
      url: `/locations/${location.slug}`,
      type: 'website',
    },
    alternates: {
      canonical: `/locations/${location.slug}`,
    },
  };
}

export async function generateStaticParams() {
  const locations = await getAllLocations();
  return locations.map((location) => ({
    slug: location.slug,
  }));
}

export default async function LocationPage(props: LocationPageProps) {
  const params = await props.params;
  const location = await getLocation(params.slug);
  const allLocations = await getAllLocations();
  const brand = await getBrandConfig();

  if (!location) {
    notFound();
  }

  const isComingSoon = location.slug.includes('work-n-lake') || location.slug.includes('work-n-surf');

  return (
    <div className="min-h-screen bg-white">
      <LocalBusinessSchema
        name={location.name}
        description={location.description || ''}
        slug={location.slug}
        status={location.status}
        address={location.address}
      />
      <Header locations={allLocations} activeLocation={location} />
      <main>
        <LocationHero
          name={location.name}
          tagline={location.tagline}
          image={location.image}
          logoUrl={location.logoUrl}
          status={location.status}
          hideStatus={location.hideStatus}
          statusColor={location.slug === 'work-n-wave-puerto-galera' ? '#03B1F7' : '#333F50'}
          cta={location.cta}
        />

        {/* Only show Overview if there's an actual description or highlights set in the CMS */}
        {(location.description || (location.overviewHighlights && location.overviewHighlights.length > 0)) && (
          <LocationOverview
            title={isComingSoon ? "The Vision" : undefined}
            hideBadge={isComingSoon}
            description={location.description}
            highlights={location.overviewHighlights}
            amenities={location.amenities}
            address={location.address}
            coworkingDescription={location.coworking?.description}
            coworkingZones={location.coworking?.zones}
            accommodationDescription={location.accommodation?.description}
            accommodationBeds={location.accommodation?.beds}
            activitiesDescription={location.activitiesDescription}
            pillars={brand.pillars}
          />
        )}

        {!isComingSoon && <LocationCoworking coworking={location.coworking} targetActivities={location.targetActivities} />}
        {!isComingSoon && <LocationAccommodation accommodation={location.accommodation} />}
        <LocationWorkPlay
          activitiesDescription={location.activitiesDescription}
          activitiesDisclaimer={location.activitiesDisclaimer}
          activities={location.activities}
          locationName={location.name}
        />
        {!isComingSoon && (
          <LocationTargetMarket
            personas={brand.personas}
          />
        )}
        {!isComingSoon && <LocationLoyalty />}
        <LocationGallery gallery={location.gallery} />
        {!isComingSoon && <LocationGettingHere gettingHere={location.gettingHere} />}
        {!isComingSoon && <LocationPoliciesSection locationPolicies={location.locationPolicies} />}
        <LocationContactSection contact={location.contact} locationName={location.name} isComingSoon={isComingSoon} />

      </main>
      <Footer locations={allLocations} />
    </div>
  );
}
