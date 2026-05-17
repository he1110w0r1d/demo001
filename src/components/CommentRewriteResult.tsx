import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { mockCommentRewriteMap } from '../data/mockAI';

type SendState = 'idle' | 'sending' | 'sent';

type CommentRewriteResultProps = {
  onSendComment?: (text: string, style: string) => void;
  onCancel?: () => void;
  videoId?: string;
};

const toneStyle: Record<string, { tag: string; box: string }> = {
  克制版: { tag: 'bg-primary/15 text-primary border-primary/40', box: 'border-primary/40 bg-primary/5' },
  有力版: { tag: 'bg-secondary/15 text-secondary border-secondary/40', box: 'border-secondary/40 bg-secondary/5' },
  犀利但不攻击版: {
    tag: 'bg-tertiary/15 text-tertiary border-tertiary/40',
    box: 'border-tertiary/40 bg-tertiary/5',
  },
};

export default function CommentRewriteResult({ onSendComment, onCancel, videoId = 'video_001' }: CommentRewriteResultProps) {
  const [active, setActive] = useState(0);
  const [sendState, setSendState] = useState<SendState>('idle');
  const [copied, setCopied] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const rewrite = mockCommentRewriteMap[videoId] ?? mockCommentRewriteMap.video_001;
  const versions = rewrite.versions;
  const current = versions[active];
  const style = toneStyle[current.type];

  const lock = sendState !== 'idle';

  const handleSend = () => {
    if (lock || !onSendComment) return;
    setSendState('sending');
    setTimeout(() => {
      setSendState('sent');
      onSendComment(current.text, current.type);
    }, 500);
  };

  const handleCopy = async () => {
    if (lock) return;
    try {
      await navigator.clipboard?.writeText(current.text);
    } catch {
      // 忽略浏览器权限问题,UI 反馈仍走"已复制"
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  // "再生成一句":在三种版本间循环切换 + 触发动画刷新
  const handleRegenerate = () => {
    if (lock) return;
    setActive((i) => (i + 1) % versions.length);
    setRefreshKey((k) => k + 1);
  };

  // 跳到"犀利但不攻击版"
  const handleSharper = () => {
    if (lock) return;
    const idx = versions.findIndex((v) => v.type === '犀利但不攻击版');
    if (idx >= 0) setActive(idx);
  };

  // 跳到"克制版"
  const handleSofter = () => {
    if (lock) return;
    const idx = versions.findIndex((v) => v.type === '克制版');
    if (idx >= 0) setActive(idx);
  };

  const handleAbandon = () => {
    if (lock) return;
    onCancel?.();
  };

  const buttonLabel =
    sendState === 'idle' ? '发送这条评论' : sendState === 'sending' ? '正在发送…' : '已发送';
  const buttonIcon =
    sendState === 'idle' ? 'send' : sendState === 'sending' ? 'progress_activity' : 'check_circle';

  return (
    <motion.div
      initial={{ y: 16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="glass-panel-strong rounded-md p-lg flex flex-col gap-md shadow-glow-primary"
    >
      <h3 className="font-display text-headline-md text-on-surface flex items-center gap-sm">
        <span className="material-symbols-outlined text-primary text-[28px]">auto_awesome</span>
        AI 改写表达
      </h3>

      {/* Before:原始冲动评论 */}
      <div>
        <div className="text-label-sm text-error mb-xs flex items-center gap-xs font-display tracking-wider uppercase">
          <span className="material-symbols-outlined text-[16px]">close</span>
          原始冲动评论
        </div>
        <div className="bg-surface-container-high rounded-md p-md border border-error/30 shadow-glow-error">
          <p className="text-body-lg text-error/90 italic line-through decoration-error/40 leading-relaxed">
            "{rewrite.original}"
          </p>
        </div>
      </div>

      {/* 切换 tab */}
      <div className="flex gap-xs flex-wrap">
        {versions.map((v, i) => (
          <button
            key={v.type}
            onClick={() => sendState === 'idle' && setActive(i)}
            disabled={sendState !== 'idle'}
            className={`px-md py-xs rounded-full border text-label-sm font-display transition-all ${
              i === active
                ? toneStyle[v.type].tag + ' shadow-glow-primary'
                : 'bg-surface-container border-outline-variant/40 text-on-surface-variant'
            } ${sendState !== 'idle' ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {v.type}
          </button>
        ))}
      </div>

      {/* After:AI 建议表达 */}
      <div>
        <div className="text-label-sm text-primary mb-xs flex items-center gap-xs font-display tracking-wider uppercase">
          <span className="material-symbols-outlined text-[16px]">check</span>
          AI 建议表达
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={`${current.type}-${refreshKey}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className={`rounded-md p-md border-2 ${style.box}`}
          >
            <p className="text-body-lg text-on-surface leading-relaxed font-medium">
              "{current.text}"
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 辅助操作:复制 / 再生成 / 更克制 / 更犀利 / 不评论了 */}
      <div className="grid grid-cols-2 gap-xs">
        <button
          onClick={handleCopy}
          disabled={lock}
          className={`flex items-center justify-center gap-xs py-xs px-sm rounded-full text-label-sm font-display border transition-all ${
            copied
              ? 'bg-primary/15 text-primary border-primary/40'
              : 'bg-surface-container border-outline-variant/40 text-on-surface-variant hover:text-primary hover:border-primary/40'
          } ${lock ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <span className="material-symbols-outlined text-[16px]">
            {copied ? 'check' : 'content_copy'}
          </span>
          {copied ? '已复制' : '一键复制'}
        </button>
        <button
          onClick={handleRegenerate}
          disabled={lock}
          className={`flex items-center justify-center gap-xs py-xs px-sm rounded-full text-label-sm font-display border bg-surface-container border-outline-variant/40 text-on-surface-variant hover:text-secondary hover:border-secondary/40 transition-all ${
            lock ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">refresh</span>
          再生成一句
        </button>
        <button
          onClick={handleSofter}
          disabled={lock}
          className={`flex items-center justify-center gap-xs py-xs px-sm rounded-full text-label-sm font-display border bg-surface-container border-outline-variant/40 text-on-surface-variant hover:text-primary hover:border-primary/40 transition-all ${
            lock ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">spa</span>
          更克制一点
        </button>
        <button
          onClick={handleSharper}
          disabled={lock}
          className={`flex items-center justify-center gap-xs py-xs px-sm rounded-full text-label-sm font-display border bg-surface-container border-outline-variant/40 text-on-surface-variant hover:text-tertiary hover:border-tertiary/40 transition-all ${
            lock ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">bolt</span>
          更犀利一点
        </button>
      </div>

      {/* 发送主按钮(P0.7) */}
      <motion.button
        whileHover={sendState === 'idle' ? { scale: 1.02 } : undefined}
        whileTap={sendState === 'idle' ? { scale: 0.97 } : undefined}
        onClick={handleSend}
        disabled={sendState !== 'idle'}
        className={`w-full mt-xs py-md rounded-full font-display font-semibold text-body-lg flex items-center justify-center gap-sm shadow-[0_0_24px_rgba(192,193,255,0.45)] transition-all ${
          sendState === 'sent'
            ? 'bg-primary text-on-primary'
            : 'bg-gradient-to-r from-primary-container to-secondary-container text-white'
        }`}
      >
        <motion.span
          className="material-symbols-outlined"
          animate={sendState === 'sending' ? { rotate: 360 } : { rotate: 0 }}
          transition={
            sendState === 'sending' ? { repeat: Infinity, duration: 1, ease: 'linear' } : undefined
          }
        >
          {buttonIcon}
        </motion.span>
        {buttonLabel}
      </motion.button>

      {/* 放弃评论 */}
      <button
        onClick={handleAbandon}
        disabled={lock}
        className={`text-label-sm text-on-surface-variant/70 hover:text-on-surface-variant flex items-center justify-center gap-xs py-xs transition-colors ${
          lock ? 'opacity-40 cursor-not-allowed' : ''
        }`}
      >
        <span className="material-symbols-outlined text-[16px]">arrow_back</span>
        不评论了,继续刷视频
      </button>
    </motion.div>
  );
}
