
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
    { categories: "Salaires", montant: 8, fill: "#4CAF50" },
    { categories: "Entretien", montant: 4, fill: "#F44336" },
    { categories: "Transport", montant: 4, fill: "#FFEB3B" },
    { categories: "Energie", montant: 4, fill: "#d3fc03" },
    { categories: "Autres", montant: 4, fill: "#26f0e9" },
]


const chartConfig = {
    montant: {
        label: "Montant",
    },
    salaires: {
        label: "Salaires",
        color: "var(--color-green)",
    },
    entretien: {
        label: "Entretien",
        color: "var(--color-red)",
    },
    transport: {
        label: "Transport",
        color: "var(--color-yellow)",
    
    },
    energie: {
        label: "Energie",
        color: "var(--color-blue)",
    },
    autres: {
        label: "Autres",
        color: "var(--color-orange)",
    }

} satisfies ChartConfig

export function RepartionPieDonutDepense() {
    return (
        <Card className="flex flex-col w-full">
            <CardHeader className="items-center pb-0">
                <CardTitle className="text-xl font-bold">Repartition des categories des depenses</CardTitle>
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
                            dataKey="montant"
                            nameKey="categories"
                            paddingAngle={4}   // ajoute un espace entre chaque couleur
                            stroke="#fff"      // contour blanc pour bien séparer
                            strokeWidth={2}    // épaisseur du contour
                            innerRadius={60}
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex justify-center gap-8 text-sm">
                <div className="flex flex-col gap-2">
                    {chartData.slice(0, 2).map((item) => (
                        <p key={item.categories} className="flex items-center text-xs text-gray-600">
                            <span
                                className="w-3 h-3 rounded-sm mr-2"
                                style={{ backgroundColor: item.fill }}
                            ></span>
                            {item.categories}
                        </p>
                    ))}
                </div>
                {/* Legende */}
                <div className="flex justify-around gap-2">
                    {chartData.slice(2).map((item) => (
                        <p key={item.categories} className="flex justify-between items-center text-xs text-gray-600">
                            <span
                                className="w-3 h-3 rounded-sm mr-2"
                                style={{ backgroundColor: item.fill }}
                            ></span>
                            {item.categories}
                        </p>
                    ))}
                </div>
            </CardFooter>

        </Card>
    )
}
