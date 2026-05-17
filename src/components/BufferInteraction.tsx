import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import type { BufferStats } from '../types';
import AngerCat from './AngerCat/AngerCat';

type BufferInteractionProps = {
  onDone: (stats: BufferStats) => void;
};

const TOTAL_SECONDS = 10;
const TICK_MS = 100;

export default function BufferInteraction({ onDone }: BufferInteractionProps) {
  const [clickCount, setClickCount] = useState(0);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);
  const doneRef = useRef(false);

  useEffect(() => {
    const start = Date.now();
    const id = setInterval(() => {
      const elapsed = Date.now() - start;
      setElapsedMs(elapsed);
      if (elapsed >= TOTAL_SECONDS * 1000 && !doneRef.current) {
        doneRef.current = true;
        clearInterval(id);
      }
    }, TICK_MS);
    return () => clearInterval(id);
  }, []);

  const elapsedSeconds = Math.min(TOTAL_SECONDS, elapsedMs / 1000);
  const remainingSeconds = Math.max(0, TOTAL_SECONDS - elapsedSeconds);

  const calmProgress = Math.min(100, clickCount * 4 + elapsedSeconds * 3);
  const releaseScore = Math.min(100, clickCount * 3 + elapsedSeconds * 2);

  useEffect(() => {
    if (doneRef.current && elapsedMs >= TOTAL_SECONDS * 1000) {
      const stats: BufferStats = {
        clickCount,
        duration: TOTAL_SECONDS,
        releaseScore: Math.round(releaseScore),
        calmProgress: Math.round(calmProgress),
      };
      const t = setTimeout(() => onDone(stats), 400);
      return () => clearTimeout(t);
    }
  }, [elapsedMs, clickCount, releaseScore, calmProgress, onDone]);

  const handleTap = () => {
    if (doneRef.current) return;
    setClickCount((c) => c + 1);
    const id = Date.now() + Math.random();
    const x = (Math.random() - 0.5) * 120;
    const y = (Math.random() - 0.5) * 40;
    setParticles((arr) => [...arr.slice(-8), { id, x, y }]);
    setTimeout(() => {
      setParticles((arr) => arr.filter((p) => p.id !== id));
    }, 900);
  };

  return (
    <motion.div
      initial={{ scale: 0.92, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="w-full max-w-[320px] flex flex-col items-center gap-md"
    >
      <div className="flex items-center justify-between w-full text-on-surface">
        <div className="flex flex-col">
          <span className="text-label-sm text-on-surface-variant">剩余时间</span>
          <span className="font-display text-headline-md text-primary">{remainingSeconds.toFixed(1)}s</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-label-sm text-on-surface-variant">已捏次数</span>
          <span className="font-display text-headline-md text-secondary">{clickCount}</span>
        </div>
      </div>

      <div className="relative my-md">
        <AngerCat progress={calmProgress} clickCount={clickCount} onClick={handleTap} />
        {particles.map((p) => (
          <span
            key={p.id}
            className="absolute top-1/2 left-1/2 text-[18px] float-particle pointer-events-none"
            style={{ transform: `translate(${p.x}px, ${p.y}px)` }}
          >
            🫧
          </span>
        ))}
      </div>

      <div className="w-full">
        <div className="flex justify-between mb-xs">
          <span className="text-label-sm text-on-surface-variant">冷静完成度</span>
          <span className="text-label-sm text-primary font-display">{Math.round(calmProgress)}%</span>
        </div>
        <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
          <motion.div
            animate={{ width: `${calmProgress}%` }}
            transition={{ type: 'spring', stiffness: 150, damping: 20 }}
            className="h-full bg-gradient-to-r from-error via-tertiary to-primary"
          />
        </div>
      </div>

      <p className="text-label-sm text-on-surface-variant text-center mt-xs">
        {calmProgress < 60 ? '尽情捏一捏,把火气散出去 →' : '感受到温度在变化吗?'}
      </p>
    </motion.div>
  );
}
