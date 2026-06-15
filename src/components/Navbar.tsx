import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks.map(l => l.href.replace('#', ''));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' }
    );
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-4 py-3"
      >
        <div
          className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3 rounded-xl transition-all duration-500"
          style={{
            background: scrolled ? 'rgba(2, 4, 8, 0.85)' : 'transparent',
            backdropFilter: scrolled ? 'blur(20px)' : 'none',
            border: scrolled ? '1px solid rgba(0, 245, 255, 0.08)' : '1px solid transparent',
            boxShadow: scrolled ? '0 4px 30px rgba(0, 0, 0, 0.3)' : 'none',
          }}
        >
          {/* Logo */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-2 group"
          >
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 rounded-lg border border-cyan-400/40 group-hover:border-cyan-400/70 transition-colors duration-300" />
              <div className="absolute inset-1 rounded bg-gradient-to-br from-cyan-400/20 to-violet-500/20" />
              <span className="absolute inset-0 flex items-center justify-center text-cyan-400 font-bold text-sm font-mono">K</span>
            </div>
            <span className="hidden sm:block font-heading font-bold text-white text-sm tracking-wider">
              KOUSTAV.<span className="text-cyan-400">DEV</span>
            </span>
          </motion.button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i + 0.3 }}
                onClick={() => handleNavClick(link.href)}
                className="relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg group"
                style={{
                  color: activeSection === link.href.replace('#', '') ? '#00f5ff' : 'rgba(255,255,255,0.6)',
                }}
              >
                <span className="relative z-10 group-hover:text-cyan-300 transition-colors duration-300">
                  {link.label}
                </span>
                {activeSection === link.href.replace('#', '') && (
                  <motion.div
                    layoutId="active-nav"
                    className="absolute inset-0 rounded-lg"
                    style={{ background: 'rgba(0,245,255,0.06)', border: '1px solid rgba(0,245,255,0.15)' }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://github.com/Koustav-Source"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-white/60 hover:text-cyan-400 border border-white/10 hover:border-cyan-400/30 rounded-lg transition-all duration-300"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
            <motion.button
              onClick={() => handleNavClick('#contact')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary text-xs px-4 py-2"
            >
              Hire Me
            </motion.button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg border border-white/10 hover:border-cyan-400/30 transition-colors"
          >
            <motion.span
              animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 8 : 0 }}
              className="block w-5 h-0.5 bg-cyan-400 origin-center transition-all"
            />
            <motion.span
              animate={{ opacity: mobileOpen ? 0 : 1 }}
              className="block w-5 h-0.5 bg-white/60 transition-all"
            />
            <motion.span
              animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -8 : 0 }}
              className="block w-5 h-0.5 bg-violet-400 origin-center transition-all"
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-20 left-4 right-4 z-40 rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(5, 8, 20, 0.95)',
              backdropFilter: 'blur(30px)',
              border: '1px solid rgba(0, 245, 255, 0.12)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(0,245,255,0.05)',
            }}
          >
            <div className="p-4 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left px-4 py-3 rounded-xl text-white/70 hover:text-cyan-400 hover:bg-cyan-400/5 transition-all duration-300 font-medium text-sm"
                >
                  <span className="text-cyan-400/50 font-mono mr-2">0{i + 1}.</span>
                  {link.label}
                </motion.button>
              ))}
              <div className="mt-3 pt-3 border-t border-white/5 flex gap-2">
                <a
                  href="https://github.com/Koustav-Source"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/10 text-white/60 hover:text-cyan-400 hover:border-cyan-400/30 text-sm transition-all"
                >
                  GitHub
                </a>
                <button
                  onClick={() => handleNavClick('#contact')}
                  className="flex-1 btn-primary text-sm py-2.5"
                >
                  Hire Me
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
