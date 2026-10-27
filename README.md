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

Hand-built with plain HTML, CSS and JavaScript, plus one small serverless function for the contact form. It has no framework and no build step.

- AI-style interface: an interactive neural-network background, a live-typing code editor and deploy terminal, glowing HUD cards
- Code showcase with syntax-highlighted Java, Node.js, React and SQL samples
- Responsive on phone, tablet and desktop
- Dark and light themes that remember the visitor's choice
- A contact form that emails me and sends the visitor a confirmation, with spam and rate-limit protection
- Reduced-motion mode, a skip link, keyboard focus outlines and ARIA labels
- SEO and social-preview tags and structured data

```
index.html        page content
css/style.css     themes, layout, responsive rules
js/main.js        interactions, syntax highlighter, neural background
api/contact.js    Vercel serverless function that sends contact-form email
assets/           social preview image, favicon, CV
```

## Deploy on Vercel (free)

1. In Vercel, choose **Add New → Project** and import this GitHub repository. Keep the defaults: Framework **Other**, with no build command.
2. In the project, open **Settings → Environment Variables** and add:

   | Name | Value |
   |---|---|
   | `GMAIL_USER` | the Gmail address that sends the mail |
   | `GMAIL_APP_PASSWORD` | a Google **App password** (Google Account → Security → 2-Step Verification → App passwords) |
   | `CONTACT_TO` | *(optional)* where messages arrive; defaults to `GMAIL_USER` |

3. **Redeploy** so the variables take effect, then send yourself a test message from the live site.

Opened as a plain file, the page still works. The form then falls back to opening the visitor's email app.

## Contact

- Email: ahtisham.softengineer@gmail.com
- LinkedIn: [in/ahtishamqasim](https://www.linkedin.com/in/ahtishamqasim)
- Phone / WhatsApp: +92 323 702 6137

---
© Ahtisham Qasim. All rights reserved.
