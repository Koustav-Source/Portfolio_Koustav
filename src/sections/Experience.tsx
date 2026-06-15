import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const experiences = [
  {
    id: 1,
    role: 'Founder & Lead Software Developer',
    company: 'The TechGen',
    period: '2025 — Present',
    type: 'Entrepreneurship',
    color: '#00f5ff',
    icon: '🚀',
    description: 'Built and led a student-driven software initiative, establishing engineering practices and team culture from the ground up.',
    achievements: [
      'Founded and scaled a student-led software development organization',
      'Coordinated Agile workflows and Git-based collaborative development',
      'Mentored developers in React, deployment pipelines, and version control',
      'Architected development processes enabling team velocity and code quality',
    ],
    tech: ['React.js', 'Git', 'Agile', 'Node.js', 'Deployment'],
  },
  {
    id: 2,
    role: 'Software Developer Intern',
    company: 'AI Wallah',
    period: '2024',
    type: 'Internship',
    color: '#8b5cf6',
    icon: '🤖',
    description: 'Built backend logic and automated intelligent workflows combining JavaScript with AI tooling in a production Agile environment.',
    achievements: [
      'Engineered backend logic and automated workflows using JavaScript and AI tools',
      'Optimized application performance through systematic debugging and testing',
      'Operated in Agile delivery environment with sprint-based release cycles',
      'Integrated AI-powered automation to reduce manual processing overhead',
    ],
    tech: ['JavaScript', 'AI/ML', 'Automation', 'Node.js', 'Testing'],
  },
  {
    id: 3,
    role: 'Full Stack Developer Intern',
    company: 'InAmigos Foundation',
    period: '2024',
    type: 'Internship',
    color: '#3b82f6',
    icon: '💻',
    description: 'Developed production-grade frontend interfaces and backend integrations for a mission-driven tech foundation.',
    achievements: [
      'Developed responsive frontend interfaces using React.js and modern JavaScript',
      'Integrated backend APIs with efficient data fetching and state management',
      'Improved database interaction efficiency reducing query response times',
      'Contributed to end-to-end deployment and testing pipelines',
    ],
    tech: ['React.js', 'JavaScript', 'REST APIs', 'SQL', 'Git'],
  },
  {
    id: 4,
    role: 'Content Creator & Developer',
    company: 'CollegeTips',
    period: '2024',
    type: 'Internship',
    color: '#ec4899',
    icon: '📱',
    description: 'Executed digital campaigns and participated in testing and deployment workflows, bridging content and technical execution.',
    achievements: [
      'Executed high-engagement digital campaigns across student platforms',
      'Created educational content improving audience engagement metrics',
      'Participated in QA testing and deployment workflow coordination',
      'Collaborated cross-functionally across content and engineering teams',
    ],
    tech: ['Digital Marketing', 'Content Strategy', 'QA Testing', 'Deployment'],
  },
];

function ExperienceCard({ exp, index, isActive, onClick }: {
  exp: typeof experiences[0];
  index: number;
  isActive: boolean;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="relative pl-8 sm:pl-12"
    >
      {/* Timeline dot */}
      <motion.div
        className="absolute left-0 top-6 flex items-center justify-center"
        style={{ width: '20px', height: '20px' }}
      >
        <div
          className="w-3 h-3 rounded-full border-2 transition-all duration-300"
          style={{
            borderColor: exp.color,
            background: isActive ? exp.color : 'transparent',
            boxShadow: isActive ? `0 0 12px ${exp.color}80` : 'none',
          }}
        />
      </motion.div>

      {/* Card */}
      <motion.div
        onClick={onClick}
        whileHover={{ x: 4 }}
        transition={{ duration: 0.2 }}
        className="relative p-5 sm:p-6 rounded-2xl border transition-all duration-400 cursor-pointer"
        style={{
          background: isActive ? `rgba(5, 8, 20, 0.9)` : 'rgba(5, 8, 20, 0.5)',
          borderColor: isActive ? `${exp.color}40` : 'rgba(255,255,255,0.06)',
          boxShadow: isActive ? `0 0 30px ${exp.color}15, inset 0 1px 0 rgba(255,255,255,0.05)` : 'none',
        }}
      >
        {/* Top row */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4 mb-4">
          <div
            className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-lg border"
            style={{
              background: `${exp.color}12`,
              borderColor: `${exp.color}30`,
            }}
          >
            {exp.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4">
              <div>
                <h3 className="font-heading font-bold text-white text-base sm:text-lg leading-tight">{exp.role}</h3>
                <p className="font-medium text-sm mt-0.5" style={{ color: exp.color }}>{exp.company}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="tag" style={{
                  background: `${exp.color}10`,
                  borderColor: `${exp.color}25`,
                  color: exp.color,
                  fontSize: '10px',
                }}>{exp.type}</span>
                <span className="text-white/40 text-xs font-mono whitespace-nowrap">{exp.period}</span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-white/55 text-sm leading-relaxed mb-4">{exp.description}</p>

        {/* Expand indicator */}
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {exp.tech.slice(0, 3).map(t => (
              <span key={t} className="tag-violet tag text-xs py-0.5 px-2">{t}</span>
            ))}
            {exp.tech.length > 3 && (
              <span className="text-white/30 text-xs py-0.5 px-2 font-mono">+{exp.tech.length - 3}</span>
            )}
          </div>
          <motion.div
            animate={{ rotate: isActive ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            style={{ color: exp.color }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </motion.div>
        </div>

        {/* Expanded content */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div
                className="mt-4 pt-4"
                style={{ borderTop: `1px solid ${exp.color}20` }}
              >
                <p className="text-xs font-mono text-white/30 tracking-widest mb-3">KEY ACHIEVEMENTS</p>
                <ul className="space-y-2">
                  {exp.achievements.map((achievement, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 }}
                      className="flex items-start gap-2.5 text-sm text-white/70"
                    >
                      <span className="mt-1 w-1 h-1 rounded-full flex-shrink-0" style={{ background: exp.color }} />
                      {achievement}
                    </motion.li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {exp.tech.map(t => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-xs font-mono border"
                      style={{
                        background: `${exp.color}08`,
                        borderColor: `${exp.color}25`,
                        color: `${exp.color}cc`,
                      }}
                    >{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export default function Experience() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeId, setActiveId] = useState<number | null>(1);

  return (
    <section id="experience" ref={ref} className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #020408, #030610 50%, #020408)' }} />
      <div className="absolute inset-0 grid-bg opacity-20" />

      {/* Left side glow */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-64 h-64 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(0,245,255,0.05) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-400/60" />
            <span className="font-mono text-cyan-400 text-sm tracking-widest">02 — EXPERIENCE</span>
          </div>
          <h2 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-white">
            My <span className="text-gradient-violet">Journey</span>
          </h2>
          <p className="mt-4 text-white/50 text-base max-w-lg">
            From founding a dev collective to shipping production code across AI startups and tech foundations.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline vertical line */}
          <div
            className="absolute left-0 top-0 bottom-0 w-px"
            style={{
              background: 'linear-gradient(180deg, transparent, #00f5ff40 15%, #8b5cf640 50%, #ec489940 85%, transparent)',
              marginLeft: '9px',
            }}
          />

          <div className="space-y-6">
            {experiences.map((exp, i) => (
              <ExperienceCard
                key={exp.id}
                exp={exp}
                index={i}
                isActive={activeId === exp.id}
                onClick={() => setActiveId(activeId === exp.id ? null : exp.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
