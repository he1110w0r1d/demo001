import { motion } from 'framer-motion';

type EmotionBufferCardProps = {
  onStart: () => void;
};

export default function EmotionBufferCard({ onStart }: EmotionBufferCardProps) {
  return (
    <motion.div
      initial={{ scale: 0.85, opacity: 0, y: 30 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 240, damping: 22 }}
      className="glass-panel-strong rounded-md p-lg w-full max-w-[320px] flex flex-col items-center gap-md shadow-[0_0_40px_rgba(111,0,190,0.25)] relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-error via-tertiary to-primary opacity-90" />
      <div className="w-10 h-1 rounded-full bg-on-surface-variant/30 mt-xs" />

      <p className="text-center font-display text-on-surface leading-tight tracking-tight text-[28px] font-bold drop-shadow-[0_2px_12px_rgba(192,193,255,0.3)]">
        这条确实让人火大。
        <br />
        先别急着开骂,捏一下?
      </p>

      <p className="text-label-sm text-on-surface-variant/70 text-center -mt-xs">
        给情绪一个出口,给表达一个更好的开始。
      </p>

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={onStart}
        className="w-full mt-sm py-md rounded-full bg-gradient-to-r from-primary-container to-secondary-container text-white font-display font-semibold text-body-lg flex items-center justify-center gap-sm shadow-[0_0_24px_rgba(192,193,255,0.4)]"
      >
        <span className="material-symbols-outlined">touch_app</span>
        捏一捏,冷静 10 秒
      </motion.button>
    </motion.div>
  );
}
