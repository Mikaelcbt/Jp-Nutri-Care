'use client'

import { useState } from 'react'
import { Droplet, Plus } from 'lucide-react'
import { motion } from 'framer-motion'
import { addWater, resetWater } from '@/app/app/actions'
import clsx from 'clsx'
import { ProGuard } from '@/components/ui/ProGuard'

export function WaterTracker({ current, goal, isPro }: { current: number, goal: number, isPro: boolean }) {
    const [water, setWater] = useState(current)
    const [loading, setLoading] = useState(false)

    const percentage = Math.min((water / goal) * 100, 100)

    const handleAdd = async (amount: number) => {
        if (!isPro) return
        setLoading(true)
        const newAmount = water + amount
        setWater(newAmount) // Optimistic

        try {
            await addWater(amount)
        } catch (error) {
            setWater(water) // Revert
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const handleReset = async () => {
        if (!isPro) return
        if (!confirm('Zerar contador de hoje?')) return
        setWater(0)
        await resetWater()
    }

    return (
        <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm relative overflow-hidden group hover:border-blue-100 transition-colors">
            {/* Background Gradient for simple visual flair */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none opacity-50" />

            <div className="flex justify-between items-start mb-6 relative z-10">
                <div>
                    <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500">
                            <Droplet className="w-5 h-5 fill-current" />
                        </div>
                        Hidratação
                    </h2>
                    <p className="text-xs font-bold text-slate-400 mt-2 uppercase tracking-wide px-1">Meta: {(goal / 1000).toFixed(1)}L</p>
                </div>
                <div className="text-right">
                    <span className="text-4xl font-black text-slate-900 tracking-tighter">{(water / 1000).toFixed(1)}</span>
                    <span className="text-sm font-bold text-slate-400 ml-1">L</span>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="h-3 w-full bg-slate-50 rounded-full overflow-hidden mb-6 relative z-10 border border-slate-100">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ type: "spring", stiffness: 50, damping: 15 }}
                    className="h-full bg-blue-500 rounded-full relative"
                >
                    <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]" />
                </motion.div>
            </div>

            {/* Controls */}
            <div className="grid grid-cols-2 gap-3 relative z-10">
                {[250, 500].map((amount) => (
                    <ProGuard key={amount} isPro={isPro} feature="Registrar Hidratação" asChild>
                        <motion.button
                            whileTap={{ scale: 0.9 }} // Enhanced tap effect
                            whileHover={{ scale: 1.05 }}
                            onClick={() => handleAdd(amount)}
                            disabled={loading}
                            className="py-3 rounded-2xl bg-blue-50 text-blue-600 font-bold text-sm border border-blue-100 hover:bg-blue-100 transition-colors flex items-center justify-center gap-1 relative overflow-hidden"
                        >
                            <Plus className="w-4 h-4" />
                            {amount}ml
                        </motion.button>
                    </ProGuard>
                ))}
            </div>

            <button onClick={handleReset} className="w-full mt-4 text-[10px] font-bold text-slate-300 hover:text-red-400 uppercase tracking-widest transition-colors">
                Resetar
            </button>
        </div>
    )
}
