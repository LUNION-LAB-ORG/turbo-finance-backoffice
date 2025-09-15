"use client"

import LivraisonAnalyseChart from "./graph"
import LastLivraison from "./last-livraison/last-livraison"

export default function LivraisonAnalyse() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-1">
            <div className="lg:col-span-2 mt-4">
                <LivraisonAnalyseChart />
            </div>
            <div className="lg:col-span-1">
                <LastLivraison />
            </div>
        </div>
    )
}