# Ahtisham Qasim — Portfolio

Personal portfolio of **Ahtisham Qasim**, a full-stack software engineer who builds production web platforms with Java, Spring, Node.js, React, PostgreSQL and Oracle.

**Live site:** https://ahtishamqasim.vercel.app

## About me

I design, build, test and deploy complete web systems: REST APIs with JWT authentication and role-based access, React dashboards, and relational databases. I started in software quality assurance, so every feature I ship is tested the way a real user would use it.

- **Backend:** Java, Spring MVC, Node.js, Express, REST APIs, JWT, RBAC
- **Frontend:** React, Redux Toolkit, Material UI, JavaScript, HTML5, CSS3
- **Databases:** PostgreSQL, Oracle, Sequelize ORM, SQL
- **DevOps:** Docker, Git, CI pipelines, Linux server deployment
- **Testing:** API, integration, end-to-end and performance testing, Postman

## Featured work

| Project | What it does | Stack |
|---|---|---|
| Textile E-Commerce Platform | Admin portal and customer storefront on one database: catalogue, stock ledger, orders, coupons, guest checkout, order tracking | React, Node.js, Express, PostgreSQL, Docker |
| Internet Billing System | Monthly billing for an internet service provider, with live paid, pending and overdue dashboards and payment verification | Java, Spring MVC, Oracle |
| Customer & Complaint Portal | Self-service sign-up, invoice downloads, complaint tickets and status tracking | Java, PostgreSQL, JavaScript |
| Textile Brand Website | Mobile-first showcase site with WhatsApp enquiries | HTML, CSS, JavaScript |

## About this site

Built with **React 19**, **Vite 8** and **Framer Motion**, plus one small serverless function for the contact form.

- AI-style interface: an interactive neural-network background, a live-typing code editor and deploy terminal, glowing HUD cards
- Framer Motion animations: staggered hero entrance, scroll reveals, counters and skill bars that animate in, a sliding nav indicator, code-tab transitions, 3D tilt and magnetic buttons
- Code showcase with syntax-highlighted Java, Node.js, React and SQL samples
- Responsive on phone, tablet and desktop, with dark and light themes
- A contact form that emails me and sends the visitor a confirmation, with spam and rate-limit protection
- Respects "reduce motion", with a skip link, keyboard focus outlines and ARIA labels
- SEO and social-preview tags and structured data

### Project structure

```
api/contact.js          Vercel serverless function (sends the contact-form email)
public/                 favicon, social preview image, CV
src/
  data/                 all site content: profile, about, skills, experience, projects, code samples
  components/
    layout/             Navbar, Footer, Background, ScrollProgress
    sections/           Hero, About, Skills, CodeShowcase, Experience, Projects, Process, Education, Contact
    hero/               HeroStage (typing editor + deploy terminal)
    mockups/            dashboard illustrations used by the project cards
    effects/            NeuralCanvas
    ui/                 Reveal, SectionHeading, Counter, CodeView, Tilt, Magnetic, Toast, Tags
    icons/              inline SVG icons
  hooks/                useTheme, useTypewriter, useActiveSection
  lib/                  syntax highlighter, contact client, helpers
  styles/               tokens, base, layout, sections, responsive
```

To change any text, edit the files in `src/data/`. The components don't need to change.

### Run locally

```
npm install
npm run dev      # http://localhost:5173 (the form falls back to your email app here)
npm run build    # production build in dist/
```

## Deploy on Vercel (free)

1. In Vercel, choose **Add New → Project** and import this GitHub repository. `vercel.json` sets the Vite build and the `dist` output folder.
2. In the project, open **Settings → Environment Variables** and add:

   | Name | Value |
   |---|---|
   | `GMAIL_USER` | the Gmail address that sends the mail |
   | `GMAIL_APP_PASSWORD` | a Google **App password** (Google Account → Security → 2-Step Verification → App passwords) |
   | `CONTACT_TO` | *(optional)* where messages arrive; defaults to `GMAIL_USER` |

3. **Redeploy** so the variables take effect, then send yourself a test message from the live site.

## Contact

- Email: ahtisham.softengineer@gmail.com
- LinkedIn: [in/ahtishamqasim](https://www.linkedin.com/in/ahtishamqasim)
- Phone / WhatsApp: +92 323 702 6137

---
© Ahtisham Qasim. All rights reserved.
