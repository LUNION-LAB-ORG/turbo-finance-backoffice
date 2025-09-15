"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "Depenses hebdomadaire"

const chartData = [
    { week: "S1", depenses: 50 },
    { week: "S2", depenses: 30 },
    { week: "S3", depenses: 20 },
    { week: "S4", depenses: 70 },
    { week: "S5", depenses: 20 },
    { week: "S6", depenses: 20 },
    { week: "S7", depenses: 10 },
    { week: "S8", depenses: 20 },
    { week: "S9", depenses: 20 },
    { week: "S10", depenses: 10 },
    { week: "S11", depenses: 20 },
    { week: "S12", depenses: 20 },
]

const chartConfig = {
    depenses: {
        label: "Depenses hebdomadaire",
        color: "hsl(142, 75.20%, 44.30%)", 
    },
} satisfies ChartConfig

export function DepensesHebdomadaireChart() {
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
                                domain={[0, 'dataMax + 2']}
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
                        <span>Depenses hebdomadaire(millions)</span>
                        <span>Semaine</span>
                    </div>
                </div>
            </div>
        )
    }