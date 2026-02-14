import type { MetadataRoute } from 'next';
import { getAllLocations } from '@/lib/content-loader';

const SITE_URL = 'https://coworkingstay.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const locations = await getAllLocations();

    const locationPages = locations.map((location) => ({
        url: `${SITE_URL}/locations/${location.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    const staticPages = [
        {
            url: SITE_URL,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 1.0,
        },
        {
            url: `${SITE_URL}/experience`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        },
        {
            url: `${SITE_URL}/faq`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.6,
        },
        {
            url: `${SITE_URL}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.6,
        },
        {
            url: `${SITE_URL}/policies`,
            lastModified: new Date(),
            changeFrequency: 'yearly' as const,
            priority: 0.3,
        },
    ];

    return [...staticPages, ...locationPages];
}
