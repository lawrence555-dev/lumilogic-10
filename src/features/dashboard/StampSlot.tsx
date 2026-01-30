"use client";

import { motion } from "framer-motion";
import { SealCheck, Lock, Circle, Star } from "@phosphor-icons/react";
import clsx from "clsx";
import type { DayData } from "@/hooks/useMonthlyProgress";

interface StampSlotProps {
    data: DayData;
    onClick: () => void;
}

export default function StampSlot({ data, onClick }: StampSlotProps) {
    const { day, status, hasReward } = data;

    const isLocked = status === 'locked';
    const isActive = status === 'active';
    const isCompleted = status === 'completed';

    return (
        <motion.button
            onClick={onClick}
            disabled={isLocked}
            whileHover={!isLocked ? { scale: 1.05 } : {}}
            whileTap={!isLocked ? { scale: 0.95 } : {}}
            className={clsx(
                "relative flex flex-col items-center justify-center w-full aspect-[4/5] rounded-xl border-2 transition-all duration-300",
                isLocked && "bg-slate-50 border-slate-100 text-slate-300",
                isActive && "bg-white border-lumi-primary text-lumi-primary shadow-lg shadow-lumi-primary/20 cursor-pointer",
                isCompleted && "bg-lumi-cream border-lumi-accent text-lumi-accent",
                status === 'missed' && "bg-slate-50 border-slate-200 text-slate-400 opacity-70"
            )}
        >
            {/* Day Number Label */}
            <span className={clsx(
                "absolute top-2 left-3 text-[10px] font-bold tracking-widest uppercase",
                isActive ? "text-lumi-primary" : "text-slate-300"
            )}>
                DAY {day}
            </span>

            {/* Icon Content */}
            <div className="relative z-10">
                {isLocked && <Lock weight="fill" className="w-6 h-6 opacity-20" />}

                {isActive && (
                    <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    >
                        <Circle weight="duotone" className="w-10 h-10" />
                    </motion.div>
                )}

                {isCompleted && (
                    <motion.div
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 200 }}
                    >
                        <SealCheck weight="fill" className="w-12 h-12 text-lumi-accent drop-shadow-sm" />
                    </motion.div>
                )}
            </div>

            {/* Reward Marker */}
            {hasReward && (
                <div className="absolute bottom-2 right-2">
                    <Star weight="fill" className={clsx("w-4 h-4", isCompleted ? "text-yellow-400" : "text-slate-200")} />
                </div>
            )}

            {/* Active "Play" Text */}
            {isActive && (
                <span className="absolute bottom-3 text-xs font-bold animate-pulse">
                    START
                </span>
            )}
        </motion.button>
    );
}
