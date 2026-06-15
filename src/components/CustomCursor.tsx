import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animateRing = () => {
      ringPos.current.x = lerp(ringPos.current.x, pos.current.x, 0.12);
      ringPos.current.y = lerp(ringPos.current.y, pos.current.y, 0.12);
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x - 20}px, ${ringPos.current.y - 20}px)`;
      }
      rafRef.current = requestAnimationFrame(animateRing);
    };

    rafRef.current = requestAnimationFrame(animateRing);

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches('a, button, [data-cursor="pointer"], input, textarea, select, label')) {
        setIsHovering(true);
      }
    };

    const handleLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches('a, button, [data-cursor="pointer"], input, textarea, select, label')) {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleEnter);
    document.addEventListener('mouseout', handleLeave);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleEnter);
      document.removeEventListener('mouseout', handleLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{
          width: isHovering ? '8px' : '6px',
          height: isHovering ? '8px' : '6px',
          borderRadius: '50%',
          background: isClicking ? '#8b5cf6' : '#00f5ff',
          boxShadow: isClicking
            ? '0 0 10px #8b5cf6, 0 0 20px #8b5cf6'
            : '0 0 10px #00f5ff, 0 0 20px #00f5ff',
          transition: 'width 0.2s, height 0.2s, background 0.2s, box-shadow 0.2s',
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="cursor-dot"
        style={{
          width: isHovering ? '50px' : '40px',
          height: isHovering ? '50px' : '40px',
          borderRadius: '50%',
          border: `1.5px solid ${isHovering ? 'rgba(139,92,246,0.6)' : 'rgba(0,245,255,0.4)'}`,
          background: isHovering ? 'rgba(139,92,246,0.05)' : 'transparent',
          transition: 'width 0.3s, height 0.3s, border-color 0.3s, background 0.3s',
          backdropFilter: isHovering ? 'blur(2px)' : 'none',
        }}
      />
    </>
  );
}
