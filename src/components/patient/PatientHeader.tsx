'use client'

import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Flame } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const MOTIVATIONAL_QUOTES = [
    "Cada refeição é uma nova oportunidade.",
    "A constância vence a intensidade.",
    "Você está construindo sua melhor versão.",
    "Um dia de cada vez.",
    "Nutrição é autocuidado.",
]

export function PatientHeader({ name, day, streak = 0, score, motivation }: { name: string, day: number, streak?: number, score?: { value: number, tier: 'Bronze' | 'Silver' | 'Gold' }, motivation?: string }) {
    const today = format(new Date(), "EEEE, d 'de' MMMM", { locale: ptBR })

    const [displayMotivation, setDisplayMotivation] = useState(motivation || MOTIVATIONAL_QUOTES[0])

    useEffect(() => {
        if (!motivation) {
            setDisplayMotivation(MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)])
        } else {
            setDisplayMotivation(motivation)
        }
    }, [motivation])

    const badgeColors = {
        Bronze: "bg-amber-100 text-amber-700 border-amber-200",
        Silver: "bg-slate-100 text-slate-700 border-slate-200",
        Gold: "bg-yellow-100 text-yellow-700 border-yellow-200",
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 capitalize">
                        {today}
                    </p>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                        Olá, {name}! <span className="text-2xl animate-pulse inline-block">👋</span>
                    </h1>
                </div>

                <div className="flex gap-2">
                    {/* Health Score Badge */}
                    {score && (
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className={`flex flex-col items-center px-3 py-2 rounded-2xl border ${badgeColors[score.tier] || badgeColors.Bronze}`}
                        >
                            <span className="text-xl font-black">{score.value}</span>
                            <span className="text-[8px] font-bold uppercase tracking-wide">Score</span>
                        </motion.div>
                    )}

                    {/* Fire Streak */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className={`flex flex-col items-center px-3 py-2 rounded-2xl border transition-colors duration-500 ${streak > 3 ? 'bg-orange-100 border-orange-200 shadow-sm shadow-orange-100' : 'bg-orange-50 border-orange-100'}`}
                    >
                        <div className={`flex items-center gap-1 text-orange-500 ${streak > 3 ? 'animate-pulse' : ''}`}>
                            <Flame className={`w-5 h-5 fill-current ${streak > 7 ? 'text-orange-600' : ''}`} />
                            <span className="text-xl font-black">{streak}</span>
                        </div>
                        <span className="text-[8px] font-bold text-orange-400 uppercase tracking-wide">Dias</span>
                    </motion.div>
                </div>
            </div>

            {/* Motivational Card / Plan Info */}
            <div className="p-4 rounded-2xl bg-slate-900 text-white shadow-lg shadow-slate-900/10 relative overflow-hidden">
                <div className="relative z-10 flex justify-between items-center">
                    <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                            Plano 14 Dias
                        </div>
                        <div className="text-lg font-bold flex items-center gap-2">
                            Dia {day} <span className="opacity-50 font-normal text-sm">/ 14</span>
                        </div>
                    </div>
                    <div className="text-right max-w-[60%]">
                        <p className="text-xs text-slate-300 italic leading-snug">"{displayMotivation}"</p>
                    </div>
                </div>

                {/* Abstract Background Decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10" />
            </div>
        </div>
    )
}
