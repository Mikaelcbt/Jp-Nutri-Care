'use client'

import { useState } from 'react'
import { updateUserPlan } from '@/app/admin/actions'
import { Crown, Shield, Loader2 } from 'lucide-react'
import clsx from 'clsx'

export function UserPlanSwitcher({ userId, currentPlan }: { userId: string, currentPlan: 'free' | 'pro' }) {
    const [plan, setPlan] = useState(currentPlan)
    const [loading, setLoading] = useState(false)

    const handleSwitch = async (newPlan: 'free' | 'pro') => {
        if (newPlan === plan) return
        if (!confirm(`Confirmar mudança para plano ${newPlan.toUpperCase()}?`)) return

        setLoading(true)
        try {
            await updateUserPlan(userId, newPlan)
            setPlan(newPlan)
        } catch (error) {
            alert('Erro ao atualizar plano')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex bg-slate-100 p-1 rounded-xl">
            <button
                disabled={loading}
                onClick={() => handleSwitch('free')}
                className={clsx(
                    "px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all",
                    plan === 'free'
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-400 hover:text-slate-600"
                )}
            >
                <Shield className="w-4 h-4" />
                Free
            </button>
            <button
                disabled={loading}
                onClick={() => handleSwitch('pro')}
                className={clsx(
                    "px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all",
                    plan === 'pro'
                        ? "bg-slate-900 text-white shadow-sm" // PRO style
                        : "text-slate-400 hover:text-slate-600"
                )}
            >
                {loading && plan !== 'pro' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Crown className={clsx("w-4 h-4", plan === 'pro' ? "text-yellow-400" : "")} />}
                PRO
            </button>
        </div>
    )
}
