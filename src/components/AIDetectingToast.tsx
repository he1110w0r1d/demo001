import { motion } from 'framer-motion';

export default function AIDetectingToast() {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      className="glass-panel rounded-full px-md py-sm flex items-center gap-sm shadow-glow-primary pointer-events-auto"
    >
      <div className="relative flex items-center justify-center w-6 h-6">
        <motion.span
          animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0.2, 0.8] }}
          transition={{ repeat: Infinity, duration: 1.4 }}
          className="absolute w-6 h-6 rounded-full bg-primary/40"
        />
        <span className="w-2.5 h-2.5 rounded-full bg-primary z-10" />
      </div>
      <span className="text-body-md text-on-surface">AI 正在理解这条内容……</span>
    </motion.div>
  );
}
