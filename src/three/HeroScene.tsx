import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Stars, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Floating particles
function Particles({ count = 100 }: { count?: number }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      position: [
        (Math.random() - 0.5) * 18,
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 10,
      ] as [number, number, number],
      speed: Math.random() * 0.25 + 0.08,
      offset: Math.random() * Math.PI * 2,
      scale: Math.random() * 0.035 + 0.015,
      colorIndex: Math.floor(Math.random() * 3),
    }));
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    particles.forEach((p, i) => {
      const t = state.clock.elapsedTime * p.speed + p.offset;
      dummy.position.set(
        p.position[0] + Math.sin(t * 0.5) * 0.6,
        p.position[1] + Math.cos(t * 0.4) * 0.4,
        p.position[2] + Math.sin(t * 0.6) * 0.3
      );
      dummy.scale.setScalar(p.scale * (1 + Math.sin(t * 1.5) * 0.25));
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 4, 4]} />
      <meshBasicMaterial color="#00f5ff" transparent opacity={0.35} />
    </instancedMesh>
  );
}

// Orbit ring with skill nodes
function OrbitRing({ radius, speed, color, skillCount, tiltX = 0 }: {
  radius: number;
  speed: number;
  color: string;
  skillCount: number;
  tiltX?: number;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * speed;
    groupRef.current.rotation.x = tiltX + Math.sin(state.clock.elapsedTime * 0.15) * 0.08;
  });

  const nodePositions = useMemo(() => {
    return Array.from({ length: skillCount }, (_, i) => {
      const angle = (i / skillCount) * Math.PI * 2;
      return [Math.cos(angle) * radius, 0, Math.sin(angle) * radius] as [number, number, number];
    });
  }, [radius, skillCount]);

  return (
    <group ref={groupRef}>
      {/* Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.006, 8, 100]} />
        <meshBasicMaterial color={color} transparent opacity={0.25} />
      </mesh>
      {/* Nodes */}
      {nodePositions.map((pos, i) => (
        <SkillNode key={i} position={pos} color={color} index={i} />
      ))}
    </group>
  );
}

function SkillNode({ position, color, index }: {
  position: [number, number, number];
  color: string;
  index: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = -state.clock.elapsedTime * 0.6;
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 2 + index * 0.8) * 0.15;
    meshRef.current.scale.setScalar(pulse);
  });

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <octahedronGeometry args={[0.1, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1}
          transparent
          opacity={0.85}
        />
      </mesh>
      <pointLight color={color} intensity={0.4} distance={1.2} />
    </group>
  );
}

// Central holographic cube — the hero element
function HoloCube() {
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();

  useFrame((state) => {
    if (!groupRef.current) return;
    // Slow auto rotation
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.18;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.12) * 0.08;

    // Smooth mouse parallax
    const targetX = mouse.y * 0.18;
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.04;

    if (innerRef.current) {
      innerRef.current.rotation.y = -state.clock.elapsedTime * 0.5;
      innerRef.current.rotation.z = state.clock.elapsedTime * 0.25;
    }

    if (wireRef.current) {
      wireRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      wireRef.current.rotation.z = -state.clock.elapsedTime * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Outer wireframe cube - subtle */}
      <mesh ref={wireRef}>
        <boxGeometry args={[2.2, 2.2, 2.2]} />
        <meshBasicMaterial color="#00f5ff" wireframe transparent opacity={0.08} />
      </mesh>

      {/* Glass cube body */}
      <mesh>
        <boxGeometry args={[1.8, 1.8, 1.8]} />
        <meshPhysicalMaterial
          color="#020d1f"
          transparent
          opacity={0.35}
          roughness={0.02}
          metalness={0.6}
          reflectivity={0.8}
        />
      </mesh>

      {/* Glowing edges */}
      {[
        // x edges
        [[0.9, 0.9, 0], [-0.9, 0.9, 0]], [[0.9, -0.9, 0], [-0.9, -0.9, 0]],
        [[0.9, 0, 0.9], [-0.9, 0, 0.9]], [[0.9, 0, -0.9], [-0.9, 0, -0.9]],
      ].map((edge, i) => {
        const from = new THREE.Vector3(...edge[0] as [number, number, number]);
        const to = new THREE.Vector3(...edge[1] as [number, number, number]);
        const points = [from, to];
        const geo = new THREE.BufferGeometry().setFromPoints(points);
        return (
          <primitive key={`edge-${i}`} object={new THREE.Line(geo, new THREE.LineBasicMaterial({
            color: i % 2 === 0 ? '#00f5ff' : '#8b5cf6',
            transparent: true,
            opacity: 0.4,
          }))} />
        );
      })}

      {/* Inner distorted core */}
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[0.55, 2]} />
        <MeshDistortMaterial
          color="#8b5cf6"
          emissive="#8b5cf6"
          emissiveIntensity={0.6}
          transparent
          opacity={0.8}
          distort={0.35}
          speed={2.5}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Center glow sphere */}
      <mesh>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
      </mesh>

      {/* Face lights */}
      <pointLight position={[0.9, 0, 0]} color="#00f5ff" intensity={0.6} distance={2.5} />
      <pointLight position={[-0.9, 0, 0]} color="#8b5cf6" intensity={0.6} distance={2.5} />
      <pointLight position={[0, 0.9, 0]} color="#3b82f6" intensity={0.4} distance={2.5} />
      <pointLight position={[0, -0.9, 0]} color="#ec4899" intensity={0.3} distance={2.5} />

      {/* Corner markers */}
      {[
        [0.9, 0.9, 0.9], [-0.9, 0.9, 0.9], [0.9, -0.9, 0.9], [-0.9, -0.9, 0.9],
        [0.9, 0.9, -0.9], [-0.9, 0.9, -0.9], [0.9, -0.9, -0.9], [-0.9, -0.9, -0.9],
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <sphereGeometry args={[0.04, 6, 6]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? '#00f5ff' : '#8b5cf6'}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}

// Scene camera that follows mouse smoothly
function SceneController() {
  const { camera, mouse } = useThree();

  useFrame(() => {
    camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.025;
    camera.position.y += (-mouse.y * 0.3 - camera.position.y) * 0.025;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// Decorative floating rings
function FloatingRings() {
  const refs = [
    useRef<THREE.Mesh>(null),
    useRef<THREE.Mesh>(null),
    useRef<THREE.Mesh>(null),
  ];

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (refs[0].current) {
      refs[0].current.rotation.x = t * 0.28;
      refs[0].current.rotation.z = t * 0.18;
    }
    if (refs[1].current) {
      refs[1].current.rotation.y = t * 0.22;
      refs[1].current.rotation.x = t * 0.14;
    }
    if (refs[2].current) {
      refs[2].current.rotation.z = -t * 0.19;
      refs[2].current.rotation.y = t * 0.26;
    }
  });

  return (
    <group>
      <mesh ref={refs[0]} position={[4, 1.5, -2]}>
        <torusGeometry args={[0.7, 0.018, 8, 50]} />
        <meshBasicMaterial color="#00f5ff" transparent opacity={0.25} />
      </mesh>
      <mesh ref={refs[1]} position={[-4, -1, -1.5]}>
        <torusGeometry args={[1, 0.014, 8, 50]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.22} />
      </mesh>
      <mesh ref={refs[2]} position={[2.5, -2.5, 1]}>
        <torusGeometry args={[0.5, 0.018, 8, 50]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.25} />
      </mesh>
    </group>
  );
}

// Grid ground plane
function GridPlane() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]}>
      <planeGeometry args={[50, 50, 50, 50]} />
      <meshBasicMaterial color="#00f5ff" wireframe transparent opacity={0.03} />
    </mesh>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 55, near: 0.1, far: 100 }}
      dpr={[1, 2]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.2,
      }}
      style={{ background: 'transparent' }}
    >
      <SceneController />

      {/* Base lighting */}
      <ambientLight intensity={0.08} />
      <directionalLight position={[5, 8, 5]} intensity={0.3} color="#ffffff" />

      {/* Colored lights for atmosphere */}
      <pointLight position={[4, 3, 4]} color="#00f5ff" intensity={1.2} distance={12} />
      <pointLight position={[-4, -3, 3]} color="#8b5cf6" intensity={1.2} distance={12} />
      <pointLight position={[0, 0, 6]} color="#3b82f6" intensity={0.5} distance={8} />

      <Suspense fallback={null}>
        {/* Stars */}
        <Stars
          radius={90}
          depth={60}
          count={3500}
          factor={2.5}
          saturation={0.4}
          fade
          speed={0.4}
        />

        {/* Central cube */}
        <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
          <HoloCube />
        </Float>

        {/* Orbit rings */}
        <OrbitRing
          radius={3.4}
          speed={0.22}
          color="#00f5ff"
          skillCount={5}
          tiltX={0.3}
        />
        <OrbitRing
          radius={5}
          speed={-0.14}
          color="#8b5cf6"
          skillCount={7}
          tiltX={-0.4}
        />

        {/* Particles */}
        <Particles count={90} />

        {/* Decorative rings */}
        <FloatingRings />

        {/* Grid floor */}
        <GridPlane />
      </Suspense>
    </Canvas>
  );
}
