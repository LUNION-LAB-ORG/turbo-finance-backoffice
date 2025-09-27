"use client";

import RevenusHeader from "@/components/revenus/header";
import Statistics from "@/feature/revenus/components/cumul/commission-pourcentage/statistics";
// import FilterRestaurant from "@/feature/revenus/components/filtres/restaurant/filter-restaurant";
import CommissionPourcentageList from "@/feature/revenus/components/cumul/commission-pourcentage/commission-list/commission-pourcentage-list";
import { prefetchCommissionPourcentageListQuery } from "@/feature/revenus/queries/commission/commissionpourcentage-list.query";
import { useCommissionPourcentageList } from "@/feature/revenus/hooks/use-commissionpourcentage-list";
import CommissionPourcentageAnalyse from "@/feature/revenus/components/cumul/commission-pourcentage/analyse";

export default function RevenueCommissionPourcentagePage() {
    const { 
        commissionspourcentage, 
    } =  useCommissionPourcentageList();
    prefetchCommissionPourcentageListQuery({
        page: 1,
        limit: 10,
    })
    return (
        <div>
            <RevenusHeader title="Gestion des revenus sur les commission pourcentage" />
            {/* <FilterRestaurant /> */}
            <Statistics commissionvariable={commissionspourcentage} />
            <CommissionPourcentageAnalyse commission={commissionspourcentage} />
            <CommissionPourcentageList commissionvariable={commissionspourcentage} />
        </div>
    );
}