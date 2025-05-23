
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Line } from '@react-three/drei';
import * as THREE from 'three';

// Neural Network 3D Visualization Component
export default function NeuralNetwork3D() {
  const networkRef = useRef<THREE.Group>(null);

  // Generate neural network nodes and connections
  const networkData = useMemo(() => {
    const layers = [4, 6, 6, 3]; // Input, Hidden1, Hidden2, Output
    const nodes: Array<{ position: [number, number, number]; layer: number; index: number }> = [];
    const connections: Array<{ start: [number, number, number]; end: [number, number, number]; weight: number }> = [];

    let nodeId = 0;
    
    // Generate nodes for each layer
    layers.forEach((nodeCount, layerIndex) => {
      const layerX = (layerIndex - layers.length / 2) * 3;
      
      for (let i = 0; i < nodeCount; i++) {
        const nodeY = (i - (nodeCount - 1) / 2) * 1.5;
        const position: [number, number, number] = [layerX, nodeY, 0];
        nodes.push({ position, layer: layerIndex, index: nodeId++ });
      }
    });

    // Generate connections between adjacent layers
    let currentNodeIndex = 0;
    for (let layerIndex = 0; layerIndex < layers.length - 1; layerIndex++) {
      const currentLayerSize = layers[layerIndex];
      const nextLayerSize = layers[layerIndex + 1];
      
      for (let i = 0; i < currentLayerSize; i++) {
        for (let j = 0; j < nextLayerSize; j++) {
          const startNode = nodes[currentNodeIndex + i];
          const endNode = nodes[currentNodeIndex + currentLayerSize + j];
          const weight = Math.random() * 2 - 1; // Random weight between -1 and 1
          
          connections.push({
            start: startNode.position,
            end: endNode.position,
            weight
          });
        }
      }
      currentNodeIndex += currentLayerSize;
    }

    return { nodes, connections };
  }, []);

  // Animate the network
  useFrame((state) => {
    if (networkRef.current) {
      networkRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group ref={networkRef}>
      {/* Render connections */}
      {networkData.connections.map((connection, index) => (
        <Line
          key={`connection-${index}`}
          points={[connection.start, connection.end]}
          color={connection.weight > 0 ? "#00d4ff" : "#ff4444"}
          lineWidth={Math.abs(connection.weight) * 3 + 0.5}
          transparent
          opacity={0.6}
        />
      ))}
      
      {/* Render nodes */}
      {networkData.nodes.map((node, index) => (
        <group key={`node-${index}`} position={node.position}>
          <mesh>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial 
              color={
                node.layer === 0 ? "#00ff88" : // Input layer - green
                node.layer === networkData.nodes.length - 1 ? "#ff8800" : // Output layer - orange
                "#8b5cf6" // Hidden layers - purple
              }
              emissive={
                node.layer === 0 ? "#004422" :
                node.layer === networkData.nodes.length - 1 ? "#442200" :
                "#2d1b69"
              }
            />
          </mesh>
          
          {/* Node labels for first and last layer */}
          {(node.layer === 0 || node.layer === 3) && (
            <Text
              position={[0, -0.4, 0]}
              fontSize={0.12}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
            >
              {node.layer === 0 ? `Input ${node.index + 1}` : `Output ${node.index - 13}`}
            </Text>
          )}
        </group>
      ))}
      
      {/* Layer labels */}
      <Text
        position={[-4.5, 3, 0]}
        fontSize={0.3}
        color="#00ff88"
        anchorX="center"
        anchorY="middle"
      >
        Input Layer
      </Text>
      
      <Text
        position={[-1.5, 3, 0]}
        fontSize={0.3}
        color="#8b5cf6"
        anchorX="center"
        anchorY="middle"
      >
        Hidden 1
      </Text>
      
      <Text
        position={[1.5, 3, 0]}
        fontSize={0.3}
        color="#8b5cf6"
        anchorX="center"
        anchorY="middle"
      >
        Hidden 2
      </Text>
      
      <Text
        position={[4.5, 3, 0]}
        fontSize={0.3}
        color="#ff8800"
        anchorX="center"
        anchorY="middle"
      >
        Output Layer
      </Text>
    </group>
  );
}
