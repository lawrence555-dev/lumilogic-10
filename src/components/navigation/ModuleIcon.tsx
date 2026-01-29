"use client";

import { motion } from "framer-motion";
import { Lock, CheckCircle, IconProps } from "@phosphor-icons/react";
import clsx from "clsx";

interface ModuleIconProps {
    Icon: React.ComponentType<IconProps>;
    id: string;
    label: string;
    isLocked?: boolean;
    isCompleted?: boolean;
    isActive?: boolean;
    onClick?: () => void;
    as?: "button" | "div";
}

export default function ModuleIcon({
    Icon,
    id,
    label,
    isLocked = false,
    isCompleted = false,
    isActive = false,
    onClick,
    as = "button",
}: ModuleIconProps) {
    // Organic "Pebble" border radius
    const pebbleShape = isLocked ? "rounded-2xl" : "rounded-[30%_70%_70%_30%/30%_30%_70%_70%]";
    const Component = as === "div" ? motion.div : motion.button;

    return (
        <Component
            whileHover={!isLocked ? { scale: 1.05 } : {}}
            whileTap={!isLocked ? { scale: 0.95 } : {}}
            animate={isActive ? { y: [-4, 4, -4] } : {}}
            transition={isActive ? { repeat: Infinity, duration: 4, ease: "easeInOut" } : {}}
            onClick={!isLocked ? onClick : undefined}
            disabled={isLocked && as === "button" ? true : undefined}
            className="group relative flex flex-col items-center justify-center focus:outline-none"
        >
            <div
                className={clsx(
                    "w-22 h-20 flex items-center justify-center shadow-sm transition-all duration-300 relative",
                    pebbleShape,
                    isLocked
                        ? "bg-[#F0F0EE] border-none text-slate-300" // Locked: Pale Stone
                        : isCompleted
                            ? "bg-[#9CAF88] text-white shadow-md" // Completed: Sage Green
                            : isActive
                                ? "bg-[#8D6E63] text-white shadow-lg ring-4 ring-[#8D6E63]/20" // Active: Earth/Wood
                                : "bg-white text-slate-300 border-2 border-dashed border-slate-200" // Future/Unknown
                )}
            >
                {/* Status Icons */}
                {isCompleted && (
                    <div className="absolute -top-1 -right-1 bg-white rounded-full p-0.5 shadow-sm z-10">
                        <CheckCircle weight="fill" className="w-5 h-5 text-[#9CAF88]" />
                    </div>
                )}
                {isLocked && (
                    <div className="absolute -top-1 -right-1 bg-white rounded-full p-1 shadow-sm z-10">
                        <Lock weight="fill" className="w-3 h-3 text-slate-300" />
                    </div>
                )}

                {/* Main Icon */}
                <Icon
                    weight={isLocked ? "thin" : "fill"}
                    className={clsx("w-8 h-8", isLocked && "opacity-50")}
                />

                {/* Shine effect for active/completed */}
                {!isLocked && (
                    <div className="absolute top-2 left-3 w-4 h-2 bg-white/20 rounded-full blur-[2px]" />
                )}
            </div>

            <span
                className={clsx(
                    "mt-2 text-xs font-bold uppercase tracking-widest transition-colors font-baloo",
                    isLocked ? "text-slate-300" : "text-[#8D6E63]"
                )}
            >
                {label}
            </span>
        </Component>
    );
}
