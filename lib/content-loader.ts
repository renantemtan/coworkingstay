import fs from 'fs/promises';
import path from 'path';
import type { Location, SiteConfig, ExperiencePage, FaqPage, ContactPage, PoliciesPage } from '@/types/content';

const CONTENT_DIR = path.join(process.cwd(), 'content');

export async function getSiteConfig(): Promise<SiteConfig> {
  const filePath = path.join(CONTENT_DIR, 'site.json');
  const fileContent = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(fileContent);
}

export async function getAllLocations(): Promise<Location[]> {
  const locationsDir = path.join(CONTENT_DIR, 'locations');
  const files = await fs.readdir(locationsDir);
  const locationFiles = files.filter((file) => file.endsWith('.json'));

  const locations = await Promise.all(
    locationFiles.map(async (file) => {
      const filePath = path.join(locationsDir, file);
      const fileContent = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(fileContent) as Location;
    })
  );

  // Sort locations based on site.json order
  const siteConfig = await getSiteConfig();
  const order = siteConfig.navigation.locationsOrder;

  return locations.sort((a, b) => {
    return order.indexOf(a.id) - order.indexOf(b.id);
  });
}

export async function getLocation(slug: string): Promise<Location | undefined> {
  const locations = await getAllLocations();
  return locations.find((loc) => loc.slug === slug);
}

export async function getPage<T>(pageName: string): Promise<T> {
  const filePath = path.join(CONTENT_DIR, 'pages', `${pageName}.json`);
  const fileContent = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(fileContent) as T;
}

// Typed helpers for specific pages
export async function getExperiencePage(): Promise<ExperiencePage> {
  return getPage<ExperiencePage>('experience');
}

export async function getFaqPage(): Promise<FaqPage> {
  return getPage<FaqPage>('faq');
}

export async function getContactPage(): Promise<ContactPage> {
  return getPage<ContactPage>('contact');
}

export async function getPoliciesPage(): Promise<PoliciesPage> {
  return getPage<PoliciesPage>('policies');
}
