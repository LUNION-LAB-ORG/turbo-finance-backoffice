import RevenusHeader from "@/components/revenus/header";
import LivraisonAnalyse from "@/feature/revenus/cumul/livraison/analyse";
import Statistics from "@/feature/revenus/cumul/livraison/statistics";
import FilterRestaurant from "@/feature/revenus/filtres/restaurant/filter-restaurant";
import LivraisonList from "@/feature/revenus/cumul/livraison/livraison-list/livraison";

export default function RevenueLivraisonPage() {
    return (
        <div>
            <RevenusHeader title="Gestion des revenus sur les livraisons"/>
            <FilterRestaurant/>
            <Statistics/>   
            <LivraisonAnalyse/>
            <LivraisonList/>
        </div>
    );
}