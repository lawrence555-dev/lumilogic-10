"use client";

import { useState } from "react";
import { Camera, Sun, Moon, Coffee, Cake, ArrowLeft, CaretDown, CaretUp } from "@phosphor-icons/react";
import Link from "next/link";
import clsx from "clsx";

const SETTINGS = [
    {
        id: "c1",
        name: "C1: 日系空氣感",
        desc: "白天街頭 / 淺草 / 透明感",
        icon: Sun,
        color: "bg-blue-50 text-blue-600 border-blue-200",
        sim: "Pro Neg. Std",
        dr: "DR200",
        wb: "Auto (R:-2 B:+4)",
        highlight: "-1.0",
        shadow: "-2.0",
        colorLevel: "+2",
        grain: "關",
        clarity: "0",
        tips: "應對盛夏強光，降高光+偏藍中和酷暑。太亮可減 EV -0.3。"
    },
    {
        id: "c2",
        name: "C2: 賽博夜晚",
        desc: "新宿澀谷 / 霓虹燈 / 電影感",
        icon: Moon,
        color: "bg-purple-50 text-purple-600 border-purple-200",
        sim: "Classic Neg.",
        dr: "DR400",
        wb: "Auto (R:+1 B:-2)",
        highlight: "+1.0",
        shadow: "+2.0",
        colorLevel: "+1",
        grain: "強 / 大",
        clarity: "0",
        tips: "紅白青三色會非常突出。適合迷失東京風格。"
    },
    {
        id: "c3",
        name: "C3: 日系暖木",
        desc: "咖啡廳 / 室內 / 溫暖氛圍",
        icon: Coffee,
        color: "bg-orange-50 text-orange-600 border-orange-200",
        sim: "Nostalgic Neg.",
        dr: "DR400",
        wb: "Auto (R:+2 B:-4)",
        highlight: "-1.0",
        shadow: "-1.5",
        colorLevel: "+1",
        grain: "弱 / 小",
        clarity: "-2",
        tips: "注意：Clarity -2 會導致存檔慢 1 秒。連拍時請歸零。"
    },
    {
        id: "c4",
        name: "C4: 甜點美食",
        desc: "人像 / 食物 / 膚色還原",
        icon: Cake,
        color: "bg-pink-50 text-pink-600 border-pink-200",
        sim: "Astia",
        dr: "DR200",
        wb: "Auto (R:+1 B:+1)",
        highlight: "-1.0",
        shadow: "-1.0",
        colorLevel: "+1",
        grain: "關",
        clarity: "0",
        tips: "拍老婆女兒的保險牌，膚色最自然討喜。"
    }
];

export default function TokyoTripPage() {
    const [activeTab, setActiveTab] = useState("c1");

    return (
        <main className="min-h-screen bg-neutral-50 pb-20 font-sans">
            {/* Header */}
            <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-200 z-50 p-4 flex items-center justify-between shadow-sm">
                <Link href="/" className="p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
                    <ArrowLeft className="w-6 h-6" />
                </Link>
                <h1 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <Camera weight="fill" className="text-lumi-primary" />
                    X-M5 東京攻略
                </h1>
                <div className="w-8" />
            </header>

            <div className="max-w-md mx-auto p-4 space-y-6">

                {/* Quick Tabs */}
                <div className="grid grid-cols-4 gap-2 mb-6">
                    {SETTINGS.map((s) => (
                        <button
                            key={s.id}
                            onClick={() => setActiveTab(s.id)}
                            className={clsx(
                                "flex flex-col items-center justify-center p-2 rounded-xl border-2 transition-all",
                                activeTab === s.id ? s.color + " border-current shadow-md scale-105" : "bg-white border-transparent text-slate-400 hover:bg-slate-50"
                            )}
                        >
                            <s.icon weight={activeTab === s.id ? "fill" : "regular"} className="w-6 h-6 mb-1" />
                            <span className="text-[10px] font-bold">{s.id.toUpperCase()}</span>
                        </button>
                    ))}
                </div>

                {/* Active Card */}
                {SETTINGS.map((s) => (
                    activeTab === s.id && (
                        <div key={s.id} className="bg-white rounded-3xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-300">
                            {/* Card Header */}
                            <div className={clsx("p-6 text-white", s.color.replace('bg-', 'bg-').replace('text-', 'bg-').replace('border-', ''))}>
                                {/* Hacky color replacement for header bg, actually let's hardcode or map */}
                                <div className={clsx("absolute inset-0 opacity-10 pointer-events-none", s.color.split(' ')[0].replace('-50', '-500'))} />

                                <div className="flex justify-between items-start mb-2">
                                    <h2 className="text-2xl font-black text-slate-800">{s.name.split(':')[0]}</h2>
                                    <span className="px-3 py-1 bg-white/30 backdrop-blur-sm rounded-full text-xs font-bold text-slate-800 border border-white/20">
                                        {s.sim}
                                    </span>
                                </div>
                                <p className="text-slate-600 font-medium">{s.name.split(':')[1]}</p>
                                <p className="text-slate-500 text-sm mt-1 flex items-center gap-1"><s.icon /> {s.desc}</p>
                            </div>

                            {/* Specs Grid */}
                            <div className="p-6 grid grid-cols-2 gap-x-4 gap-y-6">
                                <SpecItem label="動態範圍" value={s.dr} />
                                <SpecItem label="白平衡" value={s.wb} highlight />
                                <SpecItem label="高光" value={s.highlight} />
                                <SpecItem label="陰影" value={s.shadow} />
                                <SpecItem label="色彩" value={s.colorLevel} />
                                <SpecItem label="銳利度" value="-2" />
                                <SpecItem label="顆粒" value={s.grain} />
                                <SpecItem label="清晰度" value={s.clarity} warn={s.clarity !== '0'} />
                            </div>

                            {/* Tips Footer */}
                            <div className="bg-slate-50 p-5 border-t border-slate-100">
                                <h3 className="text-xs font-bold text-slate-400 uppercase mb-2 tracking-wider flex items-center gap-1">
                                    <Camera size={14} /> 攝影師筆記
                                </h3>
                                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                                    {s.tips}
                                </p>
                            </div>
                        </div>
                    )
                ))}

                {/* Global Tips */}
                <div className="mt-8 space-y-3">
                    <h3 className="text-sm font-bold text-slate-400 ml-2">通用備忘錄</h3>
                    <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm text-sm text-slate-600 space-y-2">
                        <p>⚠️ <strong>左肩轉盤</strong>: 必須停在 <span className="text-lumi-primary font-bold">C</span> 檔。</p>
                        <p>🌞 <strong>太亮時</strong>: 曝光補償撥轉至 <span className="text-lumi-primary font-bold">-0.3EV</span>。</p>
                    </div>
                </div>

            </div>
        </main>
    );
}

function SpecItem({ label, value, highlight, warn }: { label: string, value: string, highlight?: boolean, warn?: boolean }) {
    return (
        <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">{label}</span>
            <span className={clsx(
                "text-lg font-bold font-mono tracking-tight",
                highlight ? "text-blue-600" : "text-slate-700",
                warn && "text-red-500"
            )}>
                {value}
            </span>
        </div>
    );
}
