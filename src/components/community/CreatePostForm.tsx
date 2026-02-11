'use client'

import { useState } from 'react'
import { createPost } from '@/app/app/comunidade/actions'
import { Loader2, Image as ImageIcon, Send } from 'lucide-react'
import { ProGuard } from '@/components/ui/ProGuard'

export function CreatePostForm({ isPro }: { isPro: boolean }) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    async function handleSubmit(formData: FormData) {
        if (!isPro) return // Safety
        setLoading(true)
        setError('')

        const res = await createPost(formData)

        if (res?.error) {
            setError(res.error)
        } else {
            const form = document.querySelector('form') as HTMLFormElement
            form.reset()
        }
        setLoading(false)
    }

    return (
        <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm relative overflow-hidden">
            <form action={handleSubmit}>
                <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-slate-50 shrink-0 border border-slate-100" />
                    <ProGuard isPro={isPro} feature="Publicar na Comunidade" asChild>
                        <textarea
                            name="content"
                            className="flex-1 bg-slate-50 rounded-2xl p-4 resize-none border-none focus:ring-2 focus:ring-primary/20 text-slate-700 placeholder:text-slate-400 min-h-[100px] text-base"
                            placeholder="Compartilhe sua evolução, refeições ou dúvidas..."
                            disabled={loading || !isPro}
                        />
                    </ProGuard>
                </div>
                {error && <p className="text-red-500 text-sm mt-2 ml-16 font-medium">{error}</p>}

                <div className="flex justify-between items-center mt-4 pl-16">
                    <button type="button" className="text-slate-400 hover:text-primary hover:bg-primary/5 p-2 rounded-xl transition-all flex items-center gap-2 text-sm font-bold">
                        <ImageIcon className="w-5 h-5" />
                        <span className="hidden md:inline">Adicionar Foto</span>
                    </button>
                    <ProGuard isPro={isPro} feature="Publicar na Comunidade" asChild>
                        {/* We wrap the button too just in case */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 flex items-center gap-2 shadow-lg shadow-slate-900/20"
                        >
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                            Postar
                        </button>
                    </ProGuard>
                </div>
            </form>
        </div>
    )
}
