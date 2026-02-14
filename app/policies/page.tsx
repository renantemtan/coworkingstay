import type { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { getPoliciesPage, getAllLocations } from '@/lib/content-loader';
import { Card } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Policies — Privacy, Terms & Cancellation',
  description:
    'Read CoWorkingStay policies including our privacy policy, terms of service, and booking & cancellation guidelines.',
  alternates: {
    canonical: '/policies',
  },
};

export default async function PoliciesPage() {
  const policies = await getPoliciesPage();
  const locations = await getAllLocations();

  return (
    <div className="min-h-screen bg-white">
      <Header locations={locations} />
      <main>
        {/* Hero */}
        <section className="border-b border-border/40 px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="font-sora text-4xl font-bold text-foreground sm:text-5xl">
              Our Policies
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Transparency and trust are at the heart of everything we do.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl space-y-12">
            {/* Privacy Policy */}
            <Card className="p-8">
              <h2 className="font-sora text-2xl font-bold text-foreground">Privacy Policy</h2>
              <div className="prose prose-sm mt-6 max-w-none text-muted-foreground whitespace-pre-line">
                <p>
                  {policies.privacy}
                </p>
              </div>
            </Card>

            {/* Terms of Service */}
            <Card className="p-8">
              <h2 className="font-sora text-2xl font-bold text-foreground">Terms of Service</h2>
              <div className="prose prose-sm mt-6 max-w-none text-muted-foreground whitespace-pre-line">
                <p>
                  {policies.terms}
                </p>
              </div>
            </Card>

            {/* Booking & Cancellation */}
            <Card className="p-8">
              <h2 className="font-sora text-2xl font-bold text-foreground">Booking & Cancellation</h2>
              <div className="prose prose-sm mt-6 max-w-none text-muted-foreground whitespace-pre-line">
                <p>
                  {policies.bookingCancellation}
                </p>
              </div>
            </Card>
          </div>
        </section>
      </main>
      <Footer locations={locations} />
    </div>
  );
}
