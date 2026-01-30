import { useState } from 'react';

export type DayStatus = 'locked' | 'active' | 'completed' | 'missed';

export interface DayData {
    day: number;
    status: DayStatus;
    hasReward?: boolean;
}

export const useMonthlyProgress = () => {
    const [days, setDays] = useState<DayData[]>(() => {
        // MOCK DATA GENERATION
        // Scenario: User is on Day 3.
        // Day 1: Completed.
        // Day 2: Completed.
        // Day 3: Active (Today).
        // Day 4-20: Locked.

        return Array.from({ length: 20 }, (_, i) => {
            const dayNum = i + 1;
            let status: DayStatus = 'locked';

            if (dayNum === 1) status = 'completed';
            if (dayNum === 2) status = 'completed';
            if (dayNum === 3) status = 'active'; // Today

            return {
                day: dayNum,
                status,
                hasReward: dayNum % 5 === 0 // Every 5 days reward
            };
        });
    });

    const markAsComplete = (day: number) => {
        setDays(prev => prev.map(d => {
            if (d.day === day) return { ...d, status: 'completed' };
            return d;
        }));
    };

    return {
        days,
        currentDay: 3,
        markAsComplete
    };
};
