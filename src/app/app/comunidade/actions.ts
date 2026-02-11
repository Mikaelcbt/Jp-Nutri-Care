'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createPost(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect('/auth/login')

    // Smart Lock Check
    const { data: profile } = await supabase.from('profiles').select('plan_type').eq('id', user.id).single()
    if (profile?.plan_type !== 'pro') {
        return { error: 'Desbloqueie o PRO para postar na comunidade.' }
    }

    const content = formData.get('content') as string

    // Anti-spam / Validation
    if (!content || content.trim().length === 0) {
        return { error: 'O post não pode estar vazio.' }
    }

    if (content.length > 500) {
        return { error: 'O post excedeu 500 caracteres.' }
    }

    const { error } = await supabase.from('community_posts').insert({
        user_id: user.id,
        content: content.trim(),
        // media_url: ... (skipped for MVP)
    })

    if (error) return { error: 'Erro ao criar post.' }

    revalidatePath('/app/comunidade')
    return { success: true }
}

export async function getPosts() {
    const supabase = await createClient()

    const { data } = await supabase
        .from('community_posts')
        .select(`
            id,
            content,
            created_at,
            profiles (full_name, avatar_url)
        `)
        .order('created_at', { ascending: false })
        .limit(50)

    return data || []
}
