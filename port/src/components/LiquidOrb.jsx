import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Environment, Float, Sphere, Lightformer } from '@react-three/drei';

const Orb = () => {
    const mesh = useRef();
    
    useFrame((state, delta) => {
        mesh.current.rotation.x += delta * 0.1;
        mesh.current.rotation.y += delta * 0.15;
    });

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
            <mesh ref={mesh} scale={1.8}>
                {/* Complex geometry to make it look a bit more organic than a perfect sphere */}
                <icosahedronGeometry args={[1, 16]} />
                <MeshTransmissionMaterial 
                    backside
                    backsideThickness={1}
                    thickness={1.5}
                    roughness={0.05}
                    transmission={1}
                    ior={1.4}
                    chromaticAberration={0.15}
                    anisotropy={0.2}
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                    color="#ffffff"
                />
            </mesh>
        </Float>
    );
};

const BackgroundShapes = () => {
    const shape1 = useRef();
    const shape2 = useRef();
    const shape3 = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        shape1.current.position.y = 2 + Math.sin(t) * 1;
        shape1.current.position.x = -3 + Math.cos(t) * 1;
        
        shape2.current.position.y = -1 + Math.sin(t * 0.8) * 1.5;
        shape2.current.position.x = 4 + Math.cos(t * 0.8) * 0.5;

        shape3.current.position.y = -3 + Math.sin(t * 1.2) * 1;
        shape3.current.position.x = -1 + Math.cos(t * 1.2) * 2;
    });

    return (
        <>
            <Sphere ref={shape1} args={[1.2, 32, 32]} position={[-3, 2, -6]}>
                <meshBasicMaterial color="#ff0055" />
            </Sphere>
            <Sphere ref={shape2} args={[1.5, 32, 32]} position={[4, -1, -8]}>
                <meshBasicMaterial color="#00ffcc" />
            </Sphere>
            <Sphere ref={shape3} args={[2, 32, 32]} position={[-1, -3, -10]}>
                <meshBasicMaterial color="#5500ff" />
            </Sphere>
        </>
    );
}

const LiquidOrb = () => {
    return (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
                <ambientLight intensity={1} />
                <directionalLight position={[10, 10, 5]} intensity={2} />
                
                <BackgroundShapes />
                <Orb />
                
                <Environment resolution={256}>
                    <group rotation={[-Math.PI / 4, -0.3, 0]}>
                        <Lightformer intensity={3} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
                        <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[20, 0.1, 1]} />
                        <Lightformer rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={[20, 0.5, 1]} />
                        <Lightformer rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 1, 1]} />
                    </group>
                </Environment>
            </Canvas>
        </div>
    );
};

export default LiquidOrb;
