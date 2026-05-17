const navItems = [
  { icon: 'home', label: '首页' },
  { icon: 'search', label: '发现' },
  { icon: 'add_circle', label: '', isCenter: true },
  { icon: 'mail', label: '消息' },
  { icon: 'person', label: '我' },
];

export default function VideoBottomNav() {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-10 px-md pb-md pt-sm bg-gradient-to-t from-black/70 to-transparent">
      <div className="mb-sm flex items-center gap-sm bg-white/10 backdrop-blur-md rounded-full px-md py-xs">
        <span className="material-symbols-outlined text-white/70 text-[20px]">edit</span>
        <span className="text-label-sm text-white/70">说点想说的……</span>
      </div>
      <div className="flex justify-between items-center text-white/80">
        {navItems.map((n) => (
          <div key={n.icon} className="flex flex-col items-center gap-[2px]">
            <span
              className={
                n.isCenter
                  ? 'material-symbols-outlined text-[36px] text-primary'
                  : 'material-symbols-outlined text-[22px]'
              }
            >
              {n.icon}
            </span>
            {n.label && <span className="text-[10px]">{n.label}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
