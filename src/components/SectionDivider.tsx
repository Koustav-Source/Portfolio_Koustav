export default function SectionDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div
      className="relative h-px w-full overflow-visible"
      style={{ margin: flip ? '0 0 -1px 0' : '-1px 0 0 0' }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: flip
            ? 'linear-gradient(90deg, transparent 0%, rgba(139,92,246,0.2) 30%, rgba(0,245,255,0.3) 50%, rgba(139,92,246,0.2) 70%, transparent 100%)'
            : 'linear-gradient(90deg, transparent 0%, rgba(0,245,255,0.2) 30%, rgba(139,92,246,0.3) 50%, rgba(0,245,255,0.2) 70%, transparent 100%)',
        }}
      />
      <div
        className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
        style={{
          background: flip ? '#8b5cf6' : '#00f5ff',
          boxShadow: flip ? '0 0 8px #8b5cf6' : '0 0 8px #00f5ff',
        }}
      />
    </div>
  );
}
