import { getPatientProgress } from '../actions'
import { Droplet, Dumbbell, TrendingUp, Calendar } from 'lucide-react'

export default async function ProgressoPage() {
    const { chartData, stats } = await getPatientProgress()

    return (
        <div className="pb-20 md:pb-0 animate-in fade-in duration-500 min-h-screen bg-slate-50/50 p-6 md:p-8">
            <header className="mb-8">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Seu Progresso</h1>
                <p className="text-slate-500 font-medium">Acompanhe sua evolução semanal.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Stats Cards */}
                <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500">
                            <TrendingUp className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-bold text-slate-400 uppercase">Refeições</span>
                    </div>
                    <p className="text-3xl font-black text-slate-900">{stats.totalMeals}</p>
                    <p className="text-xs text-slate-400">Total acumulado</p>
                </div>

                <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
                            <Droplet className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-bold text-slate-400 uppercase">Água (Média)</span>
                    </div>
                    <p className="text-3xl font-black text-slate-900">{(stats.avgWater / 1000).toFixed(1)}L</p>
                    <p className="text-xs text-slate-400">Últimos 7 dias</p>
                </div>

                <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900">
                            <Dumbbell className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-bold text-slate-400 uppercase">Treinos</span>
                    </div>
                    <p className="text-3xl font-black text-slate-900">{stats.workoutCount}</p>
                    <p className="text-xs text-slate-400">Na semana</p>
                </div>
            </div>

            {/* Simple CSS Chart for Water */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-slate-400" />
                        Hidratação Semanal
                    </h2>
                </div>

                <div className="flex items-end justify-between h-48 gap-2">
                    {chartData.map((d: any) => {
                        const height = Math.min((d.water / 3000) * 100, 100) // Assumes 3L goal cap for visual
                        return (
                            <div key={d.date} className="flex-1 flex flex-col items-center gap-2 group">
                                <div className="w-full relative flex-1 flex items-end">
                                    <div
                                        className="w-full bg-blue-500 rounded-t-xl opacity-80 group-hover:opacity-100 transition-all relative min-h-[4px]"
                                        style={{ height: `${height}%` }}
                                    >
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                            {d.water}ml
                                        </div>
                                    </div>
                                </div>
                                <span className="text-xs font-bold text-slate-400 uppercase">{d.weekday}</span>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Extra spacing for bottom nav if on mobile */}
            <div className="h-10" />
        </div>
    )
}
