"use client";

import { useState } from "react";
import { House } from "@phosphor-icons/react";
import GameContainer from "@/components/layout/GameContainer";
import WorldMap from "@/components/navigation/WorldMap";
import Passport from "@/components/navigation/Passport";
import SpatialCanvas from "@/features/spatial/SpatialCanvas";
import PassportModal from "@/features/passport/PassportModal";
import StampOverlay from "@/features/passport/StampOverlay";

export default function Home() {
  const [view, setView] = useState<"map" | "spatial">("map");
  const [isPassportOpen, setIsPassportOpen] = useState(false);
  const [hasNotification, setHasNotification] = useState(false);
  const [completedModules, setCompletedModules] = useState<string[]>([]);
  const [showStamp, setShowStamp] = useState(false);

  const handleOpenPassport = () => {
    setIsPassportOpen(true);
    setHasNotification(false);
  };

  const handleSpatialSuccess = () => {
    // 1. Show Stamp
    setShowStamp(true);
    // 2. Play Sound (Mock)
    console.log("Ding! Success!");
  };

  const handleStampComplete = () => {
    setShowStamp(false);
    // 3. Mark as Complete
    if (!completedModules.includes("spatial")) {
      setCompletedModules(prev => [...prev, "spatial"]);
      setHasNotification(true); // New notification for the new stamp
    }
    // 4. Return to Map
    setView("map");
  };

  return (
    <main className="min-h-screen bg-neutral-50 flex items-center justify-center">
      <GameContainer>
        {view === "map" && (
          <WorldMap
            onNavigate={setView}
            completedModules={completedModules}
          />
        )}

        {view === "spatial" && (
          <SpatialCanvas onSuccess={handleSpatialSuccess} />
        )}

        {/* Global UI Elements */}
        {view === "map" && !showStamp && (
          <Passport
            onClick={handleOpenPassport}
            hasNotification={hasNotification && completedModules.length > 0}
          />
        )}

        <PassportModal
          isOpen={isPassportOpen}
          onClose={() => setIsPassportOpen(false)}
        />

        <StampOverlay
          isVisible={showStamp}
          onComplete={handleStampComplete}
        />

        {/* Back Button for Spatial View */}
        {view === "spatial" && !showStamp && (
          <button
            onClick={() => setView("map")}
            className="absolute top-8 right-8 p-3 bg-white rounded-full shadow-md text-lumi-primary hover:bg-slate-50 transition-colors z-50 cursor-pointer"
          >
            <House weight="bold" className="w-6 h-6" />
          </button>
        )}
      </GameContainer>
    </main>
  );
}
