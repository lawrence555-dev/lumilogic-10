"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, RoundedBox, Text, Center, Environment } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { HandPointing, CheckCircle, Star, Stamp } from "@phosphor-icons/react";
import { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import clsx from "clsx";

// --- Game Constants ---
// WIN: Angle between Camera Vector and Z-Axis (Face with Star) < 0.1 rad (~5.7 deg)
const WIN_TOLERANCE = 0.1;
// HOT: Angle < 30 degrees (~0.52 rad)
const HOT_TOLERANCE = 0.52;
const SAGE_COLOR = new THREE.Color("#A5D6A7");
const WOOD_COLOR = new THREE.Color("#F2D7B6"); // Japanese Light Wood (Glossy)
const WHITE_COLOR = new THREE.Color("#FFFFFF");

// --- Components ---

function StarMarker() {
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
    const { camera, controls } = useThree();
    const [isSuccess, setIsSuccess] = useState(false);

    // Refs
    const isLockedRef = useRef(true);
    const hasInitializedRef = useRef(false);
    const cubeMaterialRef = useRef<THREE.MeshPhysicalMaterial>(null);
    const lastFeedbackRef = useRef<'neutral' | 'warm' | 'hot'>('neutral');

    // Initialization & Demo Sequence
    useEffect(() => {
        // 1. Start at Target (SHOW GOAL)
        // Camera moves to Z axis (Front)
        if (controls) {
            // Reset to front view
            camera.position.set(0, 0, 20);
            camera.lookAt(0, 0, 0);
            // @ts-expect-error - R3F controls type is loose
            controls.update();
        }

        // 2. Wait 1.5s then Scramble
        const scrambleTimer = setTimeout(() => {
            // Move camera to random spherical position
            const radius = 20;
            const theta = Math.random() * Math.PI * 2; // Random Azimuth
            const phi = Math.acos(2 * Math.random() - 1); // Random Polar

            // Convert constant radius sphere to cartesian
            const x = radius * Math.sin(phi) * Math.cos(theta);
            const y = radius * Math.sin(phi) * Math.sin(theta);
            const z = radius * Math.cos(phi);

            camera.position.set(x, y, z);
            camera.lookAt(0, 0, 0);
            // @ts-expect-error - R3F controls type is loose
            controls?.update();

            console.log("Scrambled Camera Position");
            isLockedRef.current = false;
            hasInitializedRef.current = true;
        }, 1500);

        return () => clearTimeout(scrambleTimer);
    }, [camera, controls]);

    useFrame(() => {
        if (isSuccess || isLockedRef.current) return;

        // Vector Logic:
        // Star is at (0,0,1) direction.
        // We want the camera to be looking from (0,0,Z) direction.
        // So the angle between Camera Position Vector and Z-Axis (0,0,1) should be near 0.
        const camPos = camera.position.clone().normalize();
        const targetDir = new THREE.Vector3(0, 0, 1);

        const angle = camPos.angleTo(targetDir);

        // 1. Determine Feedback State
        let feedback: 'neutral' | 'warm' | 'hot' = 'neutral';
        if (angle < HOT_TOLERANCE) feedback = 'hot';

        if (feedback !== lastFeedbackRef.current) {
            lastFeedbackRef.current = feedback;
            setFeedback(feedback);
        }

        // 2. Emissive Glow Logic (Visual Feedback - Hot/Cold)
        if (cubeMaterialRef.current) {
            if (angle < HOT_TOLERANCE) { // Only glow if "Hot" (< 30 deg)
                // Intensity ramps up as angle approaches 0
                // 1 at 0 deg, 0 at 30 deg
                const intensity = 1 - (angle / HOT_TOLERANCE);
                cubeMaterialRef.current.emissive.set(SAGE_COLOR);
                cubeMaterialRef.current.emissiveIntensity = intensity * 2.0;
            } else {
                cubeMaterialRef.current.emissiveIntensity = 0;
            }
        }

        // 3. Win Condition
        if (angle < WIN_TOLERANCE) {
            setIsSuccess(true);
            // Freeze Controls
            // @ts-expect-error - R3F controls type is loose
            // eslint-disable-next-line react-hooks/immutability
            if (controls) controls.enabled = false;
            onSuccess();
        }
    });

    return (
        <>
            <Center>
                {/* PREMIUM: Stable Scale 6.0, Centered */}
                <RoundedBox args={[1, 1, 1]} radius={0.1} smoothness={4} scale={[6.0, 6.0, 6.0]}>
                    <meshPhysicalMaterial
                        ref={cubeMaterialRef}
                        color={WOOD_COLOR}
                        roughness={0.15}       // Smooth, polished
                        metalness={0.05}       // Slight reflection
                        clearcoat={1}          // Gloss varnish
                        clearcoatRoughness={0.1}
                        emissive={SAGE_COLOR}
                        emissiveIntensity={0}
                    />
                    <StarMarker />
                </RoundedBox>
            </Center>

            {/* PREMIUM: Free Rotation + Damping (Physics feel) */}
            <OrbitControls
                enableZoom={false}
                enablePan={false}
                enableRotate={true}
                enableDamping={true}
                dampingFactor={0.08}
                rotateSpeed={0.8}
            />
        </>
    );
}

// --- Main Component ---

export default function SpatialCanvas({ onSuccess }: { onSuccess: () => void }) {
    const [showHint, setShowHint] = useState(false);
    const [lastActivity, setLastActivity] = useState(() => Date.now());
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
        // Sequence: 2s delay then close
        setTimeout(() => {
            onSuccess();
        }, 2000);
    };

    return (
        <div className="w-full h-full relative bg-neutral-100 rounded-3xl overflow-hidden shadow-inner flex items-center justify-center">
            {/* PREMIUM: Camera Z=20 */}
            <Canvas camera={{ position: [0, 0, 20], fov: 35 }}>
                <ambientLight intensity={0.7} />
                <spotLight position={[10, 10, 10]} intensity={1.2} angle={0.5} penumbra={1} castShadow />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#A5D6A7" />

                {/* PREMIUM: Environment for reflections */}
                <Environment preset="city" />

                <GameLogic onSuccess={handleWin} setFeedback={setFeedback} />
            </Canvas>

            {/* --- KID UX: CENTRAL KEYHOLE OVERLAY --- */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                {/* Ghost Frame */}
                <div className={clsx(
                    "w-64 h-64 border-4 border-dashed rounded-[3rem] flex items-center justify-center transition-all duration-500",
                    isSuccess
                        ? "opacity-0 scale-110" // Fade out on win
                        : feedback === 'hot'
                            ? "border-green-300 opacity-60 scale-105"
                            : "border-slate-300/40 opacity-40"
                )}>
                    {/* Ghost Star Hint */}
                    {!isSuccess && <Star weight="fill" className="text-lumi-sage/30 w-32 h-32" />}
                </div>
            </div>

            {/* 2. SUCCESS STAMP CELEBRATION */}
            <AnimatePresence>
                {isSuccess && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 z-20 flex items-center justify-center bg-black/10 backdrop-blur-[2px] pointer-events-none"
                    >
                        <motion.div
                            initial={{ scale: 3, opacity: 0, rotate: -20 }}
                            animate={{ scale: 1, opacity: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="flex flex-col items-center"
                        >
                            {/* Stamp Circle */}
                            <div className="w-48 h-48 border-8 border-lumi-wood rounded-full flex items-center justify-center bg-white shadow-2xl">
                                <Stamp weight="fill" className="w-24 h-24 text-lumi-wood" />
                            </div>
                            {/* Stamp Text */}
                            <h2 className="mt-6 text-5xl font-baloo font-black text-lumi-wood drop-shadow-md tracking-wider uppercase">
                                Matched!
                            </h2>
                        </motion.div>
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
