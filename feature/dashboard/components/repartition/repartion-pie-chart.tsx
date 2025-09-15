
import { Pie, PieChart } from "recharts"

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "Repartition des transactions"

const chartData = [
    { transaction: "Revenus", rapport: 8, fill: "#4CAF50" },
    { transaction: "Depenses", rapport: 4, fill: "#F44336" },
    { transaction: "Comptes", rapport: 4, fill: "#FFEB3B" },
]


const chartConfig = {
    rapport: {
        label: "Rapport",
    },
    revenus: {
        label: "Revenus",
        color: "var(--color-green)",
    },
    depenses: {
        label: "Depenses",
        color: "var(--color-red)",
    },
    comptes: {
        label: "Comptes",
        color: "var(--color-yellow)",
    },


} satisfies ChartConfig

export function RepartionPieDonut() {
    return (
        <Card className="flex flex-col w-full">
            <CardHeader className="items-center pb-0">
                <CardTitle className="text-xl font-bold">Rapport financier hebdomadaire</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="rapport"
                            nameKey="transaction"
                            paddingAngle={4}   // ajoute un espace entre chaque couleur
                            stroke="#fff"      // contour blanc pour bien séparer
                            strokeWidth={2}    // épaisseur du contour
                            innerRadius={60}
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex justify-start gap-8 text-sm">
                <div className="flex flex-col gap-2">
                    {chartData.slice(0, 2).map((item) => (
                        <p key={item.transaction} className="flex items-center text-xs text-gray-600">
                            <span
                                className="w-3 h-3 rounded-sm mr-2"
                                style={{ backgroundColor: item.fill }}
                            ></span>
                            {item.transaction}
                        </p>
                    ))}
                </div>
                <div className="flex flex-col gap-2 ml-30 sm:ml-30 md:ml-32 lg:ml-48">
                    {chartData.slice(2).map((item) => (
                        <p key={item.transaction} className="flex items-center text-xs text-gray-600">
                            <span
                                className="w-3 h-3 rounded-sm mr-2"
                                style={{ backgroundColor: item.fill }}
                            ></span>
                            {item.transaction}
                        </p>
                    ))}
                </div>
            </CardFooter>

        </Card>
    )
}
