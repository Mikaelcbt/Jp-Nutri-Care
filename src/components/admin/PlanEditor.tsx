'use client'

import { useState, useEffect } from 'react'
import { Save, Plus, Trash2, Clock, Flame, AlignLeft, Copy, ClipboardPaste } from 'lucide-react'
import { saveTemplateDay } from '@/app/admin/actions'
import { toast } from 'sonner'
import clsx from 'clsx'

type Meal = {
    name: string
    time: string
    description: string
    target_calories: number
}

// Default meal structure for new days
const DEFAULT_MEALS: Meal[] = [
    { name: 'Café da Manhã', time: '08:00', description: '', target_calories: 300 },
    { name: 'Lanche da Manhã', time: '10:30', description: '', target_calories: 150 },
    { name: 'Almoço', time: '13:00', description: '', target_calories: 500 },
    { name: 'Lanche da Tarde', time: '16:00', description: '', target_calories: 200 },
    { name: 'Jantar', time: '20:00', description: '', target_calories: 400 },
]

export function PlanEditor({ template, initialDays }: { template: any, initialDays: any[] }) {
    const [activeDay, setActiveDay] = useState(1)
    const [meals, setMeals] = useState<Meal[]>([])
    const [saving, setSaving] = useState(false)
    const [isDirty, setIsDirty] = useState(false)
    const [copiedMeals, setCopiedMeals] = useState<Meal[] | null>(null)

    // Load meals when activeDay changes
    useEffect(() => {
        const dayData = initialDays.find(d => d.day_number === activeDay)
        if (dayData && dayData.meals_json) {
            setMeals(dayData.meals_json)
        } else {
            // If no data for this day, clone default but keep it fresh
            setMeals([...DEFAULT_MEALS])
        }
        setIsDirty(false)
    }, [activeDay, initialDays])

    const handleMealChange = (index: number, field: keyof Meal, value: string | number) => {
        const newMeals = [...meals]
        newMeals[index] = { ...newMeals[index], [field]: value }
        setMeals(newMeals)
        setIsDirty(true)
    }

    const addMeal = () => {
        setMeals([...meals, { name: 'Nova Refeição', time: '00:00', description: '', target_calories: 0 }])
        setIsDirty(true)
    }

    const removeMeal = (index: number) => {
        const newMeals = meals.filter((_, i) => i !== index)
        setMeals(newMeals)
        setIsDirty(true)
    }

    const handleCopyDay = () => {
        setCopiedMeals([...meals])
        toast.success('Refeições copiadas!', {
            description: 'Vá para outro dia e clique em Colar.'
        })
    }

    const handlePasteDay = () => {
        if (!copiedMeals) return
        if (meals.length > 0) {
            if (!confirm('Isso substituirá as refeições atuais deste dia. Continuar?')) return
        }

        setMeals([...copiedMeals])
        setIsDirty(true)
        toast.success('Refeições coladas!', {
            description: 'Não esqueça de salvar as alterações.'
        })
    }


    const handleSave = async () => {
        setSaving(true)
        try {
            await saveTemplateDay(template.id, activeDay, meals)
            setIsDirty(false)
            toast.success(`Dia ${activeDay} salvo com sucesso!`)
        } catch (error) {
            console.error(error)
            toast.error('Erro ao salvar dia.')
        } finally {
            setSaving(false)
        }
    }

    return (
        <div className="space-y-8">
            {/* Days Navigation */}
            <div className="flex flex-wrap gap-2">
                {Array.from({ length: 14 }, (_, i) => i + 1).map(day => (
                    <button
                        key={day}
                        onClick={() => {
                            if (isDirty) {
                                if (confirm('Você tem alterações não salvas. Deseja sair sem salvar?')) {
                                    setActiveDay(day)
                                }
                            } else {
                                setActiveDay(day)
                            }
                        }}
                        className={clsx(
                            "w-10 h-10 rounded-xl font-bold text-sm transition-all flex items-center justify-center border",
                            activeDay === day
                                ? "bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-900/20 scale-110"
                                : "bg-white text-slate-400 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                        )}
                    >
                        {day}
                    </button>
                ))}
            </div>

            {/* Active Day Content */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm min-h-[500px] relative">
                <div className="flex justify-between items-center mb-8 sticky top-0 bg-white/95 backdrop-blur-sm z-10 py-2 border-b border-slate-50">
                    <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                        Dia {activeDay}
                        {isDirty && <span className="text-xs font-medium text-orange-500 bg-orange-50 px-2 py-1 rounded-lg">Não salvo</span>}
                    </h2>

                    <div className="flex gap-2">
                        <button
                            onClick={addMeal}
                            className="p-3 rounded-xl border border-slate-200 text-slate-400 hover:text-primary hover:border-primary transition-all"
                            title="Adicionar Refeição"
                        >
                            <Plus className="w-5 h-5" />
                        </button>

                        <div className="w-px h-10 bg-slate-100 mx-2" />

                        <button
                            onClick={handleCopyDay}
                            className="p-3 rounded-xl border border-slate-200 text-slate-400 hover:text-blue-500 hover:border-blue-200 hover:bg-blue-50 transition-all group relative"
                            title="Copiar Refeições deste Dia"
                        >
                            <Copy className="w-5 h-5" />
                            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                Copiar
                            </span>
                        </button>

                        {copiedMeals && (
                            <button
                                onClick={handlePasteDay}
                                className="p-3 rounded-xl border border-blue-200 text-blue-500 bg-blue-50 hover:bg-blue-100 transition-all group relative animate-in fade-in zoom-in"
                                title="Colar Refeições Copiadas"
                            >
                                <ClipboardPaste className="w-5 h-5" />
                                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                    Colar ({copiedMeals.length} itens)
                                </span>
                            </button>
                        )}

                        <div className="w-px h-10 bg-slate-100 mx-2" />

                        <button
                            onClick={handleSave}
                            disabled={!isDirty || saving}
                            className={clsx(
                                "flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-lg",
                                isDirty
                                    ? "bg-primary text-white hover:brightness-110 active:scale-95 shadow-primary/20"
                                    : "bg-slate-100 text-slate-400 cursor-not-allowed shadow-none"
                            )}
                        >
                            <Save className="w-4 h-4" />
                            {saving ? 'Salvando...' : 'Salvar Dia'}
                        </button>
                    </div>
                </div>

                <div className="space-y-6">
                    {meals.map((meal, index) => (
                        <div key={index} className="group relative bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-primary/20 transition-colors">
                            <button
                                onClick={() => removeMeal(index)}
                                className="absolute top-4 right-4 p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>

                            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                                {/* Time & Name */}
                                <div className="md:col-span-3 space-y-3">
                                    <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200">
                                        <Clock className="w-4 h-4 text-slate-400" />
                                        <input
                                            type="time"
                                            value={meal.time}
                                            onChange={(e) => handleMealChange(index, 'time', e.target.value)}
                                            className="bg-transparent text-sm font-bold text-slate-900 focus:outline-none w-full"
                                        />
                                    </div>
                                    <input
                                        type="text"
                                        value={meal.name}
                                        onChange={(e) => handleMealChange(index, 'name', e.target.value)}
                                        placeholder="Nome da Refeição"
                                        className="w-full bg-transparent text-lg font-bold text-slate-900 focus:outline-none placeholder:text-slate-300"
                                    />
                                </div>

                                {/* Description & Calories */}
                                <div className="md:col-span-9 space-y-3">
                                    <div className="flex items-start gap-2 h-full">
                                        <AlignLeft className="w-4 h-4 text-slate-400 mt-1" />
                                        <textarea
                                            value={meal.description}
                                            onChange={(e) => handleMealChange(index, 'description', e.target.value)}
                                            placeholder="Descreva os alimentos (Ex: 2 ovos cozidos, 1 fatia de pão integral...)"
                                            className="w-full h-full min-h-[80px] bg-transparent text-sm text-slate-600 focus:outline-none resize-none placeholder:text-slate-300 leading-relaxed"
                                        />
                                    </div>
                                    <div className="flex justify-end pt-2 border-t border-slate-200/50">
                                        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
                                            <Flame className="w-3.5 h-3.5 text-orange-500" />
                                            <input
                                                type="number"
                                                value={meal.target_calories}
                                                onChange={(e) => handleMealChange(index, 'target_calories', parseInt(e.target.value) || 0)}
                                                className="w-16 bg-transparent text-xs font-bold text-slate-900 focus:outline-none text-right"
                                            />
                                            <span className="text-[10px] font-bold text-slate-400">kcal</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {meals.length === 0 && (
                        <div className="text-center py-10 text-slate-400 italic">
                            Nenhuma refeição neste dia. Clique no + para adicionar.
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
