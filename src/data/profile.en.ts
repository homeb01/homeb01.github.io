import type { Profile } from './profile';

// TODO(content): every value in this file is a PLACEHOLDER.
// The `content` agent will replace it with real CV data (Phase 2).
// Keep the same structure as profile.es.ts.

const profile: Profile = {
  name: 'First Last', // TODO(content)
  initials: 'hb',
  role: 'Professional role', // TODO(content)
  headline: 'I build things for the web', // TODO(content)
  tagline: 'A short sentence that sums up who you are and what drives you. Two lines at most.', // TODO(content)
  location: 'City, Country', // TODO(content)
  about: [
    // TODO(content)
    'Intro paragraph: who you are, what you do and what you care about. This text is a placeholder.',
    'Second paragraph: the kind of projects or teams you are looking for and what you bring. Also a placeholder.',
  ],
  experience: [
    // TODO(content)
    {
      role: 'Sample position',
      organization: 'Sample company',
      location: 'City',
      start: '2024-01',
      summary: 'Short description of the role (placeholder).',
      highlights: ['Key achievement or responsibility.', 'Another achievement or responsibility.'],
      tags: ['TypeScript', 'Astro'],
    },
    {
      role: 'Previous sample position',
      organization: 'Another organization',
      start: '2022-06',
      end: '2023-12',
      highlights: ['Key achievement or responsibility.'],
    },
  ],
  education: [
    // TODO(content)
    {
      degree: 'Sample degree',
      institution: 'Sample university',
      location: 'City',
      start: '2018',
      end: '2022',
      summary: 'Optional major or detail.',
    },
  ],
  skills: [
    // TODO(content)
    {
      name: 'Languages',
      items: [
        { name: 'TypeScript', icon: 'typescript' },
        { name: 'Python', icon: 'python' },
      ],
    },
    {
      name: 'Frameworks',
      items: [{ name: 'Astro', icon: 'astro' }, { name: 'Node.js', icon: 'nodedotjs' }],
    },
    {
      name: 'Tools',
      items: [{ name: 'Git', icon: 'git' }, { name: 'Docker', icon: 'docker' }, { name: 'Linux', icon: 'linux' }],
    },
  ],
  languages: [
    // TODO(content)
    { name: 'Spanish', level: 'Native' },
    { name: 'English', level: 'Level to be confirmed' },
  ],
  certifications: [], // TODO(content)
  links: {
    email: undefined, // TODO(content): public contact email
    github: 'https://github.com/homeb01',
    linkedin: undefined, // TODO(content)
    cvPdf: undefined, // TODO(content): e.g. '/cv-en.pdf' in public/
  },
};

export default profile;
