'use client'

import { useState } from 'react'
import { Check, Clock, ChevronDown, ChevronUp } from 'lucide-react'
import { toggleMeal } from '@/app/app/actions'
import clsx from 'clsx'

export function MealList({ meals, isPro }: { meals: any[], isPro: boolean }) {
    // Optimistic state could be handled here or rely on revalidatePath
    // For specific "pending" feedback, we can use local state for immediate interaction

    return (
        <div className="space-y-4">
            {meals.map((meal) => (
                <MealCard key={meal.id} meal={meal} isPro={isPro} />
            ))}
        </div>
    )
}

function MealCard({ meal, isPro }: { meal: any, isPro: boolean }) {
    const [isExpanded, setIsExpanded] = useState(false)
    const [completed, setCompleted] = useState(meal.completed)
    const [loading, setLoading] = useState(false)

    const handleToggle = async (e: React.MouseEvent) => {
        e.stopPropagation()
        if (!isPro) return // Handled by ProGuard, but safety check
        setLoading(true)
        const newState = !completed
        setCompleted(newState)

        try {
            await toggleMeal(meal.id, newState)
        } catch (error) {
            setCompleted(!newState)
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div
            onClick={() => setIsExpanded(!isExpanded)}
            className={clsx(
                "relative bg-white rounded-[2rem] p-5 border transition-all cursor-pointer overflow-hidden group",
                completed
                    ? "border-slate-100 opacity-75"
                    : "border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200"
            )}
        >
            <div className="flex items-center gap-5">
                {/* Check Button */}
                <button
                    onClick={handleToggle}
                    disabled={loading}
                    className={clsx(
                        "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 shrink-0 z-10 border-2 group-active:scale-90",
                        completed
                            ? "bg-primary border-primary text-white shadow-inner"
                            : "bg-transparent border-slate-100 text-slate-200 hover:border-primary/30 hover:text-primary/50 hover:bg-slate-50"
                    )}
                >
                    <Check className={clsx("w-6 h-6 stroke-[3] transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1)", completed ? "scale-100 rotate-0" : "scale-0 -rotate-90 opacity-0")} />
                </button>

                <div className="flex-1 min-w-0 py-1">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" /> {meal.time}
                        </span>
                    </div>
                    <h3 className={clsx("font-bold text-lg md:text-xl truncate transition-all duration-500", completed ? "text-slate-400 line-through decoration-slate-200 decoration-2" : "text-slate-900")}>
                        {meal.name}
                    </h3>
                </div>

                <div className={clsx("text-slate-300 transition-transform duration-300", isExpanded && "rotate-180")}>
                    <ChevronDown className="w-6 h-6" />
                </div>
            </div>

            {/* Expanded Details */}
            {isExpanded && (
                <div className="mt-5 pt-5 border-t border-slate-50 animate-in fade-in slide-in-from-top-2 duration-300">
                    <p className="text-base text-slate-600 leading-relaxed font-medium">
                        {meal.description || "Sem descrição."}
                    </p>
                    <div className="mt-4 flex gap-2">
                        <span className="text-xs font-bold text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                            🔥 {meal.target_calories} kcal
                        </span>
                    </div>
                </div>
            )}
        </div>
    )
}
