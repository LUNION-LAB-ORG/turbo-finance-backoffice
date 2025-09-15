"use client"

import CommissionPourcentageAnalyseChart from "./graph"
import LastCommissionPourcentage from "./last-commission/last-commission"

export default function CommissionPourcentageAnalyse() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-1">
            <div className="lg:col-span-2 mt-4">    
                <CommissionPourcentageAnalyseChart />
            </div>
            <div className="lg:col-span-1">
                <LastCommissionPourcentage />
            </div>
        </div>
    )
}