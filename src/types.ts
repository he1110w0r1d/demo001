// 状态机:开发文档 §3 定义的 6 阶段 + P0.7 评论闭环 1 阶段
export type DemoStage =
  | 'watching'      // 用户正在看模拟短视频
  | 'ai_detecting'  // AI 正在分析视频情绪
  | 'buffer_card'   // 弹出情绪缓冲卡
  | 'buffering'     // 用户点击怒气团子(10 秒互动)
  | 'insight'       // AI 给出情绪理解
  | 'result'        // 展示理性表达结果与冷静完成度
  | 'comments';     // 评论已发送,展示模拟评论区

// 怒气团子的 4 个视觉状态(由 progress 0-100 派生)
export type DumplingMood = 'furious' | 'cooling' | 'softening' | 'calm';

export function getDumplingMood(progress: number): DumplingMood {
  if (progress < 30) return 'furious';
  if (progress < 60) return 'cooling';
  if (progress < 90) return 'softening';
  return 'calm';
}

export type AngerDumplingProps = {
  progress: number;     // 0-100
  clickCount: number;
  onClick: () => void;
};

// AngerCat:SVG 分层动画角色,与 AngerDumpling 同形 props,断点 25/55/80
export type CatMood = 'furious' | 'cooling' | 'softening' | 'calm';

export function getCatMood(progress: number): CatMood {
  if (progress < 25) return 'furious';
  if (progress < 55) return 'cooling';
  if (progress < 80) return 'softening';
  return 'calm';
}

export type AngerCatProps = {
  progress: number;      // 0-100,冷静进度
  clickCount: number;    // 点击次数
  onClick: () => void;   // 点击角色
  disabled?: boolean;
};

// 10 秒互动产出的统计数据
export type BufferStats = {
  clickCount: number;
  duration: number;     // 实际经过的秒数
  releaseScore: number; // 情绪释放指数 0-100
  calmProgress: number; // 冷静完成度 0-100
};

// 用户最终发送的评论(P0.7 评论闭环)
export type SentComment = {
  id: string;
  text: string;
  style: string;
  createdAt: number;
  isMine: true;
};

// 评论改写的版本类型(开发文档 §5 mockCommentRewrite)
export type RewriteVersion = {
  type: '克制版' | '有力版' | '犀利但不攻击版';
  text: string;
};

export type CommentRewrite = {
  original: string;
  versions: RewriteVersion[];
};

export type EmotionAnalysis = {
  emotionType: string;
  intensity: number;     // 0-100
  triggerMoment: string;
  triggerReason: string;
  aiMessage: string;
  suggestedBuffer: string;
};

export type MockVideo = {
  id: string;
  title: string;
  description: string;
  creator: string;
  likes: string;
  comments: string;
  favorites: string;
  shares: string;
  topic: string;
  emotionTags: string[];
};
