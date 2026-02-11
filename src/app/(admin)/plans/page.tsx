import { Plus, Copy, Trash2, Edit } from 'lucide-react'

export default function AdminPlansPage() {
    const templates = [
        { id: '1', name: 'Template Cutting (Low Carb)', days: 14, created: '01/02/2026', usage: 124 },
        { id: '2', name: 'Bulking Limpo 2.0', days: 21, created: '02/02/2026', usage: 89 },
        { id: '3', name: 'Manutenção Feminino', days: 14, created: '05/02/2026', usage: 45 },
    ]

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold">Templates de Planos</h1>
                    <p className="text-slate-400">Crie estratégias nutricionais reutilizáveis.</p>
                </div>

                <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-bold hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-primary/20">
                    <Plus className="w-5 h-5" />
                    Novo Template
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {templates.map((t) => (
                    <div key={t.id} className="glass p-6 rounded-3xl border border-white/5 flex flex-col group relative overflow-hidden">
                        {/* Status decoration */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-primary/10 transition-all" />

                        <div className="flex-1 space-y-4 relative">
                            <div className="flex justify-between items-start">
                                <div className="px-3 py-1 rounded-full bg-slate-800 text-xs font-bold text-slate-400 uppercase">
                                    {t.days} Dias
                                </div>
                                <span className="text-[10px] text-slate-500 font-medium">Criado em {t.created}</span>
                            </div>

                            <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{t.name}</h3>

                            <div className="flex items-center gap-2">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="w-6 h-6 rounded-full bg-slate-800 border-2 border-[#0f172a]" />
                                    ))}
                                </div>
                                <span className="text-xs text-slate-400">Em uso por <strong>{t.usage}</strong> pacientes</span>
                            </div>
                        </div>

                        <div className="mt-8 flex gap-2 pt-6 border-t border-white/5 relative">
                            <button title="Editar" className="flex-1 py-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center gap-2 hover:bg-white/10 transition-all text-sm font-semibold">
                                <Edit className="w-4 h-4 text-slate-400" />
                                Editar
                            </button>
                            <button title="Duplicar" className="p-2.5 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all">
                                <Copy className="w-4 h-4 text-slate-400" />
                            </button>
                            <button title="Excluir" className="p-2.5 rounded-xl bg-red-500/5 border border-red-500/10 hover:bg-red-500/10 transition-all">
                                <Trash2 className="w-4 h-4 text-red-400/50 hover:text-red-400" />
                            </button>
                        </div>
                    </div>
                ))}

                {/* Create New Placeholder */}
                <button className="h-full min-h-[220px] rounded-3xl border-2 border-dashed border-white/5 bg-white/[0.02] flex flex-col items-center justify-center gap-3 text-slate-500 hover:border-primary/30 hover:bg-primary/5 hover:text-primary transition-all group">
                    <div className="p-4 rounded-full bg-white/5 group-hover:bg-primary/10 transition-colors">
                        <Plus className="w-8 h-8" />
                    </div>
                    <span className="font-bold">Criar do Zero</span>
                </button>
            </div>
        </div>
    )
}
