import { cx } from '@/lib/rich';

export default function Tags({ items, small = false }) {
  return (
    <ul className={cx('tags', small && 'tags-sm')}>
      {items.map((t) => <li key={t}>{t}</li>)}
    </ul>
  );
}
