
"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Eye, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import FilterRestaurant from "@/feature/revenus/filtres/restaurant/filter-restaurant"
import FilterPeriode from "@/feature/revenus/filtres/periode/filter-periode"
import { LivraisonDetailModal } from "./livraison-detail-modal"
import { livraisons } from "./data"
export default function LivraisonList() {


    // Formatage de la date pour mobile
    const formatDateForMobile = (date: string) => {
        return date.split(' ')[0] + ' ' + date.split(' ')[1].charAt(0)
    }

    return (
        <div className="">
            <Card className="shadow-lg border-0">
                <CardHeader className="">
                    <CardTitle>
                        <div className="flex justify-between items-center">
                            <p className="font-bold text-sm md:text-2xl">Liste des livraisons</p>
                            <div
                                className="grid grid-cols-1 md:grid-cols-2 gap-2 font-normal font-exo text-sm"
                            >
                                <FilterPeriode />
                                <FilterRestaurant />
                            </div>
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    {/* Version Desktop */}
                    <div className="hidden md:block">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-red-500 hover:bg-red-600">
                                    <TableHead className="font-semibold text-white text-center hover:text-white capitalize">Reference</TableHead>
                                    <TableHead className="font-semibold text-white text-center hover:text-white capitalize">Date et heure</TableHead>
                                    <TableHead className="font-semibold text-white text-center hover:text-white capitalize">Livreur</TableHead>
                                    <TableHead className="font-semibold text-white text-center hover:text-white capitalize">Coût Livraison</TableHead>
                                    <TableHead className="font-semibold text-white text-center hover:text-white capitalize">Coût commande</TableHead>
                                    <TableHead className="font-semibold text-white text-center hover:text-white capitalize">Commission(%)</TableHead>
                                    <TableHead className="font-semibold text-white text-center hover:text-white capitalize">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {livraisons.map((livraison) => (
                                    <TableRow key={livraison.id} className="transition-colors">
                                        <TableCell className="font-medium text-center">{livraison.reference}</TableCell>
                                        <TableCell className="font-medium text-center">{livraison.date}</TableCell>
                                        <TableCell className="font-medium text-center">
                                            {livraison.nomLivreur}
                                        </TableCell>
                                        <TableCell className="font-medium text-center">
                                            {livraison.coutLivraison}
                                        </TableCell>
                                        <TableCell className="font-medium text-center">
                                            {livraison.coutCommande}
                                        </TableCell>
                                        <TableCell className="font-medium text-center">
                                            10%({livraison.commission} XOF)
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button className="bg-red-400 hover:bg-red-600 cursor-pointer ">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                                        <LivraisonDetailModal livraison={livraison} />
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Version Mobile */}
                    <div className="md:hidden space-y-4 p-4">
                        {livraisons.map((livraison) => (
                            <div
                                key={livraison.id}
                                className="border rounded-lg p-4 shadow-sm bg-card text-card-foreground"
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <p className="text-sm text-muted-foreground">{livraison.reference}</p>
                                        <h3 className="font-semibold text-sm md:text-lg">{livraison.date}</h3>
                                    </div>
                                    <span className="px-2 py-1 rounded text-xs font-semibold bg-muted text-muted-foreground">
                                        {livraison.nomLivreur}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center gap-4 text-sm mt-2">
                                    <div>
                                        <span className="text-muted-foreground">Coût livraison:</span>
                                        <span className="font-bold ml-2 text-primary">{livraison.coutLivraison}</span>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Coût commande:</span>
                                        <span className="font-bold ml-2 text-primary">{livraison.coutCommande}</span>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center gap-4 text-sm mt-2">
                                    <div>
                                        <span className="text-muted-foreground">Commission(%):</span>
                                        <span className="font-bold ml-2 text-primary">10%({livraison.commission} XOF)</span>
                                    </div>
                                    <div className="text-center cursor-pointer ">
                                        <LivraisonDetailModal livraison={livraison}/>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-between items-center p-4 border-t">
                        <p className="text-sm text-gray-600">
                            Affichage de 1 à {livraisons.length} sur {livraisons.length} livraisons
                        </p>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" disabled>
                                Précédent
                            </Button>
                            <Button variant="outline" size="sm">
                                Suivant
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}