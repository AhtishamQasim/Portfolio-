// `mockup` picks the illustration from components/mockups. **text** renders as <strong>.
export const featuredProject = {
  mockup: 'store',
  kicker: 'Featured · Client project · 2025–26',
  title: 'Textile E-Commerce Platform',
  summary:
    'A complete online store for a textile retailer, built as **two applications sharing one database**. ' +
    'Staff use an **admin portal** to run the catalogue, stock, orders, coupons, shipping and payment methods. ' +
    'Shoppers use a separate **storefront** to browse, check out (as a guest or with an account) and track orders.',
  features: [
    'Product catalogue with variants, brands, categories and a **stock ledger** that records every inventory movement',
    'Two separate JWT login systems, so an admin token is rejected by the storefront API and a customer token by the admin API',
    'Public endpoints that never return cost prices, admin notes or payment credentials; customer edits limited to a fixed list of allowed fields',
    'Admin changes go live in the shop with no restart: turning off a courier removes it from checkout straight away',
    'Automated **shopper-journey test** (22 checks): register → bag → checkout → history, run in a real browser',
  ],
  tags: ['React 19', 'MUI 7', 'Redux Toolkit', 'Node.js 24', 'Express 5', 'Sequelize', 'PostgreSQL', 'JWT', 'Docker', 'Bitbucket CI'],
};

export const projects = [
  {
    mockup: 'billing',
    kicker: 'Full-time role · Production',
    title: 'Internet Billing System',
    summary: "The company's web platform for monthly internet billing and customer accounts. Staff see total, paid, pending and overdue invoices update live.",
    features: [
      'Dashboards, filters, search, invoice-count badges and plan/package selectors',
      'Secure payment verification and invoicing APIs on Oracle',
      'Faster responses through sorting, caching and consistent error handling',
      "Deployed and maintained on the company's production servers",
    ],
    tags: ['Java', 'Spring MVC', 'Oracle', 'REST', 'Ajax'],
  },
  {
    mockup: 'tickets',
    kicker: 'Full-time role · Production',
    title: 'Customer Registration & Complaint Portal',
    summary: 'A self-service portal where customers sign up, choose a package, download past invoices and raise support tickets, without phoning the office.',
    features: [
      'Registration with customer details, package selection and secure login',
      'Complaint submission with ticket status tracking',
      'New-connection requests that generate tickets automatically',
    ],
    tags: ['Java', 'PostgreSQL', 'JWT', 'JavaScript', 'HTML/CSS'],
  },
  {
    mockup: 'site',
    kicker: 'Client project · Live',
    title: 'Textile Brand Website',
    summary: 'A fast one-page showcase for a fabric house: curated collections, gallery and one-tap WhatsApp enquiries, built mobile-first and hosted on GitHub Pages.',
    features: [],
    tags: ['HTML5', 'CSS3', 'JavaScript', 'GitHub Pages', 'SEO'],
  },
  {
    mockup: 'ops',
    kicker: 'Full-time role · Ongoing',
    title: 'Production Support & Maintenance',
    summary: 'Day-to-day responsibility for keeping the billing and CRM systems online, fast and safe for the whole customer base.',
    features: [
      'Deployments, health monitoring and performance tuning',
      'Database backups, updates and recovery procedures',
      'Quick troubleshooting and bug fixes to minimise downtime',
    ],
    tags: ['Linux', 'Oracle', 'PostgreSQL', 'Monitoring'],
  },
];
