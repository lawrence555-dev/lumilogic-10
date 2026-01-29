"use client";

import { Canvas } from "@react-three/fiber";
import { Physics, Debug } from "@react-three/cannon";
import { Environment, OrbitControls } from "@react-three/drei";
import { Suspense, useState } from "react";
import { House, IdentificationCard } from "@phosphor-icons/react";
import Link from "next/link";
import clsx from "clsx";

import { BalanceScale } from "./components/BalanceScale";
import { Pinecone } from "./components/Pinecone";

export default function NumbersLevel() {
    const [score, setScore] = useState(0);

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
                    {/* Placeholder for Passport Trigger */}
                    <button className="p-3 bg-white rounded-full shadow-sm hover:scale-105 transition-transform text-lumi-wood">
                        <IdentificationCard weight="duotone" className="w-8 h-8" />
                    </button>
                </div>
            </div>

            {/* --- 3D SCENE --- */}
            <Canvas camera={{ position: [0, 2, 12], fov: 45 }} shadows>
                {/* Lighting */}
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.5} penumbra={1} intensity={1} castShadow />
                <Environment preset="city" />

                {/* Physics World */}
                <Suspense fallback={null}>
                    <Physics gravity={[0, -9.81, 0]} defaultContactMaterial={{ friction: 0.1, restitution: 0.5 }}>
                        {/* Debug Mode (remove later) */}
                        {/* <Debug color="black" scale={1.1}> */}

                        {/* Ground Plane (Invisible catcher) */}
                        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]}>
                            <planeGeometry args={[100, 100]} />
                            <meshBasicMaterial visible={false} />
                        </mesh>

                        {/* Components */}
                        <BalanceScale />
                        {/* Right Tray Pinecones */}
                        <Pinecone position={[4, 5, 0]} />
                        <Pinecone position={[4.2, 6, 0]} />
                        <Pinecone position={[3.8, 5.5, 0]} />

                        {/* </Debug> */}
                    </Physics>
                </Suspense>

                <OrbitControls makeDefault enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2} />
            </Canvas>
        </div>
    );
}
