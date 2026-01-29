"use client";

import { motion } from "framer-motion";
import { Stamp } from "@phosphor-icons/react";
import clsx from "clsx";

interface PassportProps {
    className?: string;
    onClick?: () => void;
    hasNotification?: boolean;
}

export default function Passport({ className, onClick, hasNotification }: PassportProps) {
    return (
        <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8, type: "spring" }}
            className={clsx(
                "absolute top-8 right-8 cursor-pointer group z-40",
                className
            )}
            style={{
                backgroundColor: 'transparent',
                borderRadius: '24px',
                overflow: 'hidden',
                border: 'none'
            }}
            onClick={onClick}
        >
            <div className="relative bg-transparent rounded-[24px]">
                <div className="w-16 h-20 bg-lumi-wood rounded-[24px] shadow-md border-r-4 border-b-4 border-[#C8A070] flex items-center justify-center transform transition-transform group-hover:-rotate-6 group-hover:scale-110 overflow-hidden">
                    <div className="w-12 h-16 border-2 border-dashed border-[#8D6E63]/50 rounded flex flex-col items-center justify-center gap-1">
                        <Stamp weight="duotone" className="w-8 h-8 text-[#5D4037] opacity-60" />
                        <span className="text-[10px] font-bold text-[#5D4037] opacity-60 uppercase tracking-widest">Lumi</span>
                    </div>
                </div>

                {/* Notification Dot */}
                {hasNotification && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 w-4 h-4 bg-red-400 rounded-full border-2 border-white"
                    />
                )}
            </div>
        </motion.div>
    );
}
