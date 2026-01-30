"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, CaretRight, CaretLeft, Cube, Scales, PuzzlePiece, Shapes, GitBranch, Lock } from "@phosphor-icons/react";
import clsx from "clsx";
import { useState, useEffect } from "react";

interface PassportModalProps {
    isOpen: boolean;
    onClose: () => void;
}

// Mock Data
const STAMPS = [
    { id: 'spatial', Icon: Cube, label: 'Shape Shift' },
    { id: 'numbers', Icon: Scales, label: 'Balance' },
    { id: 'logic', Icon: PuzzlePiece, label: 'Logic' },
    { id: 'patterns', Icon: Shapes, label: 'Pattern' },
    { id: 'algo', Icon: GitBranch, label: 'Algo' },
];

export default function PassportModal({ isOpen, onClose }: PassportModalProps) {
    const [page, setPage] = useState(0); // 0: Cover, 1: Chapter 1, 2: Chapter 2
    const [unlockedStamps, setUnlockedStamps] = useState<string[]>(['spatial']);

    useEffect(() => {
        if (isOpen) {
            const saved = JSON.parse(localStorage.getItem("lumilogic_stamps") || '["spatial"]');
            setUnlockedStamps(saved);
        }
    }, [isOpen]);

    const handleNext = (e: React.MouseEvent) => { e.stopPropagation(); setPage(p => Math.min(p + 1, 2)); };

    // Explicit Back Logic to prevent confusion or double-triggering "Close"
    const handlePrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        setPage(p => Math.max(0, p - 1));
    };

    // Reset page on close
    const handleClose = () => { setPage(0); onClose(); };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 perspective-[2000px]">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-md"
                    />

                    {/* Book Container */}
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 50, opacity: 0, transition: { duration: 0.3 } }}
                        className="relative w-full max-w-4xl aspect-[3/2] md:aspect-[2/1] z-10"
                        style={{ transformStyle: "preserve-3d" }}
                    >
                        {/* --- MOBILE VIEW (Vertical Scroll) --- */}
                        <div className="md:hidden w-full h-[85vh] bg-[#FCFCFC] rounded-xl overflow-y-auto relative flex flex-col items-center p-6 gap-6">
                            <button onClick={handleClose} className="absolute top-4 right-4 p-2 bg-slate-100 rounded-full"><X /></button>

                            {/* Mobile Header */}
                            <div className="text-center">
                                <div className="w-20 h-20 bg-lumi-primary rounded-full mx-auto mb-3 flex items-center justify-center text-white text-2xl font-baloo border-4 border-lumi-wood">L</div>
                                <h2 className="text-2xl font-bold text-lumi-primary font-baloo">Lumi Passport</h2>
                                <p className="text-slate-400 text-sm">Level 1 Explorer</p>
                            </div>

                            {/* Mobile Chapter 1 */}
                            <div className="w-full bg-slate-50 rounded-xl p-4 border border-slate-100">
                                <h3 className="font-bold text-lumi-wood mb-4 flex items-center gap-2"><Cube /> Chapter 1: The Forest</h3>
                                <div className="grid grid-cols-3 gap-3">
                                    {STAMPS.map(stamp => {
                                        const isUnlocked = unlockedStamps.includes(stamp.id);
                                        return (
                                            <div key={stamp.id} className={clsx("aspect-square rounded border-2 flex flex-col items-center justify-center gap-1", isUnlocked ? "bg-lumi-sage/10 border-lumi-sage" : "bg-white border-slate-100 border-dashed")}>
                                                {isUnlocked ? <stamp.Icon weight="fill" className="text-lumi-sage w-6 h-6" /> : <stamp.Icon weight="thin" className="text-slate-300 w-6 h-6" />}
                                                <span className="text-[9px] uppercase font-bold text-slate-400">{stamp.label}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Mobile Chapter 2 */}
                            <div className="w-full bg-slate-100 rounded-xl p-8 border border-slate-200 flex flex-col items-center justify-center relative overflow-hidden opacity-70">
                                <Lock weight="duotone" className="w-12 h-12 text-slate-400 mb-2" />
                                <h3 className="font-bold text-slate-500">Chapter 2</h3>
                                <p className="text-xs text-slate-400">Locked</p>
                            </div>
                        </div>

                        {/* --- DESKTOP VIEW (3D Book) --- */}
                        <div className="hidden md:flex w-full h-full relative perspective-[2000px]">
                            {/* Book Spine/Base */}
                            <div className="absolute left-1/2 top-0 bottom-0 w-4 -ml-2 bg-lumi-wood/20 z-0 rounded-sm" />

                            {/* COVER CONTAINER (Right Side -> Flips Left) */}
                            <motion.div
                                className="absolute inset-y-0 right-0 w-1/2 origin-left"
                                style={{ transformStyle: "preserve-3d" }}
                                animate={{ rotateY: page > 0 ? -180 : 0 }}
                                transition={{ duration: 0.8, type: "spring", damping: 20 }}
                                onClick={() => page === 0 && setPage(1)}
                            >
                                {/* FRONT FACE (The Cover) */}
                                <div className="absolute inset-0 bg-[#2c3e50] rounded-r-2xl shadow-2xl flex items-center justify-center text-white backface-hidden" style={{ backfaceVisibility: "hidden" }}>
                                    <div className="text-center p-12 border-4 border-lumi-wood/50 rounded-xl m-8">
                                        <div className="w-24 h-24 mx-auto mb-6 bg-lumi-wood rounded-full flex items-center justify-center">
                                            <Cube weight="duotone" className="w-12 h-12 text-[#2c3e50]" />
                                        </div>
                                        <h1 className="text-4xl font-baloo font-bold tracking-wider mb-2">PASSPORT</h1>
                                        <p className="opacity-60 text-sm tracking-[0.2em]">LUMINARY EDITION</p>
                                        <p className="mt-8 text-xs opacity-40">Tap to Open</p>
                                    </div>
                                </div>

                                {/* BACK FACE (The Bio - Visible when flipped to left) */}
                                {/* FIX: opacity-0 when on cover prevents white bleed */}
                                <div className={clsx("absolute inset-0 bg-[#f8f9fa] rounded-l-2xl shadow-xl flex flex-col items-center justify-center p-12 border-r border-slate-200 transition-opacity duration-300", page === 0 ? "opacity-0 pointer-events-none" : "opacity-100")}
                                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>

                                    {/* Prev Button REMOVED - Redundant with Global Prev */}
                                    {/* 
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setPage(0); }}
                                        className="absolute left-6 top-6 p-2 hover:bg-slate-100 rounded-full text-lumi-primary transition-colors cursor-pointer"
                                        title="Close Passport"
                                    >
                                        <CaretLeft weight="bold" className="w-6 h-6" />
                                    </button>
                                     */}

                                    <div className="w-32 h-32 bg-slate-200 rounded-full mb-6 border-4 border-lumi-wood overflow-hidden relative">
                                        <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-slate-400">L</div>
                                    </div>
                                    <h2 className="text-3xl font-bold text-lumi-primary font-baloo">Lumi's Passport</h2>
                                    <p className="text-slate-400 mt-2">Level 1 Explorer</p>

                                    <div className="mt-8 w-full grid grid-cols-2 gap-4">
                                        <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
                                            <div className="text-2xl font-bold text-lumi-sage">1</div>
                                            <div className="text-xs text-slate-400 uppercase">Stamps</div>
                                        </div>
                                        <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
                                            <div className="text-2xl font-bold text-lumi-wood">1</div>
                                            <div className="text-xs text-slate-400 uppercase">Chapter</div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>


                            {/* PAGE 2 CONTAINER (Right Side - Chapter 1) */}
                            <motion.div
                                className={clsx("absolute inset-y-0 right-0 w-1/2 origin-left", page === 0 ? "opacity-0 pointer-events-none" : "opacity-100")}
                                style={{ transformStyle: "preserve-3d", zIndex: page > 1 ? 20 : 5 }}
                            >
                                {/* FRONT FACE (Chapter 1) */}
                                <motion.div
                                    className="absolute inset-0 bg-white rounded-r-2xl shadow-xl p-12 overflow-hidden"
                                    style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
                                    animate={{ rotateY: page > 1 ? -180 : 0 }}
                                    transition={{ duration: 0.8, type: "spring", damping: 20 }}
                                >
                                    <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                                        <Cube className="w-64 h-64 text-lumi-primary" />
                                    </div>

                                    <div className="flex justify-between items-center mb-8">
                                        <h3 className="text-xl font-bold text-lumi-wood flex items-center gap-2">
                                            <Cube weight="fill" /> Chapter 1: The Forest
                                        </h3>
                                    </div>

                                    <div className="grid grid-cols-4 gap-4">
                                        {STAMPS.map(stamp => {
                                            const isUnlocked = unlockedStamps.includes(stamp.id);
                                            return (
                                                <div key={stamp.id} className={clsx("aspect-square rounded-xl border-2 flex flex-col items-center justify-center relative transition-all group", isUnlocked ? "border-lumi-sage bg-lumi-sage/5" : "border-slate-100 bg-slate-50 border-dashed")}>
                                                    {isUnlocked ? (
                                                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-lumi-sage drop-shadow-sm">
                                                            <stamp.Icon weight="fill" className="w-10 h-10" />
                                                        </motion.div>
                                                    ) : (
                                                        <stamp.Icon weight="thin" className="w-8 h-8 text-slate-200" />
                                                    )}
                                                    <span className={clsx("absolute bottom-2 text-[10px] font-bold uppercase tracking-wider", isUnlocked ? "text-lumi-sage" : "text-slate-300")}>{stamp.label}</span>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* BACK FACE of Chapter 1 (Visible when Page=2, on Left) */}
                                    <div className="absolute inset-0 bg-slate-50 flex items-center justify-center" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                                        <div className="text-center">
                                            <Cube weight="duotone" className="w-16 h-16 text-lumi-sage mx-auto mb-4" />
                                            <h4 className="font-bold text-slate-500">Chapter 1 Complete</h4>
                                            <p className="text-slate-400 text-sm mt-2">5/5 Stamps Collected</p>
                                        </div>
                                        {/* Prev Button REMOVED - Redundant with Global Prev */}
                                        {/*
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setPage(1); }} // EXPLICIT
                                            className="absolute left-6 top-6 p-2 hover:bg-white rounded-full text-lumi-primary transition-colors cursor-pointer shadow-sm"
                                        >
                                            <CaretLeft weight="bold" className="w-6 h-6" />
                                        </button>
                                         */}
                                    </div>
                                </motion.div>
                            </motion.div>

                            {/* PAGE 3 (Chapter 2) - STATIC RIGHT LAYER */}
                            {/* Revealed when Chapter 1 Flips Left */}
                            {/* FIX: Add opacity transition to hide when closed (page=0) AND when on Chapter 1 (page=1) if desired? 
                                No, if page=1, Chapter 1 covers it. 
                                But to be safe, opacity-100 only if page >= 1. 
                                Actually, if page=0, opacity-0.
                            */}
                            <div className={clsx("absolute inset-y-0 right-0 w-1/2 bg-slate-100 rounded-r-2xl shadow-inner p-12 flex flex-col items-center justify-center border-l border-slate-200 transition-opacity duration-300", page === 0 ? "opacity-0 pointer-events-none" : "opacity-100")} style={{ zIndex: 1 }}>
                                <Lock weight="duotone" className="w-24 h-24 text-slate-300 mb-4" />
                                <h2 className="text-2xl font-bold text-slate-400">Chapter 2</h2>
                                <p className="text-slate-400 mb-8">Coming Soon</p>
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] opacity-10 pointer-events-none" />
                            </div>

                            {/* Global Prev Button (Desktop) - ABSOLUTE FIX */}
                            {page > 0 && (
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setPage(p => Math.max(0, p - 1));
                                    }}
                                    className="absolute -left-16 top-1/2 -translate-y-1/2 p-3 bg-white/80 hover:bg-white rounded-full text-lumi-primary shadow-lg backdrop-blur-sm transition-all z-50 hover:scale-110"
                                    title="Previous Page"
                                >
                                    <CaretLeft weight="bold" className="w-8 h-8" />
                                </button>
                            )}

                            {/* Global Next Button (Desktop) */}
                            {page > 0 && page < 2 && (
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setPage(p => Math.min(2, p + 1));
                                    }}
                                    className="absolute -right-16 top-1/2 -translate-y-1/2 p-3 bg-white/80 hover:bg-white rounded-full text-lumi-primary shadow-lg backdrop-blur-sm transition-all z-50 hover:scale-110"
                                    title="Next Page"
                                >
                                    <CaretRight weight="bold" className="w-8 h-8" />
                                </button>
                            )}

                            {/* Close Button (Desktop) */}
                            <button onClick={handleClose} className="absolute -top-12 right-0 p-2 bg-white/20 hover:bg-white/40 rounded-full text-white backdrop-blur-sm transition-colors z-50">
                                <X className="w-8 h-8" />
                            </button>

                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
