import { Trash2, Shield, Bell, AppWindow, Paintbrush, Droplet } from 'lucide-react'

export default function AdminSettingsPage() {
    return (
        <div className="max-w-4xl space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Configurações do Sistema</h1>
                <p className="text-slate-500 font-medium">Gerencie as preferências globais da plataforma.</p>
            </div>

            <div className="space-y-8">
                {/* Visual Identity Section */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
                    <div className="flex items-center gap-3 border-b border-slate-50 pb-6">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                            <Paintbrush className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-slate-900">Identidade Visual</h2>
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Temas e Cores</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Cor Primária (Saúde)</label>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary border-4 border-slate-100 shadow-sm" />
                                <input type="text" value="#2ECC71" readOnly className="flex-1 px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-mono focus:outline-none" />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Tema Admin</span>
                            <div className="p-1 rounded-2xl bg-slate-100 flex">
                                <button className="flex-1 py-2.5 rounded-xl bg-white shadow-sm text-xs font-bold text-slate-900">Light Clean</button>
                                <button className="flex-1 py-2.5 rounded-xl text-xs font-bold text-slate-400 opacity-50 cursor-not-allowed">Dark Mode (Indisponível)</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Health Goals Section */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
                    <div className="flex items-center gap-3 border-b border-slate-50 pb-6">
                        <div className="w-10 h-10 rounded-xl bg-cyan-100 flex items-center justify-center text-cyan-600">
                            <Droplet className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-slate-900">Metas Padrão</h2>
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Parâmetros Automáticos</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
                            <div>
                                <p className="text-sm font-bold text-slate-900">Calculadora de Hidratação</p>
                                <p className="text-xs text-slate-500">35ml por kg corporal (Padrão OMS)</p>
                            </div>
                            <div className="w-12 h-6 bg-primary rounded-full relative shadow-inner">
                                <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white shadow-sm" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Meta de Passos Diários</label>
                            <div className="relative">
                                <input type="number" defaultValue={8000} className="w-full px-5 py-4 rounded-2xl bg-white border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/5 focus:outline-none transition-all font-bold text-slate-900" />
                                <span className="absolute right-5 top-1/2 -translate-y-1/2 text-xs font-black text-slate-300 uppercase tracking-widest">Passos/Dia</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-6">
                    <button className="w-full md:w-auto px-10 py-5 rounded-2xl bg-slate-900 text-white font-black hover:bg-slate-800 active:scale-95 transition-all shadow-xl shadow-slate-200 tracking-wide">
                        SALVAR ALTERAÇÕES
                    </button>
                </div>
            </div>
        </div>
    )
}
