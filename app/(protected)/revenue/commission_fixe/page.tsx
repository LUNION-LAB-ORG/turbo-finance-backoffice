import RevenusHeader from "@/components/revenus/header";
import FilterRestaurant from "@/feature/revenus/filtres/restaurant/filter-restaurant";
import CommissionFixeAnalyse from "@/feature/revenus/cumul/commission-fixe/analyse";
import CommissionFixe from "@/feature/revenus/cumul/commission-fixe/commission-list/commission-fixe";
import Statistics from "@/feature/revenus/cumul/commission-fixe/statistics";

export default function RevenueCommissionFixePage() {
    return (
        <div>
            <RevenusHeader title="Gestion des revenus sur les commission fixe"/>
            <FilterRestaurant/>
            <Statistics/>
            <CommissionFixeAnalyse/>
            <CommissionFixe/>
           
        </div>
    );
}