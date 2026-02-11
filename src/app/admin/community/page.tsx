import { MessageSquare, Pin, Trash2, ShieldCheck, Heart, Reply, Flag, CheckCircle2 } from 'lucide-react'

export default function AdminCommunityPage() {
    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Moderação da Comunidade</h1>
                    <p className="text-slate-500 font-medium">Gerencie o engajamento e mantenha o ambiente saudável.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-5 py-3 rounded-2xl bg-white border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-all text-sm">
                        Posts Denunciados
                    </button>
                    <button className="px-5 py-3 rounded-2xl bg-primary text-white font-bold hover:brightness-110 active:scale-95 transition-all text-sm shadow-lg shadow-primary/20">
                        Novo Post Admin
                    </button>
                </div>
            </div>

            {/* Content Feed Style */}
            <div className="max-w-4xl space-y-6">
                {[1, 2, 3].map(i => (
                    <div key={i} className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden hover:shadow-xl transition-all group">
                        <div className="p-8 space-y-6">
                            {/* User Info */}
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-400">
                                        JN
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900 flex items-center gap-1.5">
                                            João Nutri
                                            <ShieldCheck className="w-4 h-4 text-primary" />
                                        </p>
                                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Nutricionista • Há {i}h</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button className="p-2.5 rounded-xl border border-slate-100 text-slate-400 hover:text-primary hover:bg-green-50 transition-all" title="Fixar Post">
                                        <Pin className="w-5 h-5" />
                                    </button>
                                    <button className="p-2.5 rounded-xl border border-slate-100 text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all" title="Excluir">
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Post Content */}
                            <div className="space-y-4">
                                <p className="text-slate-600 leading-relaxed">
                                    Dica do dia: O consumo de fibras pela manhã ajuda a regular a saciedade ao longo do dia. O que vocês acharam do novo plano de hoje? 🍏💪
                                </p>
                                <div className="aspect-video rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-300 font-bold italic">
                                    Imagem do Post
                                </div>
                            </div>

                            {/* Engagement Tags */}
                            <div className="flex items-center gap-6 pt-4 border-t border-slate-50">
                                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                    <Heart className="w-4 h-4 text-rose-500/50" /> 24 Curtis
                                </div>
                                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                    <MessageSquare className="w-4 h-4 text-slate-300" /> 12 Comentários
                                </div>
                                <div className="ml-auto flex items-center gap-1 px-3 py-1 rounded-full bg-green-50 text-green-700 text-[10px] font-black uppercase tracking-widest border border-green-100">
                                    <CheckCircle2 className="w-3 h-3" /> Aprovado
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
