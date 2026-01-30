"use client";

import SpatialCanvas from "@/features/spatial/SpatialCanvas";
import { useRouter } from "next/navigation";
import GameContainer from "@/components/layout/GameContainer";

export default function SpatialPage() {
    const router = useRouter();

    return (
        <GameContainer>
            <SpatialCanvas
                onSuccess={() => {
                    // In real app, we would mark progress here.
                    // For now, just go back to stamp card.
                    console.log("Spatial Level Completed!");
                    setTimeout(() => router.push('/'), 1500);
                }}
            />
        </GameContainer>
    );
}
