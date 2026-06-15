import { useEffect, useRef, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';

const HeroScene = lazy(() => import('../three/HeroScene'));

const roles = ['Software Engineer', 'Full Stack Developer', 'DSA Enthusiast', 'AI Systems Builder'];

function AnimatedRole() {
  const roleRef = useRef<HTMLSpanElement>(null);
  const indexRef = useRef(0);
  const charRef = useRef(0);
  const deletingRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const type = () => {
      const current = roles[indexRef.current];
      if (!deletingRef.current) {
        charRef.current++;
        if (roleRef.current) roleRef.current.textContent = current.slice(0, charRef.current);
        if (charRef.current === current.length) {
          timeoutRef.current = setTimeout(() => { deletingRef.current = true; type(); }, 2000);
          return;
        }
      } else {
        charRef.current--;
        if (roleRef.current) roleRef.current.textContent = current.slice(0, charRef.current);
        if (charRef.current === 0) {
          deletingRef.current = false;
          indexRef.current = (indexRef.current + 1) % roles.length;
        }
      }
      timeoutRef.current = setTimeout(type, deletingRef.current ? 40 : 80);
    };
    timeoutRef.current = setTimeout(type, 1000);
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, []);

  return (
    <span
      ref={roleRef}
      className="text-gradient-cyan glow-text-cyan"
      style={{ borderRight: '2px solid #00f5ff', paddingRight: '2px', animation: 'blink 1s step-end infinite' }}
    />
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #020408 0%, #04080f 100%)' }}
    >
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-60" />

      {/* Radial gradients */}
      <div className="absolute inset-0 radial-gradient-bg" />

      {/* 3D Canvas - Full screen background */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </div>

      {/* Scan line effect */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'linear-gradient(transparent 50%, rgba(0,0,0,0.02) 50%)',
          backgroundSize: '100% 4px',
        }}
      />

      {/* Floating social pills */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1.8 }}
        className="fixed right-6 top-1/2 -translate-y-1/2 z-20 hidden xl:flex flex-col gap-3"
      >
        {[
          { href: 'https://github.com/Koustav-Source', label: 'GH', color: '#6e5494' },
          { href: 'https://www.linkedin.com/in/koustav-dey-3a13bb310/', label: 'IN', color: '#0077b5' },
          { href: 'mailto:k2006.royals@gmail.com', label: 'EM', color: '#00f5ff' },
        ].map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.label !== 'EM' ? '_blank' : undefined}
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-mono font-bold transition-all duration-300 hover:scale-110 hover:-translate-x-1"
            style={{
              background: `${link.color}15`,
              border: `1px solid ${link.color}30`,
              color: link.color,
            }}
          >
            {link.label}
          </a>
        ))}
        <div className="w-px h-16 mx-auto" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.15), transparent)' }} />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-6xl mx-auto">
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 mb-8"
        >
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono tracking-widest"
            style={{
              background: 'rgba(0, 245, 255, 0.06)',
              border: '1px solid rgba(0, 245, 255, 0.2)',
              color: '#00f5ff',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            AVAILABLE FOR OPPORTUNITIES
          </div>
        </motion.div>

        {/* Main Name */}
        <div className="overflow-hidden mb-4">
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading font-bold tracking-tight leading-none"
            style={{
              fontSize: 'clamp(3rem, 10vw, 8rem)',
              color: '#ffffff',
              textShadow: '0 0 80px rgba(0,245,255,0.15)',
            }}
          >
            Koustav
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-6">
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading font-bold tracking-tight leading-none text-gradient-full"
            style={{
              fontSize: 'clamp(3rem, 10vw, 8rem)',
            }}
          >
            Dey
          </motion.h1>
        </div>

        {/* Role Typewriter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <div
            className="h-px flex-1 max-w-16 sm:max-w-24"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(0,245,255,0.4))' }}
          />
          <span className="font-mono text-base sm:text-lg md:text-xl text-white/80 min-h-[1.75em] flex items-center">
            <AnimatedRole />
          </span>
          <div
            className="h-px flex-1 max-w-16 sm:max-w-24"
            style={{ background: 'linear-gradient(90deg, rgba(0,245,255,0.4), transparent)' }}
          />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-white/50 text-sm sm:text-base max-w-xl mx-auto mb-10 leading-relaxed"
        >
          CS undergraduate at Sister Nivedita University · Specializing in full-stack systems,
          Java engineering & AI-powered applications · GPA 8.79
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="btn-primary text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-3.5 w-full sm:w-auto"
          >
            <span className="flex items-center gap-2 justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              View Projects
            </span>
          </motion.button>
          <motion.button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="btn-secondary text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-3.5 w-full sm:w-auto"
          >
            <span className="flex items-center gap-2 justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              Contact Me
            </span>
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="flex items-center justify-center gap-6 sm:gap-10 mt-14"
        >
          {[
            { value: '8.79', label: 'GPA', color: '#00f5ff' },
            { value: '4+', label: 'Roles', color: '#8b5cf6' },
            { value: '5+', label: 'Projects', color: '#3b82f6' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="font-heading font-bold text-2xl sm:text-3xl"
                style={{ color: stat.color, textShadow: `0 0 20px ${stat.color}50` }}
              >
                {stat.value}
              </div>
              <div className="text-white/40 text-xs font-mono tracking-widest mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/30 text-xs font-mono tracking-widest">SCROLL</span>
        <div
          className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-1 rounded-full bg-cyan-400"
          />
        </div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(transparent, #020408)' }}
      />

      <style>{`
        @keyframes blink {
          0%, 100% { border-color: #00f5ff; }
          50% { border-color: transparent; }
        }
      `}</style>
    </section>
  );
}
