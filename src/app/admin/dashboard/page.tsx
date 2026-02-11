import { Users, CalendarCheck, TrendingUp, Droplet, ArrowRight, CheckCircle2, Crown, Percent } from 'lucide-react'
import { getDashboardStats } from '../actions'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export default async function AdminDashboardPage() {
    // Fetch real data from Server Action
    const stats = await getDashboardStats()

    const kpis = [
        { label: 'Total Pacientes', value: stats.totalPatients, icon: Users, color: 'text-primary', bg: 'bg-green-50' },
        { label: 'Planos Ativos', value: stats.activePlans, icon: CalendarCheck, color: 'text-blue-500', bg: 'bg-blue-50' },
        { label: 'Refeições Hoje', value: stats.mealsToday, icon: TrendingUp, color: 'text-orange-500', bg: 'bg-orange-50' },
        { label: 'Média de Água', value: `${(stats.avgWater / 1000).toFixed(1)}L`, icon: Droplet, color: 'text-cyan-500', bg: 'bg-cyan-50' },
    ]

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* KPI Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpis.map((kpi, i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`w-12 h-12 rounded-2xl ${kpi.bg} flex items-center justify-center transition-transform group-hover:scale-110`}>
                                <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
                            </div>
                            {/* Placeholder for WoW growth */}
                            <span className="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-lg">~</span>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-slate-500 mb-1">{kpi.label}</p>
                            <p className="text-3xl font-bold text-slate-900 tracking-tight">{kpi.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Recent Activities */}
                <div className="xl:col-span-2 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-8">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold text-slate-900">Atividades em Tempo Real</h2>
                        <button className="text-sm font-bold text-primary hover:underline flex items-center gap-1">
                            Ver Logs <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="space-y-4">
                        {stats.recentActivity.length === 0 ? (
                            <div className="p-8 text-center text-slate-400 italic">
                                Nenhuma atividade recente registrada hoje.
                            </div>
                        ) : (
                            stats.recentActivity.map((log: any) => (
                                <div key={log.id} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100/50 hover:bg-slate-100/50 transition-colors">
                                    <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm overflow-hidden text-xs font-bold text-slate-400">
                                        {log.profiles?.avatar_url ? (
                                            <img src={log.profiles.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                                        ) : (
                                            log.profiles?.full_name?.substring(0, 2).toUpperCase() || 'usr'
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-slate-700 font-medium">
                                            <span className="font-bold text-slate-900">{log.profiles?.full_name || 'Paciente'}</span> registrou
                                            <span className="font-bold text-primary"> {log.meals?.name || 'uma refeição'}</span>.
                                        </p>
                                        <p className="text-xs text-slate-400 capitalize">
                                            {formatDistanceToNow(new Date(log.created_at), { addSuffix: true, locale: ptBR })}
                                        </p>
                                    </div>
                                    <div className="hidden sm:flex px-3 py-1 rounded-full bg-green-100 text-green-700 text-[10px] font-black uppercase tracking-wider items-center gap-1">
                                        <CheckCircle2 className="w-3 h-3" /> Validado
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Secondary Stats / Info */}
                <div className="space-y-8">

                    {/* AT RISK CARD (Smart Admin) */}
                    {stats.atRisk && stats.atRisk.length > 0 && (
                        <div className="bg-orange-50 p-6 rounded-[2rem] border border-orange-100 space-y-4 animate-in slide-in-from-right-4 duration-1000">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                                    <TrendingUp className="w-5 h-5 rotate-180" />
                                </div>
                                <h2 className="text-lg font-bold text-orange-900">Atenção Necessária</h2>
                            </div>

                            <div className="space-y-3">
                                {stats.atRisk.map((p: any) => (
                                    <div key={p.id} className="flex items-center justify-between bg-white/60 p-3 rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-[10px] font-bold text-orange-600">
                                                {p.full_name.substring(0, 2).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-slate-800">{p.full_name.split(' ')[0]}</p>
                                                <p className="text-[10px] text-orange-600 font-medium">{p.issue}</p>
                                            </div>
                                        </div>
                                        <button className="text-[10px] font-bold bg-white border border-orange-200 text-orange-600 px-2 py-1 rounded-lg hover:bg-orange-600 hover:text-white transition-colors">
                                            Cobrar
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* INSIGHTS CARD (Smart Admin) */}
                    {stats.insights && stats.insights.length > 0 && (
                        <div className="bg-slate-900 p-8 rounded-[2rem] text-white space-y-4 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000" />
                            <h3 className="text-lg font-bold relative flex items-center gap-2">
                                <span className="text-xl">🤖</span> Insights do Dia
                            </h3>
                            <div className="space-y-3 relative">
                                {stats.insights.map((insight: any, i: number) => (
                                    <p key={i} className="text-sm text-slate-300 leading-relaxed border-l-2 border-primary/50 pl-3">
                                        "{insight.text}"
                                    </p>
                                ))}
                            </div>
                        </div>
                    )}

                    {!stats.atRisk?.length && !stats.insights?.length && (
                        <div className="bg-primary/5 p-8 rounded-[2rem] border border-primary/10 flex flex-col items-center justify-center text-center space-y-4">
                            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary shadow-inner">
                                <CheckCircle2 className="w-8 h-8" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-slate-900">Tudo Certo!</h2>
                                <p className="text-sm text-slate-500">Nenhum alerta crítico hoje.</p>
                            </div>
                        </div>
                    )}
                    {/* PREMIUM STATS CARD (Phase 6) */}
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-[2rem] text-white shadow-xl shadow-slate-900/10 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-3xl rounded-full -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-1000" />

                        <div className="relative z-10 space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/10 rounded-xl backdrop-blur-md">
                                    <Crown className="w-5 h-5 text-yellow-400" />
                                </div>
                                <h2 className="text-xl font-bold">Premium Insights</h2>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                                    <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">PRO vs Free</p>
                                    <div className="flex items-end gap-2">
                                        <span className="text-2xl font-black">{stats.premiumStats?.proUsers || 0}</span>
                                        <span className="text-sm font-medium text-slate-400 mb-1">/ {stats.totalPatients}</span>
                                    </div>
                                    <div className="w-full bg-white/10 h-1 mt-2 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-yellow-400 rounded-full"
                                            style={{ width: `${Math.min(((stats.premiumStats?.proUsers || 0) / (stats.totalPatients || 1)) * 100, 100)}%` }}
                                        />
                                    </div>
                                </div>

                                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                                    <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">Adesão Hoje</p>
                                    <div className="flex items-end gap-2">
                                        <span className="text-2xl font-black">{stats.premiumStats?.adherenceRate || 0}%</span>
                                    </div>
                                    <div className="w-full bg-white/10 h-1 mt-2 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-green-400 rounded-full"
                                            style={{ width: `${Math.min(stats.premiumStats?.adherenceRate || 0, 100)}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
