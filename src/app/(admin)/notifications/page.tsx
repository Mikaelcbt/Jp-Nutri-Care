import { Bell, Send, Users, User, Clock, AlertTriangle } from 'lucide-react'

export default function AdminNotificationsPage() {
    return (
        <div className="space-y-8 max-w-5xl">
            <div>
                <h1 className="text-3xl font-bold">Notificações</h1>
                <p className="text-slate-400">Envie avisos e lembretes para seus pacientes.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form Section */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="glass p-8 rounded-3xl border border-white/5 space-y-6">
                        <div className="space-y-4">
                            <label className="block text-sm font-medium text-slate-400">Público-Alvo</label>
                            <div className="grid grid-cols-3 gap-3">
                                <button className="p-4 rounded-xl border border-primary bg-primary/10 text-primary flex flex-col items-center gap-2 transition-all">
                                    <Users className="w-6 h-6" />
                                    <span className="text-xs font-bold uppercase">Todos</span>
                                </button>
                                <button className="p-4 rounded-xl border border-white/5 bg-white/5 text-slate-500 flex flex-col items-center gap-2 hover:bg-white/10 transition-all">
                                    <Clock className="w-6 h-6" />
                                    <span className="text-xs font-bold uppercase">Inativos</span>
                                </button>
                                <button className="p-4 rounded-xl border border-white/5 bg-white/5 text-slate-500 flex flex-col items-center gap-2 hover:bg-white/10 transition-all">
                                    <User className="w-6 h-6" />
                                    <span className="text-xs font-bold uppercase">Manual</span>
                                </button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="block text-sm font-medium text-slate-400">Título do Aviso</label>
                            <input
                                type="text"
                                placeholder="ex: Novo cardápio disponível!"
                                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/5 focus:border-primary/50 focus:outline-none transition-all"
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="block text-sm font-medium text-slate-400">Mensagem (In-App)</label>
                            <textarea
                                rows={4}
                                placeholder="Escreva o conteúdo da notificação..."
                                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/5 focus:border-primary/50 focus:outline-none transition-all resize-none"
                            />
                        </div>

                        <div className="pt-4">
                            <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-bold shadow-lg shadow-primary/20 flex items-center justify-center gap-2 hover:brightness-110 transition-all">
                                <Send className="w-5 h-5" />
                                Disparar Notificação
                            </button>
                        </div>
                    </div>
                </div>

                {/* History Section */}
                <div className="space-y-6">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Bell className="w-5 h-5 text-slate-400" />
                        Histórico
                    </h2>

                    <div className="space-y-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="glass p-4 rounded-2xl border border-white/5 relative overflow-hidden group">
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/30" />
                                <p className="text-xs text-slate-500 mb-1 flex justify-between">
                                    <span>Para: Todos</span>
                                    <span>Ontem</span>
                                </p>
                                <h4 className="text-sm font-bold group-hover:text-primary transition-colors">Atenção ao feriado!</h4>
                                <p className="text-[10px] text-slate-400 mt-2 line-clamp-2">Lembre-se de manter a dieta mesmo durante as festividades...</p>
                            </div>
                        ))}
                    </div>

                    <button className="w-full py-3 text-xs font-bold text-slate-500 hover:text-white transition-all uppercase tracking-widest">
                        Ver histórico completo
                    </button>
                </div>
            </div>
        </div>
    )
}
