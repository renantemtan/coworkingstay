import type { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { getFaqPage, getAllLocations } from '@/lib/content-loader';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { FaqSchema } from '@/components/seo/structured-data';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions — Coworking Hotel FAQ',
  description:
    'Find answers about CoWorkingStay — booking, internet speed, amenities, workspaces, nightshift support, team retreats, and coworking hotel stays in the Philippines.',
  alternates: {
    canonical: '/faq',
  },
};

export default async function FAQPage() {
  const faqData = await getFaqPage();
  const locations = await getAllLocations();

  return (
    <div className="min-h-screen bg-white">
      <FaqSchema faqs={faqData.faqs} />
      <Header locations={locations} />
      <main>
        {/* Hero */}
        <section className="border-b border-border/40 px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="font-sora text-4xl font-bold text-foreground sm:text-5xl">
              {faqData.title}
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              {faqData.description}
            </p>
          </div>
        </section>

        {/* FAQs */}
        <section className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <Accordion type="single" collapsible defaultValue="item-0">
              {faqData.faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-lg font-medium text-foreground hover:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="bg-muted/30 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-sora text-2xl font-bold text-foreground sm:text-3xl">
              Still Have Questions?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Reach out to our team at hello@coworkingstay.com or visit us in person.
            </p>
          </div>
        </section>
      </main>
      <Footer locations={locations} />
    </div>
  );
}
