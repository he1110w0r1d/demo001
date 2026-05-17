import { motion } from 'framer-motion';
import type { MockVideo } from '../types';
import { mockVideo as defaultVideo } from '../data/mockVideo';
import videoBg from '../assets/video-bg.webp';
import VideoActionBar from './VideoActionBar';
import VideoBottomNav from './VideoBottomNav';

type ShortVideoMockProps = {
  dimmed?: boolean;
  video?: MockVideo;
};

const tabs = ['推荐', '关注', '发现'];

export default function ShortVideoMock({ dimmed, video = defaultVideo }: ShortVideoMockProps) {
  return (
    <div className="absolute inset-0 z-0">
      <motion.img
        src={videoBg}
        alt="模拟短视频画面"
        animate={{ scale: dimmed ? 1.04 : 1, filter: dimmed ? 'brightness(0.55)' : 'brightness(0.8)' }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute top-0 left-0 right-0 z-10 px-md pt-md flex flex-col gap-sm text-white">
        <div className="flex justify-between items-center text-label-sm opacity-80">
          <span>22:08</span>
          <div className="flex items-center gap-xs">
            <span className="material-symbols-outlined text-[16px]">signal_cellular_alt</span>
            <span className="material-symbols-outlined text-[16px]">wifi</span>
            <span>72%</span>
          </div>
        </div>
        <div className="flex justify-center gap-lg text-body-md">
          {tabs.map((t, i) => (
            <span
              key={t}
              className={
                i === 0
                  ? 'font-display font-bold border-b-2 border-white pb-xs'
                  : 'opacity-60 font-display'
              }
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="absolute left-md right-[72px] bottom-[88px] z-10 text-white drop-shadow-md">
        <div className="font-display text-body-lg font-semibold">{video.creator}</div>
        <p className="text-body-md text-white/90 mt-xs line-clamp-2">{video.description}</p>
        <div className="flex gap-xs mt-sm">
          {video.emotionTags.map((t) => (
            <span key={t} className="text-label-sm bg-white/15 backdrop-blur-sm px-xs py-[2px] rounded-full">
              #{t}
            </span>
          ))}
        </div>
      </div>

      <VideoActionBar video={video} />
      <VideoBottomNav />
    </div>
  );
}
