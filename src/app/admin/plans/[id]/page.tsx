import { getTemplateDetails } from '@/app/admin/actions'
import { PlanEditor } from '@/components/admin/PlanEditor'
import { ArrowLeft, CalendarDays } from 'lucide-react'
import Link from 'next/link'

export default async function PlanEditorPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params
    const data = await getTemplateDetails(resolvedParams.id)

    if (!data) return <div>Template não encontrado</div>

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/admin/plans" className="p-2 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-slate-900 transition-all">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">{data.name}</h1>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="px-2 py-0.5 rounded-md bg-green-50 text-green-700 text-[10px] font-bold uppercase border border-green-100">
                            {data.duration_days} DIAS
                        </span>
                        <p className="text-slate-400 text-xs font-medium">Editor de Estratégia</p>
                    </div>
                </div>
            </div>

            <PlanEditor template={data} initialDays={data.days} />
        </div>
    )
}
