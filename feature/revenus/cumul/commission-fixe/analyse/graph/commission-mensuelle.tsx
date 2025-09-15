"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "Commission(fixe) mensuelles"

const chartData = [
    { month: "Jan", commission: 50 },
    { month: "Fev", commission: 30 },
    { month: "Mar", commission: 20 },
    { month: "Avr", commission: 70 },
    { month: "Mai", commission: 20 },
    { month: "Jun", commission: 20 },
    { month: "Jul", commission: 10 },
    { month: "Aout", commission: 20 },
    { month: "Sep", commission: 20 },
    { month: "Oct", commission: 10 },
    { month: "Nov", commission: 20 },
    { month: "Dec", commission: 20 },
]

const chartConfig = {
    commission: {
        label: "Commission(fixe)",
        color: "hsl(0, 90.70%, 29.40%)", 
    },
} satisfies ChartConfig

export function CommissionMensuelleChart() {
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
                                dataKey="month"
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
                                <linearGradient id="commissionGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="hsl(0, 90.70%, 29.40%)" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="hsl(0, 90.70%, 29.40%)" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <Area
                                dataKey="commission"
                                type="monotone"
                                fill="url(#commissionGradient)"
                                stroke="hsl(0, 90.70%, 29.40%)"
                                strokeWidth={2}
                                activeDot={{ r: 4, fill: "hsl(0, 90.70%, 29.40%)" }}
                            />
                        </AreaChart>
                    </ChartContainer>
                    <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                        <span>Commission(fixe) mensuelle(millions)</span>
                        <span>Mois</span>
                    </div>
                </div>
            </div>
        )
}