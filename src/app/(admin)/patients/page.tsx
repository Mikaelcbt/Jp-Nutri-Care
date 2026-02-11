import { Search, MoreVertical, Edit2, Ban, UserCheck, Eye } from 'lucide-react'

export default function AdminPatientsPage() {
    const patients = [
        { id: '1', name: 'Mikael Santos', email: 'mikael@example.com', status: 'active', plan: 'Plano Bulk 14d', joined: '10/02/2026' },
        { id: '2', name: 'Ana Oliveira', email: 'ana@example.com', status: 'active', plan: 'Cutting Pro', joined: '08/02/2026' },
        { id: '3', name: 'Rodrigo Lima', email: 'rodrigo@example.com', status: 'banned', plan: 'Nenhum', joined: '01/02/2026' },
        { id: '4', name: 'Julia Costa', email: 'julia@example.com', status: 'active', plan: 'Manutenção', joined: '05/02/2026' },
    ]

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold">Gestão de Pacientes</h1>
                    <p className="text-slate-400">Gerencie perfis, planos e acesso dos usuários.</p>
                </div>

                <div className="relative group min-w-[300px]">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-primary transition-colors" />
                    <input
                        type="text"
                        placeholder="Buscar por nome ou e-mail..."
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-900 border border-white/5 focus:border-primary/50 focus:outline-none transition-all"
                    />
                </div>
            </div>

            <div className="glass rounded-3xl border border-white/5 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-white/5 border-b border-white/5">
                        <tr>
                            <th className="px-6 py-4 text-sm font-bold text-slate-400">Paciente</th>
                            <th className="px-6 py-4 text-sm font-bold text-slate-400">Status</th>
                            <th className="px-6 py-4 text-sm font-bold text-slate-400">Plano Atual</th>
                            <th className="px-6 py-4 text-sm font-bold text-slate-400">Cadastro</th>
                            <th className="px-6 py-4 text-sm font-bold text-slate-400 text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {patients.map((p) => (
                            <tr key={p.id} className="hover:bg-white/[0.02] transition-colors group">
                                <td className="px-6 py-4">
                                    <div>
                                        <p className="font-bold">{p.name}</p>
                                        <p className="text-xs text-slate-500">{p.email}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${p.status === 'active' ? 'bg-primary/20 text-primary' : 'bg-red-500/20 text-red-400'}`}>
                                        {p.status === 'active' ? 'ATIVO' : 'BANIDO'}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-sm text-slate-300">{p.plan}</span>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-400">
                                    {p.joined}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button title="Ver Detalhes" className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-all">
                                            <Eye className="w-4 h-4" />
                                        </button>
                                        <button title="Editar" className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-primary transition-all">
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button title={p.status === 'active' ? 'Banir' : 'Reativar'} className={`p-2 hover:bg-white/10 rounded-lg transition-all ${p.status === 'active' ? 'text-slate-400 hover:text-red-400' : 'text-primary'}`}>
                                            {p.status === 'active' ? <Ban className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Placeholder */}
            <div className="flex justify-center gap-2">
                <button className="px-4 py-2 rounded-lg bg-white/5 text-slate-500 disabled:opacity-50" disabled>Anterior</button>
                <button className="px-4 py-2 rounded-lg bg-primary/10 text-primary font-bold">1</button>
                <button className="px-4 py-2 rounded-lg bg-white/5 text-slate-300 hover:bg-white/10 transition-all">Próximo</button>
            </div>
        </div>
    )
}
