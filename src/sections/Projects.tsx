import { useRef, useState, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const projects = [
  {
    id: 1,
    title: 'AI Weather Forecaster',
    subtitle: 'ClimateX — Real-Time Global Forecasting',
    description: 'A production-grade AI-powered weather forecasting system with real-time global weather prediction using machine learning models. Built with secure API handling and robust failure mitigation logic for reliable data pipelines.',
    longDescription: 'Engineered a sophisticated weather intelligence platform combining Python ML models with real-time atmospheric data processing. Features multi-source API aggregation with automatic failover, predictive modeling for 7-day forecasts, and a clean data visualization layer.',
    tech: ['Python', 'Machine Learning', 'REST APIs', 'Data Science', 'Weather APIs'],
    color: '#00f5ff',
    gradient: 'linear-gradient(135deg, #00f5ff15, #3b82f615)',
    borderGlow: 'rgba(0, 245, 255, 0.2)',
    icon: '🌦',
    liveLink: 'https://climatex-weather-forecast-web-app.vercel.app/',
    githubLink: 'https://github.com/Koustav-Source',
    features: ['Real-time global weather data', 'ML-powered predictions', 'Secure API handling', 'Failure mitigation logic'],
    status: 'Live',
    statusColor: '#00f5ff',
    category: 'AI / ML',
  },
  {
    id: 2,
    title: 'Resume Builder X Pro',
    subtitle: 'Dynamic AI-Assisted Resume Generator',
    description: 'A feature-rich real-time resume builder with AI-assisted content generation, live PDF export, and client-side validation. Production-deployed with responsive design and an intuitive editing experience.',
    longDescription: 'Full-featured resume creation platform with real-time preview, AI content suggestions via integrated APIs, and multi-template PDF generation. Built with React for smooth UX, complete form validation, and zero-backend architecture for instant deployment.',
    tech: ['React.js', 'JavaScript', 'HTML5', 'CSS3', 'AI Integration', 'PDF Export'],
    color: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #8b5cf615, #ec489915)',
    borderGlow: 'rgba(139, 92, 246, 0.2)',
    icon: '📄',
    liveLink: 'https://koustav-source.github.io/resume-builder-x/',
    githubLink: 'https://github.com/Koustav-Source',
    features: ['Real-time resume editing', 'AI-assisted generation', 'PDF export', 'Client-side validation'],
    status: 'Live',
    statusColor: '#8b5cf6',
    category: 'Full Stack',
  },
  {
    id: 3,
    title: 'QuizOS',
    subtitle: 'Interactive Quiz Platform',
    description: 'A production-deployed interactive quiz platform with real-time scoring, optimized performance, and responsive UI. Built for stability under load with clean deployment pipelines.',
    longDescription: 'Scalable quiz platform featuring dynamic question rendering, real-time score tracking, timer mechanics, and leaderboard functionality. Optimized bundle size and lazy loading for sub-second load times on all devices.',
    tech: ['JavaScript', 'React.js', 'CSS3', 'REST APIs', 'Performance Optimization'],
    color: '#3b82f6',
    gradient: 'linear-gradient(135deg, #3b82f615, #06b6d415)',
    borderGlow: 'rgba(59, 130, 246, 0.2)',
    icon: '🧠',
    liveLink: 'https://quiz-app-c0e9.onrender.com/',
    githubLink: 'https://github.com/Koustav-Source',
    features: ['Real-time scoring', 'Timer mechanics', 'Responsive design', 'Performance optimized'],
    status: 'Live',
    statusColor: '#3b82f6',
    category: 'Web App',
  },
  {
    id: 4,
    title: 'OmniCross',
    subtitle: 'Cross-Platform Integration System',
    description: 'A versatile cross-platform system engineered for seamless multi-service integration. Features modern architecture with clean API boundaries and robust data orchestration.',
    longDescription: 'Full-stack cross-platform application with unified API layer, real-time data synchronization across services, and scalable microservice-ready architecture. Deployed on Vercel with CI/CD integration.',
    tech: ['React.js', 'Node.js', 'JavaScript', 'APIs', 'Vercel'],
    color: '#ec4899',
    gradient: 'linear-gradient(135deg, #ec489915, #f9731615)',
    borderGlow: 'rgba(236, 72, 153, 0.2)',
    icon: '🔗',
    liveLink: 'https://omni-cross-tyz9.vercel.app/',
    githubLink: 'https://github.com/Koustav-Source',
    features: ['Cross-platform support', 'Multi-service integration', 'Real-time sync', 'Scalable architecture'],
    status: 'Live',
    statusColor: '#ec4899',
    category: 'Full Stack',
  },
  {
    id: 5,
    title: 'GeoDisaster AI',
    subtitle: 'Multi-Modal AI Disaster Detection System',
    description: 'An advanced multi-modal AI system for real-time geo-disaster detection and risk assessment. Combines satellite imagery analysis with environmental data streams for early warning capabilities.',
    longDescription: 'Cutting-edge disaster intelligence system leveraging computer vision and multi-modal AI to analyze satellite imagery, seismic data, and environmental sensors. Features real-time alert pipelines and risk visualization dashboards.',
    tech: ['Python', 'Machine Learning', 'Computer Vision', 'AI', 'GeoData APIs'],
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #f59e0b15, #ef444415)',
    borderGlow: 'rgba(245, 158, 11, 0.2)',
    icon: '🌍',
    liveLink: '#',
    githubLink: 'https://github.com/Koustav-Source',
    features: ['Satellite imagery analysis', 'Multi-modal AI processing', 'Real-time alerts', 'Risk visualization'],
    status: 'Building',
    statusColor: '#f59e0b',
    category: 'AI / ML',
  },
];

function TiltCard({ project, index, onClick }: {
  project: typeof projects[0];
  index: number;
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * 15;
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * -15;
    setTilt({ x, y });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        className="relative h-full rounded-2xl overflow-hidden transition-all duration-200"
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(${isHovered ? '10px' : '0px'})`,
          transformStyle: 'preserve-3d',
          background: 'rgba(5, 8, 20, 0.7)',
          border: `1px solid ${isHovered ? project.color + '40' : 'rgba(255,255,255,0.06)'}`,
          boxShadow: isHovered
            ? `0 25px 60px rgba(0,0,0,0.4), 0 0 40px ${project.color}15, inset 0 1px 0 rgba(255,255,255,0.05)`
            : '0 4px 20px rgba(0,0,0,0.2)',
          cursor: 'pointer',
          backdropFilter: 'blur(10px)',
        }}
      >
        {/* Top gradient accent */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${project.color}60, transparent)`,
            opacity: isHovered ? 1 : 0.3,
          }}
        />

        {/* Inner glow on hover */}
        <div
          className="absolute inset-0 transition-opacity duration-400 pointer-events-none"
          style={{
            background: project.gradient,
            opacity: isHovered ? 1 : 0,
          }}
        />

        <div className="relative z-10 p-5 sm:p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl border flex-shrink-0"
              style={{
                background: `${project.color}12`,
                borderColor: `${project.color}25`,
                transform: isHovered ? 'scale(1.08) rotate(3deg)' : 'scale(1)',
                transition: 'transform 0.3s ease',
              }}
            >
              {project.icon}
            </div>
            <div className="flex items-center gap-2 ml-3">
              <span
                className="px-2.5 py-1 rounded-full text-xs font-mono border"
                style={{
                  background: `${project.statusColor}10`,
                  borderColor: `${project.statusColor}30`,
                  color: project.statusColor,
                }}
              >
                {project.status === 'Live' && <span className="inline-block w-1.5 h-1.5 rounded-full bg-current mr-1.5 animate-pulse" />}
                {project.status}
              </span>
              <span
                className="px-2 py-1 rounded text-xs font-mono"
                style={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.3)' }}
              >
                {project.category}
              </span>
            </div>
          </div>

          {/* Title */}
          <h3
            className="font-heading font-bold text-lg sm:text-xl mb-1 transition-colors duration-300"
            style={{ color: isHovered ? project.color : '#ffffff' }}
          >
            {project.title}
          </h3>
          <p className="text-white/40 text-xs font-mono mb-3">{project.subtitle}</p>

          {/* Description */}
          <p className="text-white/60 text-sm leading-relaxed mb-4">{project.description}</p>

          {/* Features */}
          <div className="grid grid-cols-2 gap-1.5 mb-4">
            {project.features.slice(0, 4).map((feature) => (
              <div key={feature} className="flex items-center gap-1.5 text-xs text-white/50">
                <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: project.color }} />
                {feature}
              </div>
            ))}
          </div>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tech.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded text-xs font-mono border transition-all duration-300"
                style={{
                  background: `${project.color}08`,
                  borderColor: `${project.color}20`,
                  color: `${project.color}bb`,
                }}
              >
                {tech}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className="text-white/30 text-xs px-2 py-0.5 font-mono">+{project.tech.length - 4}</span>
            )}
          </div>

          {/* Bottom action bar */}
          <div
            className="flex items-center gap-3 pt-4"
            style={{ borderTop: `1px solid ${project.color}15` }}
          >
            {project.liveLink && project.liveLink !== '#' && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300"
                style={{
                  background: `${project.color}15`,
                  border: `1px solid ${project.color}35`,
                  color: project.color,
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                Live Demo
              </a>
            )}
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white/50 hover:text-white/80 border border-white/08 hover:border-white/20 transition-all duration-300"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Source
            </a>
            <div className="ml-auto">
              <button
                className="flex items-center gap-1 text-xs text-white/30 hover:text-white/60 transition-colors duration-300"
                onClick={(e) => { e.stopPropagation(); onClick(); }}
              >
                Details
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Modal for project details
function ProjectModal({ project, onClose }: { project: typeof projects[0]; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0" style={{ background: 'rgba(2,4,8,0.85)', backdropFilter: 'blur(10px)' }} />
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-lg w-full rounded-2xl overflow-hidden"
        style={{
          background: 'rgba(5, 8, 20, 0.98)',
          border: `1px solid ${project.color}30`,
          boxShadow: `0 40px 80px rgba(0,0,0,0.6), 0 0 60px ${project.color}10`,
        }}
      >
        {/* Top accent */}
        <div className="h-1" style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }} />

        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl border"
                style={{ background: `${project.color}12`, borderColor: `${project.color}30` }}
              >
                {project.icon}
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl text-white">{project.title}</h3>
                <p className="text-white/40 text-sm font-mono mt-0.5">{project.category}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/05 transition-all"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <p className="text-white/70 text-sm leading-relaxed mb-6">{project.longDescription}</p>

          {/* Features */}
          <div className="mb-6">
            <p className="text-xs font-mono text-white/30 tracking-widest mb-3">KEY FEATURES</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {project.features.map(f => (
                <div key={f} className="flex items-center gap-2 text-sm text-white/65">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: project.color }} />
                  {f}
                </div>
              ))}
            </div>
          </div>

          {/* Tech */}
          <div className="mb-6">
            <p className="text-xs font-mono text-white/30 tracking-widest mb-3">TECH STACK</p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map(t => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-lg text-xs font-mono border"
                  style={{ background: `${project.color}10`, borderColor: `${project.color}30`, color: project.color }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-3">
            {project.liveLink && project.liveLink !== '#' && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all duration-300"
                style={{
                  background: `${project.color}15`,
                  border: `1px solid ${project.color}35`,
                  color: project.color,
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                View Live
              </a>
            )}
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-white/60 hover:text-white border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              GitHub
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Full Stack', 'AI / ML', 'Web App'];
  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  return (
    <section id="projects" ref={ref} className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #020408, #030610 50%, #020408)' }} />
      <div className="absolute inset-0 grid-bg opacity-20" />

      {/* Top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(0,245,255,0.04) 0%, transparent 60%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-4"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-400/60" />
            <span className="font-mono text-cyan-400 text-sm tracking-widest">04 — PROJECTS</span>
          </div>
          <h2 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-white">
            What I've <span className="text-gradient-cyan">Built</span>
          </h2>
          <p className="mt-4 text-white/50 text-base max-w-lg">
            Production-grade projects spanning AI, full-stack web, and real-time systems — each shipped and live.
          </p>
        </motion.div>

        {/* Filter bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300"
              style={{
                background: filter === cat ? 'rgba(0,245,255,0.12)' : 'rgba(5,8,20,0.6)',
                border: `1px solid ${filter === cat ? 'rgba(0,245,255,0.35)' : 'rgba(255,255,255,0.06)'}`,
                color: filter === cat ? '#00f5ff' : 'rgba(255,255,255,0.5)',
              }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <TiltCard
                key={project.id}
                project={project}
                index={i}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Tech showcase strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="mt-12 flex items-center gap-4 overflow-x-auto pb-2 scrollbar-none"
          style={{ scrollbarWidth: 'none' }}
        >
          <span className="text-xs font-mono text-white/25 whitespace-nowrap tracking-widest flex-shrink-0">BUILT WITH</span>
          <div className="flex gap-2 flex-shrink-0">
            {['React.js', 'Python', 'Node.js', 'JavaScript', 'Machine Learning', 'Vercel', 'REST APIs', 'CSS3'].map(tech => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full text-xs font-mono whitespace-nowrap"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.3)' }}
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        {/* More projects note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-8 text-center"
        >
          <a
            href="https://github.com/Koustav-Source"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-cyan-400 transition-colors duration-300 group"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            View all projects on GitHub
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform duration-300">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </a>
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
