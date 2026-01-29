"use client";

import { Cube, Scales, PuzzlePiece, Shapes, GitBranch } from "@phosphor-icons/react";
import ModuleIcon from "@/components/navigation/ModuleIcon";

interface WorldMapProps {
    onNavigate: (view: "map" | "spatial") => void;
    completedModules: string[];
}

const MODULES = [
    { id: "spatial", Icon: Cube, label: "Spatial", pos: { x: 20, y: 15 } },
    { id: "numbers", Icon: Scales, label: "Numbers", pos: { x: 80, y: 32 } },
    { id: "logic", Icon: PuzzlePiece, label: "Logic", pos: { x: 25, y: 52 } },
    { id: "patterns", Icon: Shapes, label: "Patterns", pos: { x: 75, y: 70 } },
    { id: "algo", Icon: GitBranch, label: "Algo", pos: { x: 50, y: 90 } },
];

export default function WorldMap({ onNavigate, completedModules }: WorldMapProps) {
    const activeIndex = completedModules.length; // 0 if none, 1 if Spatial done, etc.

    return (
        <div className="w-full h-full relative overflow-hidden bg-[#FAF9F6]">
            {/* --- BACKGROUND ATMOSPHERE (Mobile Only primarily, but nice everywhere) --- */}
            {/* Distant Hills */}
            <svg className="absolute bottom-0 left-0 w-full h-[40%] pointer-events-none z-0" preserveAspectRatio="none" viewBox="0 0 400 200">
                <path d="M0 200V100 C120 80, 240 120, 400 60 V200 Z" fill="#EBEAE4" />
            </svg>
            {/* Closer Hills */}
            <svg className="absolute bottom-0 left-0 w-full h-[25%] pointer-events-none z-0" preserveAspectRatio="none" viewBox="0 0 400 150">
                <path d="M0 150V80 Q150 120, 400 50 V150 Z" fill="#E3E1DB" />
            </svg>

            {/* --- TITLE --- */}
            <div className="absolute top-8 left-0 right-0 text-center z-10">
                <h2 className="text-sm font-serif text-[#8D6E63] italic opacity-80 mb-1">Chapter 1</h2>
                <h1 className="text-3xl font-baloo font-bold text-[#5D4037] tracking-tight relative inline-block">
                    The Forest
                    {/* Decorative dots */}
                    <span className="absolute -top-2 -right-4 w-2 h-2 bg-[#A5D6A7] rounded-full opacity-60" />
                    <span className="absolute -bottom-1 -left-3 w-1.5 h-1.5 bg-[#8D6E63] rounded-full opacity-40" />
                </h1>
            </div>


            {/* --- DESKTOP VIEW (Horizontal S-Curve) --- */}
            <div className="hidden md:block w-full h-full relative z-10">
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path
                        d="M 15 85 C 15 65, 25 25, 30 20 S 45 35, 50 40 S 60 75, 70 70 S 85 25, 90 15"
                        fill="none"
                        stroke="#8D6E63"
                        strokeWidth="0.5"
                        strokeDasharray="4 4"
                        className="opacity-40"
                    />
                </svg>

                {MODULES.map((mod, i) => {
                    const isCompleted = completedModules.includes(mod.id);
                    const isLocked = i > activeIndex;
                    const isActive = i === activeIndex;

                    // Desktop positions
                    let desktopPos = {};
                    switch (mod.id) {
                        case "spatial": desktopPos = { left: '15%', bottom: '15%' }; break;
                        case "numbers": desktopPos = { left: '30%', top: '20%' }; break;
                        case "logic": desktopPos = { left: '50%', top: '40%' }; break;
                        case "patterns": desktopPos = { right: '30%', bottom: '30%' }; break;
                        case "algo": desktopPos = { right: '10%', top: '15%' }; break;
                    }

                    return (
                        <div
                            key={mod.id}
                            className="absolute"
                            style={desktopPos}
                        >
                            <ModuleIcon
                                Icon={mod.Icon}
                                id={mod.id}
                                label={mod.label}
                                isLocked={isLocked}
                                isCompleted={isCompleted}
                                isActive={isActive}
                                onClick={() => {
                                    if (!isLocked) onNavigate(mod.id === 'spatial' ? 'spatial' : 'map');
                                }}
                            />
                        </div>
                    );
                })}
            </div>


            {/* --- MOBILE VIEW (Vertical Organic Trail) --- */}
            <div className="md:hidden w-full h-full relative z-10 pt-20 pb-10">
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                    {/* Organic Dashed Path connecting the nodes */}
                    {/* 20,15 -> 80,32 -> 25,52 -> 75,70 -> 50,90 */}
                    <path
                        d="M 20 15 Q 50 10, 80 32 T 25 52 T 75 70 T 50 90"
                        fill="none"
                        stroke="#8D6E63"
                        strokeWidth="0.8"
                        strokeDasharray="3 3"
                        strokeLinecap="round"
                        className="opacity-50 animate-[dash_20s_linear_infinite]"
                    />
                </svg>

                {/* Nodes */}
                {MODULES.map((mod, i) => {
                    const isCompleted = completedModules.includes(mod.id);
                    const isLocked = i > activeIndex;
                    const isActive = i === activeIndex;

                    return (
                        <div
                            key={mod.id}
                            className="absolute transform -translate-x-1/2 -translate-y-1/2"
                            style={{ left: `${mod.pos.x}%`, top: `${mod.pos.y}%` }}
                        >
                            <ModuleIcon
                                Icon={mod.Icon}
                                id={mod.id}
                                label={mod.label}
                                isLocked={isLocked}
                                isCompleted={isCompleted}
                                isActive={isActive}
                                onClick={() => {
                                    if (!isLocked) onNavigate(mod.id === 'spatial' ? 'spatial' : 'map');
                                }}
                            />
                        </div>
                    );
                })}
            </div>

        </div>
    );
}
