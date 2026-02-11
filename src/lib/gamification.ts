import { createClient } from '@/lib/supabase/server'

export async function calculateStreak(userId: string) {
    const supabase = await createClient()
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Fetch last 30 daily logs
    const { data: logs } = await supabase
        .from('daily_logs')
        .select('log_date, water_ml, workout_done')
        .eq('user_id', userId)
        .order('log_date', { ascending: false })
        .limit(30)

    // Fetch last 30 days meal logs (distinct dates)
    const { data: mealLogs } = await supabase
        .from('meal_logs')
        .select('created_at, status')
        .eq('user_id', userId)
        .eq('status', 'done')
        .order('created_at', { ascending: false })
        .limit(100)

    // Combine active days
    const activeDays = new Set<string>()

    logs?.forEach(log => {
        if (log.water_ml > 0 || log.workout_done) {
            activeDays.add(log.log_date)
        }
    })

    mealLogs?.forEach(log => {
        const date = log.created_at.split('T')[0]
        activeDays.add(date)
    })

    // Calculate Streak
    let streak = 0
    const todayStr = today.toISOString().split('T')[0]

    // Check if today is active (if not, check yesterday to start counting)
    // Streak continues if today OR yesterday was active. 
    // If today is inactive, streak holds value of yesterday IF yesterday was active.
    // Actually, usually streak is "consecutive days ending yesterday" OR "ending today".

    const currentCheck = new Date(today)
    let dateStr = currentCheck.toISOString().split('T')[0]

    if (activeDays.has(dateStr)) {
        streak++
        currentCheck.setDate(currentCheck.getDate() - 1)
        dateStr = currentCheck.toISOString().split('T')[0]
    } else {
        // Today not done yet. Check yesterday.
        currentCheck.setDate(currentCheck.getDate() - 1)
        dateStr = currentCheck.toISOString().split('T')[0]
        if (!activeDays.has(dateStr)) {
            return 0 // Streak broken
        }
    }

    // Count backwards
    while (activeDays.has(dateStr)) {
        streak++
        currentCheck.setDate(currentCheck.getDate() - 1)
        dateStr = currentCheck.toISOString().split('T')[0]
    }

    return streak
}
