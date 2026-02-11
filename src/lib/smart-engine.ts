export type HealthScoreInput = {
    mealsCompleted: number
    totalMeals: number
    waterMl: number
    streak: number
}

export type HealthScoreResult = {
    score: number
    tier: 'Bronze' | 'Silver' | 'Gold'
}

export function calculateHealthScore({ mealsCompleted, totalMeals, waterMl, streak }: HealthScoreInput): HealthScoreResult {
    // 1. Meal Score (60%): % of meals done today vs total
    const safeTotalMeals = totalMeals || 1
    const mealScore = (mealsCompleted / safeTotalMeals) * 60

    // 2. Water Score (20%): % of 2.5L
    const waterScore = Math.min((waterMl || 0) / 2500, 1) * 20

    // 3. Streak Bonus (20%): 2 points per streak day, max 20
    const streakBonus = Math.min(streak * 2, 20)

    const healthScore = Math.round(mealScore + waterScore + streakBonus)

    // Badge Tier
    let badge: 'Gold' | 'Silver' | 'Bronze' = 'Bronze'
    if (healthScore >= 70) badge = 'Silver'
    if (healthScore >= 90) badge = 'Gold'

    return {
        score: healthScore,
        tier: badge
    }
}

export function getSmartMotivation(score: number, hour: number, mealsDone: number, waterMl: number, streak: number = 0): string {
    if (hour < 10) {
        if (streak > 3) return `🔥 ${streak} dias seguidos! Continue assim!`
        return "Comece o dia com o pé direito! Café da manhã é essencial."
    } else if (mealsDone === 0 && hour > 10) {
        return "Ainda não registrou suas refeições? Vamos lá!"
    } else if (waterMl < 500 && hour > 12) {
        return "Lembre-se de beber água. Sua hidratação está baixa."
    } else if (score > 80) {
        return "Excelente desempenho hoje! Continue assim."
    } else if (streak > 7) {
        return "Você é imparável! Uma semana de consistência."
    }
    return "Mantenha o foco nos seus objetivos hoje!"
}

export function detectAtRiskPatient(logsLast7Days: number, logsLast3Days: number): { issue: string | null } {
    if (logsLast3Days === 0) {
        return { issue: 'Inativo há 3 dias' }
    }
    if (logsLast7Days < 5) {
        return { issue: 'Baixa adesão' }
    }
    return { issue: null }
}
