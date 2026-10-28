import { MotionConfig } from 'framer-motion';
import { RESPECT_REDUCED_MOTION } from '@/lib/motion';
import { useTheme } from '@/hooks/useTheme';
import Background from '@/components/layout/Background';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import ScrollProgress from '@/components/layout/ScrollProgress';
import Cursor from '@/components/effects/Cursor';
import Preloader from '@/components/effects/Preloader';
import { ToastProvider } from '@/components/ui/Toast';
import About from '@/components/sections/About';
import CodeShowcase from '@/components/sections/CodeShowcase';
import Contact from '@/components/sections/Contact';
import Education from '@/components/sections/Education';
import Experience from '@/components/sections/Experience';
import Hero from '@/components/sections/Hero';
import Marquee from '@/components/sections/Marquee';
import Process from '@/components/sections/Process';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';

export default function App() {
  const { theme, toggle } = useTheme();

  return (
    // Animations stay on even when the OS asks for reduced motion (see lib/motion.js).
    <MotionConfig reducedMotion={RESPECT_REDUCED_MOTION ? 'user' : 'never'}>
      <ToastProvider>
        <Preloader />
        <Cursor />
        <a className="skip" href="#main">Skip to content</a>
        <ScrollProgress />
        <Background theme={theme} />
        <Navbar theme={theme} onToggleTheme={toggle} />
        <main id="main">
          <Hero />
          <Marquee />
          <About />
          <Skills />
          <CodeShowcase />
          <Experience />
          <Projects />
          <Process />
          <Education />
          <Contact />
        </main>
        <Footer />
      </ToastProvider>
    </MotionConfig>
  );
}
