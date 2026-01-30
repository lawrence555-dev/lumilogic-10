"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";
import clsx from "clsx";
import { CaretLeft, DeviceRotate } from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface GameContainerProps {
    children: ReactNode;
    title?: string;
    showBack?: boolean;
}

export default function GameContainer({ children, title, showBack = true }: GameContainerProps) {
    const [isPortrait, setIsPortrait] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const checkOrientation = () => {
            // Check if mobile (width < 768) and height > width
            const isMobile = window.innerWidth < 768;
            const isVertical = window.innerHeight > window.innerWidth;
            setIsPortrait(isMobile && isVertical);
        };

        checkOrientation();
        window.addEventListener("resize", checkOrientation);
        return () => window.removeEventListener("resize", checkOrientation);
    }, []);

    return (
        <div className="fixed inset-0 w-full h-[100dvh] bg-white overflow-hidden">

            {/* Mobile Orientation Warning */}
            <AnimatePresence>
                {isPortrait && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center text-white p-8 text-center"
                    >
                        <DeviceRotate className="w-24 h-24 mb-6 animate-pulse text-lumi-primary" />
                        <h2 className="text-2xl font-bold mb-2">請旋轉手機</h2>
                        <p className="text-slate-400">為了最佳體驗，請使用橫向遊玩</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Game Frame - Pure Fullscreen */}
            <motion.main
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative w-full h-full"
            >
                {/* Standard HUD: Back Button */}
                {showBack && (
                    <Link
                        href="/"
                        className="absolute top-4 left-4 z-50 p-3 bg-white/80 backdrop-blur rounded-full shadow-sm hover:scale-110 active:scale-95 transition-all group"
                        title="Back to Stamp Card"
                    >
                        <CaretLeft weight="bold" className="w-6 h-6 text-slate-700 group-hover:text-lumi-primary" />
                    </Link>
                )}

                {/* Soft Inner Shadow/Highlight for depth */}
                <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_80px_rgba(0,0,0,0.1)] z-20" />

                {children}
            </motion.main>
        </div>
    );
}
