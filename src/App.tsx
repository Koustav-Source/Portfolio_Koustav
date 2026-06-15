import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import Hero from './sections/Hero';
import About from './sections/About';
import Experience from './sections/Experience';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import Footer from './components/Footer';
import BackgroundEffects from './components/BackgroundEffects';
import BackToTop from './components/BackToTop';

// Loading screen
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);

  const phases = [
    'Initializing systems...',
    'Loading 3D engine...',
    'Compiling portfolio...',
    'Almost ready...',
  ];

  useEffect(() => {
    let current = 0;
    const timer = setInterval(() => {
      current += Math.random() * 18 + 8;
      if (current >= 100) {
        current = 100;
        clearInterval(timer);
        setTimeout(onComplete, 400);
      }
      setProgress(Math.min(current, 100));
      setPhase(Math.floor((current / 100) * (phases.length - 1)));
    }, 120);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background: '#020408' }}
    >
      {/* Grid bg */}
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(0,245,255,0.06) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10"
        >
          <div className="relative w-20 h-20">
            {/* Outer ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-2xl border border-cyan-400/20"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-1 rounded-xl border border-violet-500/20"
            />
            <div
              className="absolute inset-2 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(0,245,255,0.06)' }}
            >
              <span
                className="font-heading font-black text-3xl"
                style={{ color: '#00f5ff', textShadow: '0 0 20px rgba(0,245,255,0.5)' }}
              >
                K
              </span>
            </div>
          </div>
        </motion.div>

        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-10"
        >
          <h1 className="font-heading font-bold text-2xl text-white tracking-wider mb-1">
            KOUSTAV DEY
          </h1>
          <p className="font-mono text-white/30 text-xs tracking-widest">
            SOFTWARE ENGINEER · FULL STACK DEVELOPER
          </p>
        </motion.div>

        {/* Progress bar */}
        <div className="w-64 sm:w-80">
          <div className="flex justify-between mb-2">
            <span className="font-mono text-xs text-white/30">{phases[phase]}</span>
            <span className="font-mono text-xs text-cyan-400">{Math.round(progress)}%</span>
          </div>
          <div
            className="h-0.5 rounded-full overflow-hidden"
            style={{ background: 'rgba(0,245,255,0.1)' }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #00f5ff, #8b5cf6)',
                boxShadow: '0 0 10px rgba(0,245,255,0.5)',
              }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </div>

        {/* Bottom status */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-10 font-mono text-xs text-white/15 tracking-widest"
        >
          KOUSTAV.DEV — PORTFOLIO v2025
        </motion.p>
      </div>
    </motion.div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Custom cursor (desktop only) */}
      {!isMobile && <CustomCursor />}

      {/* Loading Screen */}
      <AnimatePresence>
        {loading && (
          <LoadingScreen onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {/* Main App */}
      <AnimatePresence>
        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative min-h-screen"
            style={{ background: '#020408' }}
          >
            {/* Background canvas particles */}
            <BackgroundEffects />

            {/* Scroll progress */}
            <ScrollProgress />

            {/* Navigation */}
            <Navbar />

            {/* Sections */}
            <main>
              <Hero />
              <About />
              <Experience />
              <Skills />
              <Projects />
              <Contact />
            </main>

            {/* Footer */}
            <Footer />

            {/* Back to top */}
            <BackToTop />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
