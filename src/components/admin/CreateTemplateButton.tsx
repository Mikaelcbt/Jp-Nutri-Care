'use client'

import { useState } from 'react'
import { Plus, X } from 'lucide-react'
import { createTemplate } from '@/app/admin/actions'
import clsx from 'clsx'

export function CreateTemplateButton() {
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('')

    const handleCreate = async () => {
        if (!name.trim()) return

        setLoading(true)
        try {
            await createTemplate(name)
            setIsOpen(false)
            setName('')
        } catch (error) {
            console.error(error)
            alert('Erro ao criar template.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-primary text-white font-bold hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-primary/25 w-full md:w-auto justify-center"
            >
                <Plus className="w-6 h-6" />
                Novo Template
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl space-y-6">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-bold text-slate-900">Novo Template</h3>
                            <button onClick={() => setIsOpen(false)} className="p-2 rounded-full hover:bg-slate-100 transition-colors">
                                <X className="w-5 h-5 text-slate-500" />
                            </button>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Nome da Estratégia</label>
                            <input
                                type="text"
                                placeholder="Ex: Protocolo Detox 7 Dias"
                                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:outline-none focus:border-primary"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                autoFocus
                            />
                        </div>

                        <button
                            onClick={handleCreate}
                            disabled={loading || !name.trim()}
                            className={clsx(
                                "w-full py-4 rounded-xl bg-primary text-white font-bold text-sm hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2",
                                (loading || !name.trim()) && "opacity-70 cursor-not-allowed"
                            )}
                        >
                            {loading ? 'Criando...' : 'Criar Template'}
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}
