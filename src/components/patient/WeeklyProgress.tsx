'use client'

import { motion } from 'framer-motion'
import clsx from 'clsx'
import { Check, X, Minus } from 'lucide-react'

type DayStatus = {
    date: string
    status: 'none' | 'partial' | 'complete'
    count: number
}

export function WeeklyProgress({ data }: { data: DayStatus[] }) {
    const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

    return (
        <div className="w-full overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:overflow-visible scrollbar-hide">
            <div className="flex justify-between min-w-[320px] gap-2">
                {data.map((day, i) => {
                    const dateObj = new Date(day.date)
                    // Fix processing of date to get correct day of week index requires proper UTC handling or just getDay() on object
                    // Assuming date string YYYY-MM-DD
                    const dayIndex = new Date(day.date + 'T12:00:00').getDay()
                    const label = days[dayIndex]
                    const isToday = i === data.length - 1

                    return (
                        <div key={day.date} className="flex flex-col items-center gap-2">
                            <div className={clsx(
                                "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all",
                                day.status === 'complete' && "bg-green-500 border-green-500 text-white",
                                day.status === 'partial' && "bg-orange-100 border-orange-200 text-orange-500",
                                day.status === 'none' && "bg-slate-50 border-slate-100 text-slate-300",
                                isToday && "ring-2 ring-offset-2 ring-primary border-primary"
                            )}>
                                {day.status === 'complete' && <Check className="w-5 h-5" />}
                                {day.status === 'partial' && <span className="text-xs font-bold">{day.count}</span>}
                                {day.status === 'none' && <Minus className="w-4 h-4" />}
                            </div>
                            <span className={clsx(
                                "text-[10px] font-bold uppercase",
                                isToday ? "text-primary" : "text-slate-400"
                            )}>
                                {label}
                            </span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
