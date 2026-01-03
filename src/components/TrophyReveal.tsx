import { useRef, Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const TrophyModel = () => {
  const { scene } = useGLTF('/models/trophy.glb');
  const meshRef = useRef<THREE.Group>(null);

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color('#FFD700'),
          metalness: 0.7,
          roughness: 0.3,
          emissive: new THREE.Color('#FFB800'),
          emissiveIntensity: 0.2,
        });
      }
    });
  }, [scene]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <group ref={meshRef} scale={2.5}>
      <primitive object={scene} />
    </group>
  );
};

interface TrophyRevealProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TrophyReveal = ({ isOpen }: TrophyRevealProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black">
      <Canvas camera={{ position: [0, 1, 5], fov: 45 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={1} />
          <directionalLight position={[5, 5, 5]} intensity={2} />
          <directionalLight position={[-5, 3, -5]} intensity={1.5} />
          <pointLight position={[0, 3, 3]} intensity={2} color="#FFD700" />
          <spotLight position={[0, 5, 0]} angle={0.8} intensity={2} color="#ffffff" />
          <TrophyModel />
        </Suspense>
      </Canvas>
    </div>
  );
};

useGLTF.preload('/models/trophy.glb');

export default TrophyReveal;
