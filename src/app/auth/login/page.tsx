import { login } from '../actions'
import Link from 'next/link'
import { ArrowRight, Lock, Mail } from 'lucide-react'

export default async function LoginPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const { error } = await searchParams

    return (
        <div className="min-h-screen flex items-center justify-center bg-white relative overflow-hidden">
            {/* Minimal Background Decoration */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-slate-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="w-full max-w-md p-8 md:p-10 relative z-10 animate-in fade-in zoom-in duration-500">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-slate-900 text-white mb-6 shadow-xl shadow-slate-900/20">
                        <span className="text-2xl font-black tracking-tighter">JP</span>
                    </div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Bem-vindo de volta!</h1>
                    <p className="text-slate-500 font-medium">Faça login para continuar sua jornada.</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-bold text-center animate-in slide-in-from-top-2">
                        {typeof error === 'string' ? error : 'Erro ao realizar login'}
                    </div>
                )}

                <form action={login} className="space-y-5">
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-900 uppercase tracking-wide ml-1" htmlFor="email">Email</label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                            <input
                                name="email"
                                type="email"
                                required
                                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-slate-900 placeholder:text-slate-400 font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white focus:border-primary transition-all"
                                placeholder="seu@email.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-900 uppercase tracking-wide ml-1" htmlFor="password">Senha</label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                            <input
                                name="password"
                                type="password"
                                required
                                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-slate-900 placeholder:text-slate-400 font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white focus:border-primary transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 rounded-2xl bg-slate-900 text-white font-bold text-lg shadow-xl shadow-slate-900/20 hover:scale-[1.02] hover:shadow-2xl active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
                    >
                        Entrar
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </form>

                <div className="mt-10 text-center">
                    <p className="text-slate-500 font-medium text-sm">
                        Ainda não tem conta?{' '}
                        <Link href="/auth/register" className="text-primary hover:text-primary/80 transition-colors font-bold hover:underline decoration-2 underline-offset-4">
                            Criar conta agora
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
