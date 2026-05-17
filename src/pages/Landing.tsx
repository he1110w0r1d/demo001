import { useState } from 'react';
import { motion } from 'framer-motion';
import angerFurious from '../assets/anger-furious.webp';
import angerCalm from '../assets/anger-calm.webp';
import { mockVideos } from '../data/mockVideo';

type LandingProps = {
  onEnter: (videoId: string) => void;
};

const scenarioIcons: Record<string, string> = {
  video_001: 'gavel',
  video_002: 'work',
  video_003: 'pets',
  video_004: 'elderly',
  video_005: 'shopping_cart',
};

const scenarioTones: Record<string, string> = {
  video_001: 'error',
  video_002: 'secondary',
  video_003: 'tertiary',
  video_004: 'primary',
  video_005: 'error',
};

const steps = [
  { icon: 'warning', label: 'STEP 1', desc: '刷到愤怒视频', tone: 'error' },
  { icon: 'smart_toy', label: 'STEP 2', desc: '弹出卡片:先别急着开骂,捏一下?', tone: 'primary' },
  { icon: 'pinch', label: 'STEP 3', desc: '点击怒气团子 10 秒', tone: 'secondary' },
  { icon: 'lightbulb', label: 'STEP 4', desc: 'AI 生成理性表达', tone: 'tertiary' },
] as const;

const aiCapabilities = [
  { icon: 'sensors', tone: 'primary', title: 'AI 实时识别', desc: '识别视频中的不公平感、责任缺位等情绪触发源' },
  { icon: 'psychology', tone: 'secondary', title: 'AI 理解上头原因', desc: '看见愤怒背后真正的动机:对公平、对责任的坚守' },
  { icon: 'auto_awesome', tone: 'tertiary', title: 'AI 转化表达', desc: '把冲动评论改写成克制、有力、犀利但不攻击的版本' },
];

const toneClass: Record<string, string> = {
  error: 'bg-error-container/30 text-error',
  primary: 'bg-primary-container/30 text-primary',
  secondary: 'bg-secondary-container/30 text-secondary',
  tertiary: 'bg-tertiary-container/30 text-tertiary',
};

export default function Landing({ onEnter }: LandingProps) {
  const [selectedId, setSelectedId] = useState<string>('video_001');
  return (
    <main className="min-h-screen w-full flex flex-col items-center px-container-margin pb-xl">
      <section className="text-center pt-[80px] pb-xl flex flex-col items-center gap-md max-w-4xl">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-display text-display-lg-mobile md:text-display-lg text-gradient-hero drop-shadow-lg"
        >
          情绪缓冲卡
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-headline-md text-on-surface-variant"
        >
          刷到上头时,先别急着开骂,捏一下。
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18 }}
          className="text-body-lg text-primary font-display font-semibold tracking-wide"
        >
          短视频评论前的 10 秒情绪缓冲工具
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="text-body-lg text-outline max-w-2xl mt-sm"
        >
          短视频场景下的 AI 情绪缓冲与理性表达助手。
          <span className="text-primary font-semibold"> 不是压住情绪,而是把情绪变成更好的表达。</span>
        </motion.p>

        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onEnter(selectedId)}
          className="mt-lg flex items-center gap-sm bg-gradient-to-r from-primary-container to-secondary-container text-white px-xl py-md rounded-full text-headline-md font-display font-semibold glow-shadow-primary anim-breath"
        >
          <span className="material-symbols-outlined">play_circle</span>
          进入体验
        </motion.button>
        <p className="text-label-sm text-on-surface-variant mt-sm">演示约 30 秒 · 仅互动 Demo · 不接入真实平台</p>
      </section>

      {/* P0 新增:场景选择 — 5 个虚构愤怒场景 */}
      <section className="w-full max-w-6xl py-xl">
        <h2 className="font-display text-headline-md text-center mb-xs text-on-surface">选一个让你上头的场景</h2>
        <p className="text-center text-body-md text-on-surface-variant mb-lg">
          全部为虚构内容,不指向任何真实事件、机构或个人
        </p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-md">
          {mockVideos.map((v, i) => {
            const isSelected = selectedId === v.id;
            const tone = scenarioTones[v.id] ?? 'primary';
            return (
              <motion.button
                key={v.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedId(v.id)}
                onDoubleClick={() => onEnter(v.id)}
                className={`glass-panel rounded-md p-md flex flex-col items-start text-left gap-sm transition-all ${
                  isSelected
                    ? 'border-2 border-primary shadow-glow-primary scale-[1.02]'
                    : 'border border-outline-variant/40'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${toneClass[tone]}`}>
                  <span className="material-symbols-outlined text-[22px]">
                    {scenarioIcons[v.id] ?? 'whatshot'}
                  </span>
                </div>
                <h3 className="font-display text-on-surface font-semibold text-body-md leading-tight line-clamp-2">
                  {v.title}
                </h3>
                <p className="text-label-sm text-on-surface-variant line-clamp-2">{v.description}</p>
                <div className="flex flex-wrap gap-xs mt-auto">
                  {v.emotionTags.slice(0, 2).map((t) => (
                    <span
                      key={t}
                      className="text-[10px] bg-surface-container-high px-xs py-[1px] rounded-full text-on-surface-variant"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
                {isSelected && (
                  <div className="text-label-sm text-primary font-display flex items-center gap-xs mt-xs">
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                    已选中
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
        <p className="text-center text-label-sm text-on-surface-variant/70 mt-md">
          已选:<span className="text-primary font-medium">{mockVideos.find((v) => v.id === selectedId)?.topic}</span> · 双击卡片可直接进入
        </p>
      </section>

      <section className="w-full max-w-6xl py-xl">
        <h2 className="font-display text-headline-md text-center mb-lg text-on-surface">4 步体验流程</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-md">
          {steps.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="glass-panel rounded-md p-lg flex flex-col items-center text-center gap-sm"
            >
              <div className={`w-14 h-14 rounded-full flex items-center justify-center ${toneClass[s.tone]}`}>
                <span className="material-symbols-outlined text-[28px]">{s.icon}</span>
              </div>
              <h3 className="font-display text-on-surface font-semibold">{s.label}</h3>
              <p className="text-body-md text-on-surface-variant">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="w-full max-w-5xl py-xl">
        <h2 className="font-display text-headline-md text-center mb-lg text-on-surface">
          怒气团子:从火气到治愈的蜕变
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-xl">
          <div className="flex flex-col items-center gap-md">
            <div className="w-48 h-48 rounded-full bg-error-container/20 flex items-center justify-center glow-shadow-error">
              <img src={angerFurious} alt="红温炸毛怪兽" className="w-44 h-44 object-contain drop-shadow-[0_0_24px_rgba(255,180,171,0.45)]" />
            </div>
            <h3 className="font-display text-headline-md text-error">红温炸毛怪兽</h3>
            <p className="text-body-md text-on-surface-variant">愤怒值 Max,闪电与火焰环绕</p>
          </div>
          <span className="material-symbols-outlined text-[40px] text-on-surface-variant hidden md:block">arrow_forward</span>
          <span className="material-symbols-outlined text-[40px] text-on-surface-variant md:hidden">arrow_downward</span>
          <div className="flex flex-col items-center gap-md">
            <div className="w-48 h-48 rounded-full bg-primary-container/20 flex items-center justify-center glow-shadow-primary anim-breath">
              <img src={angerCalm} alt="软乎乎冷静团子" className="w-44 h-44 object-contain drop-shadow-[0_0_24px_rgba(192,193,255,0.45)]" />
            </div>
            <h3 className="font-display text-headline-md text-primary">软乎乎冷静团子</h3>
            <p className="text-body-md text-on-surface-variant">治愈感拉满,温柔气泡环绕</p>
          </div>
        </div>
      </section>

      <section className="w-full max-w-6xl py-xl">
        <h2 className="font-display text-headline-md text-center mb-lg text-on-surface">AI 全程参与</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
          {aiCapabilities.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="glass-panel rounded-md p-lg"
            >
              <div className={`flex items-center gap-sm mb-md`}>
                <span className={`material-symbols-outlined text-[28px] ${toneClass[c.tone].split(' ')[1]}`}>{c.icon}</span>
                <h3 className="font-display text-on-surface text-body-lg font-semibold">{c.title}</h3>
              </div>
              <p className="text-body-md text-on-surface-variant">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="w-full max-w-5xl py-xl">
        <h2 className="font-display text-headline-md text-center mb-lg text-on-surface">把火气翻译成人话</h2>
        <div className="glass-panel rounded-md p-lg md:p-xl">
          <div className="flex flex-col md:flex-row items-stretch gap-md mb-lg">
            <div className="flex-1 bg-surface-container-high rounded-md p-lg border border-error/30">
              <p className="text-body-md text-error">"真是服了!太离谱了!垃圾!无语!!!气死我了!!!!"</p>
            </div>
            <div className="flex items-center justify-center">
              <span className="material-symbols-outlined text-[36px] text-gradient-primary">sync_alt</span>
            </div>
            <div className="flex-1 bg-primary/10 rounded-md p-lg border border-primary/30 glow-shadow-primary">
              <p className="text-body-md text-primary">"最让人难受的不是事情发生,而是发生之后依然有人试图轻描淡写。"</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
            <div className="bg-surface-container-low rounded-md p-md border border-outline-variant/40">
              <div className="flex justify-between items-center">
                <span className="text-label-sm text-on-surface-variant">冷静完成度</span>
                <span className="text-headline-md text-primary font-display">76%</span>
              </div>
              <div className="w-full bg-surface-container-highest rounded-full h-2 mt-sm">
                <div className="bg-primary h-2 rounded-full" style={{ width: '76%' }} />
              </div>
            </div>
            <div className="bg-surface-container-low rounded-md p-md border border-outline-variant/40">
              <div className="flex justify-between items-center">
                <span className="text-label-sm text-on-surface-variant">情绪释放指数</span>
                <span className="text-headline-md text-secondary font-display">82</span>
              </div>
              <div className="w-full bg-surface-container-highest rounded-full h-2 mt-sm">
                <div className="bg-secondary h-2 rounded-full" style={{ width: '82%' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="w-full max-w-6xl mt-xl pt-lg border-t border-outline-variant/40 text-center">
        <p className="text-label-sm text-on-surface-variant">
          © 2026 情绪缓冲卡 Digital Sanctuary · 本产品仅提供情绪缓冲与表达辅助,不提供心理诊断或治疗。
        </p>
      </footer>
    </main>
  );
}
