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
export default function LivraisonList() {

    const livraisons = [
        {
            id: 1,
            date: "28 septembre 2025",
            nomLivreur: "Livreur 1",
            numeroLivraison: "123456",
            numeroCommande: "123456",
            restaurant: "Restaurant 1",
            montant: "1000",

        },
        {
            id: 2,
            date: "20 août 2025",
            nomLivreur: "Livreur 1",
            numeroLivraison: "123456",
            numeroCommande: "123456",
            restaurant: "Restaurant 1",
            montant: "1000",
        },
        {
            id: 3,
            date: "15 août 2025",
            nomLivreur: "Livreur 1",
            numeroLivraison: "123456",
            numeroCommande: "123456",
            restaurant: "Restaurant 1",
            montant: "1000",
        },
        {
            id: 4,
            date: "10 août 2025",
            nomLivreur: "Livreur 1",
            numeroLivraison: "123456",
            numeroCommande: "123456",
            restaurant: "Restaurant 1",
            montant: "1000",
        },
        {
            id: 5,
            date: "10 août 2025",
            nomLivreur: "Livreur 1",
            numeroLivraison: "123456",
            numeroCommande: "123456",
            restaurant: "Restaurant 1",
            montant: "1000",
        },
    ]



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
                               <FilterPeriode/>
                               <FilterRestaurant/>
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
                                    <TableHead className="font-semibold text-white text-center hover:text-white">Date</TableHead>
                                    <TableHead className="font-semibold text-white text-center hover:text-white">Nom Livreur</TableHead>
                                    <TableHead className="font-semibold text-white text-center hover:text-white">Numero Livraison</TableHead>
                                    <TableHead className="font-semibold text-white text-center hover:text-white">Numero Commande</TableHead>
                                    <TableHead className="font-semibold text-white text-center hover:text-white">Restaurant</TableHead>
                                    <TableHead className="font-semibold text-white text-center hover:text-white">Montant</TableHead>
                                    <TableHead className="font-semibold text-white text-center hover:text-white">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {livraisons.map((livraison) => (
                                    <TableRow key={livraison.id} className="transition-colors">
                                        <TableCell className="font-medium text-center">{livraison.date}</TableCell>
                                        <TableCell className="font-semibold text-center">{livraison.nomLivreur}</TableCell>
                                        <TableCell className="text-center">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize `}>{livraison.numeroLivraison}</span>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <span className={` text-xs capitalize `}>
                                                {livraison.numeroCommande}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <span className={` text-xs capitalize `}>
                                                {livraison.restaurant}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <span className={` text-xs capitalize `}>
                                                {livraison.montant} XOF
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="sm">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem className="flex items-center gap-2">
                                                        <Eye className="h-4 w-4" />
                                                        Voir détails
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
                                        <p className="text-sm text-muted-foreground">{livraison.date}</p>
                                        <h3 className="font-semibold text-sm md:text-lg">{livraison.nomLivreur}</h3>
                                    </div>
                                    <span className="px-2 py-1 rounded text-xs font-semibold bg-muted text-muted-foreground">
                                        {livraison.numeroLivraison}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center gap-4 text-sm mt-2">
                                    <div>
                                        <span className="text-muted-foreground">Restaurant:</span>
                                        <span className="font-bold ml-2 text-primary">{livraison.restaurant}</span>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center gap-4 text-sm mt-2">
                                    <div>
                                        <span className="text-muted-foreground">Montant:</span>
                                        <span className="font-bold ml-2 text-primary">{livraison.montant}</span>
                                    </div>
                                    <div className="text-center">
                                        <button className="flex items-center px-3 py-1.5 text-xs border border-input rounded-md bg-background hover:bg-accent hover:text-accent-foreground">
                                            <Eye className="h-4 w-4 mr-1" />
                                            <span className="hidden md:inline">Détails</span>
                                        </button>
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