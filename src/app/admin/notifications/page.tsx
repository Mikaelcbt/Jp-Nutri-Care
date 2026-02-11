import { Info, Bell } from 'lucide-react'
import { NotificationForm } from '@/components/admin/NotificationForm'

export default function AdminNotificationsPage() {
    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Notificações Push</h1>
                <p className="text-slate-500 font-medium">Comunique-se diretamente com seus pacientes.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Form Side */}
                <NotificationForm />

                {/* Preview Side */}
                <div className="space-y-6">
                    <div className="flex items-center gap-2 text-slate-400">
                        <Info className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-widest">Preview no Dispositivo</span>
                    </div>

                    <div className="relative w-full max-w-[320px] mx-auto aspect-[9/18.5] bg-slate-900 rounded-[3rem] border-[8px] border-slate-800 shadow-2xl p-4 overflow-hidden group">
                        {/* Status bar */}
                        <div className="flex justify-between items-center px-4 pt-2 pb-8">
                            <span className="text-[10px] font-bold text-white">09:41</span>
                            <div className="flex gap-1">
                                <div className="w-3 h-3 rounded-full bg-white/20" />
                                <div className="w-3 h-3 rounded-full bg-white/20" />
                            </div>
                        </div>

                        {/* Notification Card */}
                        <div className="bg-white/90 backdrop-blur-xl p-4 rounded-2xl shadow-lg border border-white/20 animate-bounce group-hover:animate-none">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-6 h-6 rounded-lg bg-primary flex items-center justify-center">
                                    <Bell className="w-3.5 h-3.5 text-white" />
                                </div>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">JP NutriCare</span>
                                <span className="text-[8px] text-slate-300 ml-auto uppercase font-bold">Agora</span>
                            </div>
                            <p className="text-sm font-bold text-slate-900 mb-0.5">Título do Aviso...</p>
                            <p className="text-xs text-slate-600 line-clamp-2 leading-snug">Conteúdo da mensagem aparecerá aqui para o seu paciente.</p>
                        </div>

                        {/* Background effect */}
                        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/20 to-transparent opacity-50" />
                    </div>

                    <p className="text-center text-xs text-slate-400 font-medium px-10">
                        Esta é uma representação de como a notificação aparecerá na tela de bloqueio do iOS.
                    </p>
                </div>
            </div>
        </div>
    )
}
