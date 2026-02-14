import type { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { getContactPage, getAllLocations } from '@/lib/content-loader';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MapPin, Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us — Inquiries, Bookings & Partnerships',
  description:
    'Reach the CoWorkingStay team for bookings, coworking inquiries, partnership opportunities, or help planning your workation in the Philippines.',
  alternates: {
    canonical: '/contact',
  },
};

export default async function ContactPage() {
  const contact = await getContactPage();
  const locations = await getAllLocations();

  return (
    <div className="min-h-screen bg-white">
      <Header locations={locations} />
      <main>
        {/* Hero */}
        <section className="border-b border-border/40 px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="font-sora text-4xl font-bold text-foreground sm:text-5xl">
              {contact.title}
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              {contact.description}
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-12 lg:grid-cols-3">
              {/* Contact Info */}
              <div className="space-y-8">
                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <Mail className="h-6 w-6 flex-shrink-0 text-primary" />
                    <div>
                      <h3 className="font-sora font-semibold text-foreground">Email</h3>
                      <a
                        href={`mailto:${contact.contactInfo.email}`}
                        className="mt-1 text-muted-foreground transition-colors hover:text-primary"
                      >
                        {contact.contactInfo.email}
                      </a>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 flex-shrink-0 text-primary" />
                    <div>
                      <h3 className="font-sora font-semibold text-foreground">Headquarters</h3>
                      <p className="mt-1 text-muted-foreground">
                        {contact.contactInfo.address}
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <Phone className="h-6 w-6 flex-shrink-0 text-primary" />
                    <div>
                      <h3 className="font-sora font-semibold text-foreground">Phone</h3>
                      <a href={`tel:${contact.contactInfo.mobile}`} className="mt-1 text-muted-foreground transition-colors hover:text-primary">
                        {contact.contactInfo.mobile}
                      </a>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card className="p-8">
                  <form className="space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="text-sm font-medium text-foreground">
                          Name
                        </label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Your name"
                          className="mt-2"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="text-sm font-medium text-foreground">
                          Email
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="your@email.com"
                          className="mt-2"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="text-sm font-medium text-foreground">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder="What is this regarding?"
                        className="mt-2"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="text-sm font-medium text-foreground">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us more about your inquiry..."
                        className="mt-2"
                        rows={6}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full bg-primary hover:bg-blue-600">
                      Send Message
                    </Button>
                  </form>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer locations={locations} />
    </div>
  );
}
