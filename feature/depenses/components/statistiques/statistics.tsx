import { Card } from "@/components/ui/card";
import { DollarSign, WalletCards, Boxes, CalendarClock, CalendarCheck2, CalendarPlus, CalendarCog } from "lucide-react";

export default function Statistics() {

    const stats = [
        {
            title: "Categories de dépenses",
            value: "10",
            icon: <Boxes className="w-6 h-6" />,
            color: "text-green-500",
            bgColor: "bg-green-50",
        },
        {
            title: "depenses journalières",
            value: "125000",
            icon: <CalendarClock className="w-6 h-6" />,
            color: "text-blue-500",
            bgColor: "bg-blue-50",
        },
        {
            title: "depenses hebdomadaires",
            value: "125000",
            icon: <CalendarCheck2 className="w-6 h-6" />,
            color: "text-red-500",
            bgColor: "bg-red-50",
        },
        {
            title: "depenses mensuelles",
            value: "125000",
            icon: <CalendarPlus className="w-6 h-6" />,
            color: "text-yellow-500",
            bgColor: "bg-yellow-50",
        },
        {
            title: "depenses annuelles",
            value: "125000",
            icon: <CalendarCog className="w-6 h-6" />,
            color: "text-purple-500",
            bgColor: "bg-purple-50",
        },
    ];

    return (
        <div className="w-full px-4 py-6">
            {/* Grid responsive avec 5 colonnes sur desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {stats.map((stat, index) => (
                    <Card
                        key={index}
                        className={`p-6 flex flex-col items-center justify-center rounded-2xl shadow-md hover:shadow-lg transition `}
                    >
                        <div className="flex justify-between items-start w-full gap-2">
                            {/* Colonne gauche : titre + valeur + saison */}
                            <div className="flex flex-col items-start gap-8">
                                <h3 className="text-md capitalize">{stat.title}</h3>
                                <div className="flex flex-col items-start">
                                    <p className={`text-xl font-bold ${stat.color} font-exo`}>
                                    {stat.title === "Categories de dépenses" 
                                            ? stat.value 
                                            : stat.value + " FCFA"}
                                    </p>
                                </div>
                            </div>

                            {/* Colonne droite : icône */}
                            <div>
                                <p
                                    className={`text-xs text-gray-400 font-exo flex items-center ${stat.bgColor} ${stat.color} p-2 rounded-full`}
                                >
                                    {stat.icon}
                                </p>
                            </div>
                        </div>

                    </Card>
                ))}
            </div>
        </div>
    );
}
