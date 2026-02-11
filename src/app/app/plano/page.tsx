import { Clock, Flame, Utensils, CalendarOff } from 'lucide-react'
import { getStudentPlan } from '../actions'

export default async function PlanoPage() {
    const data = await getStudentPlan()

    if (!data || !data.plan) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4 animate-in fade-in">
                <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center">
                    <CalendarOff className="w-10 h-10 text-slate-300" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">Nenhum plano ativo</h2>
                <p className="text-slate-500 max-w-xs mx-auto">Peça para seu nutricionista liberar seu cronograma de 14 dias.</p>
            </div>
        )
    }

    const { plan, days, currentDayNumber } = data
    const currentDay = days.find(d => d.day_number === currentDayNumber) || days[0]

    // Calculate Progress
    const totalDays = days.length
    const progress = Math.round(((currentDayNumber - 1) / totalDays) * 100)

    return (
        <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500 pb-24 md:pb-0">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 px-1">
                <div>
                    <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">{plan.title}</h1>
                    <p className="text-slate-500 font-medium mt-1">Siga o cronograma para maximizar resultados.</p>
                </div>
                <div className="bg-white px-4 py-2 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3 w-fit">
                    <span className="text-sm font-bold text-slate-400 uppercase tracking-wide">Progresso</span>
                    <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-primary transition-all duration-1000" style={{ width: `${progress}%` }} />
                    </div>
                    <span className="text-sm font-black text-slate-900">{progress}%</span>
                </div>
            </div>

            {/* Calendar Strip */}
            <div className="overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0">
                <div className="flex gap-3 min-w-max">
                    {days.map((d: any) => (
                        <div
                            key={d.id}
                            className={`
                                relative w-16 h-20 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all border
                                ${d.status === 'current'
                                    ? 'bg-slate-900 text-white border-slate-900 shadow-xl shadow-slate-900/20 scale-110 z-10'
                                    : d.status === 'completed'
                                        ? 'bg-primary/10 text-primary border-primary/20'
                                        : 'bg-white text-slate-300 border-slate-100'
                                }
                            `}
                        >
                            <span className="text-[10px] font-bold uppercase tracking-wider">DIA</span>
                            <span className="text-xl font-black">{d.day_number}</span>
                            {d.status === 'completed' && (
                                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1" />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Current Day Content */}
            {currentDay && (
                <div className="rounded-[2.5rem] bg-white p-6 md:p-8 border border-slate-100 shadow-sm">
                    <div className="flex justify-between items-center mb-8 border-b border-slate-50 pb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                                Dia {currentDay.day_number} <span className="text-slate-300 font-medium text-lg">/ {totalDays}</span>
                            </h2>
                            <p className="text-slate-400 font-medium text-sm mt-1">
                                {currentDay.meals?.length || 0} refeições planejadas
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {currentDay.meals?.length > 0 ? (
                            currentDay.meals.sort((a: any, b: any) => a.time.localeCompare(b.time)).map((meal: any, i: number) => (
                                <div key={i} className="group flex flex-col md:flex-row gap-4 md:gap-6 items-start">
                                    <div className="w-16 pt-3 md:pt-1">
                                        <span className="text-sm font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-lg">
                                            {meal.time}
                                        </span>
                                    </div>
                                    <div className={`flex-1 w-full rounded-3xl p-5 border transition-all ${meal.done ? 'bg-primary/5 border-primary/20' : 'bg-slate-50/50 border-slate-100 group-hover:bg-white group-hover:shadow-md'}`}>
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className={`font-bold text-lg ${meal.done ? 'text-primary' : 'text-slate-900'}`}>
                                                {meal.name}
                                            </h3>
                                            <div className="flex items-center gap-1 text-slate-400 text-xs font-bold">
                                                <Flame className="w-3.5 h-3.5 text-orange-400" />
                                                {meal.target_calories} kcal
                                            </div>
                                        </div>
                                        <p className="text-slate-600 leading-relaxed text-sm">
                                            {meal.description}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-slate-400 italic">Sem refeições cadastradas para hoje.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
