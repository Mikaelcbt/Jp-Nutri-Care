import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    })

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
        console.error('CRITICAL: Missing Supabase environment variables in Middleware')
        return response
    }

    const supabase = createServerClient(
        supabaseUrl,
        supabaseKey,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => {
                        request.cookies.set(name, value)
                    })
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    const {
        data: { user },
    } = await supabase.auth.getUser()

    // 1. Root route (redirect to appropriate space)
    if (request.nextUrl.pathname === '/') {
        if (!user) return NextResponse.redirect(new URL('/auth/login', request.url))

        // Fetch role to decide where to send them
        const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single()

        return NextResponse.redirect(
            new URL(profile?.role === 'admin' ? '/admin/dashboard' : '/app', request.url)
        )
    }

    // 2. Auth routes (redirect if already logged in)
    if (request.nextUrl.pathname.startsWith('/auth') && user) {
        return NextResponse.redirect(new URL('/app', request.url))
    }

    // 3. Admin routes (STRICT Protection)
    if (request.nextUrl.pathname.startsWith('/admin')) {
        if (!user) return NextResponse.redirect(new URL('/auth/login', request.url))

        const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single()

        if (profile?.role !== 'admin') {
            // Logged in as patient, trying to access admin
            return NextResponse.redirect(new URL('/app', request.url))
        }
    }

    // 4. App (Patient) routes
    if (request.nextUrl.pathname.startsWith('/app') && !user) {
        return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    return response
}
