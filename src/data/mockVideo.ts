import type { MockVideo } from '../types';

// 开发文档 §5 + PRD §5: 5 个虚构愤怒场景(无真实平台/人物/事件)
// 每条 video 在 mockAI.ts 中有对应的 emotionAnalysis 与 commentRewrite
export const mockVideos: MockVideo[] = [
  {
    id: 'video_001',
    title: '这件事真的让人看得火大',
    description: '明明是责任问题,却一直没人处理……',
    creator: '@某某用户',
    likes: '12.6万',
    comments: '4623',
    favorites: '2.1万',
    shares: '856',
    topic: '虚构维权场景',
    emotionTags: ['道德愤怒', '不公平感', '无力感'],
  },
  {
    id: 'video_002',
    title: '加班到凌晨,被告知不算工时',
    description: '说好的调休再也没下文,问就是制度规定。',
    creator: '@某打工人',
    likes: '8.3万',
    comments: '3120',
    favorites: '1.4万',
    shares: '612',
    topic: '虚构职场场景',
    emotionTags: ['职场压迫', '委屈', '被消耗感'],
  },
  {
    id: 'video_003',
    title: '小区门口的流浪猫又被人踢了',
    description: '保安全程在场,却没有任何人上前制止。',
    creator: '@某动物志愿者',
    likes: '23.8万',
    comments: '7842',
    favorites: '3.6万',
    shares: '1.2万',
    topic: '虚构宠物场景',
    emotionTags: ['共情愤怒', '心疼', '愤怒'],
  },
  {
    id: 'video_004',
    title: '老人在医院窗口被来回踢皮球',
    description: '从早上排到下午,挂号、缴费、检查全是单独窗口。',
    creator: '@某随手拍',
    likes: '17.4万',
    comments: '5910',
    favorites: '2.8万',
    shares: '993',
    topic: '虚构公共服务场景',
    emotionTags: ['代际共情', '系统性无力感', '愤怒'],
  },
  {
    id: 'video_005',
    title: '退款卡了 21 天,客服只会复读话术',
    description: '问就是"已经反馈到上级",上级永远不出现。',
    creator: '@某消费者',
    likes: '9.1万',
    comments: '4287',
    favorites: '1.0万',
    shares: '438',
    topic: '虚构消费维权场景',
    emotionTags: ['消费维权', '推诿', '上头'],
  },
];

export function getMockVideo(id: string): MockVideo {
  return mockVideos.find((v) => v.id === id) ?? mockVideos[0];
}

// 兼容现有引用:默认指向第一条
export const mockVideo: MockVideo = mockVideos[0];
