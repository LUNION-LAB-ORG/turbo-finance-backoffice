import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@radix-ui/react-separator"

export function LastDepense() {
    return (
        <div className="w-full px-4 py-6">
            <Card>
                <CardHeader>
                    <CardTitle>
                        <p className="font-bold text-sm  md:text-2xl font-exo">Dernière mise à jour</p>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-around items-center gap-2">
                        <p className="font-bold text-sm  md:text-xl font-exo">Payement des salaires </p>
                        <p className="font-bold text-sm  md:text-xl font-exo">20 août 2025</p>
                        <p className="font-bold text-sm  md:text-xl font-exo">1000 FCFA</p>
                    </div>
                    <Separator className="my-2"/>
                </CardContent>
            </Card>
        </div>
    )
}