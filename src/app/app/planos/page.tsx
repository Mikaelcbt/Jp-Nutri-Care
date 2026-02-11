import { Check, Star, Zap, Crown } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import clsx from 'clsx'
import Link from 'next/link'

export default async function PlanosPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    const { data: profile } = await supabase.from('profiles').select('plan_type').eq('id', user?.id).single()

    const currentPlan = profile?.plan_type || 'free'

    const plans = [
        {
            id: 'free',
            name: 'Gratuito',
            price: 'R$ 0',
            period: '/mês',
            description: 'Para quem está começando a jornada.',
            features: [
                'Registro de refeições',
                'Registro de hidratação (limitado)',
                'Acesso à comunidade (leitura)',
                'Perfil básico',
            ],
            color: 'slate',
            icon: Star,
            active: currentPlan === 'free',
            cta: 'Seu Plano Atual'
        },
        {
            id: 'pro',
            name: 'PRO',
            price: 'R$ 29,90',
            period: '/mês',
            description: 'A experiência completa para resultados reais.',
            features: [
                'Tudo do Gratuito',
                'Inteligência Artificial (Em breve)',
                'Dietas Personalizadas',
                'Insights Avançados',
                'Prioridade no Suporte',
            ],
            color: 'primary',
            icon: Zap,
            highlight: true,
            active: currentPlan === 'pro',
            cta: 'Assinar Agora'
        },
        {
            id: 'vip',
            name: 'VIP',
            price: 'R$ 99,90',
            period: '/mês',
            description: 'Acompanhamento nutricional exclusivo.',
            features: [
                'Tudo do PRO',
                'Chat direto com Nutricionista',
                'Videochamada mensal',
                'Kit de Boas-vindas',
            ],
            color: 'purple',
            icon: Crown,
            disabled: true,
            cta: 'Em Breve'
        }
    ]

    return (
        <div className="max-w-5xl mx-auto py-10">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-4">Escolha o plano ideal para você</h1>
                <p className="text-slate-500 max-w-2xl mx-auto">
                    Desbloqueie todo o potencial da sua jornada nutricional com o plano PRO.
                    Membros premium têm 3x mais chances de atingir seus objetivos.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {plans.map((plan) => (
                    <div
                        key={plan.id}
                        className={clsx(
                            "relative rounded-[2.5rem] p-8 flex flex-col transition-all duration-300",
                            plan.highlight
                                ? "bg-slate-900 text-white shadow-2xl shadow-slate-900/20 scale-105 z-10 ring-4 ring-primary/20"
                                : "bg-white border border-slate-100 text-slate-900 hover:border-slate-200 hover:shadow-xl hover:shadow-slate-100/50"
                        )}
                    >
                        {plan.highlight && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-green-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                                Mais Popular
                            </div>
                        )}

                        <div className="mb-8">
                            <div className={clsx(
                                "w-12 h-12 rounded-2xl flex items-center justify-center mb-6",
                                plan.highlight ? "bg-white/10 text-primary" : "bg-slate-50 text-slate-900"
                            )}>
                                <plan.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold mb-2">{plan.name}</h3>
                            <div className="flex items-baseline gap-1">
                                <span className={clsx("text-4xl font-black tracking-tighter", plan.highlight ? "text-white" : "text-slate-900")}>
                                    {plan.price}
                                </span>
                                <span className={clsx("text-sm font-medium", plan.highlight ? "text-slate-400" : "text-slate-500")}>
                                    {plan.period}
                                </span>
                            </div>
                            <p className={clsx("text-sm mt-4 leading-relaxed", plan.highlight ? "text-slate-400" : "text-slate-500")}>
                                {plan.description}
                            </p>
                        </div>

                        <ul className="space-y-4 mb-8 flex-1">
                            {plan.features.map((feature) => (
                                <li key={feature} className="flex items-start gap-3 text-sm">
                                    <Check className={clsx("w-5 h-5 shrink-0", plan.highlight ? "text-primary" : "text-green-500")} />
                                    <span className={plan.highlight ? "text-slate-300" : "text-slate-600"}>{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <button
                            disabled={plan.active || plan.disabled}
                            className={clsx(
                                "w-full py-4 rounded-2xl font-bold text-sm transition-all duration-300",
                                plan.active
                                    ? "bg-slate-100 text-slate-400 cursor-default"
                                    : plan.highlight
                                        ? "bg-primary text-white hover:bg-primary/90 hover:scale-105 shadow-lg shadow-primary/25"
                                        : "bg-slate-900 text-white hover:bg-slate-800 hover:scale-105",
                                plan.disabled && "opacity-50 cursor-not-allowed"
                            )}
                        >
                            {plan.active ? 'Seu Plano Atual' : plan.cta}
                        </button>
                    </div>
                ))}
            </div>

            <div className="mt-16 text-center border-t border-slate-200 pt-10">
                <p className="text-slate-400 text-sm">
                    Dúvidas sobre os planos? <span className="text-primary font-bold cursor-pointer hover:underline">Fale com nosso suporte</span>.
                </p>
            </div>
        </div>
    )
}
