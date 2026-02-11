import { Search, Edit2, Ban, Eye, Filter, MoreVertical, UserPlus, CheckCircle2, Crown } from 'lucide-react'
import Link from 'next/link'
import { getPatients, togglePlanAction, getPlanTemplates } from '../actions'
import { AssignPlanButton } from '@/components/admin/AssignPlanButton'

export default async function AdminPatientsPage({ searchParams }: { searchParams: { q?: string } }) {
    const query = searchParams.q
    const patients = await getPatients(query)
    const templates = await getPlanTemplates()

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Gestão de Pacientes</h1>
                    <p className="text-slate-500 font-medium">Controle total sobre os acessos e planos.</p>
                </div>

                <button disabled className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-100 text-slate-400 font-bold cursor-not-allowed w-full md:w-auto justify-center" title="Pacientes devem se cadastrar pelo link público">
                    <UserPlus className="w-5 h-5" />
                    Novo Paciente
                </button>
            </div>

            {/* Search & Filters */}
            <form className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                    <input
                        name="q"
                        defaultValue={query}
                        type="text"
                        placeholder="Buscar por nome..."
                        className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/5 focus:outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400"
                    />
                </div>
                <button type="submit" className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition-all">
                    <Filter className="w-5 h-5" />
                    Filtrar
                </button>
            </form>

            {/* Patients Grid */}
            {patients.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-[2rem] border border-slate-100">
                    <p className="text-slate-500 font-medium">Nenhum paciente encontrado.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {patients.map((patient: any) => (
                        <div key={patient.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all group relative flex flex-col">
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-400 text-lg shadow-sm overflow-hidden">
                                        {patient.avatar_url ? (
                                            <img src={patient.avatar_url} alt={patient.full_name} className="w-full h-full object-cover" />
                                        ) : (
                                            patient.full_name?.substring(0, 2).toUpperCase() || 'P'
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 text-lg group-hover:text-primary transition-colors line-clamp-1">{patient.full_name}</h3>
                                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Inscrito em {new Date(patient.created_at).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <button className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-all">
                                    <MoreVertical className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="space-y-4 mb-8 flex-1">
                                <div className="flex justify-between items-center py-3 border-b border-slate-50">
                                    <span className="text-xs font-bold text-slate-400 uppercase">E-mail</span>
                                    {/* Obfuscate email slightly or show distinct part */}
                                    <span className="text-sm font-medium text-slate-700 truncate max-w-[150px]">{patient.id.substring(0, 8)}...</span>
                                    {/* Note: profiles table might not have email if not synced. Using ID or if we have email. */}
                                </div>
                                <div className="flex justify-between items-center py-3 border-b border-slate-50">
                                    <span className="text-xs font-bold text-slate-400 uppercase">Status</span>
                                    <span className="px-3 py-1 rounded-full bg-green-50 text-green-700 text-[10px] font-black tracking-widest uppercase border border-green-100 italic flex items-center gap-1">
                                        <CheckCircle2 className="w-3 h-3" /> {patient.status || 'Ativo'}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center py-3 border-b border-slate-50">
                                    <span className="text-xs font-bold text-slate-400 uppercase">Plano</span>
                                    <span className="text-sm font-bold text-slate-900 bg-slate-100 px-3 py-1 rounded-lg italic">
                                        {patient.current_plan?.title || 'Sem plano'}
                                    </span>
                                </div>
                            </div>

                            <div className="flex gap-2 mt-auto">
                                <Link href={`/admin/patients/${patient.id}`} className="flex-1">
                                    <button className="w-full py-3 px-4 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                                        <Eye className="w-4 h-4" /> Detalhes
                                    </button>
                                </Link>

                                <AssignPlanButton userId={patient.id} templates={templates} />

                                <TogglePlanButton userId={patient.id} currentPlan={patient.plan_type} />

                                <button className="p-3 rounded-xl border border-slate-200 text-slate-400 hover:bg-red-50 hover:border-red-200 hover:text-red-500 transition-all">
                                    <Ban className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

function TogglePlanButton({ userId, currentPlan }: { userId: string, currentPlan: string }) {
    // This would typically be a separate Client Component to handle the Server Action with useTransition,
    // but for simplicity in this file-based edit, we might need to extract it or use a form.
    // However, to keep it simple and working: using a form with a hidden input.
    return (
        <form action={togglePlanAction}>
            <input type="hidden" name="userId" value={userId} />
            <input type="hidden" name="newPlan" value={currentPlan === 'PRO' ? 'free' : 'pro'} />
            <button
                type="submit"
                title={currentPlan === 'PRO' ? "Remover PRO" : "Dar Plano PRO"}
                className={`p-3 rounded-xl border transition-all ${currentPlan === 'PRO' ? 'border-amber-200 bg-amber-50 text-amber-600 hover:bg-amber-100' : 'border-slate-200 text-slate-400 hover:border-primary hover:text-primary'}`}
            >
                <Crown size={18} className={currentPlan === 'PRO' ? "fill-current" : ""} />
            </button>
        </form>
    )
}
