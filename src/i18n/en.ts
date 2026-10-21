import type es from './es';

/** UI strings (English). Must define every key of es.ts. */
const en: Record<keyof typeof es, string> = {
  'site.locale': 'en_US',
  'skip': 'Skip to content',

  'nav.label': 'Main navigation',
  'nav.home': 'Home',
  'nav.about': 'About',
  'nav.experience': 'Experience',
  'nav.education': 'Education',
  'nav.skills': 'Skills',
  'nav.projects': 'Projects',
  'nav.contact': 'Contact',
  'nav.menuOpen': 'Open menu',
  'nav.menuClose': 'Close menu',

  'theme.toggle': 'Dark mode',
  'lang.label': 'Language',
  'lang.switchTo': 'View in English',

  'hero.greeting': "Hi, I'm",
  'hero.ctaProjects': 'View projects',
  'hero.ctaContact': 'Contact',
  'hero.scroll': 'Go to the About section',

  'about.title': 'About me',
  'about.location': 'Location',
  'about.languages': 'Languages',

  'experience.title': 'Experience',
  'experience.lead': "Where I've worked and what I've learned along the way.",
  'experience.present': 'Present',

  'education.title': 'Education',
  'education.lead': 'Academic background and certifications.',
  'education.certifications': 'Certifications',

  'skills.title': 'Skills',
  'skills.lead': 'Technologies and tools I work with.',

  'projects.title': 'Projects',
  'projects.lead': "A selection of things I've built.",
  'projects.pageTitle': 'Projects',
  'projects.pageDescription': 'Personal and professional projects, with code and demos.',
  'projects.viewAll': 'View all projects',
  'projects.back': 'Back to projects',
  'projects.repo': 'Code',
  'projects.demo': 'Demo',
  'projects.tech': 'Technologies',
  'projects.links': 'Project links',
  'projects.empty.title': 'Coming soon',
  'projects.empty.body': "I'm getting my first projects ready to show here. In the meantime, you can check out what I have on GitHub.",
  'projects.empty.cta': 'See my GitHub',

  'contact.title': "Let's talk",
  'contact.lead': "Have a proposal, an idea, or just want to say hi? Drop me a line and I'll get back to you as soon as I can.",
  'contact.email': 'Send email',
  'contact.cv': 'Download CV',

  'footer.rights': 'All rights reserved.',
  'footer.backToTop': 'Back to top',
  'footer.social': 'Social',

  'notFound.title': 'Page not found',
  'notFound.body': "The page you're looking for doesn't exist or has moved.",
  'notFound.cta': 'Back to home',

  'a11y.newTab': '(opens in a new tab)',
};

export default en;
