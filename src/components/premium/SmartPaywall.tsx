'use client'

import { Lock } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import clsx from 'clsx'

interface SmartPaywallProps {
    isPro: boolean
    children: React.ReactNode
    blurAmount?: 'sm' | 'md' | 'lg'
    className?: string
}

export function SmartPaywall({ isPro, children, blurAmount = 'sm', className }: SmartPaywallProps) {
    if (isPro) return <>{children}</>

    return (
        <div className={clsx("relative group", className)}>
            {/* Blurred Content */}
            <div className={`filter blur-${blurAmount} select-none pointer-events-none opacity-50 transition-all duration-500 group-hover:blur-md`}>
                {children}
            </div>

            {/* Lock Overlay */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center gap-3 p-6"
                >
                    <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center text-white shadow-xl shadow-slate-900/20">
                        <Lock className="w-5 h-5" />
                    </div>
                    <div className="text-center">
                        <p className="text-sm font-bold text-slate-900">Conteúdo Premium</p>
                        <p className="text-xs text-slate-500 mb-3">Disponível no Plano PRO</p>
                        <Link href="/app/planos">
                            <button className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-full hover:scale-105 transition-transform">
                                Desbloqueie Agora
                            </button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
