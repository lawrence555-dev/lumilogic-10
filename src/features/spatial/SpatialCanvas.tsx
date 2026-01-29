"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Stage, Float, RoundedBox, Html, Text, Center } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { HandPointing, CheckCircle, Star } from "@phosphor-icons/react";
import { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import clsx from "clsx";

// --- Game Constants ---
const TARGET_AZIMUTH = 0;
const WIN_TOLERANCE = 0.14; // ~8 degrees (Match)
const HOT_TOLERANCE = 0.35; // ~20 degrees (Green/Hot)
const WARM_TOLERANCE = 0.8;  // ~45 degrees (Yellow/Warm)

const SAGE_COLOR = new THREE.Color("#A5D6A7");
const WOOD_COLOR = new THREE.Color("#E0C097");
const WHITE_COLOR = new THREE.Color("#FFFFFF");

// --- Components ---

function StarMarker() {
    // Using Text as a clean, geometry-based "Decal" substitute
    return (
        <Text
            position={[0, 0, 0.51]}
            fontSize={0.5}
            color="#A5D6A7" // Sage color star
            anchorX="center"
            anchorY="middle"
        >
            ★
        </Text>
    );
}

function GameLogic({
    onSuccess,
    setFeedback
}: {
    onSuccess: () => void,
    setFeedback: (s: 'neutral' | 'warm' | 'hot') => void
}) {
    const { controls } = useThree();
    const [isSuccess, setIsSuccess] = useState(false);

    // Refs
    const isLockedRef = useRef(true);
    const hasInitializedRef = useRef(false);
    const cubeMaterialRef = useRef<THREE.MeshStandardMaterial>(null);
    const lastFeedbackRef = useRef<'neutral' | 'warm' | 'hot'>('neutral');

    // Initialization & Demo Sequence
    useEffect(() => {
        // 1. Start at Target (SHOW GOAL)
        // @ts-ignore
        if (controls) {
            // @ts-ignore
            controls.setAzimuthalAngle(TARGET_AZIMUTH);
            // @ts-ignore
            controls.update();
        }

        // 2. Wait 1.5s then Scramble
        const scrambleTimer = setTimeout(() => {
            // @ts-ignore
            if (controls) {
                const randomAngle = (Math.random() < 0.5 ? -1 : 1) * (Math.PI / 2 + Math.random());
                // @ts-ignore
                controls.setAzimuthalAngle(randomAngle);
                // @ts-ignore
                controls.update();
                console.log("Scrambled to:", randomAngle);
            }
            isLockedRef.current = false;
        }, 1500);

        return () => clearTimeout(scrambleTimer);
    }, [controls]);

    useFrame(() => {
        if (isSuccess) {
            // Spin effect on win
            // @ts-ignore
            if (controls) controls.autoRotate = true;
            // @ts-ignore
            if (controls) controls.autoRotateSpeed = 20;
            return;
        }

        // @ts-ignore
        const currentAzimuth = controls?.getAzimuthalAngle?.();

        if (currentAzimuth !== undefined) {
            // Initialization Check (Wait for scramble to take effect)
            if (!hasInitializedRef.current) {
                if (Math.abs(currentAzimuth) > 0.5) {
                    hasInitializedRef.current = true;
                }
                return;
            }

            const error = Math.abs(currentAzimuth - TARGET_AZIMUTH);

            // 1. Determine Feedback State
            let feedback: 'neutral' | 'warm' | 'hot' = 'neutral';
            if (error < HOT_TOLERANCE) feedback = 'hot';
            else if (error < WARM_TOLERANCE) feedback = 'warm';

            // Update React State only on change to avoid re-renders
            if (feedback !== lastFeedbackRef.current) {
                lastFeedbackRef.current = feedback;
                setFeedback(feedback);
            }

            // 2. Emissive Glow Logic (Visual Feedback)
            if (cubeMaterialRef.current) {
                if (error < WARM_TOLERANCE) {
                    const intensity = 1 - (error / WARM_TOLERANCE);
                    cubeMaterialRef.current.emissive.set(SAGE_COLOR);
                    cubeMaterialRef.current.emissiveIntensity = intensity * (feedback === 'hot' ? 3 : 1.5);
                } else {
                    cubeMaterialRef.current.emissiveIntensity = 0;
                }
            }

            // 3. Win Condition
            if (!isLockedRef.current && error < WIN_TOLERANCE) {
                setIsSuccess(true);
                onSuccess();
            }
        }
    });

    return (
        <>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <Center>
                    {/* KID UX 3: Micro Scale 0.2 */}
                    <RoundedBox args={[1, 1, 1]} radius={0.1} smoothness={4} scale={[0.2, 0.2, 0.2]}>
                        <meshStandardMaterial
                            ref={cubeMaterialRef}
                            color={WOOD_COLOR}
                            roughness={0.4}
                            emissive={SAGE_COLOR}
                            emissiveIntensity={0}
                        />
                        <StarMarker />
                    </RoundedBox>
                </Center>
            </Float>

            {/* OrbitControls with Damping - Refined */}
            <OrbitControls
                enableZoom={false}
                enablePan={false}
                rotateSpeed={0.8}
                dampingFactor={0.1}
            />
        </>
    );
}

// --- Main Component ---

export default function SpatialCanvas({ onSuccess }: { onSuccess: () => void }) {
    const [showHint, setShowHint] = useState(false);
    const [lastActivity, setLastActivity] = useState(Date.now());
    const [isSuccess, setIsSuccess] = useState(false);
    const [feedback, setFeedback] = useState<'neutral' | 'warm' | 'hot'>('neutral');

    // Input Tracker for Idle Hint
    useEffect(() => {
        const handleInput = () => {
            setLastActivity(Date.now());
            setShowHint(false);
        };
        window.addEventListener("pointerdown", handleInput);
        window.addEventListener("pointermove", handleInput);

        const timer = setInterval(() => {
            if (Date.now() - lastActivity > 5000 && !isSuccess) {
                setShowHint(true);
            }
        }, 1000);

        return () => {
            window.removeEventListener("pointerdown", handleInput);
            window.removeEventListener("pointermove", handleInput);
            clearInterval(timer);
        }
    }, [lastActivity, isSuccess]);

    const handleWin = () => {
        setIsSuccess(true);
        // Sequence: Flash -> Checkmark -> Sound -> Parent Callback
        // Using simple timeout for now
        setTimeout(() => {
            onSuccess();
        }, 2500);
    };

    return (
        <div className="w-full h-full relative bg-neutral-100 rounded-3xl overflow-hidden shadow-inner flex items-center justify-center">
            {/* Canvas - KID UX 3: Camera Position Z=45 */}
            <Canvas camera={{ position: [0, 0, 45], fov: 35 }}>
                <ambientLight intensity={0.7} />
                <spotLight position={[10, 10, 10]} intensity={1.2} angle={0.5} penumbra={1} castShadow />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#A5D6A7" />

                <Stage environment={null} intensity={0.5} shadows={false}>
                    <GameLogic onSuccess={handleWin} setFeedback={setFeedback} />
                </Stage>
            </Canvas>

            {/* --- KID UX: CENTRAL KEYHOLE OVERLAY --- */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                {/* Ghost Frame */}
                <div className={clsx(
                    "w-64 h-64 border-4 border-dashed rounded-[3rem] flex items-center justify-center transition-all duration-500",
                    isSuccess
                        ? "border-green-400 bg-green-400/10 scale-110 opacity-0" // Disappear on win
                        : feedback === 'hot'
                            ? "border-green-300 opacity-60 scale-105"
                            : "border-slate-300/40 opacity-40"
                )}>
                    {/* Ghost Star Hint - Shows the target orientation */}
                    {!isSuccess && <Star weight="fill" className="text-lumi-sage/30 w-32 h-32" />}
                </div>
            </div>

            {/* 2. Success Overlay */}
            <AnimatePresence>
                {isSuccess && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute inset-0 z-20 flex items-center justify-center bg-white/40 backdrop-blur-sm pointer-events-none"
                    >
                        <div className="flex flex-col items-center">
                            <div className="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center shadow-2xl animate-bounce">
                                <CheckCircle weight="fill" className="w-20 h-20 text-white" />
                            </div>
                            <h2 className="mt-8 text-4xl font-baloo font-bold text-lumi-wood drop-shadow-sm">Perfect!</h2>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 3. Idle Hint */}
            <AnimatePresence>
                {showHint && !isSuccess && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-none flex flex-col items-center gap-2"
                    >
                        <HandPointing weight="duotone" className="w-12 h-12 text-slate-400 animate-pulse" />
                        <span className="text-slate-400 font-baloo bg-white/80 px-4 py-2 rounded-full shadow-sm text-sm">Spin to match the star!</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
