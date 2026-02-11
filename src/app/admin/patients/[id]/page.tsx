import { getPatientDetails } from '../../actions'
import { ArrowLeft, Calendar, Mail, Phone, Shield, MoreHorizontal, User, Activity } from 'lucide-react'
import Link from 'next/link'
import { AssignPlanButton } from '@/components/admin/AssignPlanButton' // We will create this component
import { UserPlanSwitcher } from '@/components/admin/UserPlanSwitcher'
import { getPlanTemplates } from '../../actions'

export default async function PatientDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params
    const { profile, plans } = await getPatientDetails(resolvedParams.id)
    const templates = await getPlanTemplates() // For the assign modal

    if (!profile) return <div>Paciente não encontrado</div>

    const currentPlan = plans?.[0]

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header / Nav */}
            <div className="flex items-center gap-4">
                <Link href="/admin/patients" className="p-2 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-slate-900 transition-all">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">{profile.full_name}</h1>
                    <p className="text-slate-500 font-medium text-sm">Detalhes do perfil e histórico.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Card */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8 h-fit">
                    <div className="flex flex-col items-center text-center space-y-4">
                        <div className="w-32 h-32 rounded-full bg-slate-100 border-4 border-white shadow-xl flex items-center justify-center overflow-hidden">
                            {profile.avatar_url ? (
                                <img src={profile.avatar_url} alt={profile.full_name} className="w-full h-full object-cover" />
                            ) : (
                                <User className="w-12 h-12 text-slate-300" />
                            )}
                        </div>
                        <div>
                            <span className="px-3 py-1 rounded-full bg-green-50 text-green-700 text-[10px] font-black uppercase tracking-widest border border-green-100 italic">
                                {profile.status || 'Ativo'}
                            </span>
                            <p className="text-xs text-slate-400 mt-2 font-mono">ID: {profile.id.substring(0, 8)}</p>

                            <div className="pt-4">
                                <UserPlanSwitcher userId={profile.id} currentPlan={profile.plan_type || 'free'} />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4 pt-6 border-t border-slate-50">
                        <div className="flex items-center gap-3 text-sm text-slate-600">
                            <Mail className="w-4 h-4 text-slate-400" />
                            <span className="truncate">Email do Usuário (Auth)</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-slate-600">
                            <Phone className="w-4 h-4 text-slate-400" />
                            <span>(XX) XXXXX-XXXX</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-slate-600">
                            <Shield className="w-4 h-4 text-slate-400" />
                            <span className="capitalize">{profile.role}</span>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Active Plan */}
                    <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-3xl rounded-full -mr-20 -mt-20 pointer-events-none" />

                        <div className="relative z-10 flex justify-between items-start mb-8">
                            <div>
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    <Activity className="w-5 h-5 text-primary" />
                                    Plano Atual
                                </h2>
                                <p className="text-slate-400 text-sm">O que o paciente está seguindo agora.</p>
                            </div>
                            <AssignPlanButton userId={profile.id} templates={templates} />
                        </div>

                        {currentPlan ? (
                            <div className="bg-white/10 p-6 rounded-3xl border border-white/10 backdrop-blur-md">
                                <h3 className="text-2xl font-bold mb-2">{currentPlan.title}</h3>
                                <div className="flex items-center gap-4 text-sm text-slate-300">
                                    <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> Início: {new Date(currentPlan.start_date).toLocaleDateString()}</span>
                                    <span className="font-bold text-white bg-primary px-2 py-0.5 rounded text-xs">{currentPlan.days} Dias</span>
                                </div>
                            </div>
                        ) : (
                            <div className="p-8 text-center border-2 border-dashed border-white/10 rounded-3xl text-slate-500">
                                Nenhum plano ativo no momento.
                            </div>
                        )}
                    </div>

                    {/* History */}
                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                        <h3 className="text-lg font-bold text-slate-900 mb-6">Histórico de Planos</h3>
                        <div className="space-y-4">
                            {plans?.map((plan: any) => (
                                <div key={plan.id} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                    <div>
                                        <p className="font-bold text-slate-900">{plan.title}</p>
                                        <p className="text-xs text-slate-500">Iniciado em {new Date(plan.start_date).toLocaleDateString()}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-xs font-bold text-slate-400 uppercase">{plan.days} Dias</span>
                                    </div>
                                </div>
                            ))}
                            {(!plans || plans.length === 0) && (
                                <p className="text-sm text-slate-400 italic">Sem histórico.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
