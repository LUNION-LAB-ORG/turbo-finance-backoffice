"use client"

import { RepartitionPret } from "./repartition/repartition-pret"
import LastInvestissement from "./last-invest/last-invest"
import { IInvestissement } from "@/feature/revenus/types/revenus.types"

interface InvestissementAnalyseProps {
    investissements: IInvestissement[]
}

export default function InvestissementAnalyse({ investissements }: InvestissementAnalyseProps) {
   
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-1">
            <div className="lg:col-span-2 mt-4">    
                <RepartitionPret />
            </div>
            <div className="lg:col-span-1">
                <LastInvestissement investissements={investissements} />
            </div>
        </div>
    )
}