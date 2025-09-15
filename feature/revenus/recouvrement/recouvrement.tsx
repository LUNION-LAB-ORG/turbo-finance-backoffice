"use client"

import DetailRecouvrement from "./detail"
import { RepartionPieDonutRecouvrement } from "./repartition"

export default function Recouvrement() {
    return (
        <div className="w-full px-4 py-6">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] lg:grid-cols-[1fr_2fr] gap-6 justify-center items-stretch">
                {/* Partie gauche - plus étroite */}
                <div className="min-h-[300px] sm:min-h-[350px]">
                    <RepartionPieDonutRecouvrement />
                </div>
                
                {/* Partie droite - plus large */}
                <div className="min-h-[300px] sm:min-h-[350px]">
                    <DetailRecouvrement />
                </div>
            </div>
        </div> 
    )
}