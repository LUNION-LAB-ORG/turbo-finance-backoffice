import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function LastCommissionPourcentage() {
    const commissionPourcentage = [
        {
            date: "2022-01-01",
            restaurant: "Restaurant 1",
            commande: 1000,
            taux: 10,
            montant: 100,
            statut: "Livraison terminée",
            
        },
        {
            date: "2022-01-02",
            restaurant: "Restaurant 2",
            commande: 2000,
            taux: 10,
            montant: 200,
            statut: "Livraison terminée",
            
        },
    ]
        
    
    return (
        <div className="p-4">
            <Card className="max-w-6xl mx-auto shadow-lg rounded-xl overflow-hidden border-0">
                <CardHeader className=" py-2">
                    <CardTitle className="text-xl font-bold flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Dernières commissions(fixe)
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="flex flex-col gap-5 p-5">
                        {commissionPourcentage.map((commissionPourcentage, index) => (
                            <div key={index} className="rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300">
                                <div className="p-5">
                                    <div className="flex justify-between items-start mb-4">
                                        <div >
                                            <h3 className="font-semibold text-lg text-red-500">{commissionPourcentage.restaurant}</h3>
                                        </div>
                                       <div className="flex flex-col items-center gap-2">
                                       <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                            {commissionPourcentage.statut}
                                        </span>
                                        <span className="text-sm text-gray-500">{commissionPourcentage.date}</span>
                                       </div>
                                    </div>
                                    
                                    <div className="flex justify-around items-start gap-3 mt-2">
                                        
                                     
                                        <div className="flex flex-col col-span-2">
                                            <span className="text-sm text-gray-500">Commande</span>
                                            <span className="text-sm font-bold text-indigo-700">{commissionPourcentage.commande} FCFA</span>
                                        </div>
                                        <div className="flex flex-col col-span-2">
                                            <span className="text-sm text-gray-500">Taux</span>
                                            <span className="text-sm font-bold text-indigo-700">{commissionPourcentage.taux} %</span>
                                        </div>
                                        <div className="flex flex-col col-span-2">
                                            <span className="text-sm text-gray-500">Montant</span>
                                            <span className="text-sm font-bold text-indigo-700">{commissionPourcentage.montant} FCFA</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-5 py-3 border-t border-gray-100">
                                    <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center w-full justify-end">
                                        Voir les détails
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}