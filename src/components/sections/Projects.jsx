import { motion } from 'framer-motion';
import { featuredProject, projects } from '@/data/projects';
import { cx, rich } from '@/lib/rich';
import { spotlight } from '@/lib/spotlight';
import { mockups } from '@/components/mockups';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import Tags from '@/components/ui/Tags';
import Tilt from '@/components/ui/Tilt';

function ProjectBody({ project, compact }) {
  return (
    <div className="project-body">
      <span className="project-kicker">{project.kicker}</span>
      <h3>{project.title}</h3>
      <p>{rich(project.summary)}</p>
      {project.features.length > 0 && (
        <ul className={cx('feature-list', compact && 'compact')}>
          {project.features.map((f, i) => <li key={i}>{rich(f)}</li>)}
        </ul>
      )}
      <Tags items={project.tags} small />
    </div>
  );
}

export default function Projects() {
  const FeaturedMock = mockups[featuredProject.mockup];

  return (
    <section className="section container" id="projects">
      <SectionHeading
        index="05"
        eyebrow="Selected work"
        title="Projects that"
        highlight="run real businesses"
        lead="Production systems used every day by staff and customers."
      />

      <Reveal as="article" className="project featured" onPointerMove={spotlight}>
        <div className="project-visual">
          <Tilt className="tilt"><FeaturedMock /></Tilt>
        </div>
        <ProjectBody project={featuredProject} />
      </Reveal>

      <div className="projects-grid">
        {projects.map((p, i) => {
          const Mock = mockups[p.mockup];
          return (
            <Reveal as="article" key={p.title} className="project card" delay={(i % 2) * 0.1} onPointerMove={spotlight} whileHover={{ y: -6 }}>
              <div className="project-visual small">
                <motion.div
                  className="mock-pop"
                  initial={{ opacity: 0, y: 60, scale: 0.92 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
                >
                  <Mock />
                </motion.div>
              </div>
              <ProjectBody project={p} compact />
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
