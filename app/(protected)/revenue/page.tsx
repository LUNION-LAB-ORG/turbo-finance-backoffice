import Statistics from "@/feature/revenus/statistques/statistics";
import RevenusQuotidien from "@/feature/revenus/repartition/graph_mansuel";
import Recouvrement from "@/feature/revenus/recouvrement/recouvrement";
import FilterRestaurant from "@/feature/revenus/filtres/restaurant/filter-restaurant";
import RevenusHeader from "@/components/revenus/header";

export default function RevenuePage() {
  return(
    <div>
        <RevenusHeader title="Gestion des revenus"/>
        <FilterRestaurant/>
        <Statistics/>   
        <RevenusQuotidien/>
        <Recouvrement/>
    </div>
  )
}