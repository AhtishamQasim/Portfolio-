import { profile } from '@/data/profile';

/**
 * Sends the contact form to the Vercel function at /api/contact.
 * Resolves to { ok: true } | { ok: false, fallback: true } | { ok: false, error }.
 * `fallback` means the site is running without the API (local dev, plain static hosting).
 */
export async function sendContact(data) {
  if (location.protocol === 'file:') return { ok: false, fallback: true };
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) return { ok: true };
    if (res.status === 404 || res.status === 405) return { ok: false, fallback: true };
    const body = await res.json().catch(() => ({}));
    return { ok: false, error: body.error || `Could not send right now. Please email ${profile.email}.` };
  } catch {
    return { ok: false, error: `Network problem. Please try again or email ${profile.email}.` };
  }
}

export function openMailClient({ name, email, subject, message }) {
  const body = `${message}\n\n— ${name} (${email})`;
  window.location.href =
    `mailto:${profile.email}?subject=${encodeURIComponent(`${subject} — from ${name}`)}&body=${encodeURIComponent(body)}`;
}
