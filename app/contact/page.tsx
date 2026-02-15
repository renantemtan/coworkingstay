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

export default async function ContactPage() {
  const contact = await getContactPage();
  const locations = await getAllLocations();
  const faqData = await getFaqPage();

  return (
    <div className="min-h-screen bg-white">
      <Header locations={locations} />
      <main>
        {/* Premium Hero */}
        <section className="relative overflow-hidden bg-[#0C4A96] px-4 py-24 sm:px-6 sm:py-32 lg:px-8 text-white">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
          </div>
          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <h1 className="font-sora text-4xl font-bold sm:text-5xl lg:text-6xl text-white">
              {contact.title}
            </h1>
            <p className="mt-6 text-lg text-blue-100 max-w-2xl mx-auto font-inter">
              {contact.description}
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8 bg-slate-50">
          <div className="mx-auto max-w-6xl -mt-24 relative z-20">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Contact Info (Left Column) */}
              <div className="space-y-6">
                <Card className="p-8 border-none shadow-xl shadow-blue-900/5 hover:shadow-2xl transition-all">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-50 rounded-xl text-[#0158F5]">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-sora font-semibold text-foreground text-lg">Email</h3>
                      <a
                        href={`mailto:${contact.contactInfo.email}`}
                        className="mt-1 block text-muted-foreground transition-colors hover:text-primary font-inter"
                      >
                        {contact.contactInfo.email}
                      </a>
                    </div>
                  </div>
                </Card>

                <Card className="p-8 border-none shadow-xl shadow-blue-900/5 hover:shadow-2xl transition-all">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-50 rounded-xl text-[#0158F5]">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-sora font-semibold text-foreground text-lg">Headquarters</h3>
                      <p className="mt-1 text-muted-foreground font-inter">
                        {contact.contactInfo.address}
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-8 border-none shadow-xl shadow-blue-900/5 hover:shadow-2xl transition-all">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-50 rounded-xl text-[#0158F5]">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-sora font-semibold text-foreground text-lg">Phone</h3>
                      <a href={`tel:${contact.contactInfo.mobile}`} className="mt-1 block text-muted-foreground transition-colors hover:text-primary font-inter">
                        {contact.contactInfo.mobile}
                      </a>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Contact Form (Main Column) */}
              <div className="lg:col-span-2">
                <Card className="p-8 sm:p-12 border-none shadow-xl shadow-blue-900/5">
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
                        placeholder="Tell us more about your inquiry (e.g., Dates, Group Size, Specific Location)..."
                        className="min-h-[160px] rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-[#03B1F7] transition-all p-4 resize-none"
                        required
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full bg-[#E53652] hover:bg-[#C42B44] text-white rounded-xl h-12 font-semibold">
                      Send Message
                    </Button>
                  </form>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Preview Section */}
        <section className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-sora text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Frequently Asked Questions
              </h2>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqData.faqs.slice(0, 5).map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border rounded-2xl px-6 bg-slate-50 data-[state=open]:bg-white data-[state=open]:shadow-md transition-all border-none">
                  <AccordionTrigger className="font-sora font-semibold text-left py-6 hover:no-underline hover:text-[#03B1F7]">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6 font-inter leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-10 text-center">
              <Button variant="link" asChild className="text-[#03B1F7] font-semibold">
                <a href="/faq">View all FAQs &rarr;</a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer locations={locations} />
    </div>
  );
}
