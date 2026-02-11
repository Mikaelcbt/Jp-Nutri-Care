import Link from 'next/link'
import {
    Users,
    Calendar,
    Settings,
    LayoutDashboard,
    MessageSquare,
    Bell,
    LogOut,
    UtensilsCrossed
} from 'lucide-react'
import { logout } from '@/app/auth/actions'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const navItems = [
        { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard, mobile: true },
        { name: 'Pacientes', href: '/admin/patients', icon: Users, mobile: true },
        { name: 'Planos', href: '/admin/plans', icon: Calendar, mobile: true },
        { name: 'Receitas', href: '/admin/recipes', icon: UtensilsCrossed, mobile: false },
        { name: 'Comunidade', href: '/admin/community', icon: MessageSquare, mobile: true },
        { name: 'Notificações', href: '/admin/notifications', icon: Bell, mobile: false },
        { name: 'Configurações', href: '/admin/settings', icon: Settings, mobile: false },
    ]

    return (
        <div className="admin-theme min-h-screen flex flex-col lg:flex-row overflow-hidden font-sans bg-white">
            {/* Desktop Sidebar */}
            <aside className="w-72 bg-white border-r border-slate-200 flex flex-col hidden lg:flex shrink-0 h-screen sticky top-0">
                <div className="p-8">
                    <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                            <UtensilsCrossed className="w-6 h-6 text-primary" />
                        </div>
                        <span className="tracking-tight">JP ADM</span>
                    </h1>
                </div>

                <nav className="flex-1 px-4 py-2 space-y-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold group hover:bg-slate-50 text-slate-500 hover:text-slate-900 border-l-4 border-transparent hover:border-slate-200"
                        >
                            <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            <span>{item.name}</span>
                        </Link>
                    ))}
                </nav>

                <div className="p-6 border-t border-slate-100">
                    <form action={logout}>
                        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:text-red-600 hover:bg-red-50 transition-all font-bold">
                            <LogOut className="w-5 h-5" />
                            <span>Sair da Conta</span>
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 relative flex flex-col min-h-screen overflow-x-hidden overflow-y-auto">
                {/* Header */}
                <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 lg:px-10 py-5 flex justify-between items-center shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="lg:hidden flex items-center gap-2">
                            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                                <UtensilsCrossed className="w-5 h-5 text-primary" />
                            </div>
                            <span className="font-bold text-slate-900 tracking-tight">JP ADM</span>
                        </div>
                        <div className="hidden lg:block">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-0.5">Visão Geral</p>
                            <h2 className="text-xl font-bold text-slate-900">Painel Administrativo</h2>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 text-green-700 text-[10px] font-black uppercase tracking-widest border border-green-100">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                            Sessão Ativa
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="flex-1 p-6 lg:p-10 max-w-7xl w-full mx-auto pb-28 lg:pb-10">
                    {children}
                </div>
            </main>

            {/* Mobile Bottom Navigation */}
            <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-slate-200 px-4 py-3 z-50 flex items-center justify-around shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.05)]">
                {navItems.filter(i => i.mobile).map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className="flex flex-col items-center gap-1 text-slate-400 hover:text-primary transition-all px-3 py-1"
                    >
                        <item.icon className="w-6 h-6" />
                        <span className="text-[10px] font-bold uppercase tracking-tighter">{item.name}</span>
                    </Link>
                ))}
            </nav>
        </div>
    )
}
