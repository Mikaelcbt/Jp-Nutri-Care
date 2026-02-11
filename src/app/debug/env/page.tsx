export const dynamic = 'force-dynamic'

export default function DebugEnvPage() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'UNDEFINED'

    // Show first 10 and last 5 chars to verify without exposing full secret if it was sensitive (URL is public though)
    const urlVerification = url

    return (
        <div className="p-8 font-mono text-sm max-w-2xl mx-auto mt-10 border rounded bg-gray-50 text-black">
            <h1 className="text-xl font-bold mb-4">Environment Debugger</h1>

            <div className="mb-4">
                <p className="font-bold">NEXT_PUBLIC_SUPABASE_URL (Server Side):</p>
                <p className="bg-gray-200 p-2 rounded mt-1 break-all">
                    {urlVerification}
                </p>
            </div>

            <div className="text-xs text-gray-500 mt-8">
                <p>Instructions: Compare this URL EXACTLY with your Supabase Dashboard.</p>
                <p>If they differ even by one letter, the Vercel Env Var is wrong.</p>
            </div>
        </div>
    )
}
