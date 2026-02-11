'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Lock, Crown, X, CheckCircle2 } from 'lucide-react'
import { create } from 'zustand'
import Link from 'next/link'

interface SmartLockState {
    isOpen: boolean
    featureName: string
    open: (feature?: string) => void
    close: () => void
}

export const useSmartLock = create<SmartLockState>((set) => ({
    isOpen: false,
    featureName: 'Funcionalidade Premium',
    open: (feature = 'Funcionalidade Premium') => set({ isOpen: true, featureName: feature }),
    close: () => set({ isOpen: false }),
}))

export function SmartLockModal() {
    const { isOpen, close, featureName } = useSmartLock()

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={close}
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-sm bg-[#0f172a] rounded-[2rem] overflow-hidden shadow-2xl border border-white/10"
                    >
                        {/* Header Image/Pattern */}
                        <div className="h-40 bg-gradient-to-br from-indigo-500 to-purple-600 relative overflow-hidden flex items-center justify-center group">
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-30 mix-blend-overlay" />

                            {/* Blurred "Preview" Effect */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-50 blur-sm scale-110">
                                <div className="w-full h-full bg-white/10" />
                            </div>

                            <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center shadow-2xl shadow-black/20 z-10 border border-white/20 transform group-hover:scale-110 transition-transform duration-500">
                                <Lock className="w-8 h-8 text-white drop-shadow-md" />
                            </div>

                            <button
                                onClick={close}
                                className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white/70 hover:text-white transition-colors z-20"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-8 text-center space-y-6">
                            <div>
                                <h3 className="text-2xl font-black text-white leading-tight mb-2 tracking-tight">
                                    Desbloqueie o <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-400">PRO</span>
                                </h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    A função <span className="font-bold text-slate-200">&quot;{featureName}&quot;</span> e muito mais espera por você.
                                </p>
                            </div>

                            {/* Benefits */}
                            <div className="bg-white/5 rounded-2xl p-5 text-left space-y-3 border border-white/5">
                                <Benefit text="Dietas 100% Personalizadas" />
                                <Benefit text="Inteligência Artificial Exclusiva" />
                                <Benefit text="Registro Ilimitado" />
                            </div>

                            {/* CTA */}
                            <Link href="/app/planos" onClick={() => close()} className="block w-full">
                                <button className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-green-500 text-white font-bold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-primary/25 flex items-center justify-center gap-2 group">
                                    <Crown className="w-4 h-4 text-amber-200 fill-current group-hover:animate-bounce" />
                                    <span>QUERO SER PRO</span>
                                </button>
                            </Link>

                            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                                7 dias de garantia • Cancelamento fácil
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}

function Benefit({ text }: { text: string }) {
    return (
        <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
            <span>{text}</span>
        </div>
    )
}
