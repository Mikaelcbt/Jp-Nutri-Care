import { createClient } from '@/lib/supabase/server'
import { ProfileForm } from '@/components/profile/ProfileForm'
import { redirect } from 'next/navigation'

export default async function PerfilPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) redirect('/auth/login')

    return (
        <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-500 pb-24 md:pb-0">
            <div className="text-center md:text-left pt-2 pb-4">
                <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Meu Perfil</h1>
                <p className="text-slate-500 font-medium">Gerencie suas informações e preferências.</p>
            </div>

            <div className="rounded-3xl glass p-8 border border-white/5 space-y-8">
                <ProfileForm user={user} />
            </div>
        </div>
    )
}
