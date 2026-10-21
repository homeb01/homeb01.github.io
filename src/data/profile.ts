import type { ImageMetadata } from 'astro';
import type { Lang } from '../i18n';
import es from './profile.es';
import en from './profile.en';

/**
 * Shared shape of the CV data. One file per language: profile.es.ts / profile.en.ts.
 * Dates use 'YYYY-MM' (or 'YYYY'); they are formatted per language at render time.
 * Empty arrays hide their section automatically.
 */
export interface Profile {
  /** Full name as shown in the hero and footer. */
  name: string;
  /** Two-letter monogram used in the header logo (e.g. 'hb'). */
  initials: string;
  /** Job title / role, e.g. 'Software Engineer'. */
  role: string;
  /** Short phrase shown with the accent gradient in the hero H1. */
  headline: string;
  /** One or two sentences under the hero title (also the default meta description). */
  tagline: string;
  /** City / country (optional, never a full address). */
  location?: string;
  /** Optional photo for the hero. Import it from src/assets/. */
  photo?: { src: ImageMetadata; alt: string };
  /** About me: one string per paragraph. */
  about: string[];
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillGroup[];
  languages: LanguageItem[];
  certifications?: Certification[];
  /** Research articles / papers (optional; empty or missing hides the section). */
  publications?: Publication[];
  links: ProfileLinks;
}

export interface ExperienceItem {
  role: string;
  organization: string;
  organizationUrl?: string;
  location?: string;
  /** 'YYYY-MM' or 'YYYY'. */
  start: string;
  /** 'YYYY-MM' or 'YYYY'. Omit for a current position. */
  end?: string;
  summary?: string;
  highlights?: string[];
  tags?: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  institutionUrl?: string;
  /** Name of a monochrome logo in src/assets/logos/ without extension (e.g. 'uide'); falls back to a cap icon. */
  logo?: string;
  location?: string;
  start?: string;
  /** Omit if still in progress. */
  end?: string;
  summary?: string;
  highlights?: string[];
}

export interface SkillGroup {
  name: string;
  items: Skill[];
}

export interface Skill {
  name: string;
  /** Optional Simple Icons slug (https://simpleicons.org), e.g. 'typescript', 'python'. */
  icon?: string;
}

export interface LanguageItem {
  name: string;
  level: string;
}

export interface Certification {
  name: string;
  issuer?: string;
  /** 'YYYY-MM' or 'YYYY'. */
  date?: string;
  url?: string;
}

export interface Publication {
  title: string;
  /** Author names, in order. */
  authors: string[];
  /** Conference or journal, e.g. 'ICAETT 2026'. */
  venue: string;
  /** 'YYYY-MM-DD', 'YYYY-MM' or 'YYYY'. */
  date: string;
  description?: string;
  url?: string;
}

export interface ProfileLinks {
  email?: string;
  github: string;
  linkedin?: string;
  /** Path under /public (e.g. '/cv-es.pdf') or absolute URL. */
  cvPdf?: string;
}

const profiles: Record<Lang, Profile> = { es, en };

export function getProfile(lang: Lang): Profile {
  return profiles[lang];
}
