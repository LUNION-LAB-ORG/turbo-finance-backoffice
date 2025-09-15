"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "Depenses journaliere"

const chartData = [
    { day: "Lun", depenses: 50 },
    { day: "Mar", depenses: 30 },
    { day: "Mer", depenses: 20 },
    { day: "Jeu", depenses: 70 },
    { day: "Ven", depenses: 20 },
    { day: "Sam", depenses: 20 },
    { day: "Dim", depenses: 10 },
    
]

const chartConfig = {
    depenses: {
        label: "Depenses journaliere",
        color: "hsl(47, 81.50%, 48.80%)", 
    },
} satisfies ChartConfig

export function DepensesJournaliereChart() {
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
                                dataKey="day"
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
                                tickFormatter={(value) => value }
                                domain={[0, 'dataMax + 2']}
                                tick={{ fontSize: 12, fill: "#6b7280" }}
                            />
                            <ChartTooltip
                                cursor={{ stroke: "#d1d5db", strokeWidth: 1 }}
                                content={<ChartTooltipContent indicator="line" />}
                            />
                            <defs>
                                <linearGradient id="depensesGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="hsl(47, 81.50%, 48.80%)" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="hsl(47, 81.50%, 48.80%)" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <Area
                                dataKey="depenses"
                                type="monotone"
                                fill="url(#depensesGradient)"
                                stroke="hsl(47, 81.50%, 48.80%)"
                                strokeWidth={2}
                                activeDot={{ r: 4, fill: "hsl(47, 81.50%, 48.80%)" }}
                            />
                        </AreaChart>
                    </ChartContainer>
                    <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                        <span>Depenses journaliere(millions)</span>
                        <span>Jour</span>
                    </div>
                </div>
            </div>
        )
    }