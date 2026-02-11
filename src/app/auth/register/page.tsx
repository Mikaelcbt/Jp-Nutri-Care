import { signup } from '../actions'
import Link from 'next/link'
import { ArrowRight, Lock, Mail, User } from 'lucide-react'

export default async function RegisterPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const { error, message } = await searchParams

    return (
        <div className="min-h-screen flex items-center justify-center bg-white relative overflow-hidden">
            {/* Minimal Background Decoration */}
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-slate-50 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" />

            <div className="w-full max-w-md p-8 md:p-10 relative z-10 animate-in fade-in zoom-in duration-500">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Crie sua Conta</h1>
                    <p className="text-slate-500 font-medium">Comece sua transformação hoje mesmo.</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-bold text-center animate-in slide-in-from-top-2">
                        {typeof error === 'string' ? error : 'Erro ao criar conta'}
                    </div>
                )}

                {message && (
                    <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-100 text-green-700 text-sm font-bold text-center animate-in slide-in-from-top-2">
                        {typeof message === 'string' ? message : 'Conta criada! Verifique seu email.'}
                    </div>
                )}

                <form action={signup} className="space-y-5">
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-900 uppercase tracking-wide ml-1" htmlFor="full_name">Nome Completo</label>
                        <div className="relative group">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                            <input
                                name="full_name"
                                type="text"
                                required
                                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-slate-900 placeholder:text-slate-400 font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white focus:border-primary transition-all"
                                placeholder="Seu Nome"
                            />
                        </div>
                    </div>

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
                                minLength={6}
                                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-slate-900 placeholder:text-slate-400 font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white focus:border-primary transition-all"
                                placeholder="Mínimo 6 caracteres"
                            />
                        </div>
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            className="w-full py-4 rounded-2xl bg-primary text-white font-bold text-lg shadow-xl shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
                        >
                            Criar Conta
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </form>

                <div className="mt-10 text-center">
                    <p className="text-slate-500 font-medium text-sm">
                        Já tem uma conta?{' '}
                        <Link href="/auth/login" className="text-slate-900 hover:text-primary transition-colors font-bold hover:underline decoration-2 underline-offset-4">
                            Fazer login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
