import type { Profile } from './profile';

const profile: Profile = {
  name: 'Homero Barragán',
  initials: 'hb',
  role: 'Software Engineer | Data Science | Applied AI',
  headline: 'convierto datos en decisiones',
  tagline:
    'Ingeniero de software en transición hacia Data Science e IA aplicada. Construyo soluciones prácticas que convierten datos en ideas útiles.',
  location: 'Riobamba, Ecuador',
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
      start: '2026-01',
      summary: 'En curso. Graduación prevista: enero de 2027.',
    },
    {
      degree: 'Ingeniería de Software',
      institution: 'Escuela Superior Politécnica de Chimborazo (ESPOCH)',
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
};

export default profile;
