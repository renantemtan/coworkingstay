export interface BrandIdentity {
  name: string;
  mainTag: string;
  subTag: string;
  mission: string;
  uniqueValueProposition: string[];
  values: string[]; // Pillars title/promise map to this or separate? User put Pillars separate.
  colors: {
    navy: string;
    blue: string;
    sky: string;
    aqua: string;
    red: string;
    orange: string;
    sand: string;
    charcoal: string;
    grey: string;
  };
  voice: string;
  targetMarket: string[];
  reach: string[];
}

export interface Persona {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface Amenity {
  title: string;
  description: string;
  icon: string;
}

export interface MembershipPlan {
  id: string;
  title: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  highlight: boolean;
}


export interface LocationContact {
  email: string;
  number: string;
  messenger?: string;
  landline?: string;
  socials?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
    tiktok?: string;
  };
}

export interface LocationCapabilities {
  internetFailoverConfirmed?: boolean;
  highSpeedInternet?: boolean;
  privateOffices?: boolean;
  coworkingSpaces?: boolean;
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
  slug: string; // Keep slug for routing
  name: string;
  tagline: string;
  address: string;
  status: 'Open' | 'Soft Open' | 'Soon';
  description?: string; // Optional if not in user's new list, but needed for UI
  image: string; // Needed for UI
  amenities: string[]; // User provided "Amenities" list
  rooms?: string;
  contact?: LocationContact;
  cta: string;

  // Keep these for backward compat or UI needs if possible, else make optional
  features?: string[];
  highlights?: string[];
  coworkingFeatures?: string[];
  roomSummary?: string[];
  activities?: string[];
  capabilities?: LocationCapabilities;
  bookingForm?: string;
  bookingType?: 'request' | 'waitlist';
  gallery?: GalleryItem[];
  gettingHereSteps?: string[];
  faqs?: FaqItem[];
  policies?: string[];
}

export interface Pillar {
  id: string;
  title: string;
  promise: string; // e.g. "Professional-grade..."
  description?: string;
  icon?: string; // For UI
  color?: string; // For UI
}

export interface BrandConfig {
  identity: BrandIdentity;
  pillars: Pillar[];
  locations: Location[];
  personas: Persona[]; // Keep for UI "Built For People Like You"
  amenities: Amenity[]; // Keep for UI "Standard Amenities"
  membershipPlans: MembershipPlan[];
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
