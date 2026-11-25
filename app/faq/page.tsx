import type { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { getFaqPage, getAllLocations, getSiteConfig } from '@/lib/content-loader';
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
  const [faqData, locations, siteConfig] = await Promise.all([
    getFaqPage(),
    getAllLocations(),
    getSiteConfig(),
  ]);
  const contactEmail = siteConfig.site.contact.email;

  return (
    <div className="min-h-screen bg-white">
      <FaqSchema faqs={faqData.groups.flatMap(g => g.faqs)} />
      <Header locations={locations} />
      <main>
        {/* Hero */}
        <section className="border-b border-border/40 px-4 pt-20 pb-12 sm:px-6 sm:pt-28 sm:pb-16 lg:px-8 bg-muted/10">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="font-sora text-4xl font-bold text-foreground sm:text-5xl tracking-tight">
              {faqData.title}
            </h1>
            <p className="mt-6 text-lg text-muted-foreground whitespace-pre-line leading-relaxed">
              {faqData.description}
            </p>
          </div>
        </section>

        {/* FAQs */}
        <section className="px-4 pt-12 pb-20 sm:px-6 sm:pt-16 sm:pb-28 lg:px-8">
          <div className="mx-auto max-w-3xl space-y-16">
            {faqData.groups.map((group, groupIndex) => (
              <div key={groupIndex} className="space-y-6">
                <h2 className="font-sora text-2xl font-semibold text-[#03B1F7] border-b pb-4">
                  {group.name}
                </h2>
                <Accordion type="single" collapsible>
                  {group.faqs.map((faq, faqIndex) => (
                    <AccordionItem key={faqIndex} value={`item-${groupIndex}-${faqIndex}`}>
                      <AccordionTrigger className="text-lg font-medium text-foreground hover:text-primary text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-base text-muted-foreground whitespace-pre-line leading-relaxed">
                        <FormattedText text={faq.answer} />
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}

            {faqData.disclaimer && (
              <div className="pt-8 border-t">
                <p className="text-sm text-muted-foreground text-center italic leading-relaxed">
                  <FormattedText text={faqData.disclaimer} />
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="bg-muted/30 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-sora text-2xl font-bold text-foreground sm:text-3xl">
              Still Have Questions?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Reach out to our team at{' '}
              <a href={`mailto:${contactEmail}`} className="font-medium text-primary hover:underline">
                {contactEmail}
              </a>{' '}
              or visit us in person.
            </p>
          </div>
        </section>
      </main>
      <Footer locations={locations} />
    </div>
  );
}

function FormattedText({ text }: { text: string }) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i} className="font-bold text-foreground">{part.slice(2, -2)}</strong>;
        }
        return part;
      })}
    </>
  );
}
