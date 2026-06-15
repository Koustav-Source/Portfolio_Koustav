import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const skillCategories = [
  {
    id: 'languages',
    label: 'Languages',
    icon: '< />',
    color: '#00f5ff',
    skills: [
      { name: 'Java', level: 88, icon: '☕' },
      { name: 'JavaScript', level: 90, icon: 'JS' },
      { name: 'Python', level: 82, icon: '🐍' },
      { name: 'HTML5', level: 95, icon: '🌐' },
      { name: 'CSS3', level: 90, icon: '🎨' },
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    icon: '⚡',
    color: '#8b5cf6',
    skills: [
      { name: 'React.js', level: 90, icon: '⚛' },
      { name: 'Responsive UI', level: 88, icon: '📱' },
      { name: 'CSS Animations', level: 85, icon: '✨' },
      { name: 'UI/UX Design', level: 80, icon: '🎯' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    icon: '🔧',
    color: '#3b82f6',
    skills: [
      { name: 'Node.js', level: 82, icon: '🟢' },
      { name: 'REST APIs', level: 85, icon: '🔌' },
      { name: 'SQL / DBMS', level: 80, icon: '🗄' },
      { name: 'AI Integration', level: 78, icon: '🤖' },
    ],
  },
  {
    id: 'tools',
    label: 'Tools & CS',
    icon: '🛠',
    color: '#ec4899',
    skills: [
      { name: 'DSA', level: 85, icon: '🧮' },
      { name: 'OOP Principles', level: 90, icon: '🏗' },
      { name: 'GitHub / Git', level: 88, icon: '🐙' },
      { name: 'Agile / Scrum', level: 82, icon: '🔄' },
    ],
  },
];

function SkillBar({ skill, color, delay, isVisible }: {
  skill: { name: string; level: number; icon: string };
  color: string;
  delay: number;
  isVisible: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-sm">{skill.icon}</span>
          <span
            className="text-sm font-medium transition-colors duration-300"
            style={{ color: hovered ? color : 'rgba(255,255,255,0.8)' }}
          >
            {skill.name}
          </span>
        </div>
        <motion.span
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: delay + 0.5 }}
          className="text-xs font-mono"
          style={{ color: hovered ? color : 'rgba(255,255,255,0.3)' }}
        >
          {skill.level}%
        </motion.span>
      </div>
      <div
        className="h-1.5 rounded-full overflow-hidden"
        style={{ background: `${color}15` }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={isVisible ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1.2, delay: delay, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full skill-bar-fill"
          style={{
            background: `linear-gradient(90deg, ${color}90, ${color})`,
            boxShadow: hovered ? `0 0 10px ${color}60` : 'none',
            transition: 'box-shadow 0.3s ease',
          }}
        />
      </div>
    </div>
  );
}

// Hexagonal skill display
function HexSkill({ skill, index, isInView }: { skill: string; index: number; isInView: boolean }) {
  const [hovered, setHovered] = useState(false);

  const allSkills: Record<string, { color: string; icon: string }> = {
    'Java': { color: '#f89820', icon: '☕' },
    'JavaScript': { color: '#f7df1e', icon: 'JS' },
    'Python': { color: '#3776ab', icon: '🐍' },
    'React.js': { color: '#61dafb', icon: '⚛' },
    'Node.js': { color: '#68a063', icon: '🟢' },
    'SQL': { color: '#00758f', icon: '🗄' },
    'HTML5': { color: '#e34f26', icon: '🌐' },
    'CSS3': { color: '#1572b6', icon: '🎨' },
    'DSA': { color: '#00f5ff', icon: '🧮' },
    'OOP': { color: '#8b5cf6', icon: '🏗' },
    'DBMS': { color: '#ec4899', icon: '💾' },
    'GitHub': { color: '#6e5494', icon: '🐙' },
  };

  const meta = allSkills[skill] || { color: '#00f5ff', icon: '•' };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
      animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
      transition={{ delay: index * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-2xl transition-all duration-300"
      style={{
        background: hovered ? `${meta.color}15` : 'rgba(5,8,20,0.6)',
        border: `1px solid ${hovered ? meta.color + '50' : 'rgba(255,255,255,0.06)'}`,
        boxShadow: hovered ? `0 0 20px ${meta.color}20, inset 0 1px 0 rgba(255,255,255,0.05)` : 'none',
        transform: hovered ? 'scale(1.08) translateY(-4px)' : 'scale(1)',
      }}
    >
      <span className="text-xl sm:text-2xl mb-1">{meta.icon}</span>
      <span
        className="text-xs font-medium text-center leading-tight px-1"
        style={{ color: hovered ? meta.color : 'rgba(255,255,255,0.6)' }}
      >
        {skill}
      </span>
      {hovered && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
          style={{ background: meta.color, boxShadow: `0 0 6px ${meta.color}` }}
        />
      )}
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [activeCategory, setActiveCategory] = useState('languages');

  const currentCategory = skillCategories.find(c => c.id === activeCategory)!;

  return (
    <section id="skills" ref={ref} className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #020408, #04080f 50%, #020408)' }} />
      <div className="absolute inset-0 grid-bg opacity-25" />

      {/* Right glow */}
      <div
        className="absolute right-0 top-1/3 w-80 h-80 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(139,92,246,0.06) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-400/60" />
            <span className="font-mono text-cyan-400 text-sm tracking-widest">03 — SKILLS</span>
          </div>
          <h2 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-white">
            Technical <span className="text-gradient-full">Arsenal</span>
          </h2>
          <p className="mt-4 text-white/50 text-base max-w-lg">
            A full-stack toolkit built through real-world projects, internships, and continuous learning.
          </p>
        </motion.div>

        {/* All Skills Grid — Visual Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <p className="text-xs font-mono text-white/30 tracking-widest mb-6">ALL TECHNOLOGIES</p>
          <div className="flex flex-wrap gap-3">
            {['Java', 'JavaScript', 'Python', 'React.js', 'Node.js', 'SQL', 'HTML5', 'CSS3', 'DSA', 'OOP', 'DBMS', 'GitHub'].map((skill, i) => (
              <HexSkill key={skill} skill={skill} index={i} isInView={isInView} />
            ))}
          </div>
        </motion.div>

        {/* Category selector + Skill bars */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Category tabs */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <p className="text-xs font-mono text-white/30 tracking-widest mb-4">CATEGORIES</p>
              <div className="flex flex-row lg:flex-col gap-2 flex-wrap">
                {skillCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 w-full sm:w-auto lg:w-full"
                    style={{
                      background: activeCategory === cat.id ? `${cat.color}12` : 'rgba(5,8,20,0.5)',
                      border: `1px solid ${activeCategory === cat.id ? cat.color + '35' : 'rgba(255,255,255,0.06)'}`,
                      boxShadow: activeCategory === cat.id ? `0 0 20px ${cat.color}10` : 'none',
                    }}
                  >
                    <span className="font-mono text-base">{cat.icon}</span>
                    <div>
                      <div
                        className="font-medium text-sm transition-colors duration-300"
                        style={{ color: activeCategory === cat.id ? cat.color : 'rgba(255,255,255,0.7)' }}
                      >
                        {cat.label}
                      </div>
                      <div className="text-xs text-white/30">{cat.skills.length} skills</div>
                    </div>
                    {activeCategory === cat.id && (
                      <motion.div
                        layoutId="active-cat"
                        className="ml-auto w-1.5 h-1.5 rounded-full"
                        style={{ background: cat.color }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Skill bars */}
          <div className="lg:col-span-2">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="p-5 sm:p-6 rounded-2xl"
              style={{
                background: 'rgba(5,8,20,0.6)',
                border: `1px solid ${currentCategory.color}20`,
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-mono"
                  style={{ background: `${currentCategory.color}15`, color: currentCategory.color }}
                >
                  {currentCategory.icon}
                </div>
                <h3 className="font-heading font-bold text-white text-lg">{currentCategory.label}</h3>
                <div
                  className="ml-auto px-2 py-0.5 rounded text-xs font-mono"
                  style={{ background: `${currentCategory.color}10`, color: currentCategory.color }}
                >
                  {currentCategory.skills.length} skills
                </div>
              </div>

              <div className="space-y-5">
                {currentCategory.skills.map((skill, i) => (
                  <SkillBar
                    key={skill.name}
                    skill={skill}
                    color={currentCategory.color}
                    delay={i * 0.1}
                    isVisible={isInView}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
