'use client'

import { useState } from 'react'
import { Dumbbell, CheckCircle2 } from 'lucide-react'
import { toggleWorkout } from '@/app/app/actions'
import clsx from 'clsx'
import { ProGuard } from '@/components/ui/ProGuard'

export function WorkoutToggle({ done, isPro }: { done: boolean, isPro: boolean }) {
    const [isDone, setIsDone] = useState(done)
    const [loading, setLoading] = useState(false)

    const handleToggle = async () => {
        if (!isPro) return
        setLoading(true)
        const newState = !isDone
        setIsDone(newState)

        try {
            await toggleWorkout(newState)
        } catch (error) {
            setIsDone(!newState)
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <ProGuard isPro={isPro} feature="Registrar Treino" asChild>
            <div
                onClick={!loading ? handleToggle : undefined}
                className={clsx(
                    "rounded-[2.5rem] p-6 border transition-all cursor-pointer relative overflow-hidden group",
                    isDone
                        ? "bg-slate-900 border-slate-900 text-white"
                        : "bg-white border-slate-100 hover:border-slate-200 text-slate-900"
                )}
            >
                {/* Background decoration */}
                {isDone && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                )}

                <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-4">
                        <div className={clsx(
                            "w-12 h-12 rounded-2xl flex items-center justify-center transition-all",
                            isDone ? "bg-white/20 text-white" : "bg-slate-100 text-slate-400"
                        )}>
                            <Dumbbell className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="font-bold text-lg">Treino Diário</h2>
                            <p className={clsx("text-xs font-medium", isDone ? "text-slate-300" : "text-slate-400")}>
                                {isDone ? 'Concluído com sucesso!' : 'Já treinou hoje?'}
                            </p>
                        </div>
                    </div>

                    <div className={clsx(
                        "w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all",
                        isDone ? "bg-white border-white text-slate-900" : "border-slate-200 text-transparent"
                    )}>
                        <CheckCircle2 className="w-5 h-5" />
                    </div>
                </div>
            </div>
        </ProGuard>
    )
}
