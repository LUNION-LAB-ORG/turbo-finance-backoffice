"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { RevenusMensuellesChart } from "./revenus_mesuelles"
import { ILivraison } from "@/feature/revenus/types/livraison.types"
import { ICommission } from "@/feature/revenus/types/commission.types"
import { RevenusHebdomadaireChart } from "./revenus-hebdomadaire"
import { RevenusJournalierChart } from "./revenus-journaliere"

interface RevenusQuotidiensProps {
    livraisons?: ILivraison[];
    commissions?: ICommission[];
}

export default function RevenusQuotidiens({ livraisons = [], commissions = [] }: RevenusQuotidiensProps) {
    return (
        <div className="w-full px-4 py-6 -mt-6">
            <div className="w-full px-4 py-6 shadow-lg rounded-lg border border-gray-200">
                <h2 className="text-xl font-bold mb-2 ">Rapport des revenus</h2>

                <Tabs defaultValue="revenus-journaliere" className="w-full">
                    <TabsList className="w-full">
                        <TabsTrigger value="revenus-journaliere" className="data-[state=active]:bg-red-500 data-[state=active]:text-white dark:data-[state=active]:bg-red-600 dark:data-[state=active]:text-white">Jours</TabsTrigger>
                        <TabsTrigger value="revenus-hebdomadaire" className="data-[state=active]:bg-red-500 data-[state=active]:text-white dark:data-[state=active]:bg-red-600 dark:data-[state=active]:text-white">Semaines</TabsTrigger>
                        <TabsTrigger value="revenus-mensuelle" className="data-[state=active]:bg-red-500 data-[state=active]:text-white dark:data-[state=active]:bg-red-600 dark:data-[state=active]:text-white">Mois</TabsTrigger>
                    </TabsList>
                    <TabsContent value="revenus-journaliere">
                        <RevenusJournalierChart livraisons={livraisons} commissions={commissions} />
                    </TabsContent>
                    <TabsContent value="revenus-hebdomadaire">
                        <RevenusHebdomadaireChart livraisons={livraisons} commissions={commissions} />
                    </TabsContent>
                    <TabsContent value="revenus-mensuelle">
                        <RevenusMensuellesChart livraisons={livraisons} commissions={commissions} />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}