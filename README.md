# 情绪缓冲卡 · Emotion Buffer Card

> **不是压住情绪，而是把情绪变成更好的表达。**

短视频场景下的 AI 情绪缓冲与理性表达助手。当用户在信息流中刷到令人愤怒、委屈、上头的内容时，系统在评论冲动的前 10 秒弹出一张轻量卡片，引导用户通过点击"怒气猫"完成情绪缓冲，再由 AI 把冲动情绪转化为有分寸的理性表达。

[![ts](https://img.shields.io/badge/TypeScript-5.6-3178c6.svg)](https://www.typescriptlang.org/) [![react](https://img.shields.io/badge/React-18.3-61dafb.svg)](https://react.dev/) [![vite](https://img.shields.io/badge/Vite-5.4-646cff.svg)](https://vitejs.dev/) [![tailwind](https://img.shields.io/badge/Tailwind-3.4-38bdf8.svg)](https://tailwindcss.com/)

---

## 快速开始

```bash
git clone git@github.com:he1110w0r1d/demo001.git
cd demo001
npm install
npm run dev
```

打开 http://localhost:5173/ （若 5173 被占用 Vite 会自动切到 5174）。

构建产物：

```bash
npm run build      # tsc 类型检查 + vite 生产打包
npm run preview    # 本地预览生产构建
```

---

## 核心体验流程

| 阶段 | 用户动作 | 系统响应 |
|---|---|---|
| **STEP 1** | 在 Landing 页选择一个虚构愤怒场景（维权 / 职场 / 宠物 / 老人 / 消费）进入 Demo | 进入 9:16 短视频窗口，模拟刷到愤怒视频 |
| **STEP 2** | 停留约 2 秒 | AI 检测情绪 → 弹出情绪缓冲卡："这条确实让人火大，先别急着开骂，捏一下？" |
| **STEP 3** | 点击"捏一捏，冷静 10 秒"，10 秒内疯狂点击怒气猫 | 3D 怒气猫按 `progress` 阈值在 **angry → calm → sleep** 之间切换，280ms 交叉淡入淡出。周边火焰、闪电、气泡、星星按情绪渐隐渐显 |
| **STEP 4** | 看到 AI 情绪理解卡 | "你气的不是视频本身，而是'明明不公平、却没人负责'的感觉。" |
| **STEP 5** | 在 Before / After 三档改写中切换 | 克制版 / 有力版 / 犀利但不攻击版，可一键复制、再生成、更克制、更犀利、不评论了 |
| **STEP 6** | 看冷静成果 | 冷静完成度、情绪释放指数、冷静力百分位（"你用 9.8 秒超过全国 73% 用户"）+ 标签（冷静观察员 / 稳健派 / 正在练习） |
| **STEP 7** | 点"发送这条评论" | 跳转到模拟评论区，定位到自己刚发出的理性评论 |

---

## 技术栈

- **前端**：Vite 5 + React 18 + TypeScript 5.6
- **样式**：Tailwind CSS 3 + Material 3 风格令牌（`text-headline-md`、`glow-shadow-primary` 等）
- **动画**：Framer Motion 11（卡片、状态切换、进度条）
- **3D 渲染**：@react-three/fiber + @react-three/drei + three.js
- **3D 资源压缩**：`gltf-transform resize 1024 → webp 纹理 → gltfpack -cc meshopt 几何压缩`，从 205 MB 压到 14.3 MB（**93% 体积削减**）

---

## 目录结构

```
src/
├── App.tsx                       # 路由(landing / demo / angercat 调试页)
├── pages/
│   ├── Landing.tsx               # 首页 + 5 个场景选择卡
│   └── AngerCatDebug.tsx         # 怒气猫单组件调试台
├── components/
│   ├── DemoShell.tsx             # Demo 状态机(7 个 stage)
│   ├── PhoneFrame.tsx            # 9:16 短视频外壳
│   ├── ShortVideoMock.tsx        # 模拟视频画面 + 操作栏
│   ├── VideoActionBar.tsx        # 点赞 / 评论 / 收藏 / 分享
│   ├── VideoBottomNav.tsx        # 底部 Tab
│   ├── AIDetectingToast.tsx      # "AI 正在理解这条内容..."
│   ├── EmotionBufferCard.tsx     # 情绪缓冲卡(核心卡片)
│   ├── BufferInteraction.tsx     # 10 秒互动主界面
│   ├── AngerCat/AngerCat.tsx     # 怒气猫 3D 组件 + SVG 特效层
│   ├── EmotionInsightCard.tsx    # AI 情绪理解卡
│   ├── CommentRewriteResult.tsx  # Before/After 三档改写 + 5 个交互按钮
│   ├── CalmResultCard.tsx        # 冷静成果 + 百分位排名
│   └── CommentSection.tsx        # 模拟评论区(发送闭环目标)
├── data/
│   ├── mockVideo.ts              # 5 条虚构场景
│   └── mockAI.ts                 # 5 套情绪分析 + 评论改写
├── services/
│   └── aiService.ts              # AI 接口抽象层(future-ready,可替换真实 API)
├── styles/globals.css
└── types.ts                      # DemoStage / BufferStats / SentComment 等

public/
└── models/                        # 3D 模型(angry/calm/sleep)
    ├── angry.glb                  # 4.2 MB · progress < 35
    ├── calm.glb                   # 6.0 MB · 35 ≤ progress < 75
    └── sleep.glb                  # 4.1 MB · progress ≥ 75
```

---

## 怒气猫切换逻辑

```ts
function pickModel(progress: number): 'angry' | 'calm' | 'sleep' {
  if (progress < 35) return 'angry';
  if (progress < 75) return 'calm';
  return 'sleep';
}

// progress = clickCount × 4 + elapsedSeconds × 3 (clamped 0-100)
```

跨阈值时同时渲染新旧两个模型，opacity 在 280ms 内 lerp 完成，防止"啪"地一下切换。三个模型在组件挂载时通过 `useGLTF.preload` 预加载，切换不触发网络请求。

---

## 产品安全与边界

- ❌ 不接入任何真实短视频 SDK（抖音、快手、小红书等）
- ❌ 不使用真实平台 Logo 与 UI（仅泛化短视频界面）
- ❌ 全部场景为虚构内容，不指向真实事件、机构或个人
- ❌ 不做"愤怒排行榜"，只做"冷静力百分位"
- ❌ 不宣称心理治疗效果，仅辅助情绪缓冲与表达
- ✅ 结果页底部明确："本结果仅代表本次互动强度，不代表心理诊断。"

---

## 后续路线（V0.5 / V1.0）

- 多种互动方式（长按 / 摇晃手机 / 捏气泡）
- 多情绪类型（愤怒 / 委屈 / 压抑 / 共情 / 道德愤怒）+ 主动入口
- 接入真实 AI API（视频画面理解 + 评论攻击性检测）
- 好友冷静力挑战 + 结果卡截图分享
- 部署到公开 URL（Vercel / EdgeOne Pages）+ 二维码演示页

---

## License

仅用于参赛展示与产品演示。
