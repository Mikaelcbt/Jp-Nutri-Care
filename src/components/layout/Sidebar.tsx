'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Calendar, Users, TrendingUp, Utensils, Settings, ChefHat } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
    { name: 'Início', href: '/app', icon: Home },
    { name: 'Seu Dia', href: '/app/seu-dia', icon: Calendar },
    { name: 'Plano 14 Dias', href: '/app/plano', icon: Utensils },
    { name: 'Comunidade', href: '/app/comunidade', icon: Users },
    { name: 'Progresso', href: '/app/progresso', icon: TrendingUp },
    { name: 'Receitas', href: '/app/receitas', icon: ChefHat },
    { name: 'Configurações', href: '/app/configuracoes', icon: Settings },
]

export function Sidebar({ plan }: { plan: 'free' | 'pro' }) {
    const pathname = usePathname()

    return (
        <aside className="hidden md:flex fixed left-0 top-0 h-full w-72 bg-white border-r border-slate-100/80 z-40 flex-col shadow-sm">
            <div className="p-8">
                <Link href="/app" className="block">
                    <h1 className="text-2xl font-black tracking-tighter text-slate-900 flex items-center gap-2">
                        <span className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center text-white">JP</span>
                        NutriCare
                    </h1>
                </Link>
            </div>

            <nav className="flex-1 px-6 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                    const isActive = pathname === item.href

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 font-medium group relative overflow-hidden",
                                isActive
                                    ? "bg-primary text-white shadow-lg shadow-primary/25"
                                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                            )}
                        >
                            <item.icon className={cn("w-5 h-5 transition-colors", isActive ? "text-white" : "text-slate-400 group-hover:text-slate-600")} />
                            <span className="relative z-10">{item.name}</span>
                        </Link>
                    )
                })}
            </nav>

            <div className="p-6 mt-auto">
                {plan === 'pro' ? (
                    <div className="p-5 rounded-3xl bg-slate-50 border border-slate-100">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-sm font-bold text-slate-900">Plano Pro</span>
                            <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-full">Ativo</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            Membro Premium
                        </div>
                    </div>
                ) : (
                    <Link href="/app/planos">
                        <div className="p-5 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-lg shadow-slate-900/20 group hover:scale-[1.02] transition-transform cursor-pointer relative overflow-hidden">
                            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="flex justify-between items-center mb-3 relative z-10">
                                <span className="text-sm font-bold">Faça o Upgrade</span>
                                <span className="text-xs font-bold text-slate-900 bg-white px-2 py-1 rounded-full">Free</span>
                            </div>
                            <p className="text-xs text-slate-300 mb-3 relative z-10">Desbloqueie IA e Dietas Personalizadas.</p>
                            <button className="w-full py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary/90 transition-colors">
                                Assinar Agora
                            </button>
                        </div>
                    </Link>
                )}
            </div>
        </aside>
    )
}
