export type NavLink = { label: string; href: string }

export type SkillGroup = { title: string; items: string[] }

export type Job = {
  role: string
  company: string
  period: string
  highlights: string[]
}

export type Project = {
  title: string
  summary: string
  highlights: string[]
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
}

export type EducationItem = { institution: string; qualification: string }

export const profile = {
  name: 'John G. Kutama',
  initials: 'JK',
  title: 'Full Stack Software Engineer',
  tagline:
    'I build scalable web applications and cloud-native solutions with React, TypeScript, Python and AWS.',
  badges: ['Cloud Developer', 'AWS Certified Developer – Associate'],
  summary:
    'AWS Certified Developer Associate and Full Stack Software Engineer with experience building scalable web applications using Next.js, React, TypeScript, Python (FastAPI), AWS, PostgreSQL, and Supabase. Experienced in designing secure REST APIs, implementing authentication systems, integrating payment gateways, and deploying cloud-native applications. Passionate about building modern SaaS platforms, event management systems, and high-performance user experiences using best software engineering practices.',
  location: 'Gauteng, South Africa',
  email: 'bigjohn.aphane@gmail.com',
  github: 'https://github.com/BigJohn-dev101',
  linkedin: 'https://www.linkedin.com/in/john-kutama-862687222',
  cvUrl: '/John_Kutama_CV.pdf',
}

export const navLinks: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
]

export const skillGroups: SkillGroup[] = [
  {
    title: 'Languages & Frameworks',
    items: [
      'TypeScript',
      'JavaScript (ES6+)',
      'Python',
      'C#',
      'SQL',
      'React',
      'Next.js',
      'Node.js',
      'FastAPI',
      'Express',
      'HTML5',
      'CSS3',
      'Tailwind CSS',
      'Material UI',
    ],
  },
  {
    title: 'Cloud, Databases & DevOps',
    items: [
      'AWS',
      'Lambda',
      'API Gateway',
      'IAM',
      'S3',
      'DynamoDB',
      'SES',
      'EC2',
      'CloudWatch',
      'PostgreSQL',
      'Supabase',
      'MySQL',
      'Git',
      'GitHub',
      'GitHub Actions',
      'CI/CD',
      'Vercel',
      'Docker',
    ],
  },
  {
    title: 'Engineering & Integrations',
    items: [
      'RESTful APIs',
      'API integration',
      'Webhooks',
      'Swagger / OpenAPI',
      'JWT',
      'OAuth',
      'Google OAuth',
      'Supabase Auth',
      'Paystack',
      'Payment splits',
      'Refund workflows',
      'Responsive design',
      'Server-side rendering',
      'RBAC',
    ],
  },
]

export const jobs: Job[] = [
  {
    role: 'Junior Full Stack Developer',
    company: 'ITTHYNK Smart Solutions',
    period: 'Jan 2025 – Jan 2026',
    highlights: [
      'Developed responsive web applications using Next.js, React, TypeScript, and FastAPI.',
      'Built REST APIs and integrated third-party APIs.',
      'Designed relational database structures using PostgreSQL and Supabase.',
      'Implemented authentication and authorization systems.',
      'Improved application performance through server-side rendering and code optimization.',
      'Collaborated with cross-functional teams using Git and Agile methodologies.',
    ],
  },
  {
    role: 'Intern',
    company: 'Amazon + Yes4Youth Program',
    period: 'Jan 2025 – Dec 2025',
    highlights: [],
  },
  {
    role: 'IT Support & Sales Person',
    company: 'Jayzac Prints Internet Cafe',
    period: 'Aug 2023 – Dec 2024',
    highlights: [],
  },
  {
    role: 'IT Support & School General Assistant',
    company: 'Mabake Secondary School',
    period: 'Jul 2022 – Mar 2023',
    highlights: [],
  },
]

export const projects: Project[] = [
  {
    title: 'Ticket Wise',
    summary:
      'Event ticketing and management platform with online payments and QR code tickets.',
    // TODO: add your own real highlights for this project here.
    highlights: [],
    technologies: [
      'Next.js',
      'TypeScript',
      'Supabase',
      'PostgreSQL',
      'Paystack',
      'Tailwind CSS',
      'QR Code',
    ],
    // githubUrl: 'https://github.com/BigJohn-dev101/your-repo',
    // liveUrl: 'https://your-live-site.com',
  },
  {
    title: 'ID Verify',
    summary: 'Cloud-based identity verification platform.',
    highlights: [
      'Face registration and liveness detection using AWS Rekognition.',
      'REST APIs for user registration, identity verification and liveness checks.',
      'AWS S3 for secure image storage and DynamoDB for identity metadata.',
      'Serverless backend on AWS Lambda and API Gateway, following AWS security best practices for biometric data.',
    ],
    technologies: [
      'AWS Rekognition',
      'AWS Lambda',
      'API Gateway',
      'S3',
      'DynamoDB',
      'Python',
      'FastAPI',
    ],
  },
  {
    title: 'Power Platform Data Integration',
    summary:
      'Real-time data integration between external APIs and Microsoft Dataverse.',
    highlights: [
      'Webhook-based integrations between external APIs and Microsoft Dataverse.',
      'HTTP-triggered Power Automate workflows that sync external data into Power Apps.',
      'Automated data validation and error handling to improve reliability.',
      'API documentation and integration testing with Postman.',
    ],
    technologies: [
      'Power Automate',
      'Dataverse',
      'HTTP Webhooks',
      'REST APIs',
      'Next.js',
    ],
  },
]

export const education: EducationItem[] = [
  {
    institution: 'University of Mpumalanga',
    qualification: 'Diploma in Information & Communication Technology',
  },
  {
    institution: 'Mabake Secondary School',
    qualification: 'NSC Grade 12 – Natural Sciences',
  },
]

export const certifications: string[] = [
  'AWS Certified Developer – Associate',
  'AWS Certified Cloud Practitioner',
  'AWS Partner Technical Accredited',
  'AWS Partner Cloud Economics Accreditation',
]