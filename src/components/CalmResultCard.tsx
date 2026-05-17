import { motion } from 'framer-motion';
import type { BufferStats } from '../types';

type CalmResultCardProps = {
  stats: BufferStats;
  onReplay: () => void;
};

// 冷静力百分位:基于 calmProgress(0-100) 与 duration(秒) 推导
// 完成度越高、用时越短,排名越靠前
function getCalmPercentile(stats: BufferStats): number {
  const progress = Math.max(0, Math.min(100, stats.calmProgress));
  const speedBonus = Math.max(0, 10 - stats.duration) * 2;
  const raw = progress * 0.85 + speedBonus + 8;
  return Math.max(35, Math.min(96, Math.round(raw)));
}

function getCalmTitle(percentile: number): string {
  if (percentile >= 90) return '冷静观察员';
  if (percentile >= 75) return '稳健派';
  if (percentile >= 55) return '正在练习';
  return '小有进步';
}

export default function CalmResultCard({ stats, onReplay }: CalmResultCardProps) {
  const percentile = getCalmPercentile(stats);
  const title = getCalmTitle(percentile);
  const durationLabel = stats.duration > 0 ? stats.duration.toFixed(1) : '10.0';
  return (
    <motion.div
      initial={{ y: 24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.15 }}
      className="glass-panel rounded-md p-md flex flex-col gap-sm"
    >
      {/* 二级:双指标 */}
      <h4 className="text-label-sm text-on-surface-variant uppercase tracking-widest flex items-center gap-xs">
        <span className="material-symbols-outlined text-[16px] text-primary">self_improvement</span>
        冷静成果
      </h4>

      {/* 冷静力排名(P0 新增) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="rounded-md p-sm bg-gradient-to-r from-primary-container/40 to-secondary-container/40 border border-primary/30 flex items-center gap-sm"
      >
        <div className="flex flex-col items-center justify-center min-w-[64px]">
          <span className="text-[10px] text-on-surface-variant">超过全国</span>
          <span className="text-display-sm font-display text-primary leading-none">{percentile}%</span>
          <span className="text-[10px] text-on-surface-variant">用户</span>
        </div>
        <div className="flex-1 flex flex-col gap-[2px]">
          <p className="text-body-sm text-on-surface">
            你用 <span className="font-display text-primary">{durationLabel}</span> 秒完成了这次冷静。
          </p>
          <p className="text-[11px] text-on-surface-variant">
            今日已获标签:<span className="text-secondary font-medium">「{title}」</span>
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 gap-sm">
        <div className="bg-surface-container-low rounded-md p-sm border border-outline-variant/40">
          <div className="flex justify-between items-baseline">
            <span className="text-[11px] text-on-surface-variant">冷静完成度</span>
            <span className="text-headline-md font-display text-primary">{stats.calmProgress}%</span>
          </div>
          <div className="w-full h-1 bg-surface-container-highest rounded-full mt-xs overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${stats.calmProgress}%` }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-full bg-primary"
            />
          </div>
        </div>
        <div className="bg-surface-container-low rounded-md p-sm border border-outline-variant/40">
          <div className="flex justify-between items-baseline">
            <span className="text-[11px] text-on-surface-variant">情绪释放指数</span>
            <span className="text-headline-md font-display text-secondary">{stats.releaseScore}</span>
          </div>
          <div className="w-full h-1 bg-surface-container-highest rounded-full mt-xs overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${stats.releaseScore}%` }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="h-full bg-secondary"
            />
          </div>
        </div>
      </div>

      {/* 三级:互动数据(最弱) */}
      <div className="flex items-center justify-center gap-md text-[10px] text-on-surface-variant/60">
        <span>点击 {stats.clickCount} 次</span>
        <span>·</span>
        <span>互动 {stats.duration}s</span>
      </div>

      {/* 情感收尾 */}
      <p className="text-center font-display text-body-md text-primary/90 mt-xs">
        冷静一下,表达更有力量。
      </p>

      {/* 再体验按钮 */}
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={onReplay}
        className="w-full py-sm rounded-full bg-gradient-to-r from-primary-container to-secondary-container text-white font-display font-semibold flex items-center justify-center gap-sm shadow-glow-primary"
      >
        <span className="material-symbols-outlined text-[18px]">refresh</span>
        再体验一次
      </motion.button>

      {/* 三级:免责声明(最弱) */}
      <p className="text-[10px] text-on-surface-variant/50 text-center leading-tight">
        本结果仅代表本次互动强度,不代表心理诊断。
      </p>
    </motion.div>
  );
}
