"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import clsx from "clsx";

interface GameContainerProps {
    children: ReactNode;
}

export default function GameContainer({ children }: GameContainerProps) {
    return (
        <div className="min-h-screen w-full flex items-center justify-center p-0 md:p-8 bg-lumi-bg">
            <motion.main
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={clsx(
                    "relative bg-white shadow-2xl ring-1 ring-slate-900/5 overflow-hidden",
                    // Mobile: Full viewport height, no rounding
                    "w-full h-[100dvh] rounded-none",
                    // Tablet/Desktop: 4:3 container, rounded
                    "md:w-full md:max-w-[1024px] md:aspect-[4/3] md:h-auto md:rounded-[32px]"
                )}
            >
                {/* Soft Inner Shadow/Highlight for depth */}
                <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_80px_rgba(90,106,133,0.05)] z-20" />
                {children}
            </motion.main>
        </div>
    );
}
