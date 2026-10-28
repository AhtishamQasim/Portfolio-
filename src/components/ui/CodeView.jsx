import { useMemo } from 'react';
import { highlight } from '@/lib/highlight';
import { cx } from '@/lib/rich';

/** Line-numbered, syntax-highlighted code. `lines` fixes the gutter height (e.g. while typing). */
export default function CodeView({ code, lang, lines, big = false, caret = false }) {
  const html = useMemo(() => highlight(code, lang), [code, lang]);
  const count = lines ?? code.split('\n').length;
  return (
    <div className={cx('editor-body', big && 'big')}>
      <ol className="gutter" aria-hidden="true">
        {Array.from({ length: count }, (_, i) => <li key={i}>{i + 1}</li>)}
      </ol>
      <pre className="code">
        {/* Highlighter output is built from our own constants and fully escaped. */}
        <code dangerouslySetInnerHTML={{ __html: html }} />
        {caret && <span className="caret caret-code" />}
      </pre>
    </div>
  );
}
