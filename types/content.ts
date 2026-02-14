export interface LocationCapabilities {
  internetFailoverConfirmed: boolean;
  highSpeedInternet: boolean;
  privateOffices: boolean;
  coworkingSpaces: boolean;
}

export interface GalleryItem {
  src: string;
  alt: string;
  label: 'real' | 'concept' | 'lifestyle';
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Location {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  status: 'Open' | 'Soon';
  address?: string;
  description: string;
  image: string;
  features: string[];
  highlights: string[];
  coworkingFeatures: string[];
  roomSummary: string[];
  activities: string[];
  capabilities: LocationCapabilities;
  bookingForm: string;
  bookingType: 'request' | 'waitlist';
  primaryCTA: 'request_to_book' | 'join_waitlist';
  gallery: GalleryItem[];
  gettingHereSteps: string[];
  faqs: FaqItem[];
  policies: string[];
}

export interface Pillar {
  id: string;
  title: string;
  promise: string;
  description: string;
  icon: string;
  color: string;
}

export interface ExperiencePage {
  mission: {
    title: string;
    description: string;
  };
  pillars: Pillar[];
  communityValues: string[];
}

export interface FaqPage {
  title: string;
  description: string;
  faqs: FaqItem[];
}

export interface ContactPage {
  title: string;
  description: string;
  contactInfo: {
    mobile: string;
    email: string;
    address: string;
    socials: {
      facebook: string;
      instagram: string;
      linkedin: string;
      tiktok: string;
      youtube: string;
    };
    globalContactFormUrl: string;
  };
}

export interface PoliciesPage {
  privacy: string;
  terms: string;
  bookingCancellation: string;
}

export interface SiteConfig {
  navigation: {
    locationsOrder: string[];
  };
  site: {
    name: string;
    url: string;
    mainTag: string;
    tagline: string;
    description: string;
    ogImage: string;
    contact: {
      mobile: string;
      email: string;
    };
  };
}
