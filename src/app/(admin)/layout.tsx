import Link from 'next/link'
import {
    Users,
    Calendar,
    FileText,
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
        { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'Pacientes', href: '/admin/patients', icon: Users },
        { name: 'Planos', href: '/admin/plans', icon: Calendar },
        { name: 'Receitas', href: '/admin/recipes', icon: UtensilsCrossed },
        { name: 'Comunidade', href: '/admin/community', icon: MessageSquare },
        { name: 'Notificações', href: '/admin/notifications', icon: Bell },
        { name: 'Configurações', href: '/admin/settings', icon: Settings },
    ]

    return (
        <div className="min-h-screen bg-[#0f172a] text-slate-100 flex overflow-hidden">
            {/* Admin Sidebar */}
            <aside className="w-64 bg-slate-900/50 backdrop-blur-xl border-r border-white/5 flex flex-col hidden lg:flex">
                <div className="p-8">
                    <h1 className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                        JP ADM
                    </h1>
                </div>

                <nav className="flex-1 px-4 space-y-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-all text-slate-400 hover:text-white group"
                        >
                            <item.icon className="w-5 h-5 group-hover:text-primary transition-colors" />
                            <span className="font-medium">{item.name}</span>
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/5">
                    <form action={logout}>
                        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all">
                            <LogOut className="w-5 h-5" />
                            <span className="font-medium">Sair</span>
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 relative overflow-y-auto">
                {/* Topbar for mobile and global actions */}
                <header className="sticky top-0 z-30 bg-[#0f172a]/80 backdrop-blur-md border-b border-white/5 px-6 lg:px-12 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="lg:hidden text-primary font-black">JP ADM</div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            Admin Online
                        </div>
                    </div>
                </header>

                <div className="p-6 lg:p-12 animate-in fade-in duration-500">
                    {children}
                </div>
            </main>

            {/* Mobile bottom nav if needed later */}
        </div>
    )
}
