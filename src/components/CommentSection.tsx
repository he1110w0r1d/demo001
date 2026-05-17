import { motion } from 'framer-motion';
import type { SentComment } from '../types';

type CommentSectionProps = {
  sentComment: SentComment;
  onReplay: () => void;
};

// P0.7 评论区 mock(虚构用户与文本,无真实平台)
const mockComments = [
  {
    id: 'c1',
    user: '路过的猫',
    avatarBg: 'from-tertiary to-error',
    text: '看完真的有点火大,希望后续能有说法。',
    likes: 128,
  },
  {
    id: 'c2',
    user: '理性吃瓜',
    avatarBg: 'from-secondary to-primary',
    text: '先等等完整信息,但这件事确实需要回应。',
    likes: 86,
  },
  {
    id: 'c3',
    user: '不想上头',
    avatarBg: 'from-primary to-secondary',
    text: '评论区别吵了,问题核心是责任到底谁来承担。',
    likes: 64,
  },
];

function RegularComment({ user, avatarBg, text, likes }: typeof mockComments[number]) {
  return (
    <div className="flex gap-sm py-sm">
      <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${avatarBg} shrink-0`} />
      <div className="flex-1">
        <div className="text-label-sm text-on-surface-variant">{user}</div>
        <p className="text-body-md text-on-surface/90 mt-xs leading-relaxed">{text}</p>
        <div className="flex items-center gap-md mt-xs text-on-surface-variant/70 text-[11px]">
          <span className="flex items-center gap-xs">
            <span className="material-symbols-outlined text-[14px]">favorite</span>
            {likes}
          </span>
          <span>回复</span>
        </div>
      </div>
    </div>
  );
}

export default function CommentSection({ sentComment, onReplay }: CommentSectionProps) {
  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 220, damping: 30 }}
      className="absolute inset-0 bg-surface-container-lowest/95 backdrop-blur-2xl rounded-t-[28px] flex flex-col"
    >
      {/* 顶部标题栏 */}
      <div className="flex items-center justify-between px-md pt-md pb-sm border-b border-outline-variant/30 shrink-0">
        <div className="flex items-center gap-sm">
          <button
            onClick={onReplay}
            className="text-on-surface-variant hover:text-on-surface transition-colors"
            aria-label="返回"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back_ios</span>
          </button>
          <h3 className="font-display text-body-lg text-on-surface font-semibold">评论 4624</h3>
        </div>
        <span className="material-symbols-outlined text-on-surface-variant text-[20px]">close</span>
      </div>

      {/* 评论列表 */}
      <div className="flex-1 overflow-y-auto px-md pt-sm pb-md">
        {/* 我的评论高亮卡(置顶 + 蓝紫渐变边框 + glow 脉冲) */}
        <motion.div
          initial={{ y: 24, opacity: 0, scale: 0.96 }}
          animate={{
            y: 0,
            opacity: 1,
            scale: 1,
            boxShadow: [
              '0 0 0 rgba(192,193,255,0)',
              '0 0 30px rgba(192,193,255,0.55)',
              '0 0 20px rgba(192,193,255,0.3)',
            ],
          }}
          transition={{
            y: { type: 'spring', stiffness: 200, damping: 20, delay: 0.2 },
            opacity: { duration: 0.4, delay: 0.2 },
            scale: { type: 'spring', stiffness: 200, damping: 14, delay: 0.2 },
            boxShadow: { duration: 1.5, delay: 0.4, times: [0, 0.4, 1] },
          }}
          className="relative rounded-md p-md mb-md border-2 border-transparent"
          style={{
            backgroundImage:
              'linear-gradient(rgba(31,31,39,0.88), rgba(31,31,39,0.88)), linear-gradient(135deg, #c0c1ff, #ddb7ff)',
            backgroundOrigin: 'border-box',
            backgroundClip: 'padding-box, border-box',
          }}
        >
          {/* "我的评论"标签 */}
          <div className="absolute -top-[10px] left-md flex items-center gap-xs px-sm py-[2px] rounded-full bg-gradient-to-r from-primary-container to-secondary-container text-white text-[10px] font-display tracking-wider uppercase shadow-glow-primary">
            <span className="material-symbols-outlined text-[12px]">person</span>
            我的评论
          </div>

          <div className="flex gap-sm pt-xs">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary shrink-0 flex items-center justify-center text-white text-[11px] font-display font-semibold">
              我
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-xs flex-wrap">
                <span className="text-label-sm text-primary font-display font-semibold">你</span>
                <span className="text-[10px] text-on-surface-variant/60">· 刚刚</span>
                <span className="text-[10px] px-xs py-[1px] rounded-full bg-secondary/20 text-secondary">
                  {sentComment.style}
                </span>
              </div>
              <p className="text-body-md text-on-surface mt-xs leading-relaxed font-medium">
                {sentComment.text}
              </p>
              <div className="flex items-center gap-md mt-xs text-on-surface-variant/70 text-[11px]">
                <span className="flex items-center gap-xs">
                  <span className="material-symbols-outlined text-[14px]">favorite</span>
                  0
                </span>
                <span>回复</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 普通评论 */}
        <div className="divide-y divide-outline-variant/20">
          {mockComments.map((c) => (
            <RegularComment key={c.id} {...c} />
          ))}
        </div>

        {/* 发送成功提示 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="mt-md p-sm rounded-md bg-primary/10 border border-primary/30 flex items-start gap-xs"
        >
          <span className="material-symbols-outlined text-primary text-[16px] mt-[2px]">check_circle</span>
          <div className="flex-1">
            <p className="text-label-sm text-primary font-display font-semibold">已发送</p>
            <p className="text-[11px] text-on-surface-variant mt-[2px] leading-snug">
              这次不是冲动开骂,而是有力量地表达。
            </p>
          </div>
        </motion.div>
      </div>

      {/* 底部输入栏 + 按钮 */}
      <div className="shrink-0 px-md py-sm border-t border-outline-variant/30 bg-surface-container/60 backdrop-blur-md flex flex-col gap-sm">
        <div className="flex items-center gap-sm bg-surface-container-high rounded-full px-md py-xs">
          <span className="material-symbols-outlined text-on-surface-variant/60 text-[18px]">edit</span>
          <span className="text-label-sm text-on-surface-variant/60 truncate flex-1">
            已发送:{sentComment.text}
          </span>
        </div>

        <div className="flex items-center justify-between gap-sm">
          <p className="text-[10px] text-on-surface-variant/60 flex-1 leading-tight">
            AI 已将冲动表达转化为理性评论
          </p>
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={onReplay}
            className="px-md py-xs rounded-full bg-gradient-to-r from-primary-container to-secondary-container text-white text-label-sm font-display font-semibold flex items-center gap-xs shadow-glow-primary shrink-0"
          >
            <span className="material-symbols-outlined text-[14px]">refresh</span>
            再体验一次
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
