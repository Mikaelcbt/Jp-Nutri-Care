export default function SettingsPage() {
    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold">Configurações</h1>
            <div className="rounded-2xl glass p-6 border border-white/5 space-y-6">
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                    <div>
                        <p className="font-semibold">Notificações Push</p>
                        <p className="text-sm text-muted-foreground">Receba lembretes de refeição e água.</p>
                    </div>
                    <div className="w-12 h-6 bg-primary rounded-full relative">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                    </div>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                    <div>
                        <p className="font-semibold">Unidades de Medida</p>
                        <p className="text-sm text-muted-foreground">Sistema métrico (kg/cm).</p>
                    </div>
                    <span className="text-primary text-sm font-bold">Métrico</span>
                </div>
            </div>
        </div>
    )
}
