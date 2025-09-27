import RevenueGeneralClient from "@/feature/revenus/components/revenu-general-client";
import { prefetchLivraisonListQuery } from "@/feature/revenus/queries/livraison/livraison-list.query";
import { prefetchCommissionPourcentageListQuery } from "@/feature/revenus/queries/commission/commissionpourcentage-list.query";
import { PretList } from "@/feature/revenus/components/recouvrement/prets/pret-list";
export default function RevenuePage() {
  return(
    prefetchLivraisonListQuery({
        page: 1,
        limit: 50
    }), 
    prefetchCommissionPourcentageListQuery({
        page: 1,
        limit: 50
    }),
    <div>
      <RevenueGeneralClient/>   
      <PretList/>
    </div>
  )
}