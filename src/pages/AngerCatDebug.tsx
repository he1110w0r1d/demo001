import { useEffect, useState } from 'react';
import AngerCat from '../components/AngerCat/AngerCat';
import { getCatMood } from '../types';

export default function AngerCatDebug({ onExit }: { onExit: () => void }) {
  const [progress, setProgress] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const [auto, setAuto] = useState(false);

  useEffect(() => {
    if (!auto) return;
    const id = setInterval(() => {
      setProgress((p) => (p >= 100 ? 0 : Math.min(100, p + 1)));
    }, 60);
    return () => clearInterval(id);
  }, [auto]);

  const mood = getCatMood(progress);

  return (
    <div className="min-h-screen w-full p-md flex flex-col items-center gap-md bg-gradient-to-b from-pink-50 via-purple-50 to-blue-50">
      <div className="w-full max-w-[480px] flex items-center justify-between">
        <button
          onClick={onExit}
          className="px-md py-xs rounded-md bg-white/70 text-sm text-gray-700 border border-gray-200"
        >
          ← 返回
        </button>
        <h1 className="text-headline-sm font-display text-gray-800">AngerCat 调试台</h1>
        <span className="w-12" />
      </div>

      <div className="w-full max-w-[320px] aspect-square bg-white/40 rounded-3xl p-md backdrop-blur-sm shadow-sm flex items-center justify-center">
        <AngerCat
          progress={progress}
          clickCount={clickCount}
          onClick={() => setClickCount((c) => c + 1)}
        />
      </div>

      <div className="w-full max-w-[480px] flex flex-col gap-md p-md rounded-2xl bg-white/60 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">progress</span>
          <span className="text-lg font-mono font-bold text-pink-600">{progress}</span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={progress}
          onChange={(e) => setProgress(Number(e.target.value))}
          className="w-full"
        />

        <div className="grid grid-cols-2 gap-sm">
          <div className="p-sm rounded-lg bg-white/70">
            <div className="text-xs text-gray-500">当前 mood</div>
            <div className="text-lg font-bold text-purple-600">{mood}</div>
          </div>
          <div className="p-sm rounded-lg bg-white/70">
            <div className="text-xs text-gray-500">clickCount</div>
            <div className="text-lg font-bold text-blue-600">{clickCount}</div>
          </div>
        </div>

        <div className="flex gap-sm">
          <button
            onClick={() => setClickCount((c) => c + 1)}
            className="flex-1 py-sm rounded-lg bg-pink-500 text-white font-medium"
          >
            模拟点击
          </button>
          <button
            onClick={() => {
              setProgress(0);
              setClickCount(0);
              setAuto(false);
            }}
            className="flex-1 py-sm rounded-lg bg-gray-200 text-gray-700 font-medium"
          >
            重置
          </button>
          <button
            onClick={() => setAuto((a) => !a)}
            className={`flex-1 py-sm rounded-lg font-medium ${auto ? 'bg-purple-500 text-white' : 'bg-purple-100 text-purple-700'}`}
          >
            {auto ? '停止' : '自动 0→100'}
          </button>
        </div>

        <div className="grid grid-cols-4 gap-xs text-xs">
          {[0, 50, 75, 100].map((v) => (
            <button
              key={v}
              onClick={() => setProgress(v)}
              className="py-xs rounded bg-gray-100 hover:bg-gray-200"
            >
              {v}%
            </button>
          ))}
        </div>

        <p className="text-xs text-gray-500 leading-relaxed">
          0% 红温炸毛 · 50% 降温/软化 · 75% 半闭眼 · 100% 闭眼微笑牛奶猫
        </p>
      </div>
    </div>
  );
}
