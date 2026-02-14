import React from 'react';

interface StructuredDataProps {
    data: Record<string, unknown>;
}

export function StructuredData({ data }: StructuredDataProps) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}

export function OrganizationSchema() {
    const data = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'CoWorkingStay',
        url: 'https://coworkingstay.com',
        logo: 'https://coworkingstay.com/logo.png',
        description:
            'Coworking-first hotel stays in the Philippines. Professional-grade workspaces in beach, lake, and surf destinations for remote workers, digital nomads, and high performers.',
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+63-917-837-5643',
            contactType: 'customer service',
            email: 'worknwave@coworkingstay.com',
            availableLanguage: ['English', 'Filipino'],
        },
        sameAs: [
            'https://facebook.com/coworkingstay',
            'https://instagram.com/coworkingstay',
            'https://linkedin.com/company/coworkingstay',
            'https://tiktok.com/@coworkingstay',
            'https://youtube.com/@coworkingstay',
        ],
        areaServed: {
            '@type': 'Country',
            name: 'Philippines',
        },
    };

    return <StructuredData data={data} />;
}

interface LocalBusinessSchemaProps {
    name: string;
    description: string;
    slug: string;
    status: string;
    address?: string;
}

export function LocalBusinessSchema({
    name,
    description,
    slug,
    status,
    address,
}: LocalBusinessSchemaProps) {
    const addressParts = address ? address.split(', ') : [];

    const data = {
        '@context': 'https://schema.org',
        '@type': 'LodgingBusiness',
        name,
        description,
        url: `https://coworkingstay.com/locations/${slug}`,
        image: `https://coworkingstay.com/locations/${slug}/og-image.png`,
        priceRange: '$$',
        address: address
            ? {
                '@type': 'PostalAddress',
                streetAddress: addressParts[0] || '',
                addressLocality: addressParts[1] || '',
                addressCountry: 'PH',
            }
            : {
                '@type': 'PostalAddress',
                addressCountry: 'PH',
            },
        amenityFeature: [
            { '@type': 'LocationFeatureSpecification', name: 'High-Speed Internet with Failover Backup', value: true },
            { '@type': 'LocationFeatureSpecification', name: 'Coworking Space', value: true },
            { '@type': 'LocationFeatureSpecification', name: 'Focus Zones', value: true },
            { '@type': 'LocationFeatureSpecification', name: 'Collaboration Zones', value: true },
            { '@type': 'LocationFeatureSpecification', name: 'Conference & Training Room', value: true },
            { '@type': 'LocationFeatureSpecification', name: 'Power Backup Generator', value: true },
        ],
        ...(status === 'Open' && {
            openingHoursSpecification: {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            },
        }),
    };

    return <StructuredData data={data} />;
}

interface FaqSchemaProps {
    faqs: { question: string; answer: string }[];
}

export function FaqSchema({ faqs }: FaqSchemaProps) {
    const data = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    };

    return <StructuredData data={data} />;
}
