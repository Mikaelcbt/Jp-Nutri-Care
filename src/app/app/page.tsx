import Link from 'next/link'
import { ArrowRight, Droplets, Utensils, Users, ChevronRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

export default async function DashboardPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    const firstName = user?.user_metadata?.full_name?.split(' ')[0] || 'Atleta'

    // Date formatting
    const today = new Date()
    const dayName = today.toLocaleDateString('pt-BR', { weekday: 'long' })
    const dateString = today.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' })

    return (
        <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Welcome Section */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-4 px-1">
                <div>
                    <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                        Olá, {firstName} 👋
                    </h1>
                    <p className="text-slate-500 font-medium mt-1">
                        Sua jornada de saúde está apenas começando.
                    </p>
                </div>
                <div className="text-right hidden md:block">
                    <p className="text-sm font-bold text-slate-900 capitalize">{dateString}</p>
                    <p className="text-xs font-medium text-slate-400 capitalize">{dayName}</p>
                </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Card 1: Seu Dia (Main Focus) */}
                <Link
                    href="/app/seu-dia"
                    className="md:col-span-2 group relative overflow-hidden rounded-[2rem] bg-white p-6 md:p-8 border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-300"
                >
                    <div className="absolute top-0 right-0 p-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all" />

                    <div className="relative z-10 flex flex-col h-full justify-between">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                <Utensils className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-slate-900">Visão Geral</h2>
                                <p className="text-sm text-slate-500 font-medium">Resumo do dia</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 w-full mb-8">
                            <div className="text-center p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Refeições</p>
                                <p className="text-2xl font-black text-slate-900">2<span className="text-slate-300 text-lg">/5</span></p>
                            </div>
                            <div className="text-center p-4 rounded-2xl bg-blue-50 border border-blue-100/50">
                                <p className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">Água</p>
                                <p className="text-2xl font-black text-blue-500">1.5<span className="text-base font-bold">L</span></p>
                            </div>
                            <div className="text-center p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Treino</p>
                                <p className="text-lg font-bold text-orange-500 mt-1">Pendente</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 text-primary font-bold text-sm group-hover:translate-x-1 transition-transform mt-auto">
                            Ver detalhes do dia <ArrowRight className="w-4 h-4" />
                        </div>
                    </div>
                </Link>

                {/* Card 2: Plano */}
                <Link href="/app/plano" className="group rounded-[2rem] bg-white p-6 md:p-8 border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-slate-100 text-slate-600">
                                <Utensils className="w-5 h-5" />
                            </div>
                            <h2 className="text-lg font-bold text-slate-900">Seu Plano</h2>
                        </div>
                        <span className="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-lg">Dia 3</span>
                    </div>

                    <div className="mt-auto space-y-4">
                        <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-100">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">Próxima Refeição</p>
                            <p className="font-bold text-slate-900 text-lg leading-tight">Frango Grelhado com Salada</p>
                            <div className="flex items-center gap-2 mt-2 text-xs font-medium text-slate-500">
                                <span className="bg-white px-2 py-0.5 rounded-md border border-slate-100 shadow-sm">12:30</span>
                                <span>• 450 kcal</span>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
                                <span>Progresso do Plano</span>
                                <span>21%</span>
                            </div>
                            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-primary w-[21%] rounded-full" />
                            </div>
                        </div>
                    </div>
                </Link>
            </div>

            {/* Secondary Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Community Card */}
                <Link href="/app/comunidade" className="rounded-[2rem] bg-white p-6 border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all flex items-center justify-between group">
                    <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:scale-110 transition-transform">
                            <Users className="w-6 h-6 text-slate-600" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-slate-900">Comunidade</h3>
                            <p className="text-slate-500 text-sm font-medium">3 novos posts hoje</p>
                        </div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all">
                        <ChevronRight className="w-5 h-5" />
                    </div>
                </Link>

                {/* Hydration Mini */}
                <div className="rounded-[2rem] bg-blue-500 text-white p-6 shadow-lg shadow-blue-500/20 flex items-center justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-16 bg-white/10 rounded-full blur-2xl translate-x-10 -translate-y-10" />

                    <div className="relative z-10 flex items-center gap-4">
                        <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                            <Droplets className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">Hidratação</h3>
                            <p className="text-blue-100 text-sm font-medium">Falta 1L para meta</p>
                        </div>
                    </div>
                    <button className="relative z-10 px-4 py-2 rounded-xl bg-white text-blue-600 font-bold text-sm hover:white/90 active:scale-95 transition-all shadow-sm">
                        +250ml
                    </button>
                </div>
            </div>

        </div>
    )
}
