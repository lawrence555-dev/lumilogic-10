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

        // Ray-Plane Intersection (for perfect alignment at Z=3)
        // 1. Convert Screen Pixels to NDC (-1 to +1)
        const ndcX = (screenX / size.width) * 2 - 1;
        const ndcY = -(screenY / size.height) * 2 + 1;

        // 2. Cast Ray from Camera
        const vector = new THREE.Vector3(ndcX, ndcY, 0.5);
        vector.unproject(camera);
        const dir = vector.sub(camera.position).normalize();

        // 3. Find Intersection with Plane Z=3
        const targetZ = 3;
        const distance = (targetZ - camera.position.z) / dir.z;
        const pos = camera.position.clone().add(dir.multiplyScalar(distance));

        const x = pos.x;
        const y = pos.y;

        if (active) {
            setHeld(true);
            // Dragging: Move smoothly at Z=3 (Safe foreground)
            api.position.set(x, y, targetZ);
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
