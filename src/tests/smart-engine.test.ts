import { describe, it, expect } from 'vitest';
import { calculateHealthScore, getSmartMotivation } from '../lib/smart-engine';

describe('Smart Engine', () => {
    describe('calculateHealthScore', () => {
        it('should calculate perfect score correctly', () => {
            const result = calculateHealthScore({
                mealsCompleted: 5,
                totalMeals: 5,
                waterMl: 2500,
                streak: 10
            });
            // 60 (meals) + 20 (water) + 20 (streak capped) = 100
            expect(result.score).toBe(100);
            expect(result.tier).toBe('Gold');
        });

        it('should handle zero inputs', () => {
            const result = calculateHealthScore({
                mealsCompleted: 0,
                totalMeals: 5,
                waterMl: 0,
                streak: 0
            });
            expect(result.score).toBe(0);
            expect(result.tier).toBe('Bronze');
        });

        it('should cap streak bonus at 20', () => {
            const result = calculateHealthScore({
                mealsCompleted: 0,
                totalMeals: 1, // Avoid NaN
                waterMl: 0,
                streak: 50 // Should cap at 20 points
            });
            expect(result.score).toBe(20);
        });
    });

    describe('getSmartMotivation', () => {
        it('should return streak motivation for long streak', () => {
            // Use hour > 10 to bypass morning check
            const msg = getSmartMotivation(50, 15, 1, 2000, 10);
            expect(msg).toContain('imparável');
        });

        it('should prompt for breakfast in morning if streak low', () => {
            const msg = getSmartMotivation(50, 8, 0, 0, 1);
            expect(msg).toContain('Café da manhã');
        });

        it('should praise high score', () => {
            const msg = getSmartMotivation(95, 15, 3, 2000, 5);
            expect(msg).toContain('Excelente desempenho');
        });
    });
});
