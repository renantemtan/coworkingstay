import type { SocialLinks } from '@/types/content';

export type SocialPlatform = keyof SocialLinks;

export interface LiveSocialEntry {
  platform: SocialPlatform;
  label: string;
  url: string;
}

const LABELS: Record<SocialPlatform, string> = {
  facebook: 'Facebook',
  instagram: 'Instagram',
  linkedin: 'LinkedIn',
  youtube: 'YouTube',
  tiktok: 'TikTok',
  twitter: 'X (Twitter)',
};

export function isLiveSocialUrl(url?: string): url is string {
  if (!url) return false;
  const trimmed = url.trim();
  if (!trimmed || trimmed === '#' || trimmed.toLowerCase() === 'tbd') {
    return false;
  }
  return /^https?:\/\//i.test(trimmed);
}

export function getLiveSocialEntries(socials?: SocialLinks): LiveSocialEntry[] {
  if (!socials) return [];
  return (Object.keys(LABELS) as SocialPlatform[])
    .filter((platform) => isLiveSocialUrl(socials[platform]))
    .map((platform) => ({
      platform,
      label: LABELS[platform],
      url: socials[platform]!.trim(),
    }));
}
