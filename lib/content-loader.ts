import fs from 'fs/promises';
import path from 'path';
import type { Location, SiteConfig, FaqPage, ContactPage, PoliciesPage, BrandConfig } from '@/types/content';

const CONTENT_DIR = path.join(process.cwd(), 'content');

export async function getSiteConfig(): Promise<SiteConfig> {
  const filePath = path.join(CONTENT_DIR, 'site.json');
  const fileContent = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(fileContent);
}



export async function getAllLocations(): Promise<Location[]> {
  const brand = await getBrandConfig();
  return brand.locations;
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


export async function getFaqPage(): Promise<FaqPage> {
  return getPage<FaqPage>('faq');
}

export async function getContactPage(): Promise<ContactPage> {
  return getPage<ContactPage>('contact');
}

export async function getPoliciesPage(): Promise<PoliciesPage> {
  return getPage<PoliciesPage>('policies');
}

export async function getBrandConfig(): Promise<BrandConfig> {
  const filePath = path.join(CONTENT_DIR, 'brand.json');
  const fileContent = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(fileContent) as BrandConfig;
}
