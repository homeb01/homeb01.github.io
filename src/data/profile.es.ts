import type { Profile } from './profile';
import photo from '../assets/profile/homero.png';
import machuPicchu from '../assets/personal/01-machu-picchu.jpg';
import cerroPunay from '../assets/personal/02-cerro-punay.jpg';
import chimborazo from '../assets/personal/03-chimborazo.jpg';
import uyuni from '../assets/personal/04-uyuni.jpg';
import mangahurco from '../assets/personal/05-mangahurco.jpg';
import alausi from '../assets/personal/06-alausi.jpg';

const profile: Profile = {
  name: 'Homero Barragán',
  initials: 'hb',
  role: 'Software Engineer | Data Science | Applied AI',
  headline: 'convierto datos en decisiones',
  tagline:
    'Ingeniero de software en transición hacia Data Science e IA aplicada. Construyo soluciones prácticas que convierten datos en ideas útiles.',
  location: 'Riobamba, Ecuador',
  photo: { src: photo, alt: 'Retrato de Homero Barragán' },
  about: [
    'Soy ingeniero de software y estudiante de maestría en Inteligencia Artificial Aplicada. Estoy dando el salto hacia Data Science e ingeniería de IA.',
    'Desarrollo apps móviles con React Native y TypeScript, y construí una aplicación de apoyo a la toma de decisiones con Python, analítica y aprendizaje no supervisado. Presenté esa investigación en una conferencia internacional. Me mueve crear IA útil que convierta datos en información accionable.',
  ],
  experience: [
    {
      role: 'Desarrollador móvil y líder técnico móvil',
      organization: 'Ensolvers / Hyros',
      location: 'Remoto',
      start: '2023-02',
      highlights: [
        'Desarrollo y mantengo una app móvil con React Native, TypeScript y JavaScript.',
        'Lidero técnicamente el frente móvil: arquitectura, pull requests, code reviews y priorización de entregas.',
        'Rediseñé un selector de métricas de lista plana a árbol jerárquico, con submétricas anidadas.',
        'Contribuyo a una PWA con Capacitor, adaptando interfaces web a diseños móviles responsivos.',
      ],
      tags: ['React Native', 'TypeScript', 'JavaScript', 'Capacitor', 'Docker', 'Jenkins', 'AWS CloudWatch'],
    },
    {
      role: 'Desarrollador web, proyecto de investigación académica',
      organization: 'ESPOCH, Comisión de la Carrera de Ingeniería de Software',
      location: 'Riobamba, Ecuador',
      start: '2023',
      highlights: [
        'Desarrollé IMAK, una aplicación web de apoyo a decisiones para docentes y estudiantes durante el proceso de titulación.',
        'Procesé datos y construí funcionalidades basadas en datos con Python, KNIME, PostgreSQL y SQL Server.',
        'Apliqué analítica básica y aprendizaje no supervisado para agrupar proyectos de titulación similares.',
        'Evalué calidad del sistema, calidad de la información, satisfacción y uso.',
      ],
      tags: ['Python', 'KNIME', 'PostgreSQL', 'SQL Server'],
    },
    {
      role: 'Desarrollador web',
      organization: 'GAD Municipal de Riobamba',
      location: 'Riobamba, Ecuador',
      start: '2022',
      highlights: [
        'Desarrollé un sistema web para apoyar el monitoreo del departamento de seguridad y salud ocupacional.',
        'Implementé la funcionalidad con React, Node.js, JavaScript, HTML, CSS y Docker.',
      ],
      tags: ['React', 'Node.js', 'JavaScript', 'Docker'],
    },
  ],
  education: [
    {
      degree: 'Maestría en Inteligencia Artificial Aplicada',
      institution: 'Universidad Internacional del Ecuador (UIDE)',
      logo: 'uide',
      start: '2026-01',
      summary: 'En curso. Graduación prevista: enero de 2027.',
    },
    {
      degree: 'Ingeniería de Software',
      institution: 'Escuela Superior Politécnica de Chimborazo (ESPOCH)',
      logo: 'espoch',
      location: 'Riobamba, Ecuador',
      start: '2018',
      end: '2023',
      summary: 'Promedio final: 19,34/20. Reconocido con el mayor promedio de graduación de la carrera.',
    },
  ],
  skills: [
    {
      name: 'Programación',
      items: [
        { name: 'Python', icon: 'python' },
        { name: 'TypeScript', icon: 'typescript' },
        { name: 'JavaScript', icon: 'javascript' },
        { name: 'SQL' },
        { name: 'Java' },
      ],
    },
    {
      name: 'Data Science e IA',
      items: [
        { name: 'Analítica de datos' },
        { name: 'Aplicaciones basadas en datos' },
        { name: 'Fundamentos de machine learning' },
        { name: 'Aprendizaje no supervisado y clustering' },
      ],
    },
    {
      name: 'Herramientas de datos y bases de datos',
      items: [
        { name: 'KNIME', icon: 'knime' },
        { name: 'PostgreSQL', icon: 'postgresql' },
        { name: 'SQL Server' },
        { name: 'MySQL', icon: 'mysql' },
        { name: 'SQLite', icon: 'sqlite' },
      ],
    },
    {
      name: 'Desarrollo de software',
      items: [
        { name: 'React Native', icon: 'react' },
        { name: 'React', icon: 'react' },
        { name: 'Node.js', icon: 'nodedotjs' },
        { name: 'Capacitor', icon: 'capacitor' },
        { name: 'PWA' },
        { name: 'Streamlit', icon: 'streamlit' },
        { name: 'Git', icon: 'git' },
      ],
    },
    {
      name: 'Cloud y DevOps',
      items: [
        { name: 'Docker', icon: 'docker' },
        { name: 'Jenkins', icon: 'jenkins' },
        { name: 'GitHub Actions', icon: 'githubactions' },
        { name: 'AWS CloudWatch' },
      ],
    },
    {
      name: 'Métodos de investigación',
      items: [{ name: 'CRISP-DM' }, { name: 'PLS-SEM' }, { name: 'Scrum' }],
    },
  ],
  languages: [
    { name: 'Español', level: 'Nativo' },
    { name: 'Inglés', level: 'C1 (avanzado)' },
  ],
  certifications: [
    {
      name: 'IBM Machine Learning Professional Certificate (en curso)',
      issuer: 'Coursera',
    },
  ],
  publications: [
    {
      title: 'User-Centered Evaluation of a Decision Support System for Degree Completion Management',
      authors: ['Homero Barragán', 'Gisel Bastidas-Guacho', 'Patricio Moreno-Vallejo', 'Ivonne Rodriguez-Flores'],
      venue: 'ICAETT 2026',
      date: '2026-06-04',
      description: 'Artículo de investigación basado en IMAK, presentado en ICAETT 2026 el 4 de junio de 2026.',
    },
  ],
  links: {
    email: 'homero.barragan02@outlook.com',
    github: 'https://github.com/homeb01',
    linkedin: 'https://linkedin.com/in/homeb01',
  },
  personal: {
    eyebrow: 'Más allá del código',
    title: 'Un poco más sobre mí',
    lead: 'Lo que hago cuando no estoy frente al teclado.',
    intro: [
      'Soy Homero, tengo {age} años, vivo en Riobamba y tengo una mascota llamada Ulises. Desde pequeño me apasionó el mundo de la computación, y esa curiosidad nunca se me quitó.',
      'Mi objetivo es ayudar a mi comunidad a través de mi trabajo. Me encanta enseñar y aprender, y trato de hacer ambas cosas todos los días.',
    ],
    interests: [
      { icon: 'book-open', title: 'Lectura', text: 'Disfruto muchísimo leer, página tras página.' },
      { icon: 'coffee', title: 'Café', text: 'Lo amo, y es parte de mi día a día.' },
      { icon: 'chef-hat', title: 'Cocina', text: 'En mis ratos libres, me gusta cocinar.' },
      { icon: 'plane', title: 'Viajar', text: 'Me encanta conocer lugares nuevos.' },
      { icon: 'mountain', title: 'Caminatas largas', text: 'Caminar horas fuera de la ciudad me recarga.' },
      { icon: 'graduation-cap', title: 'Enseñar y aprender', text: 'Disfruto compartir lo que sé y aprender de otros.' },
    ],
    gallery: [
      {
        src: machuPicchu,
        alt: 'Homero sonríe y hace el símbolo de la paz en una selfi, con las ruinas de Machu Picchu y la montaña Huayna Picchu detrás',
        caption: 'Machu Picchu, Perú',
      },
      {
        src: cerroPunay,
        alt: 'Homero, con chaqueta roja, señala a la cámara en la cima de una montaña al amanecer, sobre un mar de nubes',
        caption: 'Cerro Puñay, Ecuador',
      },
      {
        src: chimborazo,
        alt: 'Homero de pie en la nieve junto al letrero de la laguna Cóndor Cocha, a 5100 m en el Chimborazo',
        caption: 'Chimborazo, Ecuador',
      },
      {
        src: uyuni,
        alt: 'La silueta de Homero reflejada en el Salar de Uyuni, convertido en espejo al atardecer',
        caption: 'Salar de Uyuni, Bolivia',
      },
      {
        src: mangahurco,
        alt: 'Homero, con sombrero, mira los guayacanes con su floración amarilla',
        caption: 'Mangahurco, Ecuador',
      },
      {
        src: alausi,
        alt: 'Homero con amigos después de una carrera en Alausí, con sus medallas',
        caption: 'Alausí, Ecuador',
      },
    ],
  },
};

export default profile;
