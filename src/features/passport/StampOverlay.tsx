"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { Flower } from "@phosphor-icons/react";

interface StampOverlayProps {
    isVisible: boolean;
    onComplete: () => void;
}

export default function StampOverlay({ isVisible, onComplete }: StampOverlayProps) {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(onComplete, 2000); // Auto-hide after 2s
            return () => clearTimeout(timer);
        }
    }, [isVisible, onComplete]);

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="absolute inset-0 z-[60] flex items-center justify-center pointer-events-none">
                    {/* Stamp Animation Container */}
                    <motion.div
                        initial={{ scale: 2, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 15 }} // "Thump" effect
                        className="relative w-64 h-64"
                    >
                        {/* The visual stamp mark */}
                        <div className="w-full h-full border-[8px] border-lumi-sage rounded-full flex items-center justify-center bg-white/10 backdrop-blur-sm shadow-2xl rotate-[-12deg]">
                            <Flower weight="fill" className="w-32 h-32 text-lumi-sage drop-shadow-lg" />
                            <div className="absolute -bottom-8 text-lumi-sage text-2xl font-bold font-baloo uppercase tracking-widest">
                                Cleared!
                            </div>
                        </div>

                        {/* Optional: Shockwave effect could go here */}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
