"use client";

import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";
import { Environment, OrbitControls } from "@react-three/drei";
import { Suspense, useState, useEffect } from "react";
import { House, IdentificationCard } from "@phosphor-icons/react";
import Link from "next/link";
import clsx from "clsx";

import { BalanceScale } from "./components/BalanceScale";
import { Pinecone } from "./components/Pinecone";
import StampOverlay from "@/features/passport/StampOverlay";

export default function NumbersLevel() {
    const [isBalanced, setIsBalanced] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
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
        <div className="w-full h-full relative bg-neutral-100 rounded-3xl overflow-hidden shadow-inner flex items-center justify-center">
            {/* --- UI LAYER --- */}
            {/* Top Bar */}
            <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start z-10 pointer-events-none">
                {/* Module Title */}
                <div className="flex flex-col">
                    <h1 className="text-3xl font-baloo font-bold text-lumi-wood drop-shadow-sm">Number Sense</h1>
                    <span className="text-lumi-sage font-medium opacity-80">The Forest Balance</span>
                </div>

                {/* Nav Buttons (Pointer Events Re-enabled) */}
                <div className="flex gap-4 pointer-events-auto">
                    <Link href="/" className="p-3 bg-white rounded-full shadow-sm hover:scale-105 transition-transform text-lumi-wood">
                        <House weight="duotone" className="w-8 h-8" />
                    </Link>
                </div>
            </div>

            {/* Success Overlay */}
            <StampOverlay isVisible={showSuccess} onComplete={handleStampComplete} />

            {/* --- 3D SCENE --- */}
            <Canvas camera={{ position: [0, 2, 14], fov: 40 }} shadows>
                {/* Lighting */}
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.5} penumbra={1} intensity={1} castShadow />
                <Environment preset="city" />

                {/* Physics World */}
                <Suspense fallback={null}>
                    <Physics gravity={[0, -9.81, 0]} defaultContactMaterial={{ friction: 0.1, restitution: 0.1 }}>

                        {/* Ground Plane (Invisible catcher) */}
                        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]}>
                            <planeGeometry args={[100, 100]} />
                            <meshBasicMaterial visible={false} />
                        </mesh>

                        {/* SCALE: Update Logic on Balance */}
                        <BalanceScale onBalanceChange={setIsBalanced} />

                        {/* --- PINECONES --- */}
                        {/* 1. Left Tray (Pre-filled x3) - Spawn above tray */}
                        <Pinecone position={[-4, 2, 0]} />
                        <Pinecone position={[-4.2, 3, 0]} />
                        <Pinecone position={[-3.8, 2.5, 0]} />

                        {/* 2. User Supply (Bottom Area) */}
                        {/* A row of pinecones ready to pick */}
                        <Pinecone position={[-2, -3, 2]} />
                        <Pinecone position={[-1, -3, 2]} />
                        <Pinecone position={[0, -3, 2]} />
                        <Pinecone position={[1, -3, 2]} />
                        <Pinecone position={[2, -3, 2]} />

                        {/* Extra */}
                        <Pinecone position={[3, -3, 2]} />

                    </Physics>
                </Suspense>

                {/* Controls - Limit angles to prevent looking under the table */}
                <OrbitControls
                    makeDefault
                    enableZoom={false}
                    enablePan={false}
                    maxPolarAngle={Math.PI / 2 - 0.1}
                    minPolarAngle={Math.PI / 3}
                />
            </Canvas>
        </div>
    );
}
