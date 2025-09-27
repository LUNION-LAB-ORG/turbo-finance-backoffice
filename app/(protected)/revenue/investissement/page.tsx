"use client";

import { useEffect } from "react";
import RevenusHeader from "@/components/revenus/header";
import Statistics from "@/feature/revenus/components/cumul/investissement/statistics";
import InvestissementAnalyse from "@/feature/revenus/components/cumul/investissement/analyse";
import InvestissementList from "@/feature/revenus/components/cumul/investissement/invest-list/invest-list";
import InvestisseurNameFilter from "@/feature/revenus/components/cumul/investissement/filtres/filtre-nom-investisseur";
import InvestissementDateFilter from "@/feature/revenus/components/cumul/investissement/filtres/filtres-par-date";
import { useInvestissementList } from "@/feature/revenus/hooks/use-investissement-list";
import { prefetchInvestissementListQuery } from "@/feature/revenus/queries/investissement/investissement-list.query";

export default function RevenueInvestissementPage() {
  const { investissements } = useInvestissementList();

  useEffect(() => {
    prefetchInvestissementListQuery({
      page: 1,
      limit: 10,
    });
  }, []);

  return (
    <div>
      <RevenusHeader title="Gestion des investissements" />
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <InvestisseurNameFilter />
        </div>
        <div className="flex-1">
          <InvestissementDateFilter />
        </div>
      </div>
      <Statistics investissements={investissements} />
      <InvestissementAnalyse investissements={investissements} />
      <InvestissementList investissements={investissements} />
    </div>
  );
}
