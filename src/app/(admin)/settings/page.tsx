export default function AdminSettingsPage() {
    return (
        <div className="max-w-2xl space-y-8">
            <h1 className="text-3xl font-bold">Configurações Globais</h1>
            <div className="rounded-3xl glass p-8 border border-white/5 space-y-8">
                <div className="space-y-4">
                    <h3 className="text-lg font-bold">Geral</h3>
                    <div className="p-4 rounded-2xl bg-white/5 flex items-center justify-between">
                        <span>Manutenção da Plataforma</span>
                        <div className="w-12 h-6 bg-slate-800 rounded-full" />
                    </div>
                </div>
                <div className="space-y-4 text-center py-12 border-t border-white/5">
                    <p className="text-slate-500 italic">Mais configurações em breve...</p>
                </div>
            </div>
        </div>
    )
}
