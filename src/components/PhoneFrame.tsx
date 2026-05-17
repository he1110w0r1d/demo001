import type { ReactNode } from 'react';

type PhoneFrameProps = {
  children: ReactNode;
};

export default function PhoneFrame({ children }: PhoneFrameProps) {
  return (
    <div className="relative short-video-frame bg-surface rounded-[40px] sm:border-[8px] border-surface-container-highest shadow-[0_0_50px_rgba(0,0,0,0.6)] overflow-hidden">
      {children}
    </div>
  );
}
