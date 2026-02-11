'use client'

import { Send, Users, User, Clock, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { sendNotification } from '@/app/admin/actions'
import { clsx } from 'clsx'

export function NotificationForm() {
    const [target, setTarget] = useState<'all' | 'inactive' | 'individual'>('all')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(formData: FormData) {
        setLoading(true)
        try {
            await sendNotification(formData)
            alert('Notificação enviada com sucesso!') // Temporary feedback
        } catch (error) {
            alert('Erro ao enviar notificação.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form action={handleSubmit} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
            <input type="hidden" name="targetType" value={target} />

            <div className="space-y-4">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Público Alvo</label>
                <div className="grid grid-cols-3 gap-3">
                    <button
                        type="button"
                        onClick={() => setTarget('all')}
                        className={clsx(
                            "p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all shadow-sm",
                            target === 'all' ? "border-2 border-primary bg-green-50 text-primary" : "border-slate-100 bg-slate-50 text-slate-400 hover:bg-slate-100"
                        )}
                    >
                        <Users className="w-6 h-6" />
                        <span className="text-[10px] font-black uppercase">Todos</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setTarget('inactive')}
                        className={clsx(
                            "p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all shadow-sm",
                            target === 'inactive' ? "border-2 border-primary bg-green-50 text-primary" : "border-slate-100 bg-slate-50 text-slate-400 hover:bg-slate-100"
                        )}
                    >
                        <Clock className="w-6 h-6" />
                        <span className="text-[10px] font-black uppercase">Inativos</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setTarget('individual')}
                        className={clsx(
                            "p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all shadow-sm",
                            target === 'individual' ? "border-2 border-primary bg-green-50 text-primary" : "border-slate-100 bg-slate-50 text-slate-400 hover:bg-slate-100"
                        )}
                    >
                        <User className="w-6 h-6" />
                        <span className="text-[10px] font-black uppercase">Manual</span>
                    </button>
                </div>
            </div>

            <div className="space-y-6">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Título do Aviso</label>
                    <input
                        name="title"
                        type="text"
                        required
                        placeholder="Ex: Hora da Hidratação! 💧"
                        className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 focus:outline-none transition-all font-medium"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Mensagem</label>
                    <textarea
                        name="message"
                        required
                        rows={4}
                        placeholder="Digite o conteúdo da notificação..."
                        className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 focus:outline-none transition-all font-medium resize-none"
                    />
                </div>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full py-5 rounded-2xl bg-primary text-white font-black shadow-xl shadow-primary/30 flex items-center justify-center gap-3 hover:brightness-110 active:scale-[0.98] transition-all tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                {loading ? 'ENVIANDO...' : 'DISPARAR AGORA'}
            </button>
        </form>
    )
}
