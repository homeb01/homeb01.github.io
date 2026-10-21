import type { Profile } from './profile';

// TODO(content): todos los valores de este archivo son PLACEHOLDERS.
// El agente `content` los sustituirá con datos reales del CV (Fase 2).
// Mantener la misma estructura que profile.en.ts.

const profile: Profile = {
  name: 'Nombre Apellido', // TODO(content)
  initials: 'hb',
  role: 'Rol profesional', // TODO(content)
  headline: 'construyo cosas para la web', // TODO(content)
  tagline: 'Frase breve que resume quién eres y qué te motiva. Dos líneas como máximo.', // TODO(content)
  location: 'Ciudad, País', // TODO(content)
  about: [
    // TODO(content)
    'Párrafo de presentación: quién eres, qué haces y qué te interesa. Este texto es un marcador de posición.',
    'Segundo párrafo: qué tipo de proyectos o equipos buscas y qué aportas. También es un marcador de posición.',
  ],
  experience: [
    // TODO(content)
    {
      role: 'Puesto de ejemplo',
      organization: 'Empresa de ejemplo',
      location: 'Ciudad',
      start: '2024-01',
      summary: 'Descripción breve del puesto (marcador de posición).',
      highlights: ['Logro o responsabilidad destacada.', 'Otro logro o responsabilidad.'],
      tags: ['TypeScript', 'Astro'],
    },
    {
      role: 'Puesto anterior de ejemplo',
      organization: 'Otra organización',
      start: '2022-06',
      end: '2023-12',
      highlights: ['Logro o responsabilidad destacada.'],
    },
  ],
  education: [
    // TODO(content)
    {
      degree: 'Título de ejemplo',
      institution: 'Universidad de ejemplo',
      location: 'Ciudad',
      start: '2018',
      end: '2022',
      summary: 'Especialidad o detalle opcional.',
    },
  ],
  skills: [
    // TODO(content)
    {
      name: 'Lenguajes',
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
      name: 'Herramientas',
      items: [{ name: 'Git', icon: 'git' }, { name: 'Docker', icon: 'docker' }, { name: 'Linux', icon: 'linux' }],
    },
  ],
  languages: [
    // TODO(content)
    { name: 'Español', level: 'Nativo' },
    { name: 'Inglés', level: 'Nivel por confirmar' },
  ],
  certifications: [], // TODO(content)
  links: {
    email: undefined, // TODO(content): correo público de contacto
    github: 'https://github.com/homeb01',
    linkedin: undefined, // TODO(content)
    cvPdf: undefined, // TODO(content): p. ej. '/cv-es.pdf' en public/
  },
};

export default profile;
