import NumbersLevel from "../../features/numbers/NumbersLevel";
import GameContainer from "@/components/layout/GameContainer";

export default function NumbersPage() {
    return (
        <main className="min-h-screen bg-neutral-50 flex items-center justify-center">
            <GameContainer>
                <NumbersLevel />
            </GameContainer>
        </main>
    );
}
