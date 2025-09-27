
import { Pie, PieChart } from "recharts"
import { useMemo } from "react"
import { startOfMonth, endOfMonth, subMonths } from "date-fns"

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
import { useLivraisonList } from "@/feature/revenus/hooks/use-livraison-list"
import { useDepensesListQuery } from "@/feature/depenses/queries/depense-list.query"
import { useCommissionPourcentageList } from "@/feature/revenus/hooks/use-commissionpourcentage-list"
import { useInvestissementList } from "@/feature/revenus/hooks/use-investissement-list"

export const description = "Repartition des transactions"


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
    // Récupération des données
    const { livraisons } = useLivraisonList({ initialData: [] })
    const { commissionspourcentage } = useCommissionPourcentageList({ initialData: [] })
    const { investissements } = useInvestissementList({ initialData: [] })
    const { data: depensesData } = useDepensesListQuery({
        page: 1,
        limit: 1000,
    })

    const depenses = depensesData || []

    // Calcul des données dynamiques pour le mois en cours
    const chartData = useMemo(() => {
        const now = new Date()
        const monthStart = startOfMonth(now)
        const monthEnd = endOfMonth(now)

        // Calcul des revenus du mois
        const revenusMois = livraisons.reduce((total, livraison) => {
            const livraisonDate = new Date(livraison.createdAt)
            if (livraisonDate >= monthStart && livraisonDate <= monthEnd) {
                return total + (livraison.fraisLivraison || 0)
            }
            return total
        }, 0)

        // Ajout des commissions du mois
        const commissionsMois = commissionspourcentage.reduce((total, commission) => {
            const commissionDate = new Date(commission.createdAt)
            if (commissionDate >= monthStart && commissionDate <= monthEnd) {
                return total + (commission.commission || 0)
            }
            return total
        }, 0)

        // Ajout des investissements du mois
        const investissementsMois = investissements.reduce((total, investissement) => {
            const investissementDate = new Date(investissement.dateInvestissement)
            if (investissementDate >= monthStart && investissementDate <= monthEnd) {
                return total + (investissement.montant || 0)
            }
            return total
        }, 0)

        // Calcul des dépenses du mois
        const depensesMois = depenses.reduce((total, depense) => {
            const depenseDate = new Date(depense.createdAt)
            if (depenseDate >= monthStart && depenseDate <= monthEnd) {
                return total + (depense.montant || 0)
            }
            return total
        }, 0)

        const totalRevenus = revenusMois + commissionsMois + investissementsMois
        const comptes = totalRevenus - depensesMois

        // Création des données pour le graphique
        return [
            {
                transaction: "Revenus",
                rapport: totalRevenus,
                fill: "#4CAF50",
                montant: totalRevenus
            },
            {
                transaction: "Dépenses",
                rapport: depensesMois,
                fill: "#F44336",
                montant: depensesMois
            },
        ]
    }, [livraisons, commissionspourcentage, investissements, depenses])

    return (
        <Card className="flex flex-col w-full">
            <CardHeader className="items-center pb-0">
                <CardTitle className="text-xl font-bold">Répartition financière mensuelle</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent
                                hideLabel
                                formatter={(value, name) => [
                                    `${Number(value).toLocaleString()} FCFA`,
                                    name === 'rapport' ? 'Montant' : name
                                ]}
                            />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="rapport"
                            nameKey="transaction"
                            paddingAngle={4}
                            stroke="#fff"
                            strokeWidth={2}
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
                            {item.transaction}: {item.montant.toLocaleString()} FCFA
                        </p>
                    ))}
                </div>
                <div className="flex justify-between gap-2 ml-30 sm:ml-30 md:ml-32 lg:ml-48">
                    {chartData.slice(2).map((item) => (
                        <p key={item.transaction} className="flex justify-between items-center text-xs text-gray-600">
                            <span
                                className="w-3 h-3 rounded-sm mr-2"
                                style={{ backgroundColor: item.fill }}
                            ></span>
                            {item.transaction}: {item.montant.toLocaleString()} FCFA
                        </p>
                    ))}
                </div>
            </CardFooter>
        </Card>
    )
}
