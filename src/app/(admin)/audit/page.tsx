import { Terminal, Shield, Clock, HardDrive } from 'lucide-react'

export default function AdminAuditPage() {
    const logs = [
        { id: '1', admin: 'João Nutri', action: 'Promoveu Mariana Silva para Admin', time: 'Há 10 min', type: 'security' },
        { id: '2', admin: 'João Nutri', action: 'Criou template "Cutting Pro"', time: 'Há 1 hora', type: 'feature' },
        { id: '3', admin: 'Bot Sistem', action: 'Backup automático concluído', time: 'Há 5 horas', type: 'system' },
        { id: '4', admin: 'João Nutri', action: 'Removeu post impróprio #423', time: 'Ontem', type: 'moderation' },
    ]

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold">Logs de Auditoria</h1>
                <p className="text-slate-400">Histórico de ações administrativas e eventos do sistema.</p>
            </div>

            <div className="glass rounded-3xl border border-white/5 overflow-hidden">
                <div className="bg-slate-900 px-6 py-4 flex items-center justify-between border-b border-white/5 font-mono text-xs">
                    <div className="flex gap-4">
                        <span className="text-primary flex items-center gap-1"><Terminal className="w-3 h-3" /> system.log</span>
                        <span className="text-slate-500">Filtrar por: Tudo</span>
                    </div>
                    <span className="text-slate-500">Páginas: 1/142</span>
                </div>

                <div className="divide-y divide-white/5 font-mono text-sm">
                    {logs.map((log) => (
                        <div key={log.id} className="p-6 flex items-center gap-6 hover:bg-white/[0.01] transition-colors group">
                            <div className={`p-2.5 rounded-lg ${log.type === 'security' ? 'bg-red-500/10 text-red-400' : 'bg-white/5 text-slate-500'}`}>
                                {log.type === 'security' ? <Shield className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                            </div>

                            <div className="flex-1">
                                <span className="text-primary font-bold">{log.admin}</span>
                                <span className="mx-3 text-slate-600">»</span>
                                <span className="text-slate-300">{log.action}</span>
                            </div>

                            <div className="flex items-center gap-4">
                                <span className="text-xs text-slate-500">{log.time}</span>
                                <button className="p-1 px-2 rounded bg-white/5 text-[10px] text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">DETAIL</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="p-8 rounded-3xl bg-blue-500/5 border border-blue-500/10 flex items-center gap-6">
                <div className="p-4 rounded-2xl bg-blue-500/10 text-blue-400">
                    <HardDrive className="w-8 h-8" />
                </div>
                <div>
                    <h4 className="font-bold text-blue-100 text-lg">Armazenamento do Banco</h4>
                    <p className="text-sm text-blue-300/60">Seu projeto Supabase está ocupando 142MB de 500MB (Free Tier).</p>
                </div>
                <button className="ml-auto px-6 py-3 rounded-xl bg-blue-400 text-slate-900 font-bold hover:brightness-110 active:scale-95 transition-all">
                    Upgrade
                </button>
            </div>
        </div>
    )
}
