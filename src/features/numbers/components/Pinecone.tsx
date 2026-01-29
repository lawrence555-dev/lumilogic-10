"use client";

import { useSphere } from "@react-three/cannon";
import { useThree, useFrame } from "@react-three/fiber";
import { useDrag } from "@use-gesture/react";
import { useState } from "react";
import * as THREE from "three";

export function Pinecone({ position = [0, 5, 0] }: { position?: [number, number, number] }) {
    const { size, viewport } = useThree();
    const aspect = size.width / viewport.width;

    // Physics Body
    const [ref, api] = useSphere(() => ({
        mass: 1,
        position,
        args: [0.3], // Radius
        linearDamping: 0.5,
        angularDamping: 0.5,
    }));

    const [isDragging, setIsDragging] = useState(false);

    // Binding Drag
    const bind = useDrag(({ offset: [x, y], active }) => {
        if (active) {
            setIsDragging(true);
            // Convert 2D screen coordinates to 3D world coordinates
            // Simple mapping: 
            // x / aspect -> World X
            // -y / aspect -> World Y
            const worldX = (x / aspect);
            const worldY = (-y / aspect);

            // Lift it up a bit towards camera (Z=2) to clear collision
            api.position.set(worldX, worldY, 0);
            api.velocity.set(0, 0, 0); // Stop momentum while holding
            api.angularVelocity.set(0, 0, 0);
            // Release: Let gravity take over
            api.wakeUp();
        }
    });

    return (
        // @ts-ignore
        <mesh ref={ref} {...bind()} castShadow>
            {/* Visual: Abstract Pinecone (Icosahedron) */}
            <icosahedronGeometry args={[0.4, 0]} />
            <meshStandardMaterial
                color="#5D4037"
                roughness={0.8}
                flatShading
            />
        </mesh>
    );
}
