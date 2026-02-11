import { createClient } from '@/lib/supabase/server'


export async function requirePro() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        throw new Error('Unauthorized')
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('plan_type')
        .eq('id', user.id)
        .single()

    if (profile?.plan_type !== 'pro') {
        throw new Error('PLAN_LIMIT_REACHED')
    }

    return { user, profile }
}

export async function isProUser(userId: string) {
    const supabase = await createClient()
    const { data: profile } = await supabase
        .from('profiles')
        .select('plan_type')
        .eq('id', userId)
        .single()

    return profile?.plan_type === 'pro'
}
