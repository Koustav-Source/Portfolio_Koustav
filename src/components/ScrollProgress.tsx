import { useEffect, useState } from 'react';
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion';

export default function ScrollProgress() {
  const scrollY = useMotionValue(0);
  const [maxScroll, setMaxScroll] = useState(1);

  useEffect(() => {
    const updateMax = () => {
      setMaxScroll(document.body.scrollHeight - window.innerHeight);
    };
    updateMax();
    window.addEventListener('resize', updateMax);

    const handleScroll = () => {
      scrollY.set(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateMax);
    };
  }, [scrollY]);

  const scaleX = useTransform(scrollY, [0, maxScroll], [0, 1]);
  const smoothScaleX = useSpring(scaleX, { stiffness: 200, damping: 30 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left"
      style={{
        scaleX: smoothScaleX,
        background: 'linear-gradient(90deg, #00f5ff, #8b5cf6, #ec4899)',
        boxShadow: '0 0 8px rgba(0,245,255,0.5)',
      }}
    />
  );
}
