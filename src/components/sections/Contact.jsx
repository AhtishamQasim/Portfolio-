import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { profile } from '@/data/profile';
import { openMailClient, sendContact } from '@/lib/contact';
import { cx } from '@/lib/rich';
import Reveal from '@/components/ui/Reveal';
import { useToast } from '@/components/ui/Toast';
import { LinkedInIcon, MailIcon, PhoneIcon, PinIcon, SendIcon, TickIcon } from '@/components/icons';

const SUBJECTS = ['Full-time opportunity', 'Contract / freelance project', 'Collaboration', 'Just saying hello'];
const EMPTY = { name: '', email: '', subject: SUBJECTS[0], message: '', company: '' };
const NOTE = "Your message comes straight to my inbox, and you'll get a confirmation email.";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(f) {
  const errors = {};
  if (!f.name.trim()) errors.name = true;
  if (!EMAIL_RE.test(f.email.trim())) errors.email = true;
  if (!f.message.trim()) errors.message = true;
  return errors;
}

function ContactList() {
  const toast = useToast();
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      toast('Email address copied');
    } catch {
      toast(profile.email);
    }
  };
  return (
    <ul className="contact-list">
      <li>
        <span className="c-ico"><MailIcon /></span>
        <div><small>Email</small><a href={`mailto:${profile.email}`}>{profile.email}</a></div>
        <button type="button" className="copy" onClick={copyEmail} aria-label="Copy email address">Copy</button>
      </li>
      <li>
        <span className="c-ico"><PhoneIcon /></span>
        <div><small>Phone / WhatsApp</small><a href={profile.phoneHref}>{profile.phone}</a></div>
        <a className="copy" href={profile.whatsapp} target="_blank" rel="noopener">Chat</a>
      </li>
      <li>
        <span className="c-ico"><LinkedInIcon /></span>
        <div><small>LinkedIn</small><a href={profile.linkedin} target="_blank" rel="noopener">{profile.linkedinLabel}</a></div>
      </li>
      <li>
        <span className="c-ico"><PinIcon /></span>
        <div><small>Location</small><span>{profile.location} · open to relocation</span></div>
      </li>
    </ul>
  );
}

export default function Contact() {
  const toast = useToast();
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ state: 'idle', note: NOTE }); // idle | sending | sent | error
  const [sentTo, setSentTo] = useState(null);

  const update = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((er) => ({ ...er, [key]: false }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = validate(form);
    if (Object.keys(found).length) {
      setErrors(found);
      toast('Please fill in the highlighted fields');
      document.getElementById(`cf-${Object.keys(found)[0]}`)?.focus();
      return;
    }
    const data = { ...form, name: form.name.trim(), email: form.email.trim(), message: form.message.trim() };
    setStatus({ state: 'sending', note: NOTE });
    const result = await sendContact(data);
    if (result.ok) {
      setSentTo({ name: data.name, email: data.email });
      setStatus({ state: 'sent', note: NOTE });
      setForm(EMPTY);
      toast('Message sent successfully');
    } else if (result.fallback) {
      openMailClient(data);
      setStatus({ state: 'idle', note: 'Your email app should open now with the message ready to send.' });
    } else {
      setStatus({ state: 'error', note: result.error });
    }
  };

  const field = (key) => cx('field', errors[key] && 'invalid');

  return (
    <section className="section container" id="contact">
      <Reveal className="contact">
        <div className="contact-copy">
          <span className="eyebrow">08 — Contact</span>
          <h2>Let&apos;s build something <span className="grad">great together</span></h2>
          <p>I&apos;m open to full-time roles, remote contracts and relocation opportunities. If you&apos;re hiring or have a project in mind, I&apos;d love to hear about it. I usually reply within a day.</p>
          <ContactList />
        </div>

        <div className="contact-form-wrap">
          <AnimatePresence mode="wait" initial={false}>
            {status.state === 'sent' ? (
              <motion.div
                key="done"
                className="form-done"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
              >
                <motion.div
                  className="done-ico"
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.1 }}
                >
                  <TickIcon />
                </motion.div>
                <h3>Message sent!</h3>
                <p>Thanks, {sentTo.name}. A confirmation is on its way to {sentTo.email}. I usually reply within a day.</p>
                <button type="button" className="btn btn-ghost btn-sm" onClick={() => setStatus({ state: 'idle', note: NOTE })}>
                  Send another message
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                className="contact-form"
                noValidate
                onSubmit={onSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className={field('name')}>
                  <label htmlFor="cf-name">Your name</label>
                  <input id="cf-name" type="text" autoComplete="name" placeholder="Jane Doe" value={form.name} onChange={update('name')} />
                </div>
                <div className={field('email')}>
                  <label htmlFor="cf-email">Email</label>
                  <input id="cf-email" type="email" autoComplete="email" placeholder="jane@company.com" value={form.email} onChange={update('email')} />
                </div>
                <div className="field">
                  <label htmlFor="cf-subject">Subject</label>
                  <select id="cf-subject" value={form.subject} onChange={update('subject')}>
                    {SUBJECTS.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div className={field('message')}>
                  <label htmlFor="cf-message">Message</label>
                  <textarea id="cf-message" rows={5} maxLength={5000} placeholder="Tell me about the role or project…" value={form.message} onChange={update('message')} />
                </div>
                {/* Spam trap: hidden from people, filled in by bots */}
                <div className="hp" aria-hidden="true">
                  <label htmlFor="cf-company">Company website</label>
                  <input id="cf-company" type="text" tabIndex={-1} autoComplete="off" value={form.company} onChange={update('company')} />
                </div>
                <motion.button
                  type="submit"
                  className={cx('btn btn-primary btn-lg btn-block', status.state === 'sending' && 'loading')}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={status.state === 'sending'}
                >
                  {status.state === 'sending' ? 'Sending…' : 'Send message'} <SendIcon />
                </motion.button>
                <p className={cx('form-note', status.state === 'error' && 'err')} role="status">{status.note}</p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </Reveal>
    </section>
  );
}
