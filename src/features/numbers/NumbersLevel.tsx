"use client";

import { Canvas } from "@react-three/fiber";
import { Physics, useBox } from "@react-three/cannon";
import { Environment, OrbitControls, RoundedBox } from "@react-three/drei";
import { Suspense, useState, useEffect } from "react";
import { House, IdentificationCard, ArrowsClockwise } from "@phosphor-icons/react";
import Link from "next/link";
import clsx from "clsx";

import { BalanceScale } from "./components/BalanceScale";
import { Pinecone } from "./components/Pinecone";
import StampOverlay from "@/features/passport/StampOverlay";

export default function NumbersLevel() {
    const [isBalanced, setIsBalanced] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [resetKey, setResetKey] = useState(0);
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

    // WIN LOGIC: 1.5s Hold
    useEffect(() => {
        if (isBalanced && !showSuccess) {
            // Start Timer
            const t = setTimeout(() => {
                setShowSuccess(true);
                // Play Sound here
            }, 1500);
            setTimer(t);
        } else {
            // Cancel Timer if balance lost
            if (timer) clearTimeout(timer);
        }

        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [isBalanced, showSuccess]);

    const handleStampComplete = () => {
        // Navigate or Update State
        // For now, just close overlay or redirect
    };

    return (
        <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
            {/* --- UI LAYER --- */}
            {/* Top Bar */}
            <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start z-10 pointer-events-none">
                {/* Module Title */}
                <div className="flex flex-col">
                    <h1 className="text-3xl font-baloo font-bold text-lumi-wood drop-shadow-sm">Number Sense</h1>
                    <span className="text-lumi-sage font-medium opacity-80">The Forest Balance</span>
                </div>

                <div className="flex gap-4 pointer-events-auto">
                    <button
                        onClick={() => setResetKey(k => k + 1)}
                        className="p-3 bg-white rounded-full shadow-sm hover:scale-105 transition-transform text-lumi-wood flex items-center justify-center"
                        title="Restart Level"
                    >
                        <ArrowsClockwise weight="duotone" className="w-8 h-8" />
                    </button>

                    <Link href="/" className="p-3 bg-white rounded-full shadow-sm hover:scale-105 transition-transform text-lumi-wood">
                        <House weight="duotone" className="w-8 h-8" />
                    </Link>
                </div>
            </div>

            {/* Success Overlay */}
            <StampOverlay isVisible={showSuccess} onComplete={handleStampComplete} />

            {/* --- 3D SCENE --- */}
            <Canvas camera={{ position: [0, 0.5, 11], fov: 40 }} shadows>
                {/* Lighting */}
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.5} penumbra={1} intensity={1} castShadow />
                <Environment preset="city" />

                {/* Physics World */}
                <Suspense fallback={null}>
                    <Physics key={resetKey} gravity={[0, -9.81, 0]} defaultContactMaterial={{ friction: 0.1, restitution: 0.1 }}>

                        {/* Ground Plane (Invisible catcher) */}
                        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]}>
                            <planeGeometry args={[100, 100]} />
                            <meshBasicMaterial visible={false} />
                        </mesh>

                        {/* SCALE: Update Logic on Balance */}
                        <BalanceScale onBalanceChange={setIsBalanced} />

                        {/* --- PINECONES --- */}
                        {/* 1. Left Tray (Pre-filled x3) - Spawn lower and spread out to avoid bounce out */}
                        <Pinecone position={[-4.5, 2.5, 0.4]} onDragChange={setIsDragging} />
                        <Pinecone position={[-3.5, 2.5, 0.4]} onDragChange={setIsDragging} />
                        <Pinecone position={[-4.0, 2.5, -0.4]} onDragChange={setIsDragging} />

                        {/* 2. User Supply (Bottom Area) */}
                        <SupplyShelf position={[0, -2.5, 3]} />
                        {/* A row of pinecones ready to pick */}
                        <Pinecone position={[-2.5, -1.8, 3]} onDragChange={setIsDragging} />
                        <Pinecone position={[-1.5, -1.8, 3]} onDragChange={setIsDragging} />
                        <Pinecone position={[-0.5, -1.8, 3]} onDragChange={setIsDragging} />
                        <Pinecone position={[0.5, -1.8, 3]} onDragChange={setIsDragging} />
                        <Pinecone position={[1.5, -1.8, 3]} onDragChange={setIsDragging} />
                        <Pinecone position={[2.5, -1.8, 3]} onDragChange={setIsDragging} />

                        {/* Extra */}
                        <Pinecone position={[3, -3, 2]} />

                    </Physics>
                </Suspense>

                {/* Controls - Limit angles to prevent looking under the table */}
                <OrbitControls
                    makeDefault
                    enableZoom={false}
                    enablePan={false}
                    enabled={!isDragging}
                    maxPolarAngle={Math.PI / 2 - 0.1}
                    minPolarAngle={Math.PI / 4}
                />
            </Canvas>
        </div>
    );
}

function SupplyShelf({ position }: { position: [number, number, number] }) {
    const [ref] = useBox(() => ({
        mass: 0,
        position,
        args: [8, 0.5, 2], // Large shelf
    }));

    return (
        <mesh ref={ref as any}>
            <RoundedBox args={[8, 0.5, 2]} radius={0.1} smoothness={4}>
                <meshStandardMaterial color="#8D6E63" transparent opacity={0.8} />
            </RoundedBox>
        </mesh>
    );
}
