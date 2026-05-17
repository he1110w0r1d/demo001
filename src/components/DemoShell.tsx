import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { BufferStats, DemoStage, SentComment } from '../types';
import PhoneFrame from './PhoneFrame';
import ShortVideoMock from './ShortVideoMock';
import AIDetectingToast from './AIDetectingToast';
import EmotionBufferCard from './EmotionBufferCard';
import BufferInteraction from './BufferInteraction';
import EmotionInsightCard from './EmotionInsightCard';
import CommentRewriteResult from './CommentRewriteResult';
import CalmResultCard from './CalmResultCard';
import CommentSection from './CommentSection';
import { detectEmotion } from '../services/aiService';
import { getMockVideo } from '../data/mockVideo';

type DemoShellProps = {
  onExit: () => void;
  videoId?: string;
};

const initialStats: BufferStats = {
  clickCount: 0,
  duration: 0,
  releaseScore: 0,
  calmProgress: 0,
};

export default function DemoShell({ onExit, videoId = 'video_001' }: DemoShellProps) {
  const video = getMockVideo(videoId);
  const [stage, setStage] = useState<DemoStage>('watching');
  const [stats, setStats] = useState<BufferStats>(initialStats);
  const [sentComment, setSentComment] = useState<SentComment | null>(null);

  useEffect(() => {
    if (stage !== 'watching') return;
    const t = setTimeout(() => setStage('ai_detecting'), 2000);
    return () => clearTimeout(t);
  }, [stage]);

  useEffect(() => {
    if (stage !== 'ai_detecting') return;
    let cancelled = false;
    detectEmotion(video.id).then(() => {
      if (!cancelled) setStage('buffer_card');
    });
    return () => {
      cancelled = true;
    };
  }, [stage, video.id]);

  useEffect(() => {
    if (stage !== 'insight') return;
    const t = setTimeout(() => setStage('result'), 3500);
    return () => clearTimeout(t);
  }, [stage]);

  const handleBufferingDone = (finalStats: BufferStats) => {
    setStats(finalStats);
    setStage('insight');
  };

  // P0.7:用户点击"发送这条评论"后保存评论 + 500ms 后切到 comments stage
  const handleSendComment = (text: string, style: string) => {
    setSentComment({
      id: `mine-${Date.now()}`,
      text,
      style,
      createdAt: Date.now(),
      isMine: true,
    });
    setTimeout(() => setStage('comments'), 500);
  };

  const handleReplay = () => {
    setStats(initialStats);
    setSentComment(null);
    setStage('watching');
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-container-margin py-md">
      <button
        onClick={onExit}
        className="self-start mb-md flex items-center gap-xs text-on-surface-variant hover:text-on-surface transition-colors text-label-sm"
      >
        <span className="material-symbols-outlined text-[18px]">arrow_back_ios</span>
        返回首页
      </button>

      <PhoneFrame>
        <ShortVideoMock dimmed={stage !== 'watching'} video={video} />

        <AnimatePresence mode="wait">
          {stage === 'ai_detecting' && (
            <motion.div
              key="ai_detecting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-30 flex items-end justify-center pb-[28%] px-md pointer-events-none"
            >
              <AIDetectingToast />
            </motion.div>
          )}

          {stage === 'buffer_card' && (
            <motion.div
              key="buffer_card"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-40 flex items-center justify-center bg-background/40 backdrop-blur-[20px] px-md"
            >
              <EmotionBufferCard onStart={() => setStage('buffering')} />
            </motion.div>
          )}

          {stage === 'buffering' && (
            <motion.div
              key="buffering"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-40 flex items-center justify-center bg-background/55 backdrop-blur-[30px] px-md"
            >
              <BufferInteraction onDone={handleBufferingDone} />
            </motion.div>
          )}

          {stage === 'insight' && (
            <motion.div
              key="insight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-40 flex items-center justify-center bg-background/65 backdrop-blur-[36px] px-md"
            >
              <EmotionInsightCard videoId={video.id} />
            </motion.div>
          )}

          {stage === 'result' && (
            <motion.div
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-40 overflow-y-auto bg-background/70 backdrop-blur-[40px]"
            >
              <div className="min-h-full flex flex-col gap-md p-md py-lg">
                <CommentRewriteResult
                  onSendComment={handleSendComment}
                  onCancel={handleReplay}
                  videoId={video.id}
                />
                <CalmResultCard stats={stats} onReplay={handleReplay} />
              </div>
            </motion.div>
          )}

          {stage === 'comments' && sentComment && (
            <motion.div
              key="comments"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-40"
            >
              <CommentSection sentComment={sentComment} onReplay={handleReplay} />
            </motion.div>
          )}
        </AnimatePresence>
      </PhoneFrame>
    </div>
  );
}
