import { useState, useRef, useCallback, Suspense, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment, Float } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';
import * as THREE from 'three';

// Audio context for dynamic sounds
let audioContext: AudioContext | null = null;

const getAudioContext = () => {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  return audioContext;
};

// Generate synth sounds
const playClickSound = (velocity: number) => {
  const ctx = getAudioContext();
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);
  
  // Higher pitch with higher velocity
  oscillator.frequency.setValueAtTime(400 + velocity * 20, ctx.currentTime);
  oscillator.type = 'sine';
  
  gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
  
  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + 0.1);
};

const playTickSound = (velocity: number) => {
  const ctx = getAudioContext();
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);
  
  // Tick sound - higher pitch when spinning faster
  oscillator.frequency.setValueAtTime(800 + velocity * 50, ctx.currentTime);
  oscillator.type = 'square';
  
  gainNode.gain.setValueAtTime(0.05, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.02);
  
  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + 0.02);
};

const playFanfare = () => {
  const ctx = getAudioContext();
  const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
  
  notes.forEach((freq, i) => {
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.15);
    oscillator.type = 'triangle';
    
    gainNode.gain.setValueAtTime(0, ctx.currentTime + i * 0.15);
    gainNode.gain.linearRampToValueAtTime(0.2, ctx.currentTime + i * 0.15 + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.15 + 0.4);
    
    oscillator.start(ctx.currentTime + i * 0.15);
    oscillator.stop(ctx.currentTime + i * 0.15 + 0.5);
  });
};

// Confetti particle component
interface ConfettiProps {
  position: [number, number, number];
  color: string;
  velocity: THREE.Vector3;
}

const Confetti = ({ position, color, velocity }: ConfettiProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialVelocity = useRef(velocity.clone());
  const life = useRef(1);
  
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.position.x += initialVelocity.current.x * delta;
      meshRef.current.position.y += initialVelocity.current.y * delta;
      meshRef.current.position.z += initialVelocity.current.z * delta;
      
      // Gravity
      initialVelocity.current.y -= 15 * delta;
      
      // Rotation
      meshRef.current.rotation.x += 5 * delta;
      meshRef.current.rotation.z += 3 * delta;
      
      // Fade out
      life.current -= delta * 0.5;
      if (life.current > 0) {
        (meshRef.current.material as THREE.MeshBasicMaterial).opacity = life.current;
      }
    }
  });
  
  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[0.08, 0.08, 0.02]} />
      <meshBasicMaterial color={color} transparent opacity={1} />
    </mesh>
  );
};

// Trophy Model Component
interface TrophyModelProps {
  onVelocityChange: (v: number) => void;
}

const TrophyModel = ({ onVelocityChange }: TrophyModelProps) => {
  const { scene } = useGLTF('/models/trophy.glb');
  const meshRef = useRef<THREE.Group>(null);
  const [velocity, setVelocity] = useState(1);
  const [scale, setScale] = useState(1);
  const [confetti, setConfetti] = useState<Array<{ id: number; position: [number, number, number]; color: string; velocity: THREE.Vector3 }>>([]);
  const lastTickRef = useRef(0);
  const confettiIdRef = useRef(0);
  
  // Apply gold material to trophy
  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color('#FFD700'),
          metalness: 0.8,
          roughness: 0.2,
          emissive: new THREE.Color('#FFB800'),
          emissiveIntensity: 0.3,
        });
      }
    });
  }, [scene]);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      // Rotate based on velocity
      meshRef.current.rotation.y += velocity * delta;
      
      // Floating bob
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
      
      // Apply friction - slow down to base speed
      if (velocity > 1) {
        const newVelocity = velocity * 0.985;
        setVelocity(Math.max(1, newVelocity));
        onVelocityChange(newVelocity);
        
        // Play tick sounds based on rotation
        const tickInterval = Math.max(0.05, 0.3 / velocity);
        if (state.clock.elapsedTime - lastTickRef.current > tickInterval) {
          playTickSound(velocity);
          lastTickRef.current = state.clock.elapsedTime;
        }
      }
      
      // Lerp scale back to 1
      if (scale !== 1) {
        setScale((prev) => THREE.MathUtils.lerp(prev, 1, 0.15));
      }
      
      // Clean old confetti
      setConfetti((prev) => prev.filter((c) => confettiIdRef.current - c.id < 50));
    }
  });
  
  const handleClick = useCallback((e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    
    // Squash and stretch
    setScale(0.85);
    setTimeout(() => setScale(1.15), 50);
    
    // Add velocity
    const newVelocity = Math.min(velocity + 8, 40);
    setVelocity(newVelocity);
    onVelocityChange(newVelocity);
    
    // Play click sound
    playClickSound(newVelocity);
    
    // Emit confetti
    const colors = ['#FFD700', '#FF9F0A', '#B046FA', '#64D2FF', '#A0FF03'];
    const newConfetti = Array.from({ length: 8 }, () => {
      confettiIdRef.current++;
      return {
        id: confettiIdRef.current,
        position: [
          (Math.random() - 0.5) * 0.5,
          0.5 + Math.random() * 0.5,
          (Math.random() - 0.5) * 0.5,
        ] as [number, number, number],
        color: colors[Math.floor(Math.random() * colors.length)],
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 8,
          3 + Math.random() * 5,
          (Math.random() - 0.5) * 8
        ),
      };
    });
    
    setConfetti((prev) => [...prev, ...newConfetti]);
  }, [velocity, onVelocityChange]);
  
  return (
    <group>
      <Float speed={2} rotationIntensity={0} floatIntensity={0.3}>
        <group
          ref={meshRef}
          scale={scale * 2}
          onClick={handleClick}
          onPointerOver={() => document.body.style.cursor = 'pointer'}
          onPointerOut={() => document.body.style.cursor = 'default'}
        >
          <primitive object={scene} />
        </group>
      </Float>
      
      {/* Confetti particles */}
      {confetti.map((c) => (
        <Confetti key={c.id} position={c.position} color={c.color} velocity={c.velocity} />
      ))}
    </group>
  );
};

// Scene lighting - Enhanced for better trophy visibility
const SceneLighting = () => {
  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={2} color="#ffffff" />
      <directionalLight position={[-5, 3, -5]} intensity={1.2} color="#ffffff" />
      <directionalLight position={[0, 5, 0]} intensity={1.5} color="#FFD700" />
      <pointLight position={[0, 3, 3]} intensity={2} color="#FFD700" />
      <pointLight position={[3, 0, 3]} intensity={1} color="#FFB800" />
      <pointLight position={[-3, 0, 3]} intensity={1} color="#FFB800" />
      {/* Rim light */}
      <spotLight
        position={[0, -3, 5]}
        angle={0.6}
        penumbra={1}
        intensity={2}
        color="#FFD700"
      />
      {/* Top spotlight */}
      <spotLight
        position={[0, 5, 0]}
        angle={0.8}
        penumbra={0.5}
        intensity={2.5}
        color="#ffffff"
      />
    </>
  );
};

// Camera controller for motion blur effect
const CameraController = ({ velocity }: { velocity: number }) => {
  const { camera } = useThree();
  
  useFrame(() => {
    // Subtle camera shake at high speeds
    if (velocity > 15) {
      const shake = (velocity - 15) * 0.001;
      camera.position.x = Math.sin(Date.now() * 0.01) * shake;
      camera.position.y = Math.cos(Date.now() * 0.015) * shake + 0.5;
    } else {
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, 0, 0.1);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0.5, 0.1);
    }
  });
  
  return null;
};

interface TrophyRevealProps {
  isOpen: boolean;
  onClose: () => void;
  score?: number;
  title?: string;
}

export const TrophyReveal = ({ isOpen, onClose, score = 7.5, title = "Practice Complete!" }: TrophyRevealProps) => {
  const [velocity, setVelocity] = useState(1);
  const [hasPlayedFanfare, setHasPlayedFanfare] = useState(false);
  
  useEffect(() => {
    if (isOpen && !hasPlayedFanfare) {
      // Small delay for fanfare
      const timeout = setTimeout(() => {
        playFanfare();
        setHasPlayedFanfare(true);
      }, 300);
      return () => clearTimeout(timeout);
    }
    if (!isOpen) {
      setHasPlayedFanfare(false);
    }
  }, [isOpen, hasPlayedFanfare]);
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={onClose}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          {/* Main container */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 30 }}
            transition={{
              type: "spring",
              damping: 15,
              stiffness: 200,
              duration: 0.5,
            }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl h-[80vh] mx-4 rounded-[32px] overflow-hidden bg-black"
          >
            {/* Close button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </motion.button>
            
            {/* Title */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute top-8 left-0 right-0 text-center z-10"
            >
              <h2 className="text-3xl font-bold text-white tracking-tight">{title}</h2>
              <p className="text-white/60 mt-2 text-sm">Tap the trophy to celebrate!</p>
            </motion.div>
            
            {/* 3D Canvas */}
            <div className="absolute inset-0">
              <Canvas camera={{ position: [0, 0.5, 4], fov: 45 }}>
                <Suspense fallback={null}>
                  <SceneLighting />
                  <TrophyModel onVelocityChange={setVelocity} />
                  <CameraController velocity={velocity} />
                  <Environment preset="city" />
                </Suspense>
              </Canvas>
            </div>
            
            {/* Speed indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: velocity > 2 ? 1 : 0 }}
              className="absolute top-24 left-1/2 -translate-x-1/2 z-10"
            >
              <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm rounded-full px-4 py-2">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span className="text-white text-sm font-medium">
                  Speed: {Math.round(velocity)}x
                </span>
              </div>
            </motion.div>
            
            {/* Score display */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="absolute bottom-0 left-0 right-0 p-8 text-center"
              style={{
                background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)',
              }}
            >
              <div className="inline-flex items-center gap-4 bg-black/40 backdrop-blur-md rounded-2xl px-8 py-4">
                <div className="text-left">
                  <p className="text-white/60 text-sm uppercase tracking-wider">Your Score</p>
                  <p className="text-5xl font-bold text-white">{score}</p>
                </div>
                <div className="w-px h-12 bg-white/20" />
                <div className="text-left">
                  <p className="text-white/60 text-sm uppercase tracking-wider">Band</p>
                  <p className="text-5xl font-bold" style={{ color: '#FFD700' }}>
                    {score >= 7 ? 'Good' : score >= 5.5 ? 'OK' : 'Keep Going'}
                  </p>
                </div>
              </div>
              
              {/* Action button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="mt-6 px-8 py-3 rounded-xl font-semibold text-white transition-all haptic-btn"
                style={{
                  background: 'linear-gradient(180deg, #6BC236 0%, #4A9A1E 100%)',
                  boxShadow: '0 4px 0 #2D5A10, 0 8px 20px rgba(107, 194, 54, 0.3)',
                }}
              >
                Continue Practice
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Preload the model
useGLTF.preload('/models/trophy.glb');

export default TrophyReveal;
