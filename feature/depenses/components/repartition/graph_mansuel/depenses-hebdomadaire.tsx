"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { IDepense } from "@/feature/depenses/types/depense.type"
import { useMemo } from "react"

export const description = "Dépenses hebdomadaires"

interface DepensesHebdomadaireProps {
    depenses: IDepense[];
}

// Fonction pour grouper les dépenses par semaine de l'année
const groupDepensesByWeek = (depenses: IDepense[]) => {
    // Structure initiale pour 52 semaines avec valeur 0
    const semaines: { semaine: number; nom: string; depenses: number }[] = []
    for (let i = 1; i <= 52; i++) {
        semaines.push({ semaine: i, nom: `S${i}`, depenses: 0 })
    }

    // Parcourir toutes les dépenses et les grouper par semaine
    depenses.forEach(depense => {
        try {
            const date = new Date(depense.dateDepense)
            const weekNumber = getWeekNumber(date)
            
            if (weekNumber >= 1 && weekNumber <= 52) {
                semaines[weekNumber - 1].depenses += depense.montant
            }
        } catch (error) {
            console.warn("Erreur de format de date:", depense.dateDepense)
        }
    })

    // Filtrer pour ne garder que les semaines qui ont des dépenses ou les 12 premières semaines
    const semainesAvecDepenses = semaines.filter(s => s.depenses > 0)
    if (semainesAvecDepenses.length === 0) {
        return semaines.slice(0, 12).map(s => ({ week: s.nom, depenses: s.depenses }))
    }
    
    return semainesAvecDepenses.slice(0, 12).map(s => ({ week: s.nom, depenses: s.depenses }))
}

// Fonction pour obtenir le numéro de la semaine
const getWeekNumber = (date: Date) => {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
    const dayNum = d.getUTCDay() || 7
    d.setUTCDate(d.getUTCDate() + 4 - dayNum)
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7)
}

const chartConfig = {
    depenses: {
        label: "Dépenses hebdomadaires",
        color: "hsl(142, 75.20%, 44.30%)", 
    },
} satisfies ChartConfig

export function DepensesHebdomadaireChart({ depenses }: DepensesHebdomadaireProps) {
    // Transformer les données des dépenses en format pour le graphique
    const chartData = useMemo(() => {
        return groupDepensesByWeek(depenses)
    }, [depenses])

    // Calculer le maximum pour l'échelle Y
    const maxDepense = useMemo(() => {
        if (chartData.length === 0) return 100
        const max = Math.max(...chartData.map(item => item.depenses))
        return Math.ceil(max * 1.1) // 10% de marge
    }, [chartData])
    return (
            <div>
                <div  className="pt-0">
                    <ChartContainer config={chartConfig} className="h-[300px] w-full">
                        <AreaChart
                            accessibilityLayer
                            data={chartData}
                            margin={{
                                top: 5,
                                right: 5,
                                left: 0,
                                bottom: 5,
                            }}
                            width={350}
                            height={300}
                        >
                            <CartesianGrid 
                                vertical={false} 
                                strokeDasharray="3 3" 
                                stroke="#f0f0f0" 
                            />
                            <XAxis
                                dataKey="week"
                                tickLine={false}
                                axisLine={{ stroke: "#d1d5db" }}
                                tickMargin={8}
                                tickFormatter={(value) => value}
                                tick={{ fontSize: 12, fill: "#6b7280" }}
                            />
                            <YAxis
                                tickLine={false}
                                axisLine={{ stroke: "#d1d5db" }}
                                tickMargin={8}
                                tickCount={6}
                                tickFormatter={(value) => value}
                                domain={[0, maxDepense]}
                                tick={{ fontSize: 12, fill: "#6b7280" }}
                            />
                            <ChartTooltip
                                cursor={{ stroke: "#d1d5db", strokeWidth: 1 }}
                                content={<ChartTooltipContent indicator="line" />}
                            />
                            <defs>
                                <linearGradient id="depensesGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="hsl(142, 75.20%, 44.30%)" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="hsl(142, 75.20%, 44.30%)" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <Area
                                dataKey="depenses"
                                type="monotone"
                                fill="url(#depensesGradient)"
                                stroke="hsl(142, 75.20%, 44.30%)"
                                strokeWidth={2}
                                activeDot={{ r: 4, fill: "hsl(142, 75.20%, 44.30%)" }}
                            />
                        </AreaChart>
                    </ChartContainer>
                    <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                        <span>Dépenses hebdomadaires (FCFA)</span>
                        <span>Semaine</span>
                    </div>
                </div>
            </div>
        )
    }