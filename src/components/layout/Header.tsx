'use client'

import { Bell, Search, LogOut, User, Crown } from 'lucide-react'
import { logout } from '@/app/auth/actions'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export function Header({ user, plan }: { user: any, plan: string }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <header className="sticky top-0 z-30 w-full h-20 glass border-b border-white/5 flex items-center justify-between px-8 backdrop-blur-xl">
            {/* Search Bar */}
            <div className="relative w-96 hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                    type="text"
                    placeholder="Buscar receitas, posts..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/5 border border-black/5 text-sm text-slate-900 placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
                />
            </div>

            <div className="flex items-center gap-6">
                {plan !== 'pro' && (
                    <Link href="/app/planos" className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-200 to-yellow-400 text-yellow-900 rounded-full text-xs font-bold hover:scale-105 transition-transform shadow-sm shadow-yellow-200/50">
                        <Crown className="w-4 h-4 fill-current" />
                        ASSINAR PRO
                    </Link>
                )}

                {/* Notifications */}
                {/* Notifications */}
                <Link href="/app/notificacoes">
                    <button className="relative text-muted-foreground hover:text-slate-900 transition-colors">
                        <Bell className="w-6 h-6" />
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
                    </button>
                </Link>

                {/* User Menu */}
                <div className="relative">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="flex items-center gap-3 hover:bg-slate-100 p-2 rounded-xl transition-colors"
                    >
                        <div className={cn("w-10 h-10 rounded-full p-[2px]", plan === 'pro' ? "bg-gradient-to-tr from-amber-300 to-yellow-500" : "bg-slate-200")}>
                            <img
                                src={user?.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`}
                                alt="Avatar"
                                className="w-full h-full rounded-full bg-white object-cover border-2 border-white"
                            />
                        </div>
                        <div className="text-left hidden md:block">
                            <p className="text-sm font-semibold text-slate-900 leading-none">{user?.user_metadata?.full_name || 'Usuário'}</p>
                            <p className="text-xs text-muted-foreground capitalize">{plan} Member</p>
                        </div>
                    </button>

                    {/* Dropdown */}
                    {isMenuOpen && (
                        <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-slate-100 rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 z-50">
                            <div className="p-1">
                                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors">
                                    <User className="w-4 h-4" />
                                    Perfil
                                </button>
                                <form action={logout}>
                                    <button type="submit" className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                        <LogOut className="w-4 h-4" />
                                        Sair
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}
