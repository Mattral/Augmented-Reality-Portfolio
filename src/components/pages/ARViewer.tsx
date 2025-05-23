
import { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Text } from '@react-three/drei';
import { motion } from 'framer-motion';
import { RotateCcw, Move, ZoomIn, ZoomOut, Settings, Box } from 'lucide-react';
import * as THREE from 'three';
import NeuralNetwork3D from '../NeuralNetwork3D';

// Simple 3D Model Component
function InteractiveModel({ modelType }: { modelType: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current && modelType !== 'neural-network') {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  if (modelType === 'neural-network') {
    return (
      <group>
        <NeuralNetwork3D />
        <Text
          position={[0, -4, 0]}
          fontSize={0.5}
          color="#00d4ff"
          anchorX="center"
          anchorY="middle"
        >
          Neural Network Dashboard
        </Text>
      </group>
    );
  }

  const getModelGeometry = () => {
    switch (modelType) {
      case 'cube':
        return <boxGeometry args={[2, 2, 2]} />;
      case 'sphere':
        return <sphereGeometry args={[1.5, 32, 32]} />;
      case 'torus':
        return <torusGeometry args={[1.5, 0.5, 16, 100]} />;
      default:
        return <boxGeometry args={[2, 2, 2]} />;
    }
  };

  return (
    <group>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.1 : 1}
      >
        {getModelGeometry()}
        <meshStandardMaterial 
          color={hovered ? "#00d4ff" : "#8b5cf6"} 
          metalness={0.8}
          roughness={0.2}
          emissive={hovered ? "#001a2e" : "#000000"}
        />
      </mesh>
      
      <Text
        position={[0, 3, 0]}
        fontSize={0.5}
        color="#00d4ff"
        anchorX="center"
        anchorY="middle"
      >
        Interactive 3D Model
      </Text>
    </group>
  );
}

// Loading Component
function LoadingSpinner() {
  const spinnerRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (spinnerRef.current) {
      spinnerRef.current.rotation.z += 0.1;
    }
  });

  return (
    <mesh ref={spinnerRef}>
      <torusGeometry args={[1, 0.3, 8, 24]} />
      <meshBasicMaterial color="#00d4ff" wireframe />
    </mesh>
  );
}

export default function ARViewer() {
  const [selectedModel, setSelectedModel] = useState('neural-network');
  const [controlsEnabled, setControlsEnabled] = useState(true);
  const [showControls, setShowControls] = useState(true);

  const models = [
    { id: 'neural-network', name: 'Neural Network', description: 'Interactive 3D neural network visualization' },
    { id: 'cube', name: 'Cube', description: 'Basic geometric cube' },
    { id: 'sphere', name: 'Sphere', description: 'Perfect sphere geometry' },
    { id: 'torus', name: 'Torus', description: 'Donut-shaped torus' }
  ];

  const resetCamera = () => {
    // This would reset the camera position
    console.log('Camera reset');
  };

  return (
    <div className="min-h-screen pt-16 bg-space-gradient relative">
      {/* Header */}
      <div className="absolute top-20 left-0 right-0 z-10">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-gradient mb-2">AR Experience</h1>
            <p className="text-gray-300">Interact with 3D models in real-time</p>
          </motion.div>
        </div>
      </div>

      {/* 3D Canvas */}
      <div className="absolute inset-0 pt-16">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 45 }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
          
          <Suspense fallback={<LoadingSpinner />}>
            <InteractiveModel modelType={selectedModel} />
            <ContactShadows
              position={[0, -3, 0]}
              opacity={0.4}
              scale={10}
              blur={2}
              far={4}
            />
            <Environment preset="night" />
          </Suspense>
          
          {controlsEnabled && (
            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              minDistance={3}
              maxDistance={15}
            />
          )}
        </Canvas>
      </div>

      {/* Control Panel */}
      <motion.div
        className="absolute bottom-8 left-8 glass-card p-4 rounded-xl"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="flex items-center space-x-4 mb-4">
          <Settings className="text-neon-blue" size={20} />
          <span className="text-white font-semibold">Controls</span>
          <button
            onClick={() => setShowControls(!showControls)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {showControls ? 'Hide' : 'Show'}
          </button>
        </div>

        {showControls && (
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex space-x-2">
              <button
                onClick={resetCamera}
                className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg transition-colors"
                title="Reset Camera"
              >
                <RotateCcw size={16} />
              </button>
              <button
                onClick={() => setControlsEnabled(!controlsEnabled)}
                className={`p-2 rounded-lg transition-colors ${
                  controlsEnabled 
                    ? 'bg-neon-blue text-space-dark' 
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
                title="Toggle Controls"
              >
                <Move size={16} />
              </button>
            </div>

            <div className="text-sm text-gray-400">
              <p>• Drag to rotate</p>
              <p>• Scroll to zoom</p>
              <p>• Right-click to pan</p>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Model Selector */}
      <motion.div
        className="absolute bottom-8 right-8 glass-card p-4 rounded-xl"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h3 className="text-white font-semibold mb-3 flex items-center space-x-2">
          <Box className="text-neon-blue" size={20} />
          <span>3D Models</span>
        </h3>
        
        <div className="space-y-2">
          {models.map((model) => (
            <button
              key={model.id}
              onClick={() => setSelectedModel(model.id)}
              className={`w-full text-left p-3 rounded-lg transition-all ${
                selectedModel === model.id
                  ? 'bg-neon-blue/20 border border-neon-blue/30 text-neon-blue'
                  : 'bg-white/5 hover:bg-white/10 text-gray-300'
              }`}
            >
              <div className="font-medium">{model.name}</div>
              <div className="text-sm opacity-70">{model.description}</div>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Instructions Overlay */}
      <motion.div
        className="absolute top-32 right-8 glass-card p-4 rounded-xl max-w-xs"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <h4 className="text-white font-semibold mb-2">AR Instructions</h4>
        <div className="text-sm text-gray-300 space-y-1">
          <p>🖱️ Click and drag to rotate the model</p>
          <p>🔍 Use mouse wheel to zoom in/out</p>
          <p>📱 On mobile: Use touch gestures</p>
          <p>🎯 Hover over the model for interaction</p>
        </div>
      </motion.div>
    </div>
  );
}
