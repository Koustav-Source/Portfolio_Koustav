import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const contactInfo = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    label: 'Email',
    value: 'k2006.royals@gmail.com',
    href: 'mailto:k2006.royals@gmail.com',
    color: '#00f5ff',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 14a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 3.12h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.28a16 16 0 0 0 5.55 5.55l.86-.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.04z" />
      </svg>
    ),
    label: 'Phone',
    value: '+91 7980901278',
    href: 'tel:+917980901278',
    color: '#8b5cf6',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: 'Location',
    value: 'Kolkata, West Bengal',
    href: 'https://maps.google.com/?q=Kolkata,India',
    color: '#3b82f6',
  },
];

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/Koustav-Source',
    color: '#6e5494',
    hoverColor: '#9b79d4',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/koustav-dey-3a13bb310/',
    color: '#0077b5',
    hoverColor: '#00a0dc',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
];

function InputField({ label, type, placeholder, value, onChange, required }: {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative">
      <label className="block text-xs font-mono text-white/40 tracking-widest mb-2">
        {label} {required && <span className="text-cyan-400">*</span>}
      </label>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full bg-transparent text-white/80 text-sm placeholder:text-white/20 outline-none transition-all duration-300 rounded-xl py-3.5 px-4"
          style={{
            border: `1px solid ${focused ? 'rgba(0,245,255,0.4)' : 'rgba(255,255,255,0.08)'}`,
            background: focused ? 'rgba(0,245,255,0.03)' : 'rgba(5,8,20,0.6)',
            boxShadow: focused ? '0 0 20px rgba(0,245,255,0.08), inset 0 1px 0 rgba(255,255,255,0.03)' : 'none',
          }}
        />
        {focused && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            className="absolute bottom-0 left-4 right-4 h-px origin-left"
            style={{ background: 'linear-gradient(90deg, #00f5ff, #8b5cf6)' }}
          />
        )}
      </div>
    </div>
  );
}

function TextareaField({ label, placeholder, value, onChange }: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative">
      <label className="block text-xs font-mono text-white/40 tracking-widest mb-2">
        {label} <span className="text-cyan-400">*</span>
      </label>
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={5}
          required
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full bg-transparent text-white/80 text-sm placeholder:text-white/20 outline-none transition-all duration-300 rounded-xl py-3.5 px-4 resize-none"
          style={{
            border: `1px solid ${focused ? 'rgba(0,245,255,0.4)' : 'rgba(255,255,255,0.08)'}`,
            background: focused ? 'rgba(0,245,255,0.03)' : 'rgba(5,8,20,0.6)',
            boxShadow: focused ? '0 0 20px rgba(0,245,255,0.08), inset 0 1px 0 rgba(255,255,255,0.03)' : 'none',
          }}
        />
        {focused && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            className="absolute bottom-0 left-4 right-4 h-px origin-left"
            style={{ background: 'linear-gradient(90deg, #00f5ff, #8b5cf6)' }}
          />
        )}
      </div>
    </div>
  );
}

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate form submission
    await new Promise(r => setTimeout(r, 1500));
    setStatus('sent');
    setTimeout(() => {
      setStatus('idle');
      setForm({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" ref={ref} className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #020408, #030610 50%, #020408)' }} />
      <div className="absolute inset-0 grid-bg opacity-20" />

      {/* Center glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(0,245,255,0.05) 0%, transparent 60%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-400/60" />
            <span className="font-mono text-cyan-400 text-sm tracking-widest">05 — CONTACT</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-cyan-400/60" />
          </div>
          <h2 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-white mb-4">
            Let's <span className="text-gradient-cyan">Connect</span>
          </h2>
          <p className="text-white/50 text-base max-w-lg mx-auto">
            Open to internships, full-time roles, collaborations, and interesting projects.
            Let's build something great together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left — Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Availability badge */}
            <div
              className="flex items-center gap-3 p-4 rounded-xl"
              style={{ background: 'rgba(0,255,136,0.06)', border: '1px solid rgba(0,255,136,0.15)' }}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
              <div>
                <div className="text-green-400 text-sm font-semibold">Available for Work</div>
                <div className="text-white/40 text-xs">Open to new opportunities in 2025</div>
              </div>
            </div>

            {/* Contact details */}
            <div className="space-y-3">
              {contactInfo.map((info, i) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  target={info.label === 'Location' ? '_blank' : undefined}
                  rel={info.label === 'Location' ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-4 p-4 rounded-xl group transition-all duration-300"
                  style={{
                    background: 'rgba(5,8,20,0.6)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: `${info.color}12`,
                      border: `1px solid ${info.color}25`,
                      color: info.color,
                    }}
                  >
                    {info.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-mono text-white/30 tracking-widest">{info.label}</div>
                    <div
                      className="text-sm font-medium truncate transition-colors duration-300 group-hover:text-white"
                      style={{ color: 'rgba(255,255,255,0.75)' }}
                    >
                      {info.value}
                    </div>
                  </div>
                  <div className="ml-auto text-white/20 group-hover:text-white/50 transition-colors duration-300 flex-shrink-0">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social links */}
            <div>
              <p className="text-xs font-mono text-white/30 tracking-widest mb-3">FIND ME ONLINE</p>
              <div className="flex gap-3">
                {socialLinks.map((social, i) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    whileHover={{ scale: 1.08, y: -2 }}
                    className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex-1 justify-center"
                    style={{
                      background: `${social.color}12`,
                      border: `1px solid ${social.color}25`,
                      color: `${social.color}cc`,
                    }}
                  >
                    {social.icon}
                    {social.name}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Location */}
            <div
              className="p-4 rounded-xl text-sm"
              style={{ background: 'rgba(5,8,20,0.4)', border: '1px solid rgba(255,255,255,0.04)' }}
            >
              <p className="text-xs font-mono text-white/30 tracking-widest mb-2">ADDRESS</p>
              <p className="text-white/55 leading-relaxed">
                B/22, Rabindra Pally,<br />
                Baghajatin, Kolkata — 700086<br />
                <span className="text-cyan-400/60">West Bengal, India</span>
              </p>
            </div>
          </motion.div>

          {/* Right — Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div
              className="p-6 sm:p-8 rounded-2xl relative overflow-hidden"
              style={{
                background: 'rgba(5,8,20,0.7)',
                border: '1px solid rgba(0,245,255,0.1)',
                boxShadow: '0 0 40px rgba(0,245,255,0.04)',
              }}
            >
              {/* Corner accent */}
              <div
                className="absolute top-0 right-0 w-32 h-32 pointer-events-none"
                style={{ background: 'radial-gradient(circle at top right, rgba(0,245,255,0.06), transparent 60%)' }}
              />

              <h3 className="font-heading font-bold text-xl text-white mb-6">
                Send a Message
              </h3>

              <AnimatePresence mode="wait">
                {status === 'sent' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mb-4 text-2xl"
                      style={{ background: 'rgba(0,255,136,0.1)', border: '1px solid rgba(0,255,136,0.3)' }}
                    >
                      ✓
                    </div>
                    <h4 className="text-white font-bold text-lg mb-2">Message Sent!</h4>
                    <p className="text-white/50 text-sm">Thanks for reaching out. I'll get back to you soon.</p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <InputField
                        label="YOUR NAME"
                        type="text"
                        placeholder="Recruiter / Collaborator"
                        value={form.name}
                        onChange={(v) => setForm(f => ({ ...f, name: v }))}
                        required
                      />
                      <InputField
                        label="EMAIL ADDRESS"
                        type="email"
                        placeholder="hello@company.com"
                        value={form.email}
                        onChange={(v) => setForm(f => ({ ...f, email: v }))}
                        required
                      />
                    </div>
                    <InputField
                      label="SUBJECT"
                      type="text"
                      placeholder="Internship opportunity / Project collaboration"
                      value={form.subject}
                      onChange={(v) => setForm(f => ({ ...f, subject: v }))}
                    />
                    <TextareaField
                      label="MESSAGE"
                      placeholder="Tell me about the opportunity, project, or just say hi..."
                      value={form.message}
                      onChange={(v) => setForm(f => ({ ...f, message: v }))}
                    />
                    <motion.button
                      type="submit"
                      disabled={status === 'sending'}
                      whileHover={status !== 'sending' ? { scale: 1.02 } : {}}
                      whileTap={status !== 'sending' ? { scale: 0.98 } : {}}
                      className="w-full py-4 rounded-xl font-semibold text-sm transition-all duration-300 relative overflow-hidden"
                      style={{
                        background: status === 'sending'
                          ? 'rgba(0,245,255,0.06)'
                          : 'linear-gradient(135deg, rgba(0,245,255,0.15), rgba(139,92,246,0.15))',
                        border: `1px solid ${status === 'sending' ? 'rgba(0,245,255,0.2)' : 'rgba(0,245,255,0.4)'}`,
                        color: status === 'sending' ? 'rgba(0,245,255,0.5)' : '#00f5ff',
                        boxShadow: status !== 'sending' ? '0 0 20px rgba(0,245,255,0.1)' : 'none',
                      }}
                    >
                      {status === 'sending' ? (
                        <span className="flex items-center justify-center gap-2">
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                            className="inline-block w-4 h-4 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full"
                          />
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="22" y1="2" x2="11" y2="13" />
                            <polygon points="22 2 15 22 11 13 2 9 22 2" />
                          </svg>
                          Send Message
                        </span>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
