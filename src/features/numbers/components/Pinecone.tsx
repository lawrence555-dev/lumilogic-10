"use client";

import { useSphere } from "@react-three/cannon";
import { useThree, useFrame } from "@react-three/fiber";
import { useDrag } from "@use-gesture/react";
import { useState } from "react";
import * as THREE from "three";

export function Pinecone({ position = [0, 5, 0], onDragChange }: { position?: [number, number, number], onDragChange?: (dragging: boolean) => void }) {
    const { size, viewport, camera } = useThree();

    // Physics Body
    const [ref, api] = useSphere(() => ({
        mass: 1,
        position,
        args: [0.3], // Radius
        linearDamping: 0.5,
        angularDamping: 0.5,
    }));

    const [isHeld, setHeld] = useState(false);

    // Binding Drag - Absolute Mapping for reliability
    const bind = useDrag(({ xy: [screenX, screenY], active, last, first }) => {
        // Notify Parent
        if (first) onDragChange?.(true);
        if (last) onDragChange?.(false);

        // Perspective Correction
        const dragZ = 3;
        const cameraZ = camera.position.z;
        const scaleFactor = (cameraZ - dragZ) / cameraZ;

        // Map Screen Pixels to World Units (at Z=3 plane)
        const x = ((screenX / size.width) * viewport.width - viewport.width / 2) * scaleFactor;
        const y = (-(screenY / size.height) * viewport.height + viewport.height / 2) * scaleFactor;

        if (active) {
            setHeld(true);
            // Dragging: Move smoothly at Z=3 (Safe foreground)
            api.position.set(x, y, dragZ);
            api.velocity.set(0, 0, 0);
            api.angularVelocity.set(0, 0, 0);
            api.wakeUp();
        } else if (last) {
            // Released: Snap to Z=0 (Inside the tray depth)

            // SMART ASSIST: Magnetic Snap to Basket Centers
            // If user is roughly over the Right Tray (X=4)
            let finalX = x;
            if (x > 2.5 && x < 5.5) finalX = 4;
            // If user is roughly over the Left Tray (X=-4)
            if (x > -5.5 && x < -2.5) finalX = -4;

            api.position.set(finalX, y, 0);
            api.velocity.set(0, 0, 0);
            api.angularVelocity.set(0, 0, 0);
            api.wakeUp(); // Let gravity take over

            if (last) onDragChange?.(false);
            if (last) setHeld(false);
        }
    });

    return (
        // @ts-ignore
        <mesh
            ref={ref}
            {...bind()}
            castShadow
            scale={isHeld ? 1.2 : 1}
            onPointerOver={() => (document.body.style.cursor = "grab")}
            onPointerOut={() => (document.body.style.cursor = "auto")}
        >
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
