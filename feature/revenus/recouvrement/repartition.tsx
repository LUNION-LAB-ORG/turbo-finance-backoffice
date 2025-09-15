
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
    { nature: "Recouvrement", montant: 8, fill: "#4CAF50" },
    { nature: "Non recouvrement", montant: 4, fill: "#F44336" },
    { nature: "Reste à recouvrir", montant: 4, fill: "#FFEB3B" },
   
]


const chartConfig = {
    montant: {
        label: "Montant",
    },
    recouvrement: {
        label: "Recouvrement",
        color: "var(--color-green)",
    },
    nonRecouvrement: {
        label: "Non recouvrement",
        color: "var(--color-red)",
    },
    resteARecouvrir: {
        label: "Reste à recouvrir",
        color: "var(--color-blue)",
    },


} satisfies ChartConfig

export function RepartionPieDonutRecouvrement() {
    return (
        <Card className="flex flex-col w-full">
            <CardHeader className="items-center pb-0">
                <CardTitle className="text-xl font-bold">Repartition des montants des recouvrements</CardTitle>
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
                            nameKey="nature"
                            paddingAngle={4}   
                            stroke="#fff"      
                            strokeWidth={2}    
                            innerRadius={60}
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex justify-center gap-8 text-sm">
                <div className="flex flex-col gap-2">
                    {chartData.slice(0, 2).map((item) => (
                        <p key={item.nature} className="flex items-center text-xs text-gray-600">
                            <span
                                className="w-3 h-3 rounded-sm mr-2"
                                style={{ backgroundColor: item.fill }}
                            ></span>
                            {item.nature}
                        </p>
                    ))}
                </div>
                {/* Legende */}
                <div className="flex justify-around gap-2">
                    {chartData.slice(2).map((item) => (
                        <p key={item.nature} className="flex justify-between items-center text-xs text-gray-600">
                            <span
                                className="w-3 h-3 rounded-sm mr-2"
                                style={{ backgroundColor: item.fill }}
                            ></span>
                            {item.nature}
                        </p>
                    ))}
                </div>
            </CardFooter>

        </Card>
    )
}
