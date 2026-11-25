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
import { getLiveSocialEntries } from '@/lib/socials';

export async function OrganizationSchema() {
    const brand = await getBrandConfig();
    const primaryContact = brand.locations.find(l => l.contact?.email)?.contact;
    const liveSocialUrls = getLiveSocialEntries(primaryContact?.socials).map((s) => s.url);

    const data = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: brand.identity.name,
        url: 'https://coworkingstay.com',
        logo: 'https://coworkingstay.com/logos/coworkingstay_logo.svg',
        description: brand.identity.mission,
        contactPoint: primaryContact ? {
            '@type': 'ContactPoint',
            telephone: primaryContact.number !== 'TBD' ? primaryContact.number : undefined,
            contactType: 'customer service',
            email: primaryContact.email,
            availableLanguage: ['English', 'Filipino'],
        } : undefined,
        ...(liveSocialUrls.length > 0 ? { sameAs: liveSocialUrls } : {}),
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
    image?: string;
    email?: string;
    telephone?: string;
}

export function LocalBusinessSchema({
    name,
    description,
    slug,
    status,
    address,
    image,
    email,
    telephone,
}: LocalBusinessSchemaProps) {
    const addressParts = address ? address.split(', ').map((p) => p.trim()) : [];
    const normalizedStatus = status.trim().toLowerCase();
    const isOperational = normalizedStatus === 'open' || normalizedStatus === 'soft open';

    const data = {
        '@context': 'https://schema.org',
        '@type': 'LodgingBusiness',
        name,
        description,
        url: `https://coworkingstay.com/locations/${slug}`,
        image: image
            ? `https://coworkingstay.com${image}`
            : `https://coworkingstay.com/locations/${slug}/opengraph-image`,
        priceRange: '$$',
        ...(email ? { email } : {}),
        ...(telephone && telephone.toUpperCase() !== 'TBD' ? { telephone } : {}),
        address: address
            ? {
                '@type': 'PostalAddress',
                streetAddress: addressParts.length >= 3 ? addressParts[0] : undefined,
                addressLocality: addressParts.length >= 3 ? addressParts[1] : addressParts[0] || '',
                addressCountry: 'PH',
            }
            : {
                '@type': 'PostalAddress',
                addressCountry: 'PH',
            },
        amenityFeature: [
            { '@type': 'LocationFeatureSpecification', name: 'High-Speed Wi-Fi & Generator Power Backup', value: true },
            { '@type': 'LocationFeatureSpecification', name: 'Coworking Space', value: true },
            { '@type': 'LocationFeatureSpecification', name: 'Focus Zones', value: true },
            { '@type': 'LocationFeatureSpecification', name: 'Collaboration Zones', value: true },
            { '@type': 'LocationFeatureSpecification', name: 'Conference & Training Room', value: true },
            { '@type': 'LocationFeatureSpecification', name: 'Power Backup Generator', value: true },
        ],
        ...(isOperational && {
            openingHoursSpecification: {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                opens: '00:00',
                closes: '23:59',
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
