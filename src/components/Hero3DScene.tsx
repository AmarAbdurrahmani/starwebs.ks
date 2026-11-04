import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export const Hero3DScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // Check mobile or low-power screen to prevent unnecessary GPU usage
    const checkIsMobile = () => {
      return window.innerWidth < 768 || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    };

    const initialMobile = checkIsMobile();
    setIsMobile(initialMobile);

    if (initialMobile || !mountRef.current) {
      return;
    }

    const container = mountRef.current;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 600;

    // 1. Scene, Camera, and WebGL Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0b0b0b, 0.04);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(2.5, 0.8, 6.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 2. Studio Lighting Setup (Warm Key + Ambient + Inner Core Glow)
    const ambientLight = new THREE.HemisphereLight(0xff9977, 0x050505, 0.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xff7c4d, 3.2);
    keyLight.position.set(4, 5, 3.5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x70b5f9, 1.2);
    rimLight.position.set(-4, -2, -3);
    scene.add(rimLight);

    const coreLight = new THREE.PointLight(0xff5522, 2.8, 8);
    scene.add(coreLight);

    // 3. Composite 3-12 Part Procedural Monolith Model
    const monolithGroup = new THREE.Group();
    scene.add(monolithGroup);

    // Part 1: Outer Obsidian Faceted Monolith
    const prismGeometry = new THREE.CylinderGeometry(0.65, 1.2, 3.4, 6, 1);
    const obsidianMaterial = new THREE.MeshStandardMaterial({
      color: 0x120d0c,
      roughness: 0.12,
      metalness: 0.88,
      wireframe: false
    });
    const prismMesh = new THREE.Mesh(prismGeometry, obsidianMaterial);
    monolithGroup.add(prismMesh);

    // Part 2: Inner Radiant Amber Core
    const coreGeometry = new THREE.OctahedronGeometry(0.52, 0);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0xff5522,
      emissive: 0xdd6b4d,
      emissiveIntensity: 2.2,
      roughness: 0.2,
      metalness: 0.4
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    monolithGroup.add(coreMesh);

    // Part 3: Orbital Brushed Bronze Gyro Ring
    const ringGeometry = new THREE.TorusGeometry(1.9, 0.035, 16, 72);
    const bronzeMaterial = new THREE.MeshStandardMaterial({
      color: 0xd97554,
      roughness: 0.25,
      metalness: 0.95
    });
    const ringMesh = new THREE.Mesh(ringGeometry, bronzeMaterial);
    ringMesh.rotation.x = Math.PI / 3;
    monolithGroup.add(ringMesh);

    // Part 4: Secondary Orbiting Shards
    const shardGroup = new THREE.Group();
    monolithGroup.add(shardGroup);

    const shardGeometry = new THREE.ConeGeometry(0.2, 0.6, 4);
    const shardMaterial = new THREE.MeshStandardMaterial({
      color: 0x1c1412,
      roughness: 0.2,
      metalness: 0.8
    });

    const shardCount = 4;
    const shards: THREE.Mesh[] = [];
    for (let i = 0; i < shardCount; i++) {
      const shard = new THREE.Mesh(shardGeometry, shardMaterial);
      const angle = (i / shardCount) * Math.PI * 2;
      const radius = 2.2;
      shard.position.set(Math.cos(angle) * radius, (Math.random() - 0.5) * 1.2, Math.sin(angle) * radius);
      shard.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      shardGroup.add(shard);
      shards.push(shard);
    }

    // Part 5: Procedural Floating Ember Particle Constellation
    const particleCount = 140;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 10;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    // Procedural soft circle texture for particles (zero 404 dependencies)
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, 'rgba(255, 150, 100, 1)');
      gradient.addColorStop(0.4, 'rgba(221, 107, 77, 0.6)');
      gradient.addColorStop(1, 'rgba(221, 107, 77, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 32, 32);
    }
    const particleTexture = new THREE.CanvasTexture(canvas);

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.16,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // Initial group offset so it complements the right side of the Hero
    monolithGroup.position.set(1.4, 0, 0);

    // 4. Smooth Damped Mouse Parallax
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 5. Lossless 60fps Animation Loop with Delta Damping
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Exponential smoothing for cursor parallax
      currentMouseX += (targetMouseX - currentMouseX) * (1 - Math.exp(-4 * delta));
      currentMouseY += (targetMouseY - currentMouseY) * (1 - Math.exp(-4 * delta));

      // Monolith floating and rotation
      monolithGroup.rotation.y = time * 0.35 + currentMouseX * 0.4;
      monolithGroup.rotation.x = Math.sin(time * 0.5) * 0.08 - currentMouseY * 0.25;
      monolithGroup.position.y = Math.sin(time * 0.8) * 0.15;

      // Inner core counter-rotation and breathing emissive intensity
      coreMesh.rotation.y = -time * 0.8;
      coreMesh.rotation.z = time * 0.4;
      coreMaterial.emissiveIntensity = 2.0 + Math.sin(time * 2.5) * 0.6;
      coreLight.intensity = 2.5 + Math.sin(time * 2.5) * 0.8;

      // Gyro ring spin
      ringMesh.rotation.z = time * 0.45;

      // Shard orbiting
      shardGroup.rotation.y = -time * 0.2;

      // Particles subtle drift
      particleSystem.rotation.y = time * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      if (checkIsMobile()) {
        setIsMobile(true);
        return;
      }
      const newWidth = container.clientWidth || window.innerWidth;
      const newHeight = container.clientHeight || 600;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup resources to prevent WebGL memory leaks
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      prismGeometry.dispose();
      obsidianMaterial.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      ringGeometry.dispose();
      bronzeMaterial.dispose();
      shardGeometry.dispose();
      shardMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      particleTexture.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // When on mobile, don't mount WebGL at all — zero battery or performance drain
  if (isMobile) {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/3 right-1/4 w-[380px] h-[380px] rounded-full opacity-20 blur-[90px]"
          style={{
            background: 'radial-gradient(circle, rgba(221, 107, 77, 0.45) 0%, transparent 70%)'
          }}
        />
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-80 transition-opacity duration-1000"
      aria-hidden="true"
    />
  );
};
