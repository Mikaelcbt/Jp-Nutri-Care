'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { calculateHealthScore, getSmartMotivation } from '@/lib/smart-engine'

export async function getStudentPlan() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    // 1. Get Active Plan
    const { data: plans } = await supabase
        .from('diet_plans')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)

    const currentPlan = plans?.[0]
    if (!currentPlan) return null

    // 2. Get Days (ordered)
    const { data: days } = await supabase
        .from('diet_days')
        .select('*')
        .eq('plan_id', currentPlan.id)
        .order('day_number', { ascending: true })

    if (!days) return { plan: currentPlan, days: [], currentDayNumber: 1 }

    // 3. Current Day Logic
    const startDate = new Date(currentPlan.start_date)
    const today = new Date()
    const diffTime = Math.abs(today.getTime() - startDate.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    const currentDayNumber = diffDays > 0 ? diffDays : 1

    // 4. Fetch Meals for Days
    const dayIds = days.map(d => d.id)

    // Fetch meals
    const { data: meals } = await supabase
        .from('meals')
        .select('*')
        .in('diet_day_id', dayIds)

    // Fetch logs to check completion status
    const { data: logs } = await supabase
        .from('meal_logs')
        .select('meal_id, status')
        .eq('user_id', user.id)
        .in('meal_id', meals?.map(m => m.id) || [])

    const logsMap = new Map(logs?.map(l => [l.meal_id, l.status]) || [])

    // Map meals to days
    const daysWithMeals = days.map(day => {
        const dayMeals = meals?.filter(m => m.diet_day_id === day.id) || []
        const isPast = day.day_number < currentDayNumber
        const isCurrent = day.day_number === currentDayNumber

        let status = 'locked'
        if (isPast) status = 'completed' // Simplistic: past days are done
        if (isCurrent) status = 'current'

        return {
            ...day,
            status,
            meals: dayMeals.map(m => ({
                ...m,
                done: logsMap.get(m.id) === 'done'
            }))
        }
    })

    return {
        plan: currentPlan,
        days: daysWithMeals,
        currentDayNumber
    }
}

/**
 * Get Patient Dashboard Data
 */
export async function getPatientDashboard() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) redirect('/auth/login')

    const today = new Date().toISOString().split('T')[0]

    // 0. Get User Plan Type
    const { data: profile } = await supabase
        .from('profiles')
        .select('plan_type')
        .eq('id', user.id)
        .single()
    const planType = profile?.plan_type || 'free'

    // 1. Get Plan & Days for Today
    const { data: plan } = await supabase
        .from('diet_plans')
        .select(`
            *,
            diet_days (
                id,
                day_number,
                meals (
                    id,
                    name,
                    time,
                    description,
                    target_calories
                )
            )
        `)
        .eq('user_id', user.id)
        .eq('user_id', user.id)
        // Fix: fetch LATEST plan, regardless of start date, then check validity
        .order('start_date', { ascending: false })
        .limit(1)
        .single()

    // 2. Fetch Daily Log
    const { data: dailyLog } = await supabase
        .from('daily_logs')
        .select('*')
        .eq('user_id', user.id)
        .eq('log_date', today)
        .single()

    // 3. Fetch Meal Logs for Today
    const { data: mealLogs } = await supabase
        .from('meal_logs')
        .select('meal_id, status, completed, completed_at')
        .eq('user_id', user.id)

    // Map logs for easy lookup
    const logsMap = new Map(mealLogs?.map(l => [l.meal_id, l]))

    let currentDayMeals: any[] = []
    let planDay = 1

    if (plan) {
        const start = new Date(plan.start_date)
        const now = new Date(today)
        const diffTime = Math.abs(now.getTime() - start.getTime())
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        planDay = diffDays + 1

        const dayData = plan.diet_days.find((d: any) => d.day_number === planDay)
        if (dayData) {
            currentDayMeals = dayData.meals.map((m: any) => ({
                ...m,
                status: logsMap.get(m.id)?.status || 'pending',
                completed: logsMap.get(m.id)?.completed || false
            }))
            // Sort by time
            currentDayMeals.sort((a, b) => a.time.localeCompare(b.time))
        }
    }

    // 5. Calculate Stats (Streak & Weekly)
    const todayStr = new Date().toISOString().split('T')[0]

    // Fetch recent logs for streak & weekly view
    const { data: recentLogs } = await supabase
        .from('meal_logs')
        .select('created_at, status')
        .eq('user_id', user.id)
        .eq('status', 'done')
        .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
        .order('created_at', { ascending: false })

    // Simple Streak Calc (Optimistic/Approximation)
    // In a real app, this should be a robust DB query or separate table
    // Phase 6: Use real calculation
    const uniqueDays = new Set(recentLogs?.map(l => l.created_at.split('T')[0]))

    // Logic to count backwards would require checking yesterday, etc.
    // For MVP Premium, let's just count total active days in last 7 days as a "Weekly Streak"
    // streak = uniqueDays.size 
    // UPDATE: Now we use the real gamification logic
    const { calculateStreak } = await import('@/lib/gamification')
    const streak = await calculateStreak(user.id)

    // Weekly Progress Data (Last 7 days)
    const weekDays = Array.from({ length: 7 }, (_, i) => {
        const d = new Date()
        d.setDate(d.getDate() - i)
        return d.toISOString().split('T')[0]
    }).reverse()

    const weeklyProgress = weekDays.map(date => {
        const count = recentLogs?.filter(l => l.created_at.startsWith(date)).length || 0
        // Assume daily goal is ~5 meals.
        // Logic: < 3 = low, 3-4 = good, 5+ = perfect
        let status: 'none' | 'partial' | 'complete' = 'none'
        if (count > 0 && count < 4) status = 'partial'
        if (count >= 4) status = 'complete'

        return { date, status, count }
    })

    // --- HEALTH SCORE CALCULATION (Smart Engine) ---
    const totalMeals = currentDayMeals.length || 1
    const mealsDone = currentDayMeals.filter(m => m.completed).length

    const { score: healthScore, tier: badge } = calculateHealthScore({
        mealsCompleted: mealsDone,
        totalMeals,
        waterMl: dailyLog?.water_ml || 0,
        streak
    })

    // --- SMART MOTIVATION (Contextual) ---
    const nowHour = new Date().getHours()
    const motivation = getSmartMotivation(healthScore, nowHour, mealsDone, dailyLog?.water_ml || 0, streak)

    return {
        user,
        planDay,
        meals: currentDayMeals,
        water: dailyLog?.water_ml || 0,
        workoutDone: dailyLog?.workout_done || false,
        streak,
        weeklyProgress,
        score: {
            value: healthScore,
            tier: badge
        },
        motivation,
        planType
    }
}

/**
 * Toggle Meal Completion
 */
export async function toggleMeal(mealId: string, isCompleted: boolean) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Unauthorized')

    const { error } = await supabase
        .from('meal_logs')
        .upsert({
            user_id: user.id,
            meal_id: mealId,
            status: isCompleted ? 'done' : 'pending',
            completed: isCompleted,
            completed_at: isCompleted ? new Date().toISOString() : null
        }, { onConflict: 'user_id, meal_id' })

    if (error) throw new Error(error.message)
    revalidatePath('/app/seu-dia')
    revalidatePath('/app/plano')
}

/**
 * Add Water
 */
export async function addWater(amount: number) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Unauthorized')

    const today = new Date().toISOString().split('T')[0]

    await supabase.from('water_logs').insert({
        user_id: user.id,
        amount_ml: amount
    })

    const { data: existing } = await supabase
        .from('daily_logs')
        .select('water_ml')
        .eq('user_id', user.id)
        .eq('log_date', today)
        .single()

    const currentTotal = existing?.water_ml || 0
    const newTotal = currentTotal + amount

    const { error } = await supabase
        .from('daily_logs')
        .upsert({
            user_id: user.id,
            log_date: today,
            water_ml: newTotal
        }, { onConflict: 'user_id, log_date' })

    if (error) throw new Error(error.message)
    revalidatePath('/app/seu-dia')
}

/**
 * Reset Water
 */
export async function resetWater() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Unauthorized')

    const today = new Date().toISOString().split('T')[0]

    await supabase
        .from('daily_logs')
        .upsert({
            user_id: user.id,
            log_date: today,
            water_ml: 0
        }, { onConflict: 'user_id, log_date' })

    revalidatePath('/app/seu-dia')
}

/**
 * Toggle Workout
 */
export async function toggleWorkout(done: boolean) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Unauthorized')

    const today = new Date().toISOString().split('T')[0]

    const { error } = await supabase
        .from('daily_logs')
        .upsert({
            user_id: user.id,
            log_date: today,
            workout_done: done
        }, { onConflict: 'user_id, log_date' })

    if (error) throw new Error(error.message)
    revalidatePath('/app/seu-dia')
}

/**
 * Get Patient Progress (Last 7 Days)
 */
export async function getPatientProgress() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect('/auth/login')

    const today = new Date()
    const last7Days = []

    for (let i = 6; i >= 0; i--) {
        const d = new Date(today)
        d.setDate(today.getDate() - i)
        last7Days.push(d.toISOString().split('T')[0])
    }

    const startDate = last7Days[0]
    const endDate = last7Days[6]

    // Fetch Daily Logs (Water & Workout)
    const { data: dailyLogs } = await supabase
        .from('daily_logs')
        .select('*')
        .eq('user_id', user.id)
        .gte('log_date', startDate)
        .lte('log_date', endDate)

    // Fetch Meal Logs (Total Completed Count)
    const { count: totalMeals } = await supabase
        .from('meal_logs')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .eq('status', 'done')

    // Construct Chart Data
    const chartData = last7Days.map(date => {
        const log = dailyLogs?.find(l => l.log_date === date)
        return {
            date,
            weekday: new Date(date).toLocaleDateString('pt-BR', { weekday: 'short' }).slice(0, 3),
            water: log?.water_ml || 0,
            workout: log?.workout_done ? 1 : 0
        }
    })

    const totalWaterWeek = chartData.reduce((acc, curr) => acc + curr.water, 0)
    const avgWater = Math.round(totalWaterWeek / 7)
    const workoutCount = chartData.filter(d => d.workout > 0).length

    return {
        chartData,
        stats: {
            totalMeals: totalMeals || 0,
            avgWater,
            workoutCount
        }
    }
}

export async function updateProfile(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        // Handle unauth
        return
    }

    // ALLOW name/avatar updates for everyone (remove Pro check)
    // const { data: profile } = await supabase.from('profiles').select('plan_type').eq('id', user.id).single()
    // if (profile?.plan_type !== 'pro') {
    //    throw new Error('PLAN_LIMIT_REACHED')
    // }

    const fullName = formData.get('fullName') as string
    const avatarFile = formData.get('avatar') as File

    let avatarUrl = user.user_metadata.avatar_url

    // Handle Avatar Upload
    if (avatarFile && avatarFile.size > 0 && avatarFile.name !== 'undefined') {
        const fileExt = avatarFile.name.split('.').pop()
        const fileName = `${user.id}-${Math.random()}.${fileExt}`
        const filePath = `avatars/${fileName}`

        const { error: uploadError } = await supabase.storage
            .from('avatars') // Ensure this bucket exists in Supabase!
            .upload(filePath, avatarFile)

        if (uploadError) {
            console.error('Error uploading avatar:', uploadError)
            // Continue without avatar update or throw? Let's log and continue for now.
        } else {
            const { data: { publicUrl } } = supabase.storage
                .from('avatars')
                .getPublicUrl(filePath)
            avatarUrl = publicUrl
        }
    }

    // Update Auth Metadata
    const { error: authError } = await supabase.auth.updateUser({
        data: { full_name: fullName, avatar_url: avatarUrl }
    })

    if (authError) throw new Error(authError.message)

    // Update Profile Table
    const { error: profileError } = await supabase
        .from('profiles')
        .update({ full_name: fullName, avatar_url: avatarUrl })
        .eq('id', user.id)

    if (profileError) throw new Error(profileError.message)

    revalidatePath('/app/perfil')
    return { success: true }
}
