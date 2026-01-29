"use client";

import { useSphere } from "@react-three/cannon";
import { useThree, useFrame } from "@react-three/fiber";
import { useDrag } from "@use-gesture/react";
import { useState } from "react";
import * as THREE from "three";

export function Pinecone({ position = [0, 5, 0], onDragChange }: { position?: [number, number, number], onDragChange?: (dragging: boolean) => void }) {
    const { size, viewport } = useThree();

    // Physics Body
    const [ref, api] = useSphere(() => ({
        mass: 1,
        position,
        args: [0.3], // Radius
        linearDamping: 0.5,
        angularDamping: 0.5,
    }));

    // Binding Drag - Absolute Mapping for reliability
    const bind = useDrag(({ xy: [screenX, screenY], active, last, first }) => {
        // Notify Parent
        if (first) onDragChange?.(true);
        if (last) onDragChange?.(false);

        // Map Screen Pixels to World Units (Z=0 Plane)
        const x = (screenX / size.width) * viewport.width - viewport.width / 2;
        const y = -(screenY / size.height) * viewport.height + viewport.height / 2;

        if (active) {
            // Dragging: Move smoothly at Z=5 (Very close to camera for visibility)
            api.position.set(x, y, 5);
            api.velocity.set(0, 0, 0);
            api.angularVelocity.set(0, 0, 0);
            api.wakeUp();
        } else if (last) {
            // Released: Snap to Z=0 (Inside the tray depth)
            api.position.set(x, y, 0);
            api.velocity.set(0, 0, 0);
            api.angularVelocity.set(0, 0, 0);
            api.wakeUp(); // Let gravity take over
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
