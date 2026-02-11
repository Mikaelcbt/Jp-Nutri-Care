'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Calendar, Utensils, Users, ChefHat } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

const navItems = [
    { name: 'Início', href: '/app', icon: Home },
    { name: 'Seu Dia', href: '/app/seu-dia', icon: Calendar },
    { name: 'Plano', href: '/app/plano', icon: Utensils },
    { name: 'Comunidade', href: '/app/comunidade', icon: Users },
    { name: 'Perfil', href: '/app/perfil', icon: ChefHat },
]

export function MobileNav() {
    const pathname = usePathname()

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-t border-slate-200/50 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] md:hidden pb-safe pt-2">
            <div className="flex justify-around items-center h-16 px-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center justify-center w-full h-full gap-1 transition-all relative",
                                isActive
                                    ? "text-primary"
                                    : "text-slate-400 hover:text-slate-600"
                            )}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute -top-2 w-8 h-1 bg-primary rounded-full shadow-[0_2px_10px_rgba(var(--primary),0.5)]"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}

                            <div className={cn(
                                "p-2 rounded-2xl transition-all duration-300",
                                isActive && "bg-primary/10 translate-y-[-2px]"
                            )}>
                                <item.icon className={cn("w-5 h-5", isActive && "fill-current")} />
                            </div>
                            <span className={cn(
                                "text-[10px] font-bold transition-all",
                                isActive ? "opacity-100 scale-105" : "opacity-70 scale-100"
                            )}>{item.name}</span>
                        </Link>
                    )
                })}
            </div>
        </nav>
    )
}
