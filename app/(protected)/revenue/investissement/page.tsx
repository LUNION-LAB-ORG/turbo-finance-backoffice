import RevenusHeader from "@/components/revenus/header";
import Statistics from "@/feature/revenus/cumul/investissement/statistics";
import InvestissementAnalyse from "@/feature/revenus/cumul/investissement/analyse";
import InvestissementList from "@/feature/revenus/cumul/investissement/invest-list/invest-list";

export default function RevenueInvestissementPage() {
    return (
        <div>
           <RevenusHeader title="Gestion des investissements"/>
           <Statistics/>
          <InvestissementAnalyse/>
          <InvestissementList/>
        </div>
    );
}