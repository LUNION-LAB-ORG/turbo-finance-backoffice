"use client"

import { Bar, BarChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A stacked bar chart with a legend"
export const iframeHeight = "600px"
export const containerClassName =
  "[&>div]:w-full [&>div]:max-w-md flex items-center justify-center min-h-svh"

const chartData = [
  { date: "2024-07-15", revenus: 450, depenses: 300 },
  { date: "2024-07-16", revenus: 380, depenses: 420 },
  { date: "2024-07-17", revenus: 520, depenses: 120 },
  { date: "2024-07-18", revenus: 140, depenses: 550 },
  { date: "2024-07-19", revenus: 600, depenses: 350 },
  { date: "2024-07-20", revenus: 480, depenses: 400 },
]

const chartConfig = {
  revenus: {
    label: "Revenus",
    color: "#4CAF50",
  },
  depenses: {
    label: "Depenses",
    color: "#EF4444",
  },
} satisfies ChartConfig

export function RepartitionTooltips() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">Repartition des revenus et des depenses quotidienne</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => {
                return new Date(value).toLocaleDateString("fr-FR", {
                  weekday: "short",
                })
              }}
            />
            <Bar
              dataKey="revenus"
              stackId="a"
              fill="#4CAF50"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="depenses"
              stackId="a"
              fill="#EF4444"
              radius={[4, 4, 0, 0]}
            />
            <ChartTooltip
              content={<ChartTooltipContent indicator="line" />}
              cursor={false}
              defaultIndex={1}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
