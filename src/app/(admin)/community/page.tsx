import { MessageSquare, Pin, Trash2, AlertCircle, ShieldCheck } from 'lucide-react'

export default function AdminCommunityPage() {
    const posts = [
        { id: '1', author: 'João Nutri', content: 'Bem-vindos ao clube! Vamos focar na hidratação hoje.', pinned: true, reports: 0, date: '10/02' },
        { id: '2', author: 'Maria Silva', content: 'Receita incrível que fiz ontem!', pinned: false, reports: 0, date: '09/02' },
        { id: '3', author: 'User Anônimo', content: 'SPAM SPAM SPAM', pinned: false, reports: 5, date: '08/02' },
    ]

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold">Moderação da Comunidade</h1>
                    <p className="text-slate-400">Gerencie posts, comentários e denúncias.</p>
                </div>

                <div className="flex gap-4">
                    <div className="px-4 py-2 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center gap-2 text-sm font-bold">
                        <AlertCircle className="w-4 h-4" />
                        5 Denúncias Pendentes
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {posts.map((post) => (
                    <div key={post.id} className={`glass p-6 rounded-2xl border flex items-start gap-6 transition-all ${post.pinned ? 'border-primary/30 bg-primary/[0.02]' : 'border-white/5'}`}>
                        <div className={`p-3 rounded-xl ${post.pinned ? 'bg-primary/20 text-primary' : 'bg-white/5 text-slate-500'}`}>
                            {post.pinned ? <Pin className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
                        </div>

                        <div className="flex-1 space-y-2">
                            <div className="flex justify-between items-center">
                                <h4 className="font-bold flex items-center gap-2">
                                    {post.author}
                                    {post.author === 'João Nutri' && <ShieldCheck className="w-3.5 h-3.5 text-primary" />}
                                </h4>
                                <span className="text-xs text-slate-500">{post.date}</span>
                            </div>
                            <p className="text-sm text-slate-300">{post.content}</p>

                            {post.reports > 0 && (
                                <div className="mt-4 p-2 rounded-lg bg-red-500/10 text-red-400 text-[10px] font-bold uppercase inline-block">
                                    {post.reports} Denúncias recebidas
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col gap-2">
                            <button className={`p-2.5 rounded-xl border transition-all ${post.pinned ? 'bg-primary/10 border-primary/20 text-primary hover:bg-primary/20' : 'bg-white/5 border-white/5 text-slate-400 hover:text-white'}`}>
                                <Pin className="w-4 h-4" />
                            </button>
                            <button className="p-2.5 rounded-xl bg-red-500/5 border border-red-500/10 text-red-400/50 hover:text-red-400 hover:bg-red-500/10 transition-all">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
