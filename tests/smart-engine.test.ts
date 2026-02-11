import { describe, it, expect } from 'vitest'
import { calculateHealthScore, getSmartMotivation, detectAtRiskPatient } from '../src/lib/smart-engine'

describe('Smart Engine Logic', () => {

    describe('calculateHealthScore', () => {
        it('should return max score for perfect day', () => {
            const result = calculateHealthScore({
                mealsCompleted: 5,
                totalMeals: 5,
                waterMl: 2500,
                streak: 10
            })
            expect(result.score).toBe(100) // 60 + 20 + 20
            expect(result.tier).toBe('Gold')
        })

        it('should handle zero states', () => {
            const result = calculateHealthScore({
                mealsCompleted: 0,
                totalMeals: 5,
                waterMl: 0,
                streak: 0
            })
            expect(result.score).toBe(0)
            expect(result.tier).toBe('Bronze')
        })

        it('should partial score correctly', () => {
            // 50% meals = 30 pts
            // 50% water = 10 pts
            // 5 day streak = 10 pts
            // Total = 50
            const result = calculateHealthScore({
                mealsCompleted: 3,
                totalMeals: 6,
                waterMl: 1250,
                streak: 5
            })
            expect(result.score).toBe(50)
            expect(result.tier).toBe('Bronze')
        })

        it('should cap streak bonus at 20', () => {
            const result = calculateHealthScore({
                mealsCompleted: 0,
                totalMeals: 5,
                waterMl: 0,
                streak: 50 // Should be capped at 20pts
            })
            expect(result.score).toBe(20)
        })
    })

    describe('getSmartMotivation', () => {
        it('should suggest breakfast in morning', () => {
            expect(getSmartMotivation(50, 8, 0, 0)).toContain('Café da manhã')
        })

        it('should nudge for meals if none logged by 11am', () => {
            expect(getSmartMotivation(0, 11, 0, 1000)).toContain('Ainda não registrou')
        })

        it('should warn about water in afternoon', () => {
            expect(getSmartMotivation(50, 14, 3, 200)).toContain('Lembre-se de beber água')
        })

        it('should praise high score', () => {
            expect(getSmartMotivation(95, 20, 5, 2500)).toContain('Excelente desempenho')
        })
    })

    describe('detectAtRiskPatient', () => {
        it('should flag inactivity', () => {
            const result = detectAtRiskPatient(0, 0)
            expect(result.issue).toBe('Inativo há 3 dias')
        })

        it('should flag low adherence if active but barely logging', () => {
            const result = detectAtRiskPatient(2, 2) // 2 logs in 7 days, active recently
            expect(result.issue).toBe('Baixa adesão')
        })

        it('should return null for good patients', () => {
            const result = detectAtRiskPatient(10, 5)
            expect(result.issue).toBeNull()
        })
    })
})
