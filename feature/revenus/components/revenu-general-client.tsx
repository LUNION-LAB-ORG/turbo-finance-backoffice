
"use client";
import RevenusHeader from "@/components/revenus/header";
import Statistics from "./statistques/statistics";
import RevenusQuotidien from "./repartition/graph_mansuel";
import Recouvrement from "./recouvrement/recouvrement";
import { useLivraisonList } from "../hooks/use-livraison-list";
import { useCommissionPourcentageList } from "../hooks/use-commissionpourcentage-list";

export default function RevenueGeneralClient() {
    const { livraisons } = useLivraisonList({ initialData: [] });
    const { commissionspourcentage } = useCommissionPourcentageList({ initialData: [] });
    return (
        <div>
            <RevenusHeader title="Gestion des revenus"/>
            {/* <FilterRestaurant/> */}
            <Statistics livraisons={livraisons} 
            commissions={commissionspourcentage} />   
            <RevenusQuotidien livraisons={livraisons} commissions={commissionspourcentage} />
            <Recouvrement/>
        </div>
    );
}



