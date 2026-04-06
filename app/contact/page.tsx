import type { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { getContactPage, getAllLocations, getFaqPage } from '@/lib/content-loader';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MapPin, Phone, HelpCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const metadata: Metadata = {
  title: 'Contact Us — Inquiries, Bookings & Partnerships',
  description:
    'Reach the CoWorkingStay team for bookings, coworking inquiries, partnership opportunities, or help planning your workation in the Philippines.',
  alternates: {
    canonical: '/contact',
  },
};

interface ContactPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ContactPage(props: ContactPageProps) {
  const searchParams = await props.searchParams;
  const subject = typeof searchParams.subject === 'string' ? searchParams.subject : '';

  const contact = await getContactPage();
  const locations = await getAllLocations();
  const faqData = await getFaqPage();

  return (
    <div className="min-h-screen bg-white">
      <Header locations={locations} />
      <main>
        {/* Contact Header & Main Section */}
        <section className="px-4 pt-16 pb-20 sm:px-6 sm:pt-24 sm:pb-28 lg:px-8 bg-slate-50/50">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 max-w-2xl">
              <h1 className="font-sora text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {contact.title}
              </h1>
              <p className="mt-4 text-lg text-muted-foreground font-inter">
                {contact.description}
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              {/* Contact Info (Left Column) */}
              <div className="space-y-5">
                <Card className="px-4 py-6 border-none shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_32px_rgba(0,0,0,0.05)] transition-all flex flex-col items-center text-center rounded-2xl">
                  <div className="h-12 w-12 rounded-xl flex items-center justify-center mb-4 bg-[#0C4A96]/5 text-[#0C4A96]">
                    <Mail className="h-5 w-5" />
                  </div>
                  <h3 className="text-xs font-bold text-muted-foreground/70 mb-1 font-inter tracking-wider uppercase">Email</h3>
                  <a href={`mailto:${contact.contactInfo.email}`} className="font-inter font-semibold text-foreground hover:text-[#0C4A96] transition-colors whitespace-nowrap text-[13px] sm:text-sm lg:text-[13px] xl:text-sm">
                    {contact.contactInfo.email}
                  </a>
                </Card>

                <Card className="px-4 py-6 border-none shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_32px_rgba(0,0,0,0.05)] transition-all flex flex-col items-center text-center rounded-2xl md:px-2 lg:px-2">
                  <div className="h-12 w-12 rounded-xl flex items-center justify-center mb-4 bg-[#03B1F7]/5 text-[#03B1F7]">
                    <Phone className="h-5 w-5" />
                  </div>
                  <h3 className="text-[10px] sm:text-xs font-bold text-muted-foreground/70 mb-1 font-inter tracking-wider uppercase leading-snug">Mobile • WhatsApp • Viber • Telegram</h3>
                  <a href={`tel:${contact.contactInfo.mobile}`} className="font-inter font-semibold text-foreground hover:text-[#03B1F7] transition-colors whitespace-nowrap text-[13px] sm:text-sm lg:text-[13px] xl:text-sm">
                    {contact.contactInfo.mobile}
                  </a>
                </Card>

                <Card className="px-4 py-6 border-none shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_32px_rgba(0,0,0,0.05)] transition-all flex flex-col items-center text-center rounded-2xl">
                  <div className="h-12 w-12 rounded-xl flex items-center justify-center mb-4 bg-[#03D2D8]/5 text-[#03D2D8]">
                    <Phone className="h-5 w-5" />
                  </div>
                  <h3 className="text-xs font-bold text-muted-foreground/70 mb-1 font-inter tracking-wider uppercase">Landline</h3>
                  <a href={`tel:${contact.contactInfo.landline}`} className="font-inter font-semibold text-foreground hover:text-[#03D2D8] transition-colors whitespace-nowrap text-[13px] sm:text-sm lg:text-[13px] xl:text-sm">
                    {contact.contactInfo.landline}
                  </a>
                </Card>
              </div>

              {/* Contact Form (Main Column) */}
              <div className="lg:col-span-2">
                <Card className="p-8 sm:p-12 border-none shadow-[0_8px_40px_rgba(0,0,0,0.04)] rounded-[2rem] h-full flex flex-col">
                <form className="space-y-8">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-semibold text-foreground font-sora">
                        Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Your name"
                        className="h-12 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-[#03B1F7] transition-all"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-semibold text-foreground font-sora">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        className="h-12 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-[#03B1F7] transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-semibold text-foreground font-sora">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="What is this regarding?"
                      defaultValue={subject}
                      className="h-12 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-[#03B1F7] transition-all"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-semibold text-foreground font-sora">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us more about your inquiry (e.g., Dates, Group Size, Number of Rooms)..."
                      className="min-h-[160px] rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-[#03B1F7] transition-all p-4 resize-none"
                      required
                    />
                  </div>

                  <div className="mt-auto pt-8">
                    <Button type="submit" size="lg" className="w-full bg-[#03B1F7] hover:bg-sky-500 text-white rounded-xl h-12 font-semibold shadow-sm hover:shadow-md transition-all">
                      Send Message
                    </Button>
                  </div>
                </form>
              </Card>
            </div>
          </div>
          </div>
        </section>

        {/* FAQ Preview Section */}
        <section className="bg-[#0C4A96] py-16 sm:py-24 text-white">
          <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
            <h2 className="font-sora text-3xl font-bold tracking-tight sm:text-4xl mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-blue-100 mb-8 font-inter">
              Got more questions? We might have already answered them. Head over to our FAQ page to learn more about bookings, amenities, and what to expect during your stay.
            </p>
            <Button asChild size="lg" className="bg-[#03B1F7] hover:bg-sky-500 text-white font-semibold">
              <a href="/faq">Read our Full FAQ</a>
            </Button>
          </div>
        </section>
      </main>
      <Footer locations={locations} />
    </div>
  );
}
