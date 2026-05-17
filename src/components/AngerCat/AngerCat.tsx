import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Bounds, ContactShadows, useGLTF } from '@react-three/drei';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import * as THREE from 'three';
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { type AngerCatProps, getCatMood } from '../../types';

export { getCatMood };

// 3 个 glb 模型按 progress 阈值切换 + 250ms 交叉淡入淡出:
// - angry  : progress <  35
// - calm   : 35 ≤ progress < 75
// - sleep  : progress ≥ 75
const MODEL_URLS = {
  angry: '/models/angry.glb',
  calm: '/models/calm.glb',
  sleep: '/models/sleep.glb',
} as const;

type ModelKey = keyof typeof MODEL_URLS;

function pickModel(progress: number): ModelKey {
  if (progress < 35) return 'angry';
  if (progress < 75) return 'calm';
  return 'sleep';
}

const C = {
  angerOrange: '#F97316',
  flameYellow: '#FBBF24',
  starYellow: '#FDE68A',
  calmPurple: '#A78BFA',
  blush: '#FDA4AF',
};

const FLAMES = [
  { x: 30, y: 200, s: 1.0, delay: 0 },
  { x: 290, y: 195, s: 1.1, delay: 0.15 },
  { x: 38, y: 130, s: 0.7, delay: 0.3 },
  { x: 282, y: 130, s: 0.75, delay: 0.1 },
];
const LIGHTNINGS = [
  { points: '20,80 30,105 22,108 36,140', delay: 0 },
  { points: '296,80 286,105 298,108 282,140', delay: 0.2 },
];
const BUBBLES = [
  { x: 32, y: 165, r: 8, delay: 0 },
  { x: 288, y: 175, r: 10, delay: 0.4 },
  { x: 45, y: 90, r: 6, delay: 0.8 },
  { x: 278, y: 95, r: 7, delay: 0.2 },
  { x: 22, y: 240, r: 9, delay: 0.6 },
];
const STARS = [
  { x: 30, y: 60, s: 1, delay: 0 },
  { x: 285, y: 55, s: 1.2, delay: 0.3 },
  { x: 18, y: 165, s: 0.8, delay: 0.6 },
  { x: 300, y: 165, s: 0.9, delay: 0.9 },
  { x: 38, y: 270, s: 0.7, delay: 1.2 },
];

function Star({ x, y, s = 1, fill }: { x: number; y: number; s?: number; fill: string }) {
  return (
    <path
      d={`M ${x} ${y - 8 * s} L ${x + 2 * s} ${y - 2 * s} L ${x + 8 * s} ${y} L ${x + 2 * s} ${y + 2 * s} L ${x} ${y + 8 * s} L ${x - 2 * s} ${y + 2 * s} L ${x - 8 * s} ${y} L ${x - 2 * s} ${y - 2 * s} Z`}
      fill={fill}
    />
  );
}

function CatMesh({
  modelUrl,
  progress,
  pulseTick,
  fadeOpacity,
  visible,
}: {
  modelUrl: string;
  progress: number;
  pulseTick: number;
  fadeOpacity: number; // 0-1,由父组件按交叉淡入淡出控制
  visible: boolean;
}) {
  const gltf = useGLTF(modelUrl, undefined, true, (loader) => {
    loader.setMeshoptDecoder(MeshoptDecoder);
  });
  const wrapper = useRef<THREE.Group>(null!);
  const inner = useRef<THREE.Group>(null!);
  const pulse = useRef(0);
  const meshMaterials = useRef<THREE.Material[]>([]);

  // 朝向修正 + 收集所有 material 用于后续 opacity lerp
  useEffect(() => {
    if (!gltf.scene || !inner.current) return;
    // 新 3 个 glb(angry/calm/sleep)默认朝向已正对观众,无需旋转
    inner.current.rotation.y = 0;

    const collected: THREE.Material[] = [];
    gltf.scene.traverse((o: THREE.Object3D) => {
      const mesh = o as THREE.Mesh;
      if (mesh.isMesh && mesh.material) {
        const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        mats.forEach((m: THREE.Material) => {
          m.transparent = true; // 必须开,否则 opacity 不生效
          m.depthWrite = true;
          m.side = THREE.FrontSide;
          m.needsUpdate = true;
          collected.push(m);
        });
      }
    });
    meshMaterials.current = collected;
  }, [gltf.scene]);

  useEffect(() => {
    pulse.current = 1;
  }, [pulseTick]);

  useFrame((state, dt) => {
    const g = wrapper.current;
    if (!g) return;
    const { pointer, clock } = state;

    // 把 fadeOpacity 同步到所有材质(交叉淡入淡出的核心)
    for (const m of meshMaterials.current) {
      m.opacity = fadeOpacity;
    }

    const targetX = -pointer.y * 0.28;
    const targetY = pointer.x * 0.5;
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, targetX, 0.1);
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, targetY, 0.1);

    const breath = Math.sin(clock.elapsedTime * 1.4) * 0.018;
    pulse.current = THREE.MathUtils.lerp(pulse.current, 0, dt * 4.5);
    const s = pulse.current;
    g.scale.set(
      1 + breath + s * 0.14,
      1 + breath - s * 0.22,
      1 + breath + s * 0.14,
    );

    if (progress < 30) {
      g.position.x = Math.sin(clock.elapsedTime * 22) * 0.025;
    } else {
      g.position.x = THREE.MathUtils.lerp(g.position.x, 0, 0.12);
    }
  });

  return (
    <group ref={wrapper} visible={visible}>
      <group ref={inner}>
        <primitive object={gltf.scene} />
      </group>
    </group>
  );
}

function MoodLights({ progress }: { progress: number }) {
  const warm = useRef<THREE.PointLight>(null!);
  const cool = useRef<THREE.PointLight>(null!);
  const rim = useRef<THREE.PointLight>(null!);

  useFrame(() => {
    const t = Math.max(0, Math.min(1, progress / 100));
    if (warm.current) warm.current.intensity = THREE.MathUtils.lerp(8, 0.4, t);
    if (cool.current) cool.current.intensity = THREE.MathUtils.lerp(0.2, 5, t);
    if (rim.current) rim.current.intensity = THREE.MathUtils.lerp(2, 3.5, t);
  });

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 4]} intensity={1.1} />
      <pointLight ref={warm} position={[-2.2, 1.2, 2.5]} color="#F97316" intensity={8} distance={8} />
      <pointLight ref={cool} position={[2.2, 1.5, 2.5]} color="#A78BFA" intensity={0.2} distance={8} />
      <pointLight ref={rim} position={[0, 3, -2]} color="#FFFFFF" intensity={2} distance={6} />
    </>
  );
}

function LoadingFallback() {
  return (
    <mesh>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshStandardMaterial color="#FCA5A5" wireframe />
    </mesh>
  );
}

export default function AngerCat({ progress, clickCount, onClick, disabled }: AngerCatProps) {
  const [pulseTick, setPulseTick] = useState(0);

  // 当前应显示的模型 + 上一帧模型(交叉淡入淡出用)
  const targetKey = pickModel(progress);
  const [currentKey, setCurrentKey] = useState<ModelKey>(targetKey);
  const [previousKey, setPreviousKey] = useState<ModelKey | null>(null);
  const [fadeStart, setFadeStart] = useState<number>(0);
  const [, forceTick] = useState(0);
  const FADE_MS = 280;

  useEffect(() => {
    if (targetKey !== currentKey) {
      setPreviousKey(currentKey);
      setCurrentKey(targetKey);
      setFadeStart(performance.now());
    }
  }, [targetKey, currentKey]);

  // 淡入淡出动画期间持续刷新 opacity
  useEffect(() => {
    if (previousKey == null) return;
    let raf = 0;
    const tick = () => {
      const t = (performance.now() - fadeStart) / FADE_MS;
      if (t >= 1) {
        setPreviousKey(null);
        return;
      }
      forceTick((n) => n + 1);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [previousKey, fadeStart]);

  const fadeT = previousKey == null ? 1 : Math.min(1, (performance.now() - fadeStart) / FADE_MS);
  const currentOpacity = fadeT;
  const previousOpacity = 1 - fadeT;

  const raw = useMotionValue(progress);
  useEffect(() => {
    raw.set(progress);
  }, [progress, raw]);
  const smooth = useSpring(raw, { stiffness: 80, damping: 22, mass: 0.6 });

  const flameOp = useTransform(smooth, [0, 30, 60], [1, 0.5, 0]);
  const lightningOp = useTransform(smooth, [0, 30, 55], [1, 0.5, 0]);
  const bubbleOp = useTransform(smooth, [40, 70, 100], [0, 0.8, 1]);
  const starOp = useTransform(smooth, [60, 85, 100], [0, 0.7, 1]);
  const auraOp = useTransform(smooth, [0, 100], [0.85, 0.55]);

  const auraR = useTransform(smooth, [0, 30, 70, 100], [239, 249, 167, 147]);
  const auraG = useTransform(smooth, [0, 30, 70, 100], [68, 115, 139, 197]);
  const auraB = useTransform(smooth, [0, 30, 70, 100], [68, 22, 250, 253]);
  const auraBg = useMotionTemplate`radial-gradient(circle at 50% 55%, rgba(${auraR}, ${auraG}, ${auraB}, 0.55) 0%, rgba(${auraR}, ${auraG}, ${auraB}, 0) 65%)`;

  const handleClick = () => {
    if (disabled) return;
    setPulseTick((t) => t + 1);
    onClick();
  };

  return (
    <div
      className="relative mx-auto select-none"
      style={{ width: 280, height: 280 }}
      data-click-count={clickCount}
    >
      <motion.div
        aria-hidden
        className="absolute -inset-8 pointer-events-none"
        style={{ background: auraBg, opacity: auraOp, filter: 'blur(10px)' }}
      />

      <div
        className="relative w-full h-full"
        onClick={handleClick}
        style={{ cursor: disabled ? 'default' : 'pointer' }}
      >
        <Canvas
          camera={{ position: [0, 0.3, 3.5], fov: 35 }}
          dpr={[1, 2]}
          gl={{ alpha: true, antialias: true }}
          shadows
        >
          <Suspense fallback={<LoadingFallback />}>
            <MoodLights progress={progress} />
            <Bounds fit clip observe margin={1.3} key={currentKey}>
              <CatMesh
                key={`current-${currentKey}`}
                modelUrl={MODEL_URLS[currentKey]}
                progress={progress}
                pulseTick={pulseTick}
                fadeOpacity={currentOpacity}
                visible={true}
              />
            </Bounds>
            {previousKey && (
              <CatMesh
                key={`prev-${previousKey}`}
                modelUrl={MODEL_URLS[previousKey]}
                progress={progress}
                pulseTick={pulseTick}
                fadeOpacity={previousOpacity}
                visible={true}
              />
            )}
            <ContactShadows position={[0, -1.1, 0]} opacity={0.4} blur={2.4} far={3} resolution={512} />
          </Suspense>
        </Canvas>
      </div>

      <svg
        viewBox="0 0 320 320"
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden
      >
        <motion.g style={{ opacity: starOp }}>
          {STARS.map((s, i) => (
            <motion.g
              key={`star-${i}`}
              animate={{ scale: [0.8, 1.1, 0.8], rotate: [0, 20, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, delay: s.delay, ease: 'easeInOut' }}
              style={{ transformOrigin: `${s.x}px ${s.y}px` }}
            >
              <Star x={s.x} y={s.y} s={s.s} fill={C.starYellow} />
            </motion.g>
          ))}
          <motion.path
            d="M 30 290 C 25 283 15 283 15 292 C 15 300 30 307 30 307 C 30 307 45 300 45 292 C 45 283 35 283 30 290 Z"
            fill={C.blush}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
            style={{ transformOrigin: '30px 295px' }}
          />
        </motion.g>

        <motion.g style={{ opacity: bubbleOp }}>
          {BUBBLES.map((b, i) => (
            <motion.g
              key={`bub-${i}`}
              animate={{ y: [-4, 4, -4] }}
              transition={{ repeat: Infinity, duration: 3, delay: b.delay, ease: 'easeInOut' }}
            >
              <circle cx={b.x} cy={b.y} r={b.r} fill={C.calmPurple} fillOpacity={0.4} />
              <circle cx={b.x - b.r * 0.3} cy={b.y - b.r * 0.3} r={b.r * 0.3} fill="#FFFFFF" fillOpacity={0.7} />
            </motion.g>
          ))}
        </motion.g>

        <motion.g style={{ opacity: lightningOp }}>
          {LIGHTNINGS.map((l, i) => (
            <motion.polyline
              key={`lt-${i}`}
              points={l.points}
              fill="none"
              stroke={C.flameYellow}
              strokeWidth={3}
              strokeLinecap="round"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 0.7, delay: l.delay }}
            />
          ))}
        </motion.g>

        <motion.g style={{ opacity: flameOp }}>
          {FLAMES.map((f, i) => (
            <motion.g
              key={`fl-${i}`}
              animate={{ y: [0, -6, 0], scale: [f.s, f.s * 1.1, f.s] }}
              transition={{ repeat: Infinity, duration: 0.8, delay: f.delay, ease: 'easeInOut' }}
              style={{ transformOrigin: `${f.x}px ${f.y}px` }}
            >
              <path
                d={`M ${f.x} ${f.y + 14} C ${f.x - 10} ${f.y + 6} ${f.x - 8} ${f.y - 4} ${f.x - 2} ${f.y - 10} C ${f.x} ${f.y - 4} ${f.x + 3} ${f.y - 8} ${f.x + 4} ${f.y - 14} C ${f.x + 12} ${f.y - 4} ${f.x + 10} ${f.y + 8} ${f.x} ${f.y + 14} Z`}
                fill={C.angerOrange}
              />
              <path
                d={`M ${f.x} ${f.y + 10} C ${f.x - 5} ${f.y + 4} ${f.x - 4} ${f.y - 2} ${f.x - 1} ${f.y - 6} C ${f.x + 1} ${f.y - 2} ${f.x + 3} ${f.y - 4} ${f.x + 3} ${f.y - 8} C ${f.x + 7} ${f.y - 2} ${f.x + 6} ${f.y + 6} ${f.x} ${f.y + 10} Z`}
                fill={C.flameYellow}
              />
            </motion.g>
          ))}
        </motion.g>
      </svg>
    </div>
  );
}

// 预加载 3 个模型,避免切换时空白
useGLTF.preload(MODEL_URLS.angry);
useGLTF.preload(MODEL_URLS.calm);
useGLTF.preload(MODEL_URLS.sleep);

