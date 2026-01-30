"use client";

import { useCompoundBody, useBox, useCylinder, useHingeConstraint } from "@react-three/cannon";
import { useRef, useEffect, useState } from "react";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

// MATERIALS
const WOOD_COLOR = new THREE.Color("#E0C097");
const SAGE_COLOR = new THREE.Color("#A5D6A7");

export function BalanceScale({ onBalanceChange, forceBalance = false }: { onBalanceChange?: (isBalanced: boolean) => void, forceBalance?: boolean }) {
    // 1. BASE (Static)
    // A vertical post standing on the ground
    const [baseRef] = useCylinder(() => ({
        mass: 0, // Static
        position: [0, -2, 0],
        args: [0.5, 0.8, 4, 16], // [radiusTop, radiusBottom, height, segments]
    }));

    // 2. BEAM (Dynamic - Compound Body)
    // Central beam + 2 Trays (Cups)
    const [beamRef, api] = useCompoundBody(() => ({
        mass: 5, // Heavy enough to be stable
        rotation: [0, 0, 0.25], // Start tilted (Left Heavy) to match initial state
        position: [0, 0.5, 0], // Top of base
        shapes: [
            // Main Beam
            { type: "Box", args: [8, 0.2, 0.5], position: [0, 0, 0] },

            // Left Tray (Cup Base)
            { type: "Box", args: [1.5, 0.2, 1.5], position: [-4, 0.2, 0] },
            // Left Tray Walls (Thicker: 0.2)
            { type: "Box", args: [0.2, 1, 1.5], position: [-4.7, 0.7, 0] }, // Outer
            { type: "Box", args: [0.2, 1, 1.5], position: [-3.3, 0.7, 0] }, // Inner
            { type: "Box", args: [1.3, 1, 0.2], position: [-4, 0.7, 0.7] }, // Front
            { type: "Box", args: [1.3, 1, 0.2], position: [-4, 0.7, -0.7] }, // Back

            // Right Tray (Cup Base)
            { type: "Box", args: [1.5, 0.2, 1.5], position: [4, 0.2, 0] },
            // Right Tray Walls
            { type: "Box", args: [0.2, 1, 1.5], position: [4.7, 0.7, 0] }, // Outer
            { type: "Box", args: [0.2, 1, 1.5], position: [3.3, 0.7, 0] }, // Inner
            { type: "Box", args: [1.3, 1, 0.2], position: [4, 0.7, 0.7] }, // Front
            { type: "Box", args: [1.3, 1, 0.2], position: [4, 0.7, -0.7] }, // Back
        ],
        linearDamping: 0.5,
        angularDamping: 0.5, // Slow down swinging
        onCollideBegin: (e: { body: { name: string } }) => { /* collision start handler */ },
        onCollideEnd: (e: { body: { name: string } }) => { /* collision end handler */ },
    }));

    // Track Rotation
    const rotation = useRef([0, 0, 0]);
    // Effect to subscribe
    // Note: useCompoundBody API subscription
    // We need to use `api.rotation.subscribe` safely
    // Since we are inside the component loop, we should use useEffect
    useEffect(() => {
        const unsubscribe = api.rotation.subscribe((v) => (rotation.current = v));
        return unsubscribe;
    }, [api.rotation]);

    const [isLevel, setIsLevel] = useState(false);

    useFrame(({ clock }) => {
        // Force Balance (Win State Visual)
        if (forceBalance) {
            // Damping rotation to 0
            api.angularVelocity.set(0, 0, 0);
            // Lerp rotation to 0 (Soft Snap)
            const currentTilt = rotation.current[2];
            const nextTilt = THREE.MathUtils.lerp(currentTilt, 0, 0.1);
            api.rotation.set(0, 0, nextTilt);
        }

        // Ignore startup physics settling time (prevents premature win)
        if (clock.elapsedTime < 2) return;

        // Z-axis rotation (Tilt)
        const tilt = rotation.current[2];
        const balanced = Math.abs(tilt) < 0.2; // Relaxed tolerance (~11 deg) for better UX

        if (balanced !== isLevel) {
            setIsLevel(balanced);
            onBalanceChange?.(balanced);
        }
    });

    // 3. HINGE CONSTRAINT (Connect Beam Center to Base Top)
    useHingeConstraint(baseRef, beamRef, {
        pivotA: [0, 2, 0], // Top of base cylinder (height 4, center at -2 -> top is at 0)
        pivotB: [0, 0, 0], // Center of beam
        axisA: [0, 0, 1], // Rotate around Z axis (Tilt Left/Right)
        axisB: [0, 0, 1],
    });

    return (
        <group>
            {/* Visual Mesh for Base */}

            <mesh ref={baseRef}>
                <cylinderGeometry args={[0.5, 0.8, 4, 32]} />
                <meshStandardMaterial color="#8D6E63" />
            </mesh>

            {/* Visual Mesh for Beam & Trays */}
            {/* Note: This MUST match the physics shapes manually or iterate. 
                For simplicity in Kid's App, constructing a group that follows the physics body. */}

            <group ref={beamRef}>
                {/* Main Beam */}
                <RoundedBox args={[8, 0.2, 0.5]} radius={0.05} smoothness={4}>
                    <meshPhysicalMaterial
                        color={WOOD_COLOR}
                        clearcoat={1}
                        clearcoatRoughness={0.1}
                        roughness={0.2}
                    />
                </RoundedBox>

                {/* Left Tray Visual */}
                <group position={[-4, 0.2, 0]}>
                    <TrayVisual color={WOOD_COLOR} />
                </group>

                {/* Right Tray Visual */}
                <group position={[4, 0.2, 0]}>
                    <TrayVisual color={WOOD_COLOR} />
                </group>

                <mesh position={[0, 0, 0.3]}>
                    <circleGeometry args={[0.3, 32]} />
                    <meshStandardMaterial
                        color={SAGE_COLOR}
                        emissive={SAGE_COLOR}
                        emissiveIntensity={isLevel ? 2 : 0}
                        toneMapped={false}
                    />
                </mesh>
            </group>

            {/* Tilt Limiters (Invisible) */}
            <Stoppers />
        </group>
    );
}

function Stoppers() {
    // Left Stopper
    useBox(() => ({ mass: 0, position: [-3, -1.5, 0], args: [0.5, 2, 0.5] }));
    // Right Stopper
    useBox(() => ({ mass: 0, position: [3, -1.5, 0], args: [0.5, 2, 0.5] }));

    return null; // Invisible physics bodies
}

function TrayVisual({ color }: { color: THREE.Color }) {
    const materialProps = {
        color,
        clearcoat: 1,
        roughness: 0.2
    };

    return (
        <group>
            {/* Base */}
            <RoundedBox args={[1.5, 0.2, 1.5]} radius={0.05} smoothness={4}>
                <meshPhysicalMaterial {...materialProps} />
            </RoundedBox>
            {/* Walls */}
            <RoundedBox args={[0.1, 1, 1.5]} position={[-0.7, 0.5, 0]} radius={0.02}><meshPhysicalMaterial {...materialProps} /></RoundedBox>
            <RoundedBox args={[0.1, 1, 1.5]} position={[0.7, 0.5, 0]} radius={0.02}><meshPhysicalMaterial {...materialProps} /></RoundedBox>
            <RoundedBox args={[1.3, 1, 0.1]} position={[0, 0.5, 0.7]} radius={0.02}><meshPhysicalMaterial {...materialProps} /></RoundedBox>
            <RoundedBox args={[1.3, 1, 0.1]} position={[0, 0.5, -0.7]} radius={0.02}><meshPhysicalMaterial {...materialProps} /></RoundedBox>
        </group>
    );
}
