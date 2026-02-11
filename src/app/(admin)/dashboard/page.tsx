import { Users, CalendarCheck, TrendingUp, Droplet } from 'lucide-react'

export default function AdminDashboardPage() {
    const kpis = [
        { label: 'Total Pacientes', value: '1,248', icon: Users, color: 'text-primary', bg: 'bg-primary/10' },
        { label: 'Adesão Média Plano', value: '84%', icon: CalendarCheck, color: 'text-accent', bg: 'bg-accent/10' },
        { label: 'Refeições Hoje', value: '3,842', icon: TrendingUp, color: 'text-blue-400', bg: 'bg-blue-400/10' },
        { label: 'Hidratação (L)', value: '2.8L', icon: Droplet, color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
    ]

    return (
        <div className="space-y-12">
            <div>
                <h1 className="text-3xl font-bold">Dashboard Admin</h1>
                <p className="text-slate-400">Visão geral da performance do JP NutriCare.</p>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpis.map((kpi, i) => (
                    <div key={i} className="glass p-6 rounded-2xl border border-white/5 space-y-4">
                        <div className={`w-12 h-12 rounded-xl ${kpi.bg} flex items-center justify-center`}>
                            <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-400">{kpi.label}</p>
                            <p className="text-2xl font-black">{kpi.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Activities */}
                <div className="glass p-8 rounded-3xl border border-white/5 space-y-6">
                    <h2 className="text-xl font-bold">Atividades Recentes</h2>
                    <div className="space-y-4">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5">
                                <div className="w-10 h-10 rounded-full bg-slate-800" />
                                <div className="flex-1">
                                    <p className="text-sm"><strong>Paciente #{i}</strong> registrou uma refeição.</p>
                                    <p className="text-xs text-slate-500">Há 2 minutos</p>
                                </div>
                                <div className="px-2 py-1 rounded-md bg-primary/20 text-primary text-[10px] font-bold">SUCESSO</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Growth Chart Placeholder */}
                <div className="glass p-8 rounded-3xl border border-white/5 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-slate-500">
                        <TrendingUp className="w-8 h-8" />
                    </div>
                    <h2 className="text-xl font-bold">Crescimento da Plataforma</h2>
                    <p className="text-sm text-slate-400">Gráficos de evolução em tempo real.</p>
                    <div className="w-full h-32 bg-gradient-to-t from-primary/20 to-transparent rounded-xl border border-primary/10" />
                </div>
            </div>
        </div>
    )
}
