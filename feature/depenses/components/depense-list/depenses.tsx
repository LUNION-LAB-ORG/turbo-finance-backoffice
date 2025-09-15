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
import FilterDepenses from "../filtres/depenses/depenses.filters"
import FilterCategorie from "../filtres/categorie/categorie.filters"

const depenses = [
    {
        id: 1,
        date: "28 septembre 2025",
        libelle: "Salaires du personnel",
        categories: "Salaires",
        montant: "1000",

    },
    {
        id: 2,
        date: "20 août 2025",
        libelle: "Entretien du terrain",
        categories: "Entretien",
        montant: "1000",
    },
    {
        id: 3,
        date: "15 août 2025",
        libelle: "Transport du personnel",
        categories: "Transport",
        montant: "1000",
    },
    {
        id: 4,
        date: "10 août 2025",
        libelle: "Energie",
        categories: "Energie",
        montant: "1000",
    },
    {
        id: 5,
        date: "10 août 2025",
        libelle: "Autres",
        categories: "Autres",
        montant: "1000",
    },
]

export function DepenseList() {
    // Couleur des résultats
    const getCategoriesStyle = (categories: string) => {
        switch (categories) {
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
                        <div className="flex justify-around items-center">
                            <p className="font-bold text-sm md:text-2xl">Liste des depenses</p>
                            <div
                                className="flex items-center gap-2 font-normal font-exo text-sm"
                            >
                                <FilterDepenses />

                            </div>
                            <div>
                                <FilterCategorie />
                            </div>
                            <div>
                                <CreerDepenseModal />
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
                                    <TableHead className="font-semibold text-white text-center hover:text-white">Libelle</TableHead>
                                    <TableHead className="font-semibold text-white text-center hover:text-white">Categories</TableHead>
                                    <TableHead className="font-semibold text-white text-center hover:text-white">Montant</TableHead>
                                    <TableHead className="font-semibold text-white text-center hover:text-white">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {depenses.map((depense) => (
                                    <TableRow key={depense.id} className="transition-colors">
                                        <TableCell className="font-medium text-center">{depense.date}</TableCell>
                                        <TableCell className="font-semibold text-center">{depense.libelle}</TableCell>
                                        <TableCell className="text-center">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getCategoriesStyle(depense.categories)}`}>{depense.categories}</span>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <span className={` text-xs capitalize `}>
                                                {depense.montant} FCFA
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
                        {depenses.map((depense) => (
                            <div key={depense.id} className="bg-white border rounded-lg p-4 shadow-sm">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <p className="text-sm text-gray-500">{depense.date}</p>
                                        <h3 className="font-semibold text-sm md:text-lg">{depense.libelle}</h3>
                                    </div>
                                    <span className={`px-2 py-1 rounded text-xs font-semibold ${getCategoriesStyle(depense.categories)}`}>
                                        {depense.categories}
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="text-gray-600">Montant:</span>
                                        <span className="font-bold ml-2">{depense.montant}</span>
                                    </div>
                                    <div className="text-center">
                                        <Button variant="outline" size="sm">
                                            <Eye className="h-4 w-4 mr-1" />
                                            <span className="hidden md:flex">Détails</span>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-between items-center p-4 border-t">
                        <p className="text-sm text-gray-600">
                            Affichage de 1 à {depenses.length} sur {depenses.length} depenses
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