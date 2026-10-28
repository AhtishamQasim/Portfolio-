// **text** renders as <strong>.
export const experience = [
  {
    role: 'Software Engineer',
    org: 'Internet Service Provider · Lahore, Pakistan',
    period: 'Oct 2024 — Present',
    current: true,
    points: [
      "Built and delivered the company's **Billing System**, the web platform that generates and manages the company's monthly internet billing.",
      'Designed and implemented **RESTful APIs in Java** on **PostgreSQL and Oracle**, with authentication, role-based access control, CRUD services and secure JSON workflows.',
      'Developed the **Customer Registration & Complaint Management Portal**: sign-up, package selection, invoice downloads, complaint tickets and status tracking.',
      'Own **production deployment, monitoring, backups and recovery** for the billing and CRM systems, keeping downtime low and data safe.',
      'Gather requirements with **HR, operations and business stakeholders** and turn them into features that streamline daily operations.',
    ],
    tags: ['Java', 'Spring MVC', 'Oracle', 'PostgreSQL', 'REST', 'RBAC', 'Ajax', 'JavaScript'],
  },
  {
    role: 'Freelance Full-Stack Developer',
    org: 'Independent · Client projects',
    period: '2025 — Present',
    points: [
      'Delivered a complete **e-commerce platform** for a textile retailer: an admin portal, a customer storefront and two Node.js APIs on a shared PostgreSQL database.',
      "Designed and published the client's **brand portfolio website**, optimised for mobile and WhatsApp enquiries.",
      'Handle everything from proposal and scoping to architecture, build, automated testing and deployment.',
    ],
    tags: ['React 19', 'Node.js', 'Express 5', 'Sequelize', 'PostgreSQL', 'Docker'],
  },
  {
    role: 'SQA Engineer',
    org: 'Software House · Islamabad, Pakistan',
    period: 'Sep 2024 — Oct 2024',
    points: [
      'Ran **manual and automated tests** for functionality, usability, security and performance across web and mobile apps.',
      'Performed **API, integration and cross-browser/device testing** to keep the user experience consistent everywhere.',
      'Wrote **test plans and detailed defect reports**, and worked with developers to get issues fixed on schedule.',
    ],
    tags: ['Postman', 'API testing', 'Automation', 'Test plans'],
  },
];

export const processSteps = [
  { n: '01', title: 'Understand', text: 'Talk to the people who will use the system. Capture the real workflow, edge cases and success criteria.' },
  { n: '02', title: 'Design', text: 'Model the data, define the API contract and sketch the UI, with security and scale planned from the start.' },
  { n: '03', title: 'Build & test', text: 'Ship in small slices with API, integration and end-to-end tests proving every critical journey.' },
  { n: '04', title: 'Deploy & support', text: 'Release to production, monitor health, back up data, and keep improving after launch.' },
];

export const education = {
  degree: 'BS Information Engineering Technology',
  school: 'National Skills University, Islamabad · Graduated June 2025',
  concentration: 'Software Development',
  gpa: 3.63,
  gpaMax: 4,
  coursework: [
    'Software Engineering', 'Data Structures & Algorithms', 'Database Management Systems', 'Object-Oriented Programming',
    'Software Quality Assurance', 'Operating Systems', 'Artificial Intelligence', 'Cloud Computing', 'Big Data Analytics',
  ],
};
