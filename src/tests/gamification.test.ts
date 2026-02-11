import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { calculateStreak } from '../lib/gamification';

// Mock Supabase
const mockSupabase = {
    from: vi.fn(),
};

vi.mock('../lib/supabase/server', () => ({
    createClient: () => Promise.resolve(mockSupabase),
}));

describe('calculateStreak', () => {
    const userId = 'test-user';

    beforeEach(() => {
        vi.useFakeTimers();
        const date = new Date(2024, 0, 15); // Jan 15 2024
        vi.setSystemTime(date);
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    const today = new Date(2024, 0, 15);
    today.setHours(0, 0, 0, 0);

    const getDayStr = (offset: number) => {
        const d = new Date(today);
        d.setDate(d.getDate() - offset);
        return d.toISOString().split('T')[0];
    };

    it('should return 0 when no logs exist', async () => {
        mockSupabase.from.mockReturnValue({
            select: vi.fn().mockReturnValue({
                eq: vi.fn().mockReturnValue({
                    order: vi.fn().mockReturnValue({
                        limit: vi.fn().mockResolvedValue({ data: [] })
                    })
                })
            })
        });

        // Need two mocks because we call from('daily_logs') then from('meal_logs')
        // This simple mock setup might be brittle if calls are strictly ordered.

        // Let's improve the mock structure.
        mockSupabase.from.mockImplementation((table: string) => {
            return {
                select: () => ({
                    eq: () => ({
                        order: () => ({ // Note: we chain eq twice on meal logs actually `eq..eq`
                            limit: () => Promise.resolve({ data: [] })
                        }),
                        eq: () => ({ // For meal_logs second eq
                            order: () => ({
                                limit: () => Promise.resolve({ data: [] })
                            })
                        })
                    })
                })
            }
        });

        // Wait, the chaining is simpler if we just resolve data: [] for any query
        mockSupabase.from.mockReturnValue({
            select: vi.fn().mockReturnThis(),
            eq: vi.fn().mockReturnThis(),
            order: vi.fn().mockReturnThis(),
            limit: vi.fn().mockResolvedValue({ data: [] })
        });

        const streak = await calculateStreak(userId);
        expect(streak).toBe(0);
    });

    it('should count multiple consecutive days ending today', async () => {
        // Active Today + Yesterday + Day Before
        const activeLogs = [
            { log_date: getDayStr(0), water_ml: 1000 },
            { log_date: getDayStr(1), workout_done: true },
            { log_date: getDayStr(2), water_ml: 500 }
        ];

        mockSupabase.from.mockImplementation((table: string) => {
            if (table === 'daily_logs') {
                return {
                    select: vi.fn().mockReturnThis(),
                    eq: vi.fn().mockReturnThis(),
                    order: vi.fn().mockReturnThis(),
                    limit: vi.fn().mockResolvedValue({ data: activeLogs })
                };
            }
            return { // meal_logs
                select: vi.fn().mockReturnThis(),
                eq: vi.fn().mockReturnThis(),
                order: vi.fn().mockReturnThis(),
                limit: vi.fn().mockResolvedValue({ data: [] })
            };
        });

        const streak = await calculateStreak(userId);
        expect(streak).toBe(3);
    });

    it('should break streak if a day is missed', async () => {
        // Today active, Yesterday skipped, Day before active
        const activeLogs = [
            { log_date: getDayStr(0), water_ml: 1000 },
            // Missing Day 1
            { log_date: getDayStr(2), water_ml: 500 }
        ];

        mockSupabase.from.mockImplementation((table) => {
            if (table === 'daily_logs') {
                return {
                    select: vi.fn().mockReturnThis(),
                    eq: vi.fn().mockReturnThis(),
                    order: vi.fn().mockReturnThis(),
                    limit: vi.fn().mockResolvedValue({ data: activeLogs })
                };
            }
            return { // meal_logs
                select: vi.fn().mockReturnThis(),
                eq: vi.fn().mockReturnThis(),
                order: vi.fn().mockReturnThis(),
                limit: vi.fn().mockResolvedValue({ data: [] })
            };
        });

        const streak = await calculateStreak(userId);
        expect(streak).toBe(1);
    });
});
