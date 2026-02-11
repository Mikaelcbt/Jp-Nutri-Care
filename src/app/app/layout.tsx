import { Sidebar } from '@/components/layout/Sidebar'
import { Header } from '@/components/layout/Header'
import { MobileNav } from '@/components/layout/MobileNav'
import { HydrationFAB } from '@/components/patient/HydrationFAB'
import { Toaster } from 'sonner'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function AppLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        redirect('/auth/login')
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

    return (
        <div className="min-h-screen bg-slate-50/50 flex">
            {/* Desktop Sidebar */}
            <Sidebar plan={profile?.plan_type || 'free'} />

            <div className="flex-1 flex flex-col min-h-screen md:pl-72 transition-all duration-300 relative">
                <Header user={user} plan={profile?.plan_type || 'free'} />

                <main className="flex-1 p-4 md:p-8 pb-24 md:pb-8 overflow-y-auto w-full max-w-7xl mx-auto animate-in fade-in duration-500">
                    {children}
                </main>
            </div>

            {/* Mobile Bottom Navigation & FAB */}
            <HydrationFAB isPro={profile?.plan_type === 'pro'} />
            <MobileNav />
            <Toaster />
        </div>
    )
}
