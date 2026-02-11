'use client'

import { User as UserIcon, Mail, Camera, Save, Loader2 } from 'lucide-react'
import { useFormStatus } from 'react-dom'
import { updateProfile } from '@/app/app/actions'
import { useState } from 'react'

function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full py-3 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
        >
            {pending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            {pending ? 'Salvando...' : 'Salvar Alterações'}
        </button>
    )
}

import { User } from '@supabase/supabase-js'

interface ProfileFormProps {
    user: User
}

export function ProfileForm({ user }: ProfileFormProps) {
    const [avatarUrl, setAvatarUrl] = useState(user?.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`)

    async function handleUpdate(formData: FormData) {
        await updateProfile(formData)
    }

    return (
        <form action={handleUpdate} className="space-y-8">
            {/* Avatar Section */}
            <div className="flex flex-col items-center">
                <div className="relative w-32 h-32 mb-4">
                    <div className="w-full h-full rounded-full bg-gradient-to-tr from-primary to-accent p-1">
                        <img
                            src={avatarUrl}
                            alt="Avatar"
                            className="w-full h-full rounded-full bg-background object-cover"
                        />
                    </div>
                    <label className="absolute bottom-0 right-0 p-2 rounded-full bg-primary text-white shadow-lg cursor-pointer hover:bg-primary/80 transition-colors">
                        <Camera className="w-5 h-5" />
                        <input type="file" className="hidden" accept="image/*" />
                    </label>
                </div>
            </div>

            {/* Info Form */}
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">Nome Completo</label>
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-black/20 border border-white/5 text-white focus-within:ring-2 ring-primary/50 transition-all">
                        <UserIcon className="w-5 h-5 text-muted-foreground" />
                        <input
                            name="fullName"
                            defaultValue={user?.user_metadata?.full_name || ''}
                            className="bg-transparent w-full outline-none"
                            placeholder="Seu nome"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">Email</label>
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-black/20 border border-white/5 text-white alpha-50 cursor-not-allowed">
                        <Mail className="w-5 h-5 text-muted-foreground" />
                        <span className="text-white/50">{user?.email}</span>
                        <input type="hidden" name="email" value={user?.email || ''} />
                    </div>
                </div>
            </div>

            <div className="pt-4 border-t border-white/5">
                <SubmitButton />
            </div>
        </form>
    )
}
