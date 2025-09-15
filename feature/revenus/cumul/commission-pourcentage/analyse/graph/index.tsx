"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CommissionMensuellePourcentageChart } from "./commission-mensuelle"
import { CommissionJournalierePourcentageChart } from "./commission-journaliere"
import { CommissionHebdomadairePourcentageChart } from "./commision-hebdomadaire"

export default function CommissionAnalysePourcentageChart() {
    return (
        <div className="w-full px-4 py-6 -mt-6">
            <div className="w-full px-4 py-6 shadow-lg rounded-lg border border-gray-200">
                <h2 className="text-xl font-bold mb-2 ">Rapport des commissions(pourcentage)</h2>

                <Tabs defaultValue="commission-journaliere" className="w-full">
                    <TabsList className="w-full">
                        <TabsTrigger value="commission-journaliere" className="data-[state=active]:bg-red-500 data-[state=active]:text-white dark:data-[state=active]:bg-red-600 dark:data-[state=active]:text-white">Jours</TabsTrigger>
                        <TabsTrigger value="commission-hebdomadaire" className="data-[state=active]:bg-red-500 data-[state=active]:text-white dark:data-[state=active]:bg-red-600 dark:data-[state=active]:text-white">Semaines</TabsTrigger>
                        <TabsTrigger value="commission-mensuelle" className="data-[state=active]:bg-red-500 data-[state=active]:text-white dark:data-[state=active]:bg-red-600 dark:data-[state=active]:text-white">Mois</TabsTrigger>
                    </TabsList>
                    <TabsContent value="commission-journaliere">
                        <CommissionJournalierePourcentageChart />
                    </TabsContent>
                    <TabsContent value="commission-hebdomadaire">
                        <CommissionHebdomadairePourcentageChart />
                    </TabsContent>
                    <TabsContent value="commission-mensuelle">
                        <CommissionMensuellePourcentageChart />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}