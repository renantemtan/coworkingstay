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

import { getBrandConfig } from '@/lib/content-loader';

export async function OrganizationSchema() {
    const brand = await getBrandConfig();
    const primaryContact = brand.locations.find(l => l.contact?.email)?.contact;

    const data = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: brand.identity.name,
        url: 'https://coworkingstay.com',
        logo: 'https://coworkingstay.com/logo.png',
        description: brand.identity.mission,
        contactPoint: primaryContact ? {
            '@type': 'ContactPoint',
            telephone: primaryContact.number,
            contactType: 'customer service',
            email: primaryContact.email,
            availableLanguage: ['English', 'Filipino'],
        } : undefined,
        sameAs: [
            'https://facebook.com/coworkingstay',
            'https://instagram.com/coworkingstay',
            'https://linkedin.com/company/coworkingstay',
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
