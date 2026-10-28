import { Fragment } from 'react';

// Renders the content files' **bold** markup as <strong>, everything else as plain text.
export function rich(text) {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
    i % 2 ? <strong key={i}>{part}</strong> : <Fragment key={i}>{part}</Fragment>,
  );
}

export const cx = (...classes) => classes.filter(Boolean).join(' ');
