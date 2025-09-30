
import RevenusHeader from "@/components/revenus/header";
import Statistics from "@/feature/revenus/components/cumul/investissement/statistics";
import InvestissementAnalyse from "@/feature/revenus/components/cumul/investissement/analyse";
import InvestissementList from "@/feature/revenus/components/cumul/investissement/invest-list/invest-list";
import { prefetchInvestissementListQuery } from "@/feature/revenus/queries/investissement/investissement-list.query";

export default function RevenueInvestissementPage() {

  prefetchInvestissementListQuery({
    limit: 10,
    page: 1
  })

  return (
    <div>
      <RevenusHeader title="Gestion des investissements" />
      
      {/* Affichage des statistiques et analyses */}
      <Statistics />
      <InvestissementAnalyse />
      
      {/* Liste des investissements */}
      <InvestissementList />
    </div>
  );
}
