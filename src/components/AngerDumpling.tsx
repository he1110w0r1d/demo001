import { useEffect } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion';
import angerFurious from '../assets/anger-furious.webp';
import angerCalm from '../assets/anger-calm.webp';
import { type AngerDumplingProps } from '../types';

// useSpring 把每 100ms 跳变一次的 progress 平滑到逐帧连续的 motion value
const SPRING_CONFIG = { stiffness: 80, damping: 22, mass: 0.6 };

export default function AngerDumpling({ progress, clickCount, onClick }: AngerDumplingProps) {
  // 外部 progress(0-100)→ motionValue → 弹簧平滑
  const raw = useMotionValue(progress);
  useEffect(() => {
    raw.set(progress);
  }, [progress, raw]);
  const smooth = useSpring(raw, SPRING_CONFIG);

  // 派生平滑信号(全部基于 smooth,逐帧连续)
  const furiousOpacity = useTransform(smooth, [0, 100], [1, 0]);
  const calmOpacity = useTransform(smooth, [0, 100], [0, 1]);

  // furious 层滤镜:渐渐去饱和 + 微色相旋转(配合淡出)
  const fSat = useTransform(smooth, [0, 100], [1, 0.5]);
  const fHue = useTransform(smooth, [0, 100], [0, 30]);
  const furiousFilter = useMotionTemplate`saturate(${fSat}) hue-rotate(${fHue}deg)`;

  // calm 层滤镜:从轻微模糊 + 低饱和过渡到完全清晰 + 满饱和
  const cSat = useTransform(smooth, [0, 100], [0.6, 1]);
  const cBlur = useTransform(smooth, [0, 100], [4, 0]);
  const calmFilter = useMotionTemplate`saturate(${cSat}) blur(${cBlur}px)`;

  // 火焰/闪电:0~60% 区间存在,60~90 渐隐
  const fireOpacity = useTransform(smooth, [0, 30, 60, 90], [1, 1, 0.5, 0]);
  // 气泡/星星:60~100 区间渐显
  const calmDecorOpacity = useTransform(smooth, [40, 70, 100], [0, 0.6, 1]);

  // 光环色:让 box-shadow 颜色随 progress 在 4 色之间过渡(用 rgba)
  const ringColor = useTransform(
    smooth,
    [0, 30, 60, 90, 100],
    [
      'rgba(255,180,171,0.55)', // error
      'rgba(255,183,131,0.55)', // tertiary
      'rgba(221,183,255,0.55)', // secondary
      'rgba(192,193,255,0.55)', // primary
      'rgba(192,193,255,0.55)',
    ],
  );
  const ringShadow = useMotionTemplate`0 0 60px ${ringColor}`;

  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.88 }}
      animate={{ scale: 1 + (clickCount % 2) * 0.02 }}
      transition={{ type: 'spring', stiffness: 600, damping: 18 }}
      style={{ boxShadow: ringShadow }}
      className="relative w-[200px] h-[200px] rounded-full flex items-center justify-center select-none bg-white/[0.03]"
      aria-label="怒气团子,点击释放情绪"
    >
      {/* 怒气装饰:火焰 / 闪电 / 红色脉冲环 — 整体随 fireOpacity 平滑淡出 */}
      <motion.div
        style={{ opacity: fireOpacity }}
        className="absolute inset-0 pointer-events-none"
      >
        <motion.span
          animate={{ scale: [1, 1.12, 1], opacity: [0.7, 0.2, 0.7] }}
          transition={{ repeat: Infinity, duration: 0.9 }}
          className="absolute inset-0 rounded-full border-2 border-error/40"
        />
        <span className="absolute -top-2 left-6 text-[28px] animate-pulse">⚡</span>
        <span className="absolute top-2 right-4 text-[24px] animate-pulse">🔥</span>
      </motion.div>

      {/* 冷静装饰:气泡 / 星星 — 整体随 calmDecorOpacity 平滑淡入 */}
      <motion.div
        style={{ opacity: calmDecorOpacity }}
        className="absolute inset-0 pointer-events-none"
      >
        <span className="absolute -top-3 right-8 text-[20px] anim-breath">✨</span>
        <span className="absolute bottom-2 left-3 text-[18px]">🫧</span>
        <span className="absolute top-6 -right-2 text-[16px]">🫧</span>
      </motion.div>

      {/* furious 层 */}
      <motion.img
        src={angerFurious}
        alt=""
        style={{ opacity: furiousOpacity, filter: furiousFilter }}
        className="absolute w-[180px] h-[180px] object-contain pointer-events-none"
        draggable={false}
      />
      {/* calm 层 */}
      <motion.img
        src={angerCalm}
        alt=""
        style={{ opacity: calmOpacity, filter: calmFilter }}
        className="absolute w-[180px] h-[180px] object-contain pointer-events-none"
        draggable={false}
      />
    </motion.button>
  );
}
