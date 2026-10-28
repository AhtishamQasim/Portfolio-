export const skillFilters = [
  { id: 'all', label: 'All' },
  { id: 'backend', label: 'Backend' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'data', label: 'Databases' },
  { id: 'ops', label: 'DevOps' },
  { id: 'qa', label: 'Quality' },
];

export const skillGroups = [
  {
    icon: '⚙️', title: 'Backend & APIs', cats: ['backend'],
    text: 'Secure, well-structured REST services with authentication, authorisation and clean data contracts.',
    tags: ['Java', 'Spring MVC', 'Node.js 24', 'Express 5', 'RESTful API design', 'JWT authentication', 'RBAC', 'bcrypt', 'Rate limiting', 'Multer uploads', 'Nodemailer', 'ES Modules'],
  },
  {
    icon: '🎨', title: 'Frontend & UI', cats: ['frontend'],
    text: 'Responsive dashboards and storefronts with fast forms, live filters, charts and clear state.',
    tags: ['React 19', 'JavaScript (ES2023)', 'Redux Toolkit', 'React Router', 'Material UI 7', 'React Hook Form + Zod', 'ApexCharts', 'Framer Motion', 'Vite', 'HTML5', 'CSS3', 'Ajax / JSP'],
  },
  {
    icon: '🗄️', title: 'Databases', cats: ['data'],
    text: 'Relational schema design, query tuning and safe data operations across two major RDBMS.',
    tags: ['PostgreSQL', 'Oracle Database', 'SQL', 'Sequelize ORM', 'Schema design', 'Migrations', 'Indexing & constraints', 'JSON / JSONB', 'Backups & recovery', 'Toad'],
  },
  {
    icon: '🚀', title: 'DevOps & Delivery', cats: ['ops'],
    text: 'Containerised environments, CI pipelines and production deployments I monitor and maintain.',
    tags: ['Docker', 'Docker Compose', 'Bitbucket Pipelines', 'Git', 'Vercel', 'GitHub Pages', 'Linux servers', 'AWS S3', 'Environment config', 'Health monitoring'],
  },
  {
    icon: '🧪', title: 'Quality & Testing', cats: ['qa'],
    text: 'Background in SQA: I test what I build and document what I test.',
    tags: ['Manual testing', 'Test automation', 'API testing', 'Postman', 'Integration testing', 'E2E (Chrome DevTools Protocol)', 'Cross-browser / device', 'Performance testing', 'Test plans & bug reports', 'ESLint · Prettier'],
  },
  {
    icon: '🧭', title: 'Engineering Practice', cats: ['backend', 'frontend', 'data', 'ops', 'qa'],
    text: 'The habits that keep projects on time and systems easy to change.',
    tags: ['OOP & design patterns', 'Data structures & algorithms', 'Modular architecture', 'Caching & sorting', 'Error handling', 'Requirements gathering', 'Technical documentation', 'Agile delivery', 'Eclipse EE · VS Code'],
  },
];

export const proficiency = [
  { label: 'REST API development', level: 'Expert', value: 92 },
  { label: 'SQL · PostgreSQL · Oracle', level: 'Advanced', value: 88 },
  { label: 'Java · Spring MVC', level: 'Advanced', value: 86 },
  { label: 'Node.js · Express', level: 'Advanced', value: 86 },
  { label: 'React · Redux · MUI', level: 'Advanced', value: 84 },
  { label: 'Testing & QA', level: 'Expert', value: 90 },
];
