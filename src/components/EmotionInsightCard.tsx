import { motion } from 'framer-motion';
import { mockEmotionAnalysisMap } from '../data/mockAI';

type EmotionInsightCardProps = {
  videoId?: string;
};

export default function EmotionInsightCard({ videoId = 'video_001' }: EmotionInsightCardProps) {
  const analysis = mockEmotionAnalysisMap[videoId] ?? mockEmotionAnalysisMap.video_001;
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="glass-panel-strong rounded-md p-lg w-full max-w-[320px] flex flex-col gap-lg shadow-glow-secondary relative overflow-hidden"
    >
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-primary/15 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center gap-sm text-secondary relative z-10">
        <span className="material-symbols-outlined text-[24px]">psychology</span>
        <span className="font-display text-label-sm uppercase tracking-widest">AI 理解到</span>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="font-display text-on-surface text-[22px] leading-[1.45] font-bold whitespace-pre-line relative z-10 drop-shadow-[0_2px_12px_rgba(221,183,255,0.25)]"
      >
        {analysis.aiMessage}
      </motion.p>
    </motion.div>
  );
}
