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
    description: `${location.tagline} ${location.description.substring(0, 120)}. Coworking hotel with focus zones, failover internet, and power backup.`,
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

  if (!location) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <LocalBusinessSchema
        name={location.name}
        description={location.description}
        slug={location.slug}
        status={location.status}
        address={location.address}
      />
      <Header locations={allLocations} />
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 flex items-center gap-4">
              <div>
                <h1 className="font-sora text-4xl font-bold text-foreground sm:text-5xl">
                  {location.name}
                </h1>
                <p className="mt-3 font-caveat text-2xl text-primary">{location.tagline}</p>
              </div>
              <Badge variant={location.status === 'Open' ? 'default' : 'secondary'} className="h-fit">
                {location.status}
              </Badge>
            </div>

            {/* Hero Image */}
            <div className="mb-12 overflow-hidden rounded-3xl border border-border/40 shadow-xl">
              <div className="aspect-video bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10" />
            </div>

            <div className="grid gap-12 lg:grid-cols-3">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {/* Description */}
                <div className="mb-12">
                  <h2 className="font-sora text-2xl font-bold text-foreground">About</h2>
                  <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{location.description}</p>
                </div>

                {/* Features */}
                <div className="mb-12">
                  <h2 className="font-sora text-2xl font-bold text-foreground">Features</h2>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {location.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-primary" />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Capabilities */}
                <div>
                  <h2 className="font-sora text-2xl font-bold text-foreground">Capabilities</h2>
                  <div className="mt-6 space-y-3">
                    {location.capabilities.highSpeedInternet && (
                      <div className="flex items-center gap-3">
                        <Wifi className="h-5 w-5 text-primary" />
                        <span className="text-muted-foreground">High-speed internet connectivity</span>
                      </div>
                    )}
                    {location.capabilities.privateOffices && (
                      <div className="flex items-center gap-3">
                        <Lock className="h-5 w-5 text-primary" />
                        <span className="text-muted-foreground">Private offices available</span>
                      </div>
                    )}
                    {location.capabilities.internetFailoverConfirmed && (
                      <div className="flex items-center gap-3">
                        <Wifi className="h-5 w-5 text-secondary" />
                        <span className="font-medium text-secondary">Internet failover system confirmed</span>
                      </div>
                    )}
                    {location.capabilities.coworkingSpaces && (
                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-primary" />
                        <span className="text-muted-foreground">Community coworking spaces</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24 p-6">
                  <h3 className="font-sora text-xl font-bold text-foreground">Ready to visit?</h3>

                  {location.status === 'Open' ? (
                    <>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {location.bookingType === 'request'
                          ? 'Request a tour or start your stay'
                          : 'Join our waitlist'}
                      </p>
                      <Button asChild className="mt-6 w-full bg-primary hover:bg-blue-600">
                        <a href={location.bookingForm} target="_blank" rel="noopener noreferrer">
                          {location.bookingType === 'request' ? 'Request Access' : 'Join Waitlist'}
                        </a>
                      </Button>
                    </>
                  ) : (
                    <>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {location.name} is coming soon! Join our waitlist to be among the first to experience it.
                      </p>
                      <Button asChild className="mt-6 w-full bg-primary hover:bg-blue-600">
                        <a href={location.bookingForm} target="_blank" rel="noopener noreferrer">
                          Join Waitlist
                        </a>
                      </Button>
                    </>
                  )}

                  <div className="mt-6 border-t border-border/40 pt-6">
                    <p className="text-xs font-semibold text-muted-foreground">QUICK FACTS</p>
                    <div className="mt-4 space-y-3 text-sm">
                      <div>
                        <p className="text-xs text-muted-foreground">Status</p>
                        <p className="font-medium text-foreground">{location.status}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Internet</p>
                        <p className="font-medium text-foreground">High-speed Fiber</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Space Type</p>
                        <p className="font-medium text-foreground">
                          {location.capabilities.privateOffices ? 'Private + Coworking' : 'Coworking'}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer locations={allLocations} />
    </div>
  );
}
