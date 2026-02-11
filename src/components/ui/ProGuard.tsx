'use client'

import { useSmartLock } from './SmartLockModal'

interface ProGuardProps {
    children: React.ReactNode
    isPro: boolean
    feature?: string
    asChild?: boolean
    className?: string
    onClick?: () => void
}

export function ProGuard({ children, isPro, feature = 'Funcionalidade Premium', asChild, className, onClick }: ProGuardProps) {
    const { open } = useSmartLock()

    const handleClick = (e: React.MouseEvent) => {
        if (!isPro) {
            e.preventDefault()
            e.stopPropagation()
            open(feature)
        } else {
            onClick?.()
        }
    }

    if (asChild) {
        // If asChild, we assume the child accepts onClick. 
        // This is a simplification; for complex composition use Slot from Radix-UI
        // Here we just wrap in a div if not careful, but ideally we clone element
        // For fail-safe, let's wrap in a span/div that captures events
        return (
            <div onClick={handleClick} className={className} style={{ display: 'contents' }}>
                {children}
            </div>
        )
    }

    return (
        <div onClick={handleClick} className={`cursor-pointer ${className || ''}`}>
            {children}
        </div>
    )
}
