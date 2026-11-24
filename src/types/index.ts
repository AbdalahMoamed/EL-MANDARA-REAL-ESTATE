export interface BoardMember {
  name: string;
  role: string;
  bio?: string;
}

export interface UnitType {
  id: string;
  name: string;
  nameEn: string;
  areaRange: string;
  description: string;
  features: string[];
  ctaLabel: string;
}

export interface FeatureItem {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  categoryName: string;
  placeholderRef: string;
  imageSrc: string;
  description: string;
  alt: string;
  updatedAt?: number;
  aspectRatio?: string;
  websiteSection?: string;
}

export interface SocialMediaChannel {
  url: string;
  enabled: boolean;
  label: string;
}

export interface SocialMediaSettings {
  facebook: SocialMediaChannel;
  instagram: SocialMediaChannel;
  tiktok: SocialMediaChannel;
}

export interface SiteConfig {
  projectName: string;
  projectNameArabic: string;
  developerName: string;
  developerNameArabic: string;
  companyLogo?: string;
  projectLogo?: string;
  slogan: string;
  headlineArabic: string;
  supportingTextArabic: string;
  projectStatusArabic: string;
  totalAreaArabic: string;
  locationArabic: string;
  landmarksArabic: string[];
  phoneNumbers: string[];
  primaryCallNumber: string;
  primaryWhatsAppNumber: string;
  internationalWhatsAppNumber: string;
  addressArabic: string;
  googleMapsUrl: string;
  googleMapsEmbedUrl: string;
  facebookUrl: string;
  instagramUrl: string;
  tiktokUrl: string;
  socialMedia?: SocialMediaSettings;
  copyrightText: string;
  boardOfDirectors: BoardMember[];
  aboutCompanyText: string;
  features: FeatureItem[];
  units: UnitType[];
  gallery: GalleryItem[];
  video: {
    placeholderRef: string;
    videoSrc: string;
    thumbnailSrc: string;
    title: string;
    duration: string;
  };
  seo: {
    homeTitle: string;
    homeDescription: string;
    aboutTitle: string;
    aboutDescription: string;
    galleryTitle: string;
    galleryDescription: string;
    contactTitle: string;
    contactDescription: string;
    keywords: string[];
  };
}
