import { Plus, Search, Filter, Clock, Flame, Utensils, Edit3 } from 'lucide-react'

export default function AdminRecipesPage() {
    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Biblioteca de Receitas</h1>
                    <p className="text-slate-500 font-medium">Curadoria de refeições para os planos.</p>
                </div>
                <button className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-primary text-white font-bold hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-primary/25 w-full md:w-auto justify-center">
                    <Plus className="w-6 h-6" />
                    Nova Receita
                </button>
            </div>

            {/* Pinterest Style Grid */}
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                {[
                    { title: 'Omelete de Ervas', cal: 240, time: 10, img: 'bg-green-100' },
                    { title: 'Frango com Gengibre e Brócolis', cal: 450, time: 25, img: 'bg-orange-100' },
                    { title: 'Salada Tropical de Verão', cal: 180, time: 15, img: 'bg-yellow-100' },
                    { title: 'Smoothie de Blueberry', cal: 320, time: 5, img: 'bg-blue-100' },
                    { title: 'Bowl de Quinoa e Legumes', cal: 380, time: 20, img: 'bg-emerald-100' },
                    { title: 'Salmão Grelhado ao Limão', cal: 520, time: 18, img: 'bg-rose-100' },
                ].map((recipe, i) => (
                    <div key={i} className="break-inside-avoid bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all group overflow-hidden cursor-pointer">
                        <div className={`aspect-[4/5] ${recipe.img} relative flex items-center justify-center`}>
                            <Utensils className="w-12 h-12 text-black/10 group-hover:scale-125 transition-transform duration-500" />
                            <div className="absolute top-4 right-4 px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-md shadow-sm border border-black/5 text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                                <Flame className="w-3 h-3 text-orange-500" /> {recipe.cal} kcal
                            </div>
                        </div>
                        <div className="p-6 space-y-4">
                            <h3 className="font-bold text-slate-900 leading-tight group-hover:text-primary transition-colors">{recipe.title}</h3>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                    <Clock className="w-3.5 h-3.5" /> {recipe.time} min
                                </div>
                                <div className="w-1 h-1 rounded-full bg-slate-200" />
                                <div className="text-[10px] font-bold text-primary uppercase tracking-widest">Low Carb</div>
                            </div>
                            <div className="pt-2">
                                <button className="w-full py-2.5 rounded-xl border border-slate-100 text-slate-400 hover:bg-slate-900 hover:text-white transition-all text-xs font-bold flex items-center justify-center gap-2">
                                    <Edit3 className="w-3 h-3" /> Editar Receita
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
