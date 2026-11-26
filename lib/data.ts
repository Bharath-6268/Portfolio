/**
 * Central content source for the portfolio.
 * Edit values here to update the site — no component changes needed.
 */

export const personal = {
  name: 'Bharath Taninki',
  firstName: 'Bharath',
  lastName: 'Taninki',
  heroHeadline: "HEY, I'M BHARATH.",
  heroSub: 'Building ideas into digital experiences.',
  role: 'Computer Science Student | Developer | Problem Solver',
  tagline:
    'B.Tech Computer Science & Engineering undergraduate driven by curiosity for building software and solving hard problems. Focused on clean code, fundamentals, and shipping things that work.',
  intro:
    'Computer Science and Engineering undergraduate obsessed with turning ideas into working software and sharpening problem-solving through competitive programming.',
  email: 'bharathtaninki@gmail.com',
  location: 'India',
  degree: 'B.Tech Computer Science and Engineering',
  cgpa: '8.13',
  graduationYear: '2028',
  // Profile photo — file lives in /public/Photo.png
  profileImage: '/Photo.png',
  // Path to your resume PDF in the /public folder
  resumePath: '/resume.pdf',
};

export const socials = {
  github: 'https://github.com/Bharath-6268',
  linkedin: 'https://www.linkedin.com/in/bharath-taninki-533348314',
  codechef: 'https://www.codechef.com/users/free_turkey_32',
  // Replace with your actual LeetCode profile URL
  leetcode: 'https://leetcode.com/REPLACE_ME',
};

export const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export const about = {
  heading: 'About Me',
  eyebrow: '01 — About',
  paragraphs: [
    "I'm a Computer Science and Engineering undergraduate with a strong interest in software development, programming, and emerging technology. I enjoy turning ideas into working software and sharpening my problem-solving skills through competitive programming.",
    'My focus is on building a solid foundation in core computer science — data structures, algorithms, and systems — while gaining hands-on experience building real projects with modern tools.',
  ],
  highlights: [
    { label: 'Degree', value: 'B.Tech CSE' },
    { label: 'CGPA', value: '8.13' },
    { label: 'Graduation', value: '2028' },
  ],
  stats: [
    { value: '8.13', label: 'CGPA' },
    { value: '2028', label: 'Graduating' },
    { value: '5+', label: 'Core CS Areas' },
  ],
  identityLabels: ['Developer', 'Problem Solver', 'CS Undergrad', 'Builder'],
};

export type SkillCategory = {
  title: string;
  icon: string;
  blurb: string;
  skills: string[];
};

/**
 * Editable placeholders. Replace the skill lists with your actual stack.
 * Only list technologies you are comfortable discussing in an interview.
 */
export const skills: SkillCategory[] = [
  {
    title: 'Programming Languages',
    icon: 'Code2',
    blurb: 'Languages I write day to day.',
    skills: ['C', 'C++', 'Java', 'Python', 'JavaScript', 'TypeScript'],
  },
  {
    title: 'Web Development',
    icon: 'Globe',
    blurb: 'Building modern web experiences.',
    skills: ['HTML', 'CSS', 'React', 'Next.js', 'Tailwind CSS', 'Node.js'],
  },
  {
    title: 'Databases',
    icon: 'Database',
    blurb: 'Storing and querying data.',
    skills: ['SQL', 'MySQL', 'PostgreSQL', 'MongoDB'],
  },
  {
    title: 'Developer Tools',
    icon: 'Wrench',
    blurb: 'Tools that keep me shipping.',
    skills: ['Git', 'GitHub', 'VS Code', 'Linux', 'Postman', 'Docker'],
  },
  {
    title: 'CS Fundamentals',
    icon: 'Cpu',
    blurb: 'The foundation under everything.',
    skills: [
      'Data Structures',
      'Algorithms',
      'OOP',
      'DBMS',
      'Operating Systems',
      'Computer Networks',
    ],
  },
];

export type Project = {
  title: string;
  description: string;
  technologies: string[];
  repoUrl: string;
  demoUrl: string;
};

/**
 * Placeholder projects. Replace with your real work.
 * Leave the array empty ([]) to hide the Projects section.
 */
export const projects: Project[] = [
  {
    title: 'Project Title One',
    description:
      'A short description of what this project does and the problem it solves. Replace this with your real project summary.',
    technologies: ['React', 'Node.js', 'MongoDB'],
    repoUrl: 'https://github.com/Bharath-6268',
    demoUrl: '',
  },
  {
    title: 'Project Title Two',
    description:
      'A short description of what this project does and the problem it solves. Replace this with your real project summary.',
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL'],
    repoUrl: 'https://github.com/Bharath-6268',
    demoUrl: '',
  },
  {
    title: 'Project Title Three',
    description:
      'A short description of what this project does and the problem it solves. Replace this with your real project summary.',
    technologies: ['Python', 'FastAPI'],
    repoUrl: 'https://github.com/Bharath-6268',
    demoUrl: '',
  },
];

export type Experience = {
  role: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
};

/**
 * Placeholder experiences (internships, responsibilities).
 * Leave the array empty ([]) to hide the Experience section.
 */
export const experiences: Experience[] = [
  {
    role: 'Role Title',
    company: 'Company / Organization',
    period: 'Month YYYY — Month YYYY',
    description: 'Brief description of your responsibilities.',
    achievements: ['Describe a measurable accomplishment.'],
  },
];

export type Education = {
  degree: string;
  institution: string;
  period: string;
  details: { label: string; value: string }[];
  description?: string;
};

export const education: Education[] = [
  {
    degree: 'B.Tech — Computer Science and Engineering',
    institution: 'Your College / University',
    period: '2024 — 2028',
    details: [
      { label: 'CGPA', value: '8.13' },
      { label: 'Graduation', value: '2028' },
    ],
    description:
      'Pursuing undergraduate studies in Computer Science and Engineering with a focus on software development and core CS fundamentals.',
  },
];

export type CodingProfile = {
  name: string;
  handle: string;
  url: string;
  icon: 'github' | 'linkedin' | 'codechef' | 'leetcode';
};

export const codingProfiles: CodingProfile[] = [
  {
    name: 'GitHub',
    handle: 'Bharath-6268',
    url: socials.github,
    icon: 'github',
  },
  {
    name: 'LinkedIn',
    handle: 'bharath-taninki',
    url: socials.linkedin,
    icon: 'linkedin',
  },
  {
    name: 'CodeChef',
    handle: 'free_turkey_32',
    url: socials.codechef,
    icon: 'codechef',
  },
  {
    name: 'LeetCode',
    handle: 'your-handle',
    url: socials.leetcode,
    icon: 'leetcode',
  },
];

export type Achievement = {
  title: string;
  issuer: string;
  date: string;
  description: string;
  type: 'Certification' | 'Hackathon' | 'Achievement' | 'Workshop';
  link?: string;
};

/**
 * Placeholder achievements. Replace with real ones.
 * Leave the array empty ([]) to hide the Achievements section.
 */
export const achievements: Achievement[] = [
  {
    title: 'Certification Title',
    issuer: 'Issuing Organization',
    date: 'Month YYYY',
    description: 'What this certification covers and what you learned.',
    type: 'Certification',
  },
  {
    title: 'Hackathon / Achievement Title',
    issuer: 'Event / Platform',
    date: 'Month YYYY',
    description: 'What you built or achieved and the result.',
    type: 'Achievement',
  },
];
