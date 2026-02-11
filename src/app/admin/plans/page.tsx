import { getPlanTemplates } from '../actions'
import { Copy, Trash2, Edit, CalendarDays, MoreHorizontal } from 'lucide-react'
import { CreateTemplateButton } from '@/components/admin/CreateTemplateButton'
import { DeleteTemplateButton } from '@/components/admin/DeleteTemplateButton'
import Link from 'next/link'

export default async function AdminPlansPage() {
    const templates = await getPlanTemplates()

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Templates de Planos</h1>
                    <p className="text-slate-500 font-medium">Crie e gerencie estratégias nutricionais padrão.</p>
                </div>
                <CreateTemplateButton />
            </div>

            {/* Grid */}
            {templates.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-[2rem] border border-slate-100">
                    <p className="text-slate-500 font-medium">Nenhum template criado ainda.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {templates.map((template: any) => (
                        <div key={template.id} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all group overflow-hidden flex flex-col">
                            <div className="p-8 flex-1 space-y-6">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-700 text-[10px] font-black uppercase tracking-widest border border-green-100">
                                        <CalendarDays className="w-3 h-3" />
                                        {template.duration_days} Dias
                                    </div>
                                    <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors">
                                        <MoreHorizontal className="w-5 h-5" />
                                    </button>
                                </div>

                                <div>
                                    <h3 className="text-2xl font-bold text-slate-900 group-hover:text-primary transition-colors mb-2 italic">{template.name}</h3>
                                    <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">
                                        {template.description || 'Sem descrição definida.'}
                                    </p>
                                </div>

                                <div className="flex items-center gap-4 pt-2">
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Criado em {new Date(template.created_at).toLocaleDateString()}</span>
                                </div>
                            </div>

                            <div className="px-8 py-6 bg-slate-50 flex gap-3">
                                <Link href={`/admin/plans/${template.id}`} className="flex-1">
                                    <button className="w-full py-3.5 rounded-2xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                                        <Edit className="w-4 h-4" /> Editar
                                    </button>
                                </Link>
                                <button className="p-3.5 rounded-2xl border border-slate-200 text-slate-400 hover:bg-white hover:text-primary transition-all">
                                    <Copy className="w-4 h-4" />
                                </button>
                                <DeleteTemplateButton id={template.id} />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
