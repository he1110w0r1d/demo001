import type { MockVideo } from '../types';
import { mockVideo as defaultVideo } from '../data/mockVideo';

type VideoActionBarProps = {
  video?: MockVideo;
};

export default function VideoActionBar({ video = defaultVideo }: VideoActionBarProps) {
  const actions = [
    { icon: 'favorite', count: video.likes, fill: true },
    { icon: 'chat_bubble', count: video.comments, fill: true },
    { icon: 'bookmark', count: video.favorites, fill: false },
    { icon: 'share', count: video.shares, fill: false },
  ];

  return (
    <div className="absolute right-sm bottom-[120px] z-10 flex flex-col items-center gap-md text-white">
      {actions.map((a) => (
        <div key={a.icon} className="flex flex-col items-center gap-xs">
          <span
            className="material-symbols-outlined text-[32px] drop-shadow-md"
            style={a.fill ? { fontVariationSettings: "'FILL' 1" } : undefined}
          >
            {a.icon}
          </span>
          <span className="text-label-sm drop-shadow-md">{a.count}</span>
        </div>
      ))}
    </div>
  );
}
