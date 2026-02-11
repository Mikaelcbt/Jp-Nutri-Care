import { HardDrive } from 'lucide-react'

export default function AdminMediaPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4 animate-in fade-in duration-500">
            <div className="p-6 rounded-3xl bg-white/5 border border-white/5">
                <HardDrive className="w-12 h-12 text-slate-500" />
            </div>
            <h1 className="text-3xl font-bold">Biblioteca de Mídia</h1>
            <p className="text-slate-400 max-w-md">Gerencie todos os uploads do Supabase Storage aqui. Em breve.</p>
        </div>
    )
}
