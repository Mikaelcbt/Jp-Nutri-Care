import { Terminal, Shield, Clock, Search, Download } from 'lucide-react'

export default function AdminAuditPage() {
    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Logs de Auditoria</h1>
                    <p className="text-slate-500 font-medium">Histórico completo de ações administrativas.</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-all text-sm shadow-sm">
                    <Download className="w-4 h-4" /> Exportar Logs
                </button>
            </div>

            {/* Audit Console Card */}
            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col min-h-[500px]">
                {/* Console Header */}
                <div className="bg-slate-50 px-8 py-5 flex items-center justify-between border-b border-slate-100">
                    <div className="flex items-center gap-3">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-200" />
                            <div className="w-3 h-3 rounded-full bg-yellow-200" />
                            <div className="w-3 h-3 rounded-full bg-green-200" />
                        </div>
                        <div className="h-4 w-px bg-slate-200 mx-2" />
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <Terminal className="w-4 h-4" /> system_monitor.log
                        </span>
                    </div>
                    <div className="relative group hidden sm:block">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Filtrar eventos..."
                            className="pl-9 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-xs focus:outline-none focus:border-primary w-48 transition-all"
                        />
                    </div>
                </div>

                {/* Console Body */}
                <div className="flex-1 p-6 font-mono text-sm overflow-y-auto space-y-1">
                    {[1, 2, 3, 4, 5, 6, 7].map(i => (
                        <div key={i} className="group flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                            <span className="text-slate-300 text-[10px] w-12 pt-1 font-bold">[{i < 5 ? '09:41' : '08:15'}]</span>
                            <div className="flex-1 flex items-start gap-3">
                                <div className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${i % 3 === 0 ? 'bg-orange-400' : 'bg-green-400'}`} />
                                <span className="text-slate-600 leading-relaxed">
                                    <span className="text-slate-900 font-bold">AUTH_SERVICE</span>: Admin
                                    <span className="text-primary font-bold"> @j_nutri </span>
                                    {i % 3 === 0 ? 'removeu post #' + (100 + i) : 'atualizou dieta de #' + (500 + i)}
                                </span>
                            </div>
                            <span className="hidden md:flex ml-auto items-center gap-1.5 text-[10px] font-black uppercase text-slate-300 tracking-tighter self-center group-hover:text-slate-400 transition-colors">
                                <Shield className="w-3 h-3" /> VERIFICADO
                            </span>
                        </div>
                    ))}
                    <div className="p-4 flex items-center gap-2 text-slate-300 italic text-xs">
                        <div className="w-1.5 h-4 bg-primary animate-pulse" /> aguardando novos eventos...
                    </div>
                </div>
            </div>
        </div>
    )
}
