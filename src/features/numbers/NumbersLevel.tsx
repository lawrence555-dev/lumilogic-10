"use client";

import { Canvas } from "@react-three/fiber";
import { Physics, useBox } from "@react-three/cannon";
import { Environment, OrbitControls, RoundedBox } from "@react-three/drei";
import { Suspense, useState, useEffect, useRef } from "react";
import { IdentificationCard, ArrowsClockwise } from "@phosphor-icons/react";

import { useRouter } from "next/navigation";
import clsx from "clsx";

import { ResponsiveCamera } from "@/features/common/ResponsiveCamera";
import { BalanceScale } from "./components/BalanceScale";
import { Pinecone } from "./components/Pinecone";
import StampOverlay from "@/features/passport/StampOverlay";

export default function NumbersLevel() {
    const router = useRouter();
    const [isBalanced, setIsBalanced] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [basketCounts, setBasketCounts] = useState<Set<string>>(new Set());
    const [resetKey, setResetKey] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // WIN LOGIC: Count Based (Robust)
    useEffect(() => {
        // If 3 items in Right Basket
        if (basketCounts.size === 3 && !showSuccess) {
            // Clear existing if any
            if (timerRef.current) clearTimeout(timerRef.current);

            // Start Timer
            timerRef.current = setTimeout(() => {
                setShowSuccess(true);
            }, 1000);
        } else {
            // Reset if condition lost
            if (basketCounts.size !== 3 && timerRef.current) {
                clearTimeout(timerRef.current);
                timerRef.current = null;
            }
        }

        // Cleanup on unmount or dependency change
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [basketCounts, showSuccess]);

    const handleBasketChange = (id: string, inBasket: boolean) => {
        setBasketCounts(prev => {
            const next = new Set(prev);
            if (inBasket) next.add(id);
            else next.delete(id);
            return next;
        });
    };

    const handleStampComplete = () => {
        // 1. Save Progress (Unlock Level 3)
        try {
            const savedStamps = JSON.parse(localStorage.getItem("lumilogic_stamps") || '["spatial"]');
            if (!savedStamps.includes("numbers")) {
                savedStamps.push("numbers");
                localStorage.setItem("lumilogic_stamps", JSON.stringify(savedStamps));
            }
        } catch (e) {
            console.error("Failed to save progress", e);
        }

        // 2. Navigate Home
        router.push("/");
    };

    return (
        <div className={clsx(
            "w-full h-full relative overflow-hidden flex items-center justify-center",
            isDragging ? "cursor-grabbing" : "cursor-grab"
        )}>
            {/* --- UI LAYER --- */}
            {/* Top Bar */}
            <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start z-10 pointer-events-none">
                {/* Left Spacer for Back Button */}
                <div className="w-12" />

                {/* Module Title (Centered) */}
                <div className="flex flex-col items-center">
                    <h1 className="text-3xl font-baloo font-bold text-lumi-wood drop-shadow-sm">Number Sense</h1>
                    <span className="text-lumi-sage font-medium opacity-80">The Forest Balance</span>
                </div>

                {/* Right Actions */}
                <div className="flex gap-4 pointer-events-auto">
                    <button
                        onClick={() => setResetKey(k => k + 1)}
                        className="p-3 bg-white rounded-full shadow-sm hover:scale-105 transition-transform text-lumi-wood flex items-center justify-center"
                        title="Restart Level"
                    >
                        <ArrowsClockwise weight="duotone" className="w-8 h-8" />
                    </button>
                    {/* Home Button Removed - handled by GameContainer */}
                </div>
            </div>

            {/* Success Overlay */}
            <StampOverlay isVisible={showSuccess} onComplete={handleStampComplete} />

            {/* --- 3D SCENE --- */}
            <Canvas camera={{ position: [0, 0.5, 11], fov: 40 }} shadows>
                <ResponsiveCamera defaultZ={11} mobileZ={18} />
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
                        <BalanceScale
                            onBalanceChange={setIsBalanced}
                            forceBalance={basketCounts.size === 3}
                        />

                        {/* --- PINECONES --- */}
                        {/* 1. Left Tray (Pre-filled x3) - Spawn lower and spread out to avoid bounce out */}
                        <Pinecone id="l1" position={[-4.5, 2.5, 0.4]} onDragChange={setIsDragging} />
                        <Pinecone id="l2" position={[-3.5, 2.5, 0.4]} onDragChange={setIsDragging} />
                        <Pinecone id="l3" position={[-4.0, 2.5, -0.4]} onDragChange={setIsDragging} />

                        {/* 2. User Supply (Bottom Area) */}
                        <SupplyShelf position={[0, -2.5, 3]} />
                        {/* A row of pinecones ready to pick - Add Explicit IDs and Basket Tracking */}
                        <Pinecone id="s1" position={[-2.5, -1.8, 3]} onDragChange={setIsDragging} onBasketChange={handleBasketChange} />
                        <Pinecone id="s2" position={[-1.5, -1.8, 3]} onDragChange={setIsDragging} onBasketChange={handleBasketChange} />
                        <Pinecone id="s3" position={[-0.5, -1.8, 3]} onDragChange={setIsDragging} onBasketChange={handleBasketChange} />
                        <Pinecone id="s4" position={[0.5, -1.8, 3]} onDragChange={setIsDragging} onBasketChange={handleBasketChange} />
                        <Pinecone id="s5" position={[1.5, -1.8, 3]} onDragChange={setIsDragging} onBasketChange={handleBasketChange} />
                        <Pinecone id="s6" position={[2.5, -1.8, 3]} onDragChange={setIsDragging} onBasketChange={handleBasketChange} />

                        {/* Extra */}
                        <Pinecone id="extra" position={[3, -3, 2]} />

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
        <mesh ref={ref}>
            <RoundedBox args={[8, 0.5, 2]} radius={0.1} smoothness={4}>
                <meshStandardMaterial color="#8D6E63" transparent opacity={0.8} />
            </RoundedBox>
        </mesh>
    );
}
