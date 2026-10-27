// Vercel serverless function: POST /api/contact
// Sends the visitor's message to Ahtisham's inbox and a short confirmation to the visitor.
//
// Environment variables (Vercel → Project → Settings → Environment Variables):
//   GMAIL_USER          the Gmail address that sends the mail
//   GMAIL_APP_PASSWORD  a 16-character Google "App password" (not the normal password)
//   CONTACT_TO          optional; where messages are delivered (defaults to GMAIL_USER)

import nodemailer from 'nodemailer';

const SUBJECTS = new Set([
  'Full-time opportunity',
  'Contract / freelance project',
  'Collaboration',
  'Just saying hello',
]);
const EMAIL_RE = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]{2,}$/;
// Only a plain name is echoed back in the confirmation, so the form can't be used to mail arbitrary text.
const SAFE_NAME_RE = /^[\p{L}\p{M} .'-]{1,60}$/u;

// Best-effort limit per warm instance: 5 messages per IP per 10 minutes.
const WINDOW_MS = 10 * 60 * 1000;
const hits = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

const escapeHtml = (s) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  try {
    return JSON.parse(req.body || '{}');
  } catch {
    return {};
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = readBody(req);
  const name = String(body.name || '').trim();
  const email = String(body.email || '').trim();
  const subject = SUBJECTS.has(body.subject) ? body.subject : 'Portfolio enquiry';
  const message = String(body.message || '').trim();

  // Honeypot: real visitors never see this field. Pretend success so bots learn nothing.
  if (body.company) return res.status(200).json({ ok: true });

  if (!name || name.length > 100) return res.status(400).json({ error: 'Please enter your name (up to 100 characters).' });
  if (!EMAIL_RE.test(email) || email.length > 200) return res.status(400).json({ error: 'Please enter a valid email address.' });
  if (message.length < 10 || message.length > 5000) return res.status(400).json({ error: 'Please write a message between 10 and 5,000 characters.' });

  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  if (rateLimited(ip)) return res.status(429).json({ error: 'Too many messages. Please try again in a few minutes.' });

  const { GMAIL_USER, GMAIL_APP_PASSWORD, CONTACT_TO } = process.env;
  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
    console.error('contact: GMAIL_USER / GMAIL_APP_PASSWORD are not set');
    return res.status(500).json({ error: 'Email is not set up yet. Please email ahtisham.softengineer@gmail.com directly.' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
  });

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <${GMAIL_USER}>`,
      to: CONTACT_TO || GMAIL_USER,
      replyTo: { name, address: email },
      subject: `[Portfolio] ${subject} — ${name}`,
      text: `${message}\n\n— ${name} <${email}>\nTopic: ${subject}`,
      html:
        `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#111">` +
        `<p style="margin:0 0 4px;color:#666">New message from your portfolio</p>` +
        `<h2 style="margin:0 0 16px">${escapeHtml(subject)}</h2>` +
        `<p style="white-space:pre-wrap">${escapeHtml(message)}</p>` +
        `<hr style="border:0;border-top:1px solid #ddd;margin:20px 0">` +
        `<p style="margin:0"><b>${escapeHtml(name)}</b> &lt;${escapeHtml(email)}&gt;</p>` +
        `<p style="margin:4px 0 0;color:#666">Press Reply to answer them directly.</p></div>`,
    });
  } catch (err) {
    console.error('contact: delivery failed', err);
    return res.status(502).json({ error: 'Could not send right now. Please email ahtisham.softengineer@gmail.com.' });
  }

  // The confirmation is a courtesy; the message is already delivered if this fails.
  try {
    const greeting = SAFE_NAME_RE.test(name) ? name : 'there';
    await transporter.sendMail({
      from: `"Ahtisham Qasim" <${GMAIL_USER}>`,
      to: email,
      subject: 'Thanks for getting in touch — Ahtisham Qasim',
      text:
        `Hi ${greeting},\n\nThank you for your message about "${subject}". ` +
        `It reached me safely and I'll reply within a day.\n\nBest regards,\nAhtisham Qasim\nFull-Stack Software Engineer`,
      html:
        `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#111">` +
        `<p>Hi ${escapeHtml(greeting)},</p>` +
        `<p>Thank you for your message about <b>${escapeHtml(subject)}</b>. It reached me safely and I'll reply within a day.</p>` +
        `<p>Best regards,<br><b>Ahtisham Qasim</b><br><span style="color:#666">Full-Stack Software Engineer</span></p></div>`,
    });
  } catch (err) {
    console.error('contact: confirmation failed', err);
  }

  return res.status(200).json({ ok: true });
}
