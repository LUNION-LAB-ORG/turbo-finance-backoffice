
import { PretList } from "@/feature/revenus/components/recouvrement/prets/pret-list";
import { prefetchPretListQuery } from "@/feature/revenus/queries/prets/pret-list.query";
import { RecouvrementList } from "@/feature/revenus/components/recouvrement/recouvrement-pret/recouvrement-list";
import { prefetchRecouvrementListQuery } from "@/feature/revenus/queries/recouvrement/recouvrement-list.query";

export default function Recouvrement() {


    prefetchPretListQuery({
        page: 1,
        limit: 10,
    })
    prefetchRecouvrementListQuery({
        page: 1,
        limit: 10,
    })
    return (
        <div>
            <PretList/>
            <RecouvrementList/>
        </div>
    )
}