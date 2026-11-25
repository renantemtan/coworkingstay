import type { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { getPoliciesPage, getAllLocations } from '@/lib/content-loader';
import { Card } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Policies — CoWorkingStay Guidelines',
  description:
    'Read CoWorkingStay policies including our community guidelines, terms of service, and booking & cancellation guidelines.',
  alternates: {
    canonical: '/policies',
  },
};

function FormattedText({ text }: { text: string }) {
  // Split on asterisks or underscores for basic markdown processing
  const parts = text.split(/(\*\*.*?\*\*|_[^_]+_)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i} className="font-bold text-foreground">{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('_') && part.endsWith('_')) {
          return <em key={i} className="italic text-muted-foreground">{part.slice(1, -1)}</em>;
        }
        return part;
      })}
    </>
  );
}

function toSectionId(title: string): string {
  const cleaned = title.replace(/^\d+\.\s*/, '').toLowerCase();
  if (cleaned.includes('community')) return 'community-guidelines';
  if (cleaned.includes('booking')) return 'booking-cancellation';
  if (cleaned.includes('technology')) return 'technology-equipment';
  if (cleaned.includes('health')) return 'health-safety';
  if (cleaned.includes('self-service')) return 'self-service';
  if (cleaned.includes('liability')) return 'liability-disclaimer';
  if (cleaned.includes('privacy')) return 'privacy-policy';
  return cleaned.replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export default async function PoliciesPage() {
  const policies = await getPoliciesPage();
  const locations = await getAllLocations();

  return (
    <div className="min-h-screen bg-white">
      <Header locations={locations} />
      <main>
        {/* Hero */}
        <section className="border-b border-border/40 px-4 pt-20 pb-12 sm:px-6 sm:pt-28 sm:pb-16 lg:px-8 bg-muted/10">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="font-sora text-4xl font-bold text-foreground sm:text-5xl tracking-tight">
              {policies.title}
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto whitespace-pre-line leading-relaxed">
              <FormattedText text={policies.intro} />
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="px-4 pt-12 pb-20 sm:px-6 sm:pt-16 sm:pb-28 lg:px-8">
          <div className="mx-auto max-w-3xl space-y-12">
            {policies.sections.map((section, index) => (
              <Card key={index} id={toSectionId(section.title)} className="p-6 sm:p-8 scroll-mt-24">
                <h2 className="font-sora text-2xl font-bold text-[#03B1F7] border-b pb-4 mb-6">
                  {section.title}
                </h2>
                
                {section.content && (
                  <p className="text-base text-muted-foreground leading-relaxed mb-6">
                    <FormattedText text={section.content} />
                  </p>
                )}

                {section.subsections && section.subsections.length > 0 && (
                  <div className="space-y-8">
                    {section.subsections.map((sub, subIndex) => (
                      <div key={subIndex} className="space-y-3">
                        {sub.subtitle && (
                          <h3 className="text-lg font-semibold text-foreground">
                            {sub.subtitle}
                          </h3>
                        )}
                        
                        {sub.text && (
                          <p className="text-base text-muted-foreground leading-relaxed">
                            <FormattedText text={sub.text} />
                          </p>
                        )}

                        {sub.items && sub.items.length > 0 && (
                          <ul className="list-disc pl-5 space-y-2 text-base text-muted-foreground marker:text-primary">
                            {sub.items.map((item, itemIndex) => (
                              <li key={itemIndex} className="leading-relaxed">
                                <FormattedText text={item} />
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            ))}

            <div className="pt-8 border-t mt-12 bg-muted/30 p-6 rounded-lg">
              <p className="text-sm text-muted-foreground text-center leading-relaxed">
                <FormattedText text={policies.disclaimer} />
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer locations={locations} />
    </div>
  );
}
