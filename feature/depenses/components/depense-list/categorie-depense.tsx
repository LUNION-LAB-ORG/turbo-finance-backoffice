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
import { CreerDepenseModal } from "./creer-depense"
import { CreerCategorieModal } from "./creer-categorie"
import FilterCategorie from "../filtres/categorie/categorie.filters"

const categorie_depenses = [
    {
        id: 1,
        date: "28 septembre 2025",
        nom: "Salaires",
        montant_total: "1000",

    },
    {
        id: 2,
        date: "20 août 2025",
        nom: "Entretien",
        montant_total: "1000",
    },
    {
        id: 3,
        date: "15 août 2025",
        nom: "Transport",
        montant_total: "1000",
    },
    {
        id: 4,
        date: "10 août 2025",
        nom: "Energie",
        montant_total: "1000",
    },
    {
        id: 5,
        date: "10 août 2025",
        nom: "Autres",
        montant_total: "1000",
    },
]

export function CategorieDepenseList() {
    // Couleur des résultats
    const getCategoriesStyle = (nom: string) => {
        switch (nom) {
            case "Salaires":
                return "bg-green-100 text-green-800 border border-green-200"
            case "Entretien":
                return "bg-red-100 text-red-800 border border-red-200"
            case "Transport":
                return "bg-yellow-100 text-yellow-800 border border-yellow-200"
            case "Energie":
                return "bg-blue-100 text-blue-800 border border-blue-200"
            case "Autres":
                return "bg-gray-100 text-gray-800 border border-gray-200"
            default:
                return "bg-purple-100 text-gray-800 border border-gray-200"
        }
    }

    // Formatage de la date pour mobile
    const formatDateForMobile = (date: string) => {
        return date.split(' ')[0] + ' ' + date.split(' ')[1].charAt(0)
    }

    return (
        <div className="w-full px-4 py-6">
            <Card className="shadow-lg border-0">
                <CardHeader className="">
                    <CardTitle>
                        <div className="flex justify-between items-center">
                            <p className="font-bold text-sm  md:text-2xl font-exo">Liste des categorie</p>
                            <div
                                className="flex justify-center items-center gap-2 font-normal text-sm"
                            >
                                <FilterCategorie />
                                <CreerCategorieModal />
                            </div>
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    {/* Version Desktop */}
                    <div className="hidden md:block">
                        <Table>
                            <TableHeader className="">
                                <TableRow className="bg-red-500 hover:bg-red-600">
                                    <TableHead className="font-semibold text-gray-700 text-center text-white">Date</TableHead>
                                    <TableHead className="font-semibold text-gray-700 text-center text-white">Nom</TableHead>
                                    <TableHead className="font-semibold text-gray-700 text-center text-white">Montant total</TableHead>
                                    <TableHead className="font-semibold text-gray-700 text-center text-white">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {categorie_depenses.map((categorie_depense) => (
                                    <TableRow key={categorie_depense.id} className="transition-colors">
                                        <TableCell className="font-medium text-center">{categorie_depense.date}</TableCell>
                                        <TableCell className="text-center">
                                            <span className={`font-semibold rounded-full px-2 text-center ${getCategoriesStyle(categorie_depense.nom)}`}>{categorie_depense.nom}</span>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {categorie_depense.montant_total} FCFA
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
                        {categorie_depenses.map((categorie_depense) => (
                            <div key={categorie_depense.id} className="bg-white border rounded-lg p-4 shadow-sm">
                                <div className="flex justify-between items-start mb-3">
                                    <p className="text-sm text-gray-500">{categorie_depense.date}</p>
                                    <h3 className={`font-semibold rounded-md px-2 text-sm  ${getCategoriesStyle(categorie_depense.nom)}`}>{categorie_depense.nom}</h3>


                                </div>

                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="text-gray-600">Montant:</span>
                                        <span className="text-black ml-2">{categorie_depense.montant_total}</span>
                                    </div>
                                    <div className="text-right">
                                        <Button variant="default" size="sm">
                                            <Eye className="h-4 w-4 mr-1" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-between items-center p-4 border-t">
                        <p className="text-sm text-gray-600">
                            Affichage de 1 à {categorie_depenses.length} sur {categorie_depenses.length} depenses
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