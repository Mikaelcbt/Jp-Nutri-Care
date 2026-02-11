'use client'

import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Heart, MessageCircle } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface PostCardProps {
    post: {
        id: string
        content: string
        created_at: string
        profiles: {
            full_name: string | null
            avatar_url: string | null
        } | null
    }
}

export function PostCard({ post }: PostCardProps) {
    const [liked, setLiked] = useState(false)
    const [likesCount, setLikesCount] = useState(Math.floor(Math.random() * 5)) // Fake initial count

    const handleLike = () => {
        setLiked(!liked)
        setLikesCount(prev => liked ? prev - 1 : prev + 1)
    }

    return (
        <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold overflow-hidden border-2 border-white shadow-sm shrink-0">
                    {post.profiles?.avatar_url ? (
                        <img src={post.profiles.avatar_url} alt="" className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-lg">{post.profiles?.full_name?.[0] || '?'}</span>
                    )}
                </div>
                <div>
                    <p className="font-bold text-slate-900 text-base">{post.profiles?.full_name || 'Usuário'}</p>
                    <p className="text-xs text-slate-400 font-medium">
                        {formatDistanceToNow(new Date(post.created_at), { addSuffix: true, locale: ptBR })}
                    </p>
                </div>
            </div>

            <div className="pl-16">
                <p className="text-slate-700 leading-relaxed whitespace-pre-wrap text-base mb-6">
                    {post.content}
                </p>

                <div className="flex items-center gap-6 pt-4 border-t border-slate-50">
                    <button
                        onClick={handleLike}
                        className={cn(
                            "flex items-center gap-2 transition-colors group",
                            liked ? "text-red-500" : "text-slate-400 hover:text-red-500"
                        )}
                    >
                        <Heart className={cn("w-5 h-5 transition-all", liked && "fill-current scale-110")} />
                        <span className="text-sm font-bold">{likesCount > 0 ? likesCount : 'Curtir'}</span>
                    </button>
                    <button className="flex items-center gap-2 text-slate-400 hover:text-blue-500 transition-colors">
                        <MessageCircle className="w-5 h-5" />
                        <span className="text-sm font-bold">Comentar</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
