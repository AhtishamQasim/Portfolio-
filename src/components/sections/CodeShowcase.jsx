import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { codeSamples } from '@/data/codeSamples';
import { cx } from '@/lib/rich';
import { spotlight } from '@/lib/spotlight';
import CodeView from '@/components/ui/CodeView';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';

export default function CodeShowcase() {
  const [activeId, setActiveId] = useState(codeSamples[0].id);
  const sample = codeSamples.find((s) => s.id === activeId);

  return (
    <section className="section container" id="code">
      <SectionHeading
        index="03"
        eyebrow="In the editor"
        title="Code that reads"
        highlight="clean and ships safe"
        lead="A few representative snippets in the patterns I use every day: secured endpoints, typed contracts and queries that stay fast as data grows."
      />

      <Reveal className="code-show">
        <div className="code-tabs" role="tablist" aria-label="Code samples">
          {codeSamples.map((s) => (
            <button
              key={s.id}
              role="tab"
              aria-selected={s.id === activeId}
              className={cx('code-tab', s.id === activeId && 'is-active')}
              onClick={() => setActiveId(s.id)}
              onPointerMove={spotlight}
            >
              <span className={`ct-ico ct-${s.id}`}>{s.badge}</span>
              <span><b>{s.title}</b><small>{s.caption}</small></span>
            </button>
          ))}
        </div>

        <div className="code-window">
          <div className="win-bar">
            <i /><i /><i />
            <span className="win-file">{sample.file}</span>
            <span className="win-lang">{sample.langLabel}</span>
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={sample.id}
              initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
              transition={{ duration: 0.28 }}
            >
              <CodeView code={sample.code} lang={sample.lang} big />
            </motion.div>
          </AnimatePresence>
          <div className="scan" />
        </div>
      </Reveal>
    </section>
  );
}
