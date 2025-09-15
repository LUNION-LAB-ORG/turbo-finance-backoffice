import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function LastInvestissement() {
    const prets = [
        {
            date: "2022-01-01",
            investisseur: "Investisseur 1",
            montantPret: 1000,
            echeance: "2022-01-02",
        },
        {
            date: "2022-01-02",
            investisseur: "Investisseur 2",
            montantPret: 2000,
            echeance: "2022-01-02",
        },
    ]

    return (
        <div className="p-4">
            <Card className="max-w-6xl mx-auto shadow-lg rounded-xl overflow-hidden border-0">
                <CardHeader className=" py-4">
                    <CardTitle className="text-xl font-bold flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Derniers investissements
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="flex flex-col gap-4 p-5">
                        {prets.map((pret, index) => (
                            <div key={index} className="rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300">
                                <div className="p-4">
                                    <div className="flex flex-col gap-4 ">
                                        {/* Colonne 1: Informations investisseur */}
                                        <div className="flex justify-between items-start gap-10">
                                            <div className="space-y-1">
                                                <span className="text-xs text-gray-500 font-medium">Investisseur</span>
                                                <h3 className="font-semibold text-sm text-red-500">{pret.investisseur}</h3>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-xs text-gray-500 block">Montant prêt</span>
                                                <span className="text-sm font-bold text-red-500">{pret.montantPret.toLocaleString()} FCFA</span>
                                            </div>
                                        </div>
                                        
                                        {/* Colonne 2: Dates */}
                                        <div className="space-y-2 flex justify-between items-start gap-10">
                                            <div className="flex flex-col">
                                                <span className="text-xs text-gray-500">Date d'investissement</span>
                                                <span className="text-sm font-medium">{pret.date}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm text-gray-500">Échéance</span>
                                                <span className="text-sm font-medium ">
                                                    {pret.echeance}
                                                </span>
                                            </div>
                                        </div>
                                        
                                        {/* Colonne 3: Montant et action */}
                                            
                                            <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center">
                                                Voir les détails
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {/* Pied de carte avec statistiques */}
                    <div className="px-5 py-4 border-t border-gray-200">
                        <div className="flex justify-between items-center">
                            <div className="text-sm text-gray-600">
                                Total: {prets.length} investissement(s)
                            </div>
                            <div className="text-sm font-semibold text-blue-500">
                                Montant total: {prets.reduce((sum, pret) => sum + pret.montantPret, 0).toLocaleString()} FCFA
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}