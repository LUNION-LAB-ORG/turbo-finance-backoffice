import { Card } from "@/components/ui/card";
import { DollarSign, Wallet, WalletCards, ArrowUp, ArrowDown } from "lucide-react";

export default function Statistics() {
    const revenus = 185000;
    const depenses = 125000;
    const comptes = revenus - depenses;
    const isGain = comptes > 0;
    
    const stats = [
        {
            title: "Total des revenus",
            value: `${revenus.toLocaleString()}`,
            icon: <Wallet className="w-5 h-5" />,
            color: "text-green-600",
            bgColor: "bg-green-100",
            trend: "up" as const,
        },
        {
            title: "Total des dépenses",
            value: `${depenses.toLocaleString()}`,
            icon: <WalletCards className="w-5 h-5" />,
            color: "text-red-600",
            bgColor: "bg-red-100",
            trend: "down" as const,
        },
        {
            title: "Solde des comptes",
            value: `${Math.abs(comptes).toLocaleString()}`,
            icon: <DollarSign className="w-5 h-5" />,
            color: isGain ? "text-green-600" : "text-red-600",
            bgColor: isGain ? "bg-green-100" : "bg-red-100",
            trend: isGain ? "up" as const : "down" as const,
            isCurrency: true,
        },
    ];

    return (
        <div className="w-full px-4 py-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                    <Card
                        key={index}
                        className="p-6 flex flex-col items-center justify-center rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 bg-white"
                    >
                        <div className="flex justify-between items-start w-full">
                            {/* Colonne gauche : titre + valeur */}
                            <div className="flex flex-col items-start gap-2">
                                <h3 className="text-sm font-medium text-gray-600">{stat.title}</h3>
                                <div className="flex items-center gap-2">
                                    <p className={`text-2xl font-bold ${stat.color}`}>
                                        {stat.value} {stat.isCurrency !== false && "FCFA"}
                                    </p>
                                    {/* Indicateur de tendance */}
                                    {stat.trend && (
                                        <div className={`flex items-center justify-center w-6 h-6 rounded-full ${stat.trend === "up" ? "bg-green-100" : "bg-red-100"}`}>
                                            {stat.trend === "up" ? (
                                                <ArrowUp className="w-4 h-4 text-green-600" />
                                            ) : (
                                                <ArrowDown className="w-4 h-4 text-red-600" />
                                            )}
                                        </div>
                                    )}
                                </div>
                                {/* Statut gain/déficit */}
                                {stat.title === "Solde des comptes" && (
                                    <p className={`text-xs font-medium ${isGain ? "text-green-600" : "text-red-600"}`}>
                                        {isGain ? "Gain" : "Déficit"}
                                    </p>
                                )}
                            </div>

                            {/* Colonne droite : icône */}
                            <div className={`p-3 rounded-full ${stat.bgColor}`}>
                                <div className={stat.color}>
                                    {stat.icon}
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}