'use client'

import { X, Camera, Check } from 'lucide-react'

interface MealModalProps {
    isOpen: boolean
    onClose: () => void
    mealName: string
}

export function MealModal({ isOpen, onClose, mealName }: MealModalProps) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="w-full max-w-md glass border border-white/10 rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
                <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
                    <h2 className="text-xl font-bold text-white">Registrar {mealName}</h2>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <X className="w-5 h-5 text-muted-foreground" />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    {/* Status Toggle */}
                    <div className="grid grid-cols-3 gap-3">
                        {['Feito', 'Pendente', 'Pulou'].map((status) => (
                            <button key={status} className={`py-4 rounded-2xl border transition-all text-sm font-bold ${status === 'Feito' ? 'bg-primary/20 border-primary text-primary shadow-lg shadow-primary/10' : 'bg-white/5 border-white/5 text-muted-foreground'}`}>
                                {status}
                            </button>
                        ))}
                    </div>

                    {/* Photo Upload Mock */}
                    <div className="relative group">
                        <div className="aspect-video w-full rounded-2xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center bg-black/20 hover:bg-black/30 transition-all group-hover:border-primary/50 cursor-pointer">
                            <div className="p-4 rounded-full bg-primary/10 text-primary mb-2">
                                <Camera className="w-8 h-8" />
                            </div>
                            <p className="text-sm font-medium text-muted-foreground">Enviar foto do prato</p>
                            <p className="text-[10px] text-muted-foreground/50 mt-1">Opcional para análise da nutri</p>
                        </div>
                    </div>

                    {/* Calories Estimate */}
                    <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">Calorias Estimadas (Opcional)</label>
                        <input
                            type="number"
                            placeholder="ex: 450"
                            className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                    </div>
                </div>

                <div className="p-6 bg-white/5 border-t border-white/5">
                    <button
                        onClick={onClose}
                        className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-bold hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                    >
                        <Check className="w-5 h-5" />
                        Salvar Registro
                    </button>
                </div>
            </div>
        </div>
    )
}
