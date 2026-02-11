import { getPosts } from './actions'
import { CreatePostForm } from '@/components/community/CreatePostForm'
import { PostCard } from '@/components/community/PostCard'


import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function ComunidadePage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) redirect('/auth/login')

    const { data: profile } = await supabase
        .from('profiles')
        .select('plan_type')
        .eq('id', user.id)
        .single()

    const isPro = profile?.plan_type === 'pro'
    const posts = await getPosts()

    return (
        <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-500 pb-24 md:pb-0">
            <div className="text-center md:text-left pt-2 pb-4">
                <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Comunidade</h1>
                <p className="text-slate-500 font-medium">Compartilhe suas conquistas com o time.</p>
            </div>

            <CreatePostForm isPro={isPro} />

            <div className="space-y-6">
                {posts.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-200">
                        <p className="text-slate-400 font-medium">Ainda não há posts aqui.</p>
                        <p className="text-sm text-slate-300">Seja o primeiro a compartilhar!</p>
                    </div>
                ) : (
                    posts.map((post: any) => (
                        <PostCard key={post.id} post={post} />
                    ))
                )}
            </div>
        </div>
    )
}
