import { useRef, Suspense } from 'react';
import { motion, useInView } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

function SkillSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current || !outerRef.current) return;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.4;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    outerRef.current.rotation.y = -state.clock.elapsedTime * 0.3;
    outerRef.current.rotation.z = state.clock.elapsedTime * 0.15;
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.8}>
      <group>
        {/* Outer ring */}
        <mesh ref={outerRef}>
          <torusGeometry args={[1.8, 0.02, 8, 60]} />
          <meshBasicMaterial color="#00f5ff" transparent opacity={0.4} />
        </mesh>
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[1.8, 0.015, 8, 60]} />
          <meshBasicMaterial color="#8b5cf6" transparent opacity={0.3} />
        </mesh>
        {/* Main sphere */}
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1.2, 3]} />
          <MeshDistortMaterial
            color="#050f20"
            emissive="#1a0533"
            emissiveIntensity={0.3}
            distort={0.4}
            speed={1.5}
            roughness={0.1}
            metalness={0.8}
            wireframe={false}
            transparent
            opacity={0.9}
          />
        </mesh>
        {/* Glow core */}
        <mesh>
          <sphereGeometry args={[0.6, 16, 16]} />
          <meshBasicMaterial color="#8b5cf6" transparent opacity={0.15} />
        </mesh>
        {/* Point lights */}
        <pointLight color="#00f5ff" intensity={1.5} distance={5} />
        <pointLight position={[2, 2, 2]} color="#8b5cf6" intensity={0.8} distance={5} />
      </group>
    </Float>
  );
}

const techStack = [
  { name: 'React.js', icon: '⚛', color: '#61dafb' },
  { name: 'Node.js', icon: '🟢', color: '#68a063' },
  { name: 'Java', icon: '☕', color: '#f89820' },
  { name: 'Python', icon: '🐍', color: '#3776ab' },
  { name: 'JavaScript', icon: 'JS', color: '#f7df1e' },
  { name: 'SQL', icon: '🗄', color: '#00758f' },
];

const highlights = [
  { icon: '🎓', label: 'Education', value: 'B.Tech CSE — Sister Nivedita University', sub: '2024–2028 · GPA 8.79' },
  { icon: '📍', label: 'Location', value: 'Kolkata, West Bengal, India', sub: 'B/22, Rabindra Pally, Baghajatin' },
  { icon: '💡', label: 'Focus', value: 'Full Stack · AI Systems · DSA', sub: 'Scalable architectures & performance' },
  { icon: '🚀', label: 'Status', value: 'Open to Opportunities', sub: 'Internships & Full-time roles' },
];

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" ref={ref} className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #020408 0%, #030610 50%, #020408 100%)' }} />
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(139,92,246,0.05) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 sm:mb-20"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-400/60" />
            <span className="font-mono text-cyan-400 text-sm tracking-widest">01 — ABOUT</span>
          </div>
          <h2 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-white">
            Who I <span className="text-gradient-cyan">Am</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Bio paragraphs */}
            <div className="space-y-5">
              <p className="text-white/75 text-base sm:text-lg leading-relaxed">
                I'm <span className="text-white font-semibold">Koustav Dey</span>, a Computer Science
                undergraduate at <span className="text-cyan-400">Sister Nivedita University</span> (2024–2028),
                specializing in full-stack web development, Java engineering, and AI-powered system design.
              </p>
              <p className="text-white/60 text-sm sm:text-base leading-relaxed">
                My technical focus spans scalable React architectures, Node.js backend systems, and
                machine learning integrations. I'm deeply invested in Data Structures & Algorithms,
                system design patterns, and performance optimization — building solutions that scale
                both technically and in real-world impact.
              </p>
              <p className="text-white/60 text-sm sm:text-base leading-relaxed">
                As founder of <span className="text-violet-400 font-medium">The TechGen</span>, I've led
                student-driven software initiatives and mentored developers through modern engineering workflows.
                I approach every project with production-grade thinking — clean architecture, solid testing,
                and deployment-ready code.
              </p>
            </div>

            {/* Tech stack chips */}
            <div>
              <p className="text-xs font-mono text-white/30 tracking-widest mb-3">TECH I WORK WITH</p>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech, i) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.4 + i * 0.07 }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-300 hover:scale-105"
                    style={{
                      background: `${tech.color}10`,
                      borderColor: `${tech.color}30`,
                      color: tech.color,
                    }}
                  >
                    <span className="text-sm">{tech.icon}</span>
                    {tech.name}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Coursework */}
            <div
              className="p-4 rounded-xl"
              style={{ background: 'rgba(0,245,255,0.03)', border: '1px solid rgba(0,245,255,0.08)' }}
            >
              <p className="text-xs font-mono text-cyan-400/60 tracking-widest mb-3">RELEVANT COURSEWORK</p>
              <div className="flex flex-wrap gap-2">
                {['Data Structures', 'Algorithms', 'OOP', 'DBMS', 'Operating Systems', 'Software Engineering'].map(course => (
                  <span key={course} className="tag text-xs">{course}</span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — 3D + Info cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="space-y-6"
          >
            {/* 3D Canvas */}
            <div
              className="relative h-[260px] sm:h-[300px] rounded-2xl overflow-hidden"
              style={{
                background: 'rgba(5, 8, 20, 0.6)',
                border: '1px solid rgba(139, 92, 246, 0.2)',
                boxShadow: '0 0 40px rgba(139,92,246,0.08)',
              }}
            >
              <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 1.5]}>
                <ambientLight intensity={0.1} />
                <Suspense fallback={null}>
                  <SkillSphere />
                </Suspense>
              </Canvas>
              {/* Overlay label */}
              <div className="absolute bottom-4 left-4 right-4">
                <div
                  className="flex items-center gap-2 px-3 py-2 rounded-lg"
                  style={{ background: 'rgba(5,8,20,0.8)', border: '1px solid rgba(139,92,246,0.2)' }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                  <span className="text-xs font-mono text-white/50">Interactive 3D · Drag to explore</span>
                </div>
              </div>
            </div>

            {/* Info grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {highlights.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="glass-panel glass-panel-hover p-4"
                >
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <div className="text-xs font-mono text-cyan-400/60 tracking-widest mb-1">{item.label}</div>
                  <div className="text-white/85 text-sm font-medium leading-snug">{item.value}</div>
                  <div className="text-white/40 text-xs mt-0.5">{item.sub}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
