import type { CommentRewrite, EmotionAnalysis } from '../types';
import { mockCommentRewriteMap, mockEmotionAnalysisMap } from '../data/mockAI';

// 这一层是为未来接入真实 AI API 预留的 swap-ready 接口。
// 当前阶段返回 mock 数据 + 模拟网络延迟,让 UI 上能看到 "AI 正在思考" 的过渡。
// 未来替换时只需改这两个函数的实现,组件层无需变动。
//
// 二次体验优化:同一 videoId/comment 命中缓存后走短延迟(保留 AI 参与感,不拖节奏)。

const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

const FIRST_DETECTION_MS = 1200;
const REPEAT_DETECTION_MS = 300;
const FIRST_REWRITE_MS = 600;
const REPEAT_REWRITE_MS = 150;

const emotionCache = new Map<string, EmotionAnalysis>();
const rewriteCache = new Map<string, CommentRewrite>();

const FALLBACK_VIDEO_ID = 'video_001';

export async function detectEmotion(videoId: string): Promise<EmotionAnalysis> {
  const cached = emotionCache.get(videoId);
  if (cached) {
    await delay(REPEAT_DETECTION_MS);
    return cached;
  }
  await delay(FIRST_DETECTION_MS);
  const analysis = mockEmotionAnalysisMap[videoId] ?? mockEmotionAnalysisMap[FALLBACK_VIDEO_ID];
  emotionCache.set(videoId, analysis);
  return analysis;
}

export async function rewriteComment(videoId: string): Promise<CommentRewrite> {
  const cached = rewriteCache.get(videoId);
  if (cached) {
    await delay(REPEAT_REWRITE_MS);
    return cached;
  }
  await delay(FIRST_REWRITE_MS);
  const rewrite = mockCommentRewriteMap[videoId] ?? mockCommentRewriteMap[FALLBACK_VIDEO_ID];
  rewriteCache.set(videoId, rewrite);
  return rewrite;
}

