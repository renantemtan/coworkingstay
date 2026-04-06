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
  typography: {
    heading: string;
    body: string;
    accent: string;
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

export interface CoworkingDetails {
  description: string;
  zones: string[];
  conferenceRooms: string;
  technology: string[];
  disclaimer: string;
  activities: string[];
  photos: string[]; // URLs for placeholders
}

export interface AccommodationDetails {
  beds: string;
  amenities: string[];
  description: string;
  photos: string[]; // URLs for placeholders
}

export interface GettingHere {
  publicTransport: string;
  publicTransportDetails: string[];
  privateTransport: string;
  privateTransportDetails: string[];
  parkingInfo?: string;
  shippingLines?: string;
  disclaimer?: string;
  mapEmbedUrl?: string; // Google Maps iframe src
  photos: string[];
}

export interface LocationPolicies {
  guidelines: string[];
  checkIn: string;
  checkOut: string;
  deposit: string;
  cancellation: string;
}

export interface Location {
  id: string;
  slug: string; // Keep slug for routing
  name: string;
  tagline: string;
  address: string;
  status: 'Open' | 'Soft Open' | 'Soon';
  hideStatus?: boolean; // If true, hide the status badge (e.g., for Work 'n Wave)
  description?: string;
  overviewHighlights?: string[]; // For Overview section
  image: string; // Hero Background Image
  logoUrl?: string; // Location specific logo
  amenities: string[];
  rooms?: string;
  contact?: LocationContact;
  cta: string;

  coworking?: CoworkingDetails;
  accommodation?: AccommodationDetails;

  activitiesDescription?: string;
  activitiesDisclaimer?: string;
  activities?: { category: string; items: string[] }[];

  targetActivities?: string[]; // Additional activities for Target Market section

  gallery?: GalleryItem[];
  gettingHere?: GettingHere;
  locationPolicies?: LocationPolicies;

  features?: string[];
  highlights?: string[];
  coworkingFeatures?: string[];
  roomSummary?: string[];
  capabilities?: LocationCapabilities;
  bookingForm?: string;
  bookingType?: 'request' | 'waitlist';
  faqs?: FaqItem[];
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



export interface FaqGroup {
  name: string;
  faqs: FaqItem[];
}

export interface FaqPage {
  title: string;
  description: string;
  groups: FaqGroup[];
  disclaimer?: string;
}

export interface ContactPage {
  title: string;
  description: string;
  contactInfo: {
    mobile: string;
    landline?: string;
    email: string;
    address: string;
  };
}

export interface PolicySubsection {
  subtitle?: string;
  type: 'list' | 'text' | 'text-list';
  text?: string;
  items?: string[];
}

export interface PolicySection {
  title: string;
  content?: string;
  subsections?: PolicySubsection[];
}

export interface PoliciesPage {
  title: string;
  intro: string;
  sections: PolicySection[];
  disclaimer: string;
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
