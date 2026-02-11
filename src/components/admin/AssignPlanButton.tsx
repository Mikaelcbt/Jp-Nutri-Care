'use client'

import { useState, useTransition } from 'react'
import { Plus, X } from 'lucide-react'
import { assignPlanToPatient } from '@/app/admin/actions'
import { toast } from 'sonner'
import clsx from 'clsx'

export function AssignPlanButton({ userId, templates }: { userId: string, templates: any[] }) {
    const [isOpen, setIsOpen] = useState(false)
    const [isPending, startTransition] = useTransition()

    // Form State
    const [selectedTemplate, setSelectedTemplate] = useState(templates[0]?.id || '')
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0])

    const handleAssign = async () => {
        if (!selectedTemplate) {
            toast.error('Selecione um template')
            return
        }

        const formData = new FormData()
        formData.append('patientId', userId)
        formData.append('templateId', selectedTemplate)

        startTransition(async () => {
            try {
                await assignPlanToPatient(formData)
                toast.success('Plano atribuído com sucesso!')
                setIsOpen(false)
            } catch (error) {
                console.error(error)
                toast.error('Erro ao atribuir plano')
            }
        })
    }

    if (!templates || templates.length === 0) {
        return <button disabled className="text-xs text-slate-500 opacity-50 cursor-not-allowed">Sem templates disponíveis</button>
    }

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="bg-white text-slate-900 px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-100 transition-colors flex items-center gap-2"
            >
                <Plus className="w-4 h-4" /> Trocar Plano
            </button>

            {/* Simple Modal Implementation */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl space-y-6">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-bold text-slate-900">Atribuir Plano</h3>
                            <button onClick={() => setIsOpen(false)} className="p-2 rounded-full hover:bg-slate-100 transition-colors">
                                <X className="w-5 h-5 text-slate-500" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Modelo de Plano</label>
                                <select
                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:outline-none focus:border-primary"
                                    value={selectedTemplate}
                                    onChange={(e) => setSelectedTemplate(e.target.value)}
                                >
                                    {templates.map(t => (
                                        <option key={t.id} value={t.id}>{t.name} ({t.duration_days} dias)</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Data de Início</label>
                                <input
                                    type="date"
                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:outline-none focus:border-primary"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                />
                            </div>
                        </div>

                        <button
                            onClick={handleAssign}
                            disabled={isPending}
                            className={clsx(
                                "w-full py-4 rounded-xl bg-primary text-white font-bold text-sm hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2",
                                isPending && "opacity-70 cursor-wait"
                            )}
                        >
                            {isPending ? 'Processando...' : 'Confirmar Atribuição'}
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}
