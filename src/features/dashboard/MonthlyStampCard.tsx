"use client";

import { useRouter } from "next/navigation";
import { useMonthlyProgress } from "@/hooks/useMonthlyProgress";
import StampSlot from "./StampSlot";
import { Tree, Mountains } from "@phosphor-icons/react";

export default function MonthlyStampCard() {
    const router = useRouter();
    const { days, markAsComplete } = useMonthlyProgress();

    const handleSlotClick = (day: number) => {
        if (day === 1) router.push('/spatial');
        if (day === 2) router.push('/numbers');
        if (day === 3) router.push('/spatial');
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7] p-6 lg:p-12 font-sans text-slate-800">
            {/* Header Section */}
            <header className="max-w-4xl mx-auto mb-8 flex items-end justify-between border-b-2 border-slate-100 pb-6">
                <div>
                    <span className="text-xs font-bold tracking-[0.2em] text-lumi-primary uppercase block mb-2">
                        Month 01
                    </span>
                    <h1 className="text-3xl lg:text-4xl font-bold flex items-center gap-3">
                        <Tree weight="duotone" className="text-emerald-600" />
                        Forest Enlightenment
                    </h1>
                </div>
                <div className="text-right hidden sm:block">
                    <span className="text-xs text-slate-400 font-bold tracking-wider uppercase block">Current Progress</span>
                    <span className="text-2xl font-mono font-bold text-slate-600">3 / 20</span>
                </div>
            </header>

            {/* Stamp Grid */}
            <main className="max-w-4xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6">
                    {days.map((day) => (
                        <StampSlot
                            key={day.day}
                            data={day}
                            onClick={() => handleSlotClick(day.day)}
                        />
                    ))}
                </div>
            </main>

            {/* Ritual Decoration (Background) */}
            <div className="fixed bottom-0 left-0 w-full h-32 opacity-10 pointer-events-none z-0">
                <Mountains weight="fill" className="w-full h-full text-slate-400" />
            </div>
        </div>
    );
}
