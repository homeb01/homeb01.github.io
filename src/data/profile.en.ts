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
  headline: 'I turn data into decisions',
  tagline:
    'Software engineer moving into Data Science and applied AI. I build practical solutions that turn data into useful insights.',
  location: 'Riobamba, Ecuador',
  photo: { src: photo, alt: 'Portrait of Homero Barragán' },
  about: [
    "I'm a software engineer and Master's student in Applied Artificial Intelligence, moving toward Data Science and AI engineering.",
    'I build mobile apps with React Native and TypeScript, and I developed a decision-support application using Python, analytics and unsupervised learning. I presented that research at an international conference. I like building practical AI that turns data into actionable insight.',
  ],
  experience: [
    {
      role: 'Mobile Developer & Mobile Technical Lead',
      organization: 'Ensolvers / Hyros',
      location: 'Remote',
      start: '2023-02',
      highlights: [
        'Build and maintain a mobile app with React Native, TypeScript and JavaScript.',
        'Own the mobile workstream technically: architecture, pull requests, code reviews and delivery prioritization.',
        'Refactored a metrics selector from a flat list into a hierarchical tree with nested submetrics.',
        'Contribute to a Capacitor-based PWA, adapting web interfaces into responsive mobile layouts.',
      ],
      tags: ['React Native', 'TypeScript', 'JavaScript', 'Capacitor', 'Docker', 'Jenkins', 'AWS CloudWatch'],
    },
    {
      role: 'Web Developer, Academic Research Project',
      organization: 'ESPOCH, Software Engineering Program Commission',
      location: 'Riobamba, Ecuador',
      start: '2023',
      highlights: [
        'Developed IMAK, a web decision-support app for faculty and students during the graduation process.',
        'Used Python, KNIME, PostgreSQL and SQL Server for data processing and data-driven features.',
        'Applied basic analytics and unsupervised learning to group similar graduation and thesis projects.',
        'Evaluated system quality, information quality, user satisfaction and use.',
      ],
      tags: ['Python', 'KNIME', 'PostgreSQL', 'SQL Server'],
    },
    {
      role: 'Web Developer',
      organization: 'Municipal Government of Riobamba (GADM)',
      location: 'Riobamba, Ecuador',
      start: '2022',
      highlights: [
        'Developed a web system to support monitoring for the occupational safety and health department.',
        'Implemented features with React, Node.js, JavaScript, HTML, CSS and Docker.',
      ],
      tags: ['React', 'Node.js', 'JavaScript', 'Docker'],
    },
  ],
  education: [
    {
      degree: "Master's in Applied Artificial Intelligence",
      institution: 'Universidad Internacional del Ecuador (UIDE)',
      logo: 'uide',
      start: '2026-01',
      summary: 'In progress. Expected graduation: January 2027.',
    },
    {
      degree: 'Software Engineering',
      institution: 'Escuela Superior Politécnica de Chimborazo (ESPOCH)',
      logo: 'espoch',
      location: 'Riobamba, Ecuador',
      start: '2018',
      end: '2023',
      summary: 'Final GPA: 19.34/20. Recognized for the highest graduating average in the program.',
    },
  ],
  skills: [
    {
      name: 'Programming',
      items: [
        { name: 'Python', icon: 'python' },
        { name: 'TypeScript', icon: 'typescript' },
        { name: 'JavaScript', icon: 'javascript' },
        { name: 'SQL' },
        { name: 'Java' },
      ],
    },
    {
      name: 'Data Science & AI',
      items: [
        { name: 'Data analytics' },
        { name: 'Data-driven applications' },
        { name: 'Machine learning fundamentals' },
        { name: 'Unsupervised learning & clustering' },
      ],
    },
    {
      name: 'Data tools & databases',
      items: [
        { name: 'KNIME', icon: 'knime' },
        { name: 'PostgreSQL', icon: 'postgresql' },
        { name: 'SQL Server' },
        { name: 'MySQL', icon: 'mysql' },
        { name: 'SQLite', icon: 'sqlite' },
      ],
    },
    {
      name: 'Software development',
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
      name: 'Cloud & DevOps',
      items: [
        { name: 'Docker', icon: 'docker' },
        { name: 'Jenkins', icon: 'jenkins' },
        { name: 'GitHub Actions', icon: 'githubactions' },
        { name: 'AWS CloudWatch' },
      ],
    },
    {
      name: 'Research methods',
      items: [{ name: 'CRISP-DM' }, { name: 'PLS-SEM' }, { name: 'Scrum' }],
    },
  ],
  languages: [
    { name: 'Spanish', level: 'Native' },
    { name: 'English', level: 'C1 (advanced)' },
  ],
  certifications: [
    {
      name: 'IBM Machine Learning Professional Certificate (in progress)',
      issuer: 'Coursera',
    },
  ],
  publications: [
    {
      title: 'User-Centered Evaluation of a Decision Support System for Degree Completion Management',
      authors: ['Homero Barragán', 'Gisel Bastidas-Guacho', 'Patricio Moreno-Vallejo', 'Ivonne Rodriguez-Flores'],
      venue: 'ICAETT 2026',
      date: '2026-06-04',
      description: 'Research article based on IMAK, presented at ICAETT 2026 on June 4, 2026.',
    },
  ],
  links: {
    email: 'homero.barragan02@outlook.com',
    github: 'https://github.com/homeb01',
    linkedin: 'https://linkedin.com/in/homeb01',
  },
  personal: {
    eyebrow: 'Beyond the code',
    title: 'A bit more about me',
    lead: "What I do when I'm not at the keyboard.",
    intro: [
      "I'm Homero, I'm {age}, I live in Riobamba and I have a pet named Ulises. I've been drawn to computers since I was a kid, and that curiosity never really went away.",
      'My goal is simple: to help my community through my work. I love teaching and I love learning, and I try to do both every day.',
    ],
    interests: [
      { icon: 'book-open', title: 'Reading', text: 'I read a lot, and I enjoy every page.' },
      { icon: 'coffee', title: 'Coffee', text: 'I love it, and it keeps my days running.' },
      { icon: 'chef-hat', title: 'Cooking', text: 'In my free time, I like to cook.' },
      { icon: 'plane', title: 'Travelling', text: 'I love discovering new places.' },
      { icon: 'mountain', title: 'Long hikes', text: 'Walking for hours outside the city is my reset.' },
      { icon: 'graduation-cap', title: 'Teach & learn', text: 'I enjoy sharing what I know and learning from others.' },
    ],
    gallery: [
      {
        src: machuPicchu,
        alt: 'Homero smiling and making a peace sign in a selfie, with the Machu Picchu ruins and Huayna Picchu mountain behind him',
        caption: 'Machu Picchu, Peru',
      },
      {
        src: cerroPunay,
        alt: 'Homero in a red jacket pointing at the camera on a mountaintop at sunrise, above a sea of clouds',
        caption: 'Cerro Puñay, Ecuador',
      },
      {
        src: chimborazo,
        alt: 'Homero standing in the snow next to the Cóndor Cocha lagoon sign, at 5,100 m on Chimborazo',
        caption: 'Chimborazo, Ecuador',
      },
      {
        src: uyuni,
        alt: "Homero's silhouette reflected on the mirror-like Salar de Uyuni at sunset",
        caption: 'Salar de Uyuni, Bolivia',
      },
      {
        src: mangahurco,
        alt: 'Homero in a sun hat looking at guayacán trees in full yellow bloom',
        caption: 'Mangahurco, Ecuador',
      },
      {
        src: alausi,
        alt: 'Homero with friends after a running race in Alausí, wearing finisher medals',
        caption: 'Alausí, Ecuador',
      },
    ],
  },
};

export default profile;
