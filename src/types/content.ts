export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: "x" | "linkedin" | "instagram" | "email";
  href: string;
}

export interface AvatarImage {
  src: string;
  alt: string;
}

export interface BentoImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface SkillBadge {
  label: string;
  iconSrc?: string;
  rotationDeg: number;
}

export interface ProcessStep {
  index: number;
  title: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatarSrc?: string;
}

export interface CaseStudyCard {
  title: string;
  tags: string[];
  imageSrc: string;
  imageAlt: string;
}

export interface TimelineEntry {
  role: string;
  company: string;
  period: string;
}

export interface PricingPlan {
  id: "monthly" | "custom";
  toggleLabel: string;
  pricePrefix?: string;
  price: string;
  priceSuffix?: string;
  availability?: string;
  ctaLabel: string;
  included: string[];
  testimonial: Testimonial;
}

export interface TrustBadge {
  label: string;
  icon?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}
