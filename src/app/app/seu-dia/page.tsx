import { getPatientDashboard } from '../actions'
import { PatientHeader } from '@/components/patient/PatientHeader'
import { MealList } from '@/components/patient/MealList'
import { WaterTracker } from '@/components/patient/WaterTracker'
import { WorkoutToggle } from '@/components/patient/WorkoutToggle'
import { WeeklyProgress } from '@/components/patient/WeeklyProgress'
import { redirect } from 'next/navigation'

export default async function SeuDiaPage() {
    const data = await getPatientDashboard().catch(() => null)

    if (!data) {
        // Handle error or no plan scenario
        // For now, redirect to safe page or show empty state if truly no data
        // But likely just means auth error if catch block hit
        // If data is null due to no plan, we should show "No Active Plan" UI
    }

    // Safety fallback for data
    const safeData = data || {
        user: { user_metadata: { full_name: 'Visitante' } },
        planDay: 1,
        meals: [],
        water: 0,
        workoutDone: false,
        streak: 0,
        weeklyProgress: [],
        score: { value: 0, tier: 'Bronze' },
        motivation: '',
        planType: 'free'
    }

    const isPro = safeData.planType === 'pro'

    return (
        <div className="pb-24 md:pb-0 animate-in fade-in duration-500 min-h-screen bg-slate-50/50">
            {/* Mobile-First Layout: Stacked full-width cards with minimal padding on mobile */}

            {/* Header Section */}
            <div className="bg-white px-6 pt-8 pb-8 rounded-b-[2.5rem] shadow-sm mb-8 border-b border-slate-100/50">
                <PatientHeader
                    name={safeData.user.user_metadata?.full_name?.split(' ')[0] || 'Paciente'}
                    day={safeData.planDay}
                    streak={safeData.streak}
                    score={safeData.score}
                    motivation={safeData.motivation}
                />
            </div>

            <div className="px-4 md:px-8 max-w-lg mx-auto space-y-8">

                {/* Weekly Progress */}
                <section>
                    <div className="flex items-center justify-between mb-4 px-2">
                        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Sua Semana</h2>
                    </div>
                    {safeData.weeklyProgress && <WeeklyProgress data={safeData.weeklyProgress} />}
                </section>

                {/* Meal Checklist */}
                <section>
                    <div className="flex items-center justify-between mb-4 px-2">
                        <h2 className="text-xl font-black text-slate-900 tracking-tight">Refeições de Hoje</h2>
                        <span className="text-xs font-bold text-slate-400 bg-white px-2 py-1 rounded-lg border border-slate-100 shadow-sm">
                            {safeData.meals.filter((m: any) => m.completed).length} / {safeData.meals.length}
                        </span>
                    </div>
                    {safeData.meals.length > 0 ? (
                        <MealList meals={safeData.meals} isPro={isPro} />
                    ) : (
                        <div className="p-8 text-center bg-white rounded-3xl border border-slate-100 text-slate-400 text-sm shadow-sm">
                            Nenhum plano alimentar ativo para hoje.
                            <br />
                            <span className="text-xs opacity-70">Entre em contato com seu nutricionista.</span>
                        </div>
                    )}
                </section>

                {/* Hydration */}
                <section>
                    <WaterTracker current={safeData.water} goal={3000} isPro={isPro} />
                </section>

                {/* Workout */}
                <section>
                    <WorkoutToggle done={safeData.workoutDone} isPro={isPro} />
                </section>

                {/* Extra spacing for bottom nav if on mobile */}
                <div className="h-4" />
            </div>
        </div>
    )
}
