"use client"

import CommissionFixeAnalyseChart from "./graph"
import LastCommissionFixe from "./last-commission-fixe/last-commission-fixe"

export default function CommissionFixeAnalyse() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-1">
            <div className="lg:col-span-2 mt-4">
                <CommissionFixeAnalyseChart />
            </div>
            <div className="lg:col-span-1">
                <LastCommissionFixe />
            </div>
        </div>
    )
}