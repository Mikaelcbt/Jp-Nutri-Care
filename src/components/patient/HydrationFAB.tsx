'use client'

import { Plus, Droplets } from 'lucide-react'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { addWater as addWaterAction } from '@/app/app/actions'
import { useSmartLock } from '@/components/ui/SmartLockModal'

export function HydrationFAB({ isPro = false }: { isPro?: boolean }) {
    const [adding, setAdding] = useState(false)
    const { open } = useSmartLock()

    const handleAddWater = async () => {
        if (!isPro) {
            open('Registro Rápido de Hidratação')
            return
        }

        setAdding(true)
        try {
            await addWaterAction(250)
            if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(50)
        } catch (error) {
            console.error(error)
        } finally {
            setAdding(false)
        }
    }

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleAddWater}
            disabled={adding}
            className="fixed bottom-24 right-4 z-40 md:hidden w-14 h-14 rounded-full bg-blue-500 text-white shadow-lg shadow-blue-500/30 flex items-center justify-center border-4 border-white active:bg-blue-600 transition-colors"
        >
            <motion.div
                animate={adding ? { rotate: 360 } : {}}
                transition={{ duration: 0.5 }}
            >
                {adding ? <Plus className="w-6 h-6" /> : <Droplets className="w-6 h-6 fill-current" />}
            </motion.div>
        </motion.button>
    )
}
