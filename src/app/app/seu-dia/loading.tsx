export default function Loading() {
    return (
        <div className="pb-24 animate-pulse min-h-screen bg-slate-50/50">
            {/* Header Skeleton */}
            <div className="bg-white px-6 pt-8 pb-8 rounded-b-[2.5rem] shadow-sm mb-8 border-b border-slate-100/50">
                <div className="h-4 w-32 bg-slate-200 rounded mb-2" />
                <div className="h-8 w-48 bg-slate-200 rounded mb-4" />
                <div className="h-24 w-full bg-slate-900/10 rounded-2xl" />
            </div>

            <div className="px-4 md:px-8 max-w-lg mx-auto space-y-8">
                {/* Weekly Skeleton */}
                <div className="flex gap-2 justify-between">
                    {Array.from({ length: 7 }).map((_, i) => (
                        <div key={i} className="w-10 h-10 rounded-full bg-slate-200" />
                    ))}
                </div>

                {/* Meals Skeleton */}
                <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="h-24 w-full bg-white rounded-2xl border border-slate-100" />
                    ))}
                </div>
            </div>
        </div>
    )
}
