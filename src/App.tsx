import { useEffect, useState } from 'react';
import Landing from './pages/Landing';
import DemoShell from './components/DemoShell';
import AngerCatDebug from './pages/AngerCatDebug';

type Route = 'landing' | 'demo' | 'angercat';

export default function App() {
  const [route, setRoute] = useState<Route>(
    typeof window !== 'undefined' && window.location.hash === '#angercat' ? 'angercat' : 'landing'
  );
  const [videoId, setVideoId] = useState<string>('video_001');

  useEffect(() => {
    const onHash = () => {
      if (window.location.hash === '#angercat') setRoute('angercat');
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const goLanding = () => {
    if (window.location.hash) window.history.replaceState(null, '', window.location.pathname);
    setRoute('landing');
  };

  const handleEnter = (selectedVideoId: string) => {
    setVideoId(selectedVideoId);
    setRoute('demo');
  };

  return (
    <div className="min-h-screen w-full">
      {route === 'landing' && <Landing onEnter={handleEnter} />}
      {route === 'demo' && <DemoShell onExit={() => setRoute('landing')} videoId={videoId} />}
      {route === 'angercat' && <AngerCatDebug onExit={goLanding} />}
    </div>
  );
}
