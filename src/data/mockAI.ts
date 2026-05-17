import type { CommentRewrite, EmotionAnalysis } from '../types';

// 开发文档 §5 mockEmotionAnalysis — 每个 videoId 一份
export const mockEmotionAnalysisMap: Record<string, EmotionAnalysis> = {
  video_001: {
    emotionType: '道德愤怒',
    intensity: 86,
    triggerMoment: '看到责任被推诿的一刻',
    triggerReason: '视频呈现了明显的不公平感和责任缺位,容易让用户产生愤怒与无力感。',
    aiMessage: '你气的不是视频本身,\n而是"明明不公平,\n却没人负责"的感觉。',
    suggestedBuffer: '怒气团子',
  },
  video_002: {
    emotionType: '职场委屈',
    intensity: 78,
    triggerMoment: '被告知"加班不算工时"的一刻',
    triggerReason: '付出与回报错位,会触发被消耗、被忽视的强烈委屈感。',
    aiMessage: '你气的不是这一次加班,\n而是"我的努力\n被默认免费"的那种感觉。',
    suggestedBuffer: '怒气团子',
  },
  video_003: {
    emotionType: '共情愤怒',
    intensity: 92,
    triggerMoment: '看到弱小被欺负、却无人上前的一刻',
    triggerReason: '面对弱者受伤却无人介入的画面,容易激起强烈的共情愤怒与无力感。',
    aiMessage: '你气的不是猫被踢,\n而是"那么多人在场,\n却没有一个人挡一下"。',
    suggestedBuffer: '怒气团子',
  },
  video_004: {
    emotionType: '系统性无力感',
    intensity: 81,
    triggerMoment: '老人被反复踢皮球的一刻',
    triggerReason: '体验到流程对个体的不友好,会触发对系统的愤怒与代际共情。',
    aiMessage: '你气的不是某个窗口,\n而是"一个老人独自\n面对一整套流程"的画面。',
    suggestedBuffer: '怒气团子',
  },
  video_005: {
    emotionType: '消费推诿愤怒',
    intensity: 74,
    triggerMoment: '听到第 N 次"已上报上级"的一刻',
    triggerReason: '反复话术与无效回应,会让正当诉求变成情绪消耗,引发上头与失控感。',
    aiMessage: '你气的不是这笔退款,\n而是"我明明在讲道理,\n却像在对空气说话"。',
    suggestedBuffer: '怒气团子',
  },
};

// 开发文档 §5 mockCommentRewrite — 每个 videoId 一份(克制 / 有力 / 犀利但不攻击)
export const mockCommentRewriteMap: Record<string, CommentRewrite> = {
  video_001: {
    original: '真是服了!太离谱了!垃圾!无语!!!气死我了!!!!',
    versions: [
      { type: '克制版', text: '这件事最值得关注的,是后续处理是否公开透明。' },
      { type: '有力版', text: '大家愤怒不是因为爱吵,而是因为类似问题一次次出现,却没人真正负责。' },
      { type: '犀利但不攻击版', text: '最让人难受的不是事情发生,而是发生之后依然有人试图轻描淡写。' },
    ],
  },
  video_002: {
    original: '什么破公司!!加班不给钱还要pua,真服了垃圾制度!!',
    versions: [
      { type: '克制版', text: '一份合理的工时与回报机制,是企业最基础的体面。' },
      { type: '有力版', text: '员工不是怕加班,是怕付出之后,连一个明确的说法都得不到。' },
      { type: '犀利但不攻击版', text: '把"制度规定"四个字用得最熟的,往往是最不愿意解释这个制度的人。' },
    ],
  },
  video_003: {
    original: '人渣!这种人就该被打死!保安都是死人吗?!',
    versions: [
      { type: '克制版', text: '希望相关画面能被妥善处理,也希望小区能补上一份明确的处置流程。' },
      { type: '有力版', text: '不需要每个人都去当英雄,但当时多一个人开口,事情就不会是这样。' },
      { type: '犀利但不攻击版', text: '一个社区对待小动物的态度,往往就是它对待"麻烦"的态度。' },
    ],
  },
  video_004: {
    original: '这种医院真该曝光,垃圾流程,垃圾态度,气死人!!',
    versions: [
      { type: '克制版', text: '希望流程的优化,能从最先被流程难住的人开始。' },
      { type: '有力版', text: '一个老人独自跑完一整套窗口,这本来就是流程出了问题,不是他的问题。' },
      { type: '犀利但不攻击版', text: '我们衡量一个系统好不好,看的从来不是它对熟练用户多省事,而是它对最不熟悉它的人有多耐心。' },
    ],
  },
  video_005: {
    original: '真是无语,客服全是机器人,垃圾平台早晚倒闭!!',
    versions: [
      { type: '克制版', text: '希望平台能给一个具体的时间表,而不是反复"已上报上级"。' },
      { type: '有力版', text: '消费者要的不是争吵,是一个能拍板的人愿意出来说一句话。' },
      { type: '犀利但不攻击版', text: '把同一句话术说 21 天,本身就是一种回答,只是不太体面而已。' },
    ],
  },
};

// 兼容现有引用:默认指向第一条
export const mockEmotionAnalysis: EmotionAnalysis = mockEmotionAnalysisMap.video_001;
export const mockCommentRewrite: CommentRewrite = mockCommentRewriteMap.video_001;
