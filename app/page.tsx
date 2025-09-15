import DashboardHeader from "@/components/dashboard/header";
import Statistics from "@/feature/dashboard/components/statistics";
import Repartition from "@/feature/dashboard/components/repartition";
import GraphMansuel from "@/feature/dashboard/components/graph_mansuel";

export default function Home() {
  return (
    <div>
      <DashboardHeader />
      <Statistics />
      <Repartition />
      <GraphMansuel />
    </div>
  );
}
