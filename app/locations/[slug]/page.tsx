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

  if (!location) {
    notFound();
  }

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

                {/* Features (using Amenities list if features not present) */}
                <div className="mb-12">
                  <h2 className="font-sora text-2xl font-bold text-foreground">Features</h2>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {(location.features || []).map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-primary" />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                    {(!location.features || location.features.length === 0) && location.amenities.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-primary" />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Capabilities / Amenities */}
                <div>
                  <h2 className="font-sora text-2xl font-bold text-foreground">Amenities</h2>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {location.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                        <span className="text-muted-foreground">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24 p-6">
                  <h3 className="font-sora text-xl font-bold text-foreground">
                    {location.status === 'Open' || location.status === 'Soft Open' ? 'Ready to book?' : 'Coming Soon'}
                  </h3>

                  <p className="mt-2 text-sm text-muted-foreground">
                    {location.status === 'Open' || location.status === 'Soft Open'
                      ? 'Secure your spot in paradise.'
                      : 'Join our waitlist to be notified when we open.'}
                  </p>

                  <div className="mt-6 space-y-3">
                    {location.contact?.email && (
                      <Button asChild className="w-full bg-primary hover:bg-blue-600">
                        <a href={`mailto:${location.contact.email}?subject=Booking Inquiry for ${location.name}`}>
                          {location.cta || 'Book Now'}
                        </a>
                      </Button>
                    )}
                    {!location.contact?.email && (
                      <Button className="w-full bg-primary hover:bg-blue-600" disabled>
                        {location.cta || 'Book Now'}
                      </Button>
                    )}
                  </div>

                  {location.contact && (
                    <div className="mt-6 border-t border-border/40 pt-6 space-y-4">
                      <p className="text-xs font-semibold text-muted-foreground">CONTACT</p>
                      {location.contact.number && (
                        <div>
                          <p className="text-xs text-muted-foreground">Mobile / WhatsApp</p>
                          <p className="font-medium text-foreground">{location.contact.number}</p>
                        </div>
                      )}
                      {location.contact.email && (
                        <div>
                          <p className="text-xs text-muted-foreground">Email</p>
                          <p className="font-medium text-foreground truncate">{location.contact.email}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {location.rooms && (
                    <div className="mt-4 border-t border-border/40 pt-4">
                      <p className="text-xs text-muted-foreground">ACCOMMODATION</p>
                      <p className="font-medium text-foreground mt-1">{location.rooms}</p>
                    </div>
                  )}

                  <div className="mt-6 border-t border-border/40 pt-6">
                    <p className="text-xs font-semibold text-muted-foreground">QUICK FACTS</p>
                    <div className="mt-4 space-y-3 text-sm">
                      <div>
                        <p className="text-xs text-muted-foreground">Status</p>
                        <p className="font-medium text-foreground">{location.status}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Address</p>
                        <p className="font-medium text-foreground">{location.address}</p>
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
