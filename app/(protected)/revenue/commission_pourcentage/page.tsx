import RevenusHeader from "@/components/revenus/header";
import Statistics from "@/feature/revenus/cumul/commission-pourcentage/statistics";
import CommissionPourcentageAnalyse from "@/feature/revenus/cumul/commission-pourcentage/analyse";
import FilterRestaurant from "@/feature/revenus/filtres/restaurant/filter-restaurant";
import CommissionPourcentageList from "@/feature/revenus/cumul/commission-pourcentage/commission-list/commission-pourcentage-list";

export default function RevenueCommissionPourcentagePage() {
    return (
        <div>
            <RevenusHeader title="Gestion des revenus sur les commission pourcentage"/>
            <FilterRestaurant/>
            <Statistics/>
           <CommissionPourcentageAnalyse/>
          <CommissionPourcentageList/>
        </div>
    );
}