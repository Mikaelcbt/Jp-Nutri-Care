'use client'

import { Trash2, Loader2 } from 'lucide-react'
import { deleteTemplate } from '@/app/admin/actions'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function DeleteTemplateButton({ id }: { id: string }) {
    const [loading, setLoading] = useState(false)
    const router = useRouter() // revalidatePath on server might not be enough for client cache sometimes

    async function handleDelete() {
        if (!confirm('Tem certeza? Isso apagará o template e não poderá ser desfeito.')) return

        setLoading(true)
        try {
            await deleteTemplate(id)
            // Optional: force refresh if needed, but revalidatePath usually works
        } catch (error) {
            alert('Erro ao excluir.')
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <button
            onClick={handleDelete}
            disabled={loading}
            className="p-3.5 rounded-2xl border border-slate-200 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
        </button>
    )
}
