import Statistics from "@/feature/depenses/components/statistiques/statistics";
import RepartitionDepense from "@/feature/depenses/components/repartition/index";
import DepenseTabs from "@/feature/depenses/components/depense-list/depense-tabs";
import { LastDepense } from "@/feature/depenses/components/depense-list/last-depense";
import DepenseHeader from "@/components/depenses/header";

export default function DepensePage() {
    return (
        <div>
            <DepenseHeader/>
            <Statistics />
            <RepartitionDepense />
            <DepenseTabs/>
            <LastDepense/>
        </div>
    )
}