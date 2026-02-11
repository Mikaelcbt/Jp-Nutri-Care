export default function ReceitasPage() {
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">Receitas Saudáveis</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="rounded-2xl glass overflow-hidden border border-white/5 animate-pulse">
                        <div className="h-48 bg-white/5" />
                        <div className="p-4 space-y-2">
                            <div className="h-4 w-3/4 bg-white/10 rounded" />
                            <div className="h-3 w-1/2 bg-white/5 rounded" />
                        </div>
                    </div>
                ))}
            </div>
            <div className="text-center py-12">
                <p className="text-muted-foreground">Carregando livro de receitas exclusivo...</p>
            </div>
        </div>
    )
}
