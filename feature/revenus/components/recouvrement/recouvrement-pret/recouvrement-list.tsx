"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState, useMemo } from "react"
import { Pagination } from "./pagination"
import { Spinner } from "@heroui/spinner"
import { useRecouvrementList } from "@/feature/revenus/hooks/use-recouvrement"
import { PretTable } from "./recouvrement-list-table"
import { CreerRecouvrementModal } from "./creer-recouvrement-modal"

export function RecouvrementList() {
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [filters, setFilters] = useState({
        id: "",
        nomRestaurant: "",
        dateRecouvrement: "",
        montant: "",
    })

    //  On récupère les recouvrements depuis le hook
    const { recouvrement, isLoading, isError, error } = useRecouvrementList()

    const handleFilterChange = (filterName: string, value: string) => {
        setFilters((prev) => ({ ...prev, [filterName]: value }))
        setCurrentPage(1)
    }

    //  Filtrage
    const filteredRecouvrements = useMemo(() => {
        if (!recouvrement || !Array.isArray(recouvrement)) return []
        
        return recouvrement.filter((recouvrementItem) => {
            if (filters.id && recouvrementItem.id !== filters.id) return false
            if (filters.nomRestaurant && recouvrementItem.nomRestaurant && !recouvrementItem.nomRestaurant.toLowerCase().includes(filters.nomRestaurant.toLowerCase())) return false
            if (filters.dateRecouvrement && recouvrementItem.dateRecouvrement && !recouvrementItem.dateRecouvrement.includes(filters.dateRecouvrement)) return false
            if (filters.montant) {
                const montantValue = parseFloat(filters.montant)
                if (isNaN(montantValue) || recouvrementItem.montant !== montantValue) return false
            }
            return true
        })
    }, [recouvrement, filters])

    const totalPages = Math.ceil(filteredRecouvrements.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const currentRecouvrements = filteredRecouvrements.slice(startIndex, startIndex + itemsPerPage)

    const formatDate = (dateString: string) => {
        if (!dateString) return ""
        try {
            const date = new Date(dateString)
            if (isNaN(date.getTime())) return dateString
            return date.toLocaleDateString("fr-FR")
        } catch {
            return dateString
        }
    }

    const formatMontant = (montant: number) =>
        new Intl.NumberFormat("fr-FR").format(montant)

    // const formatStatus = (statut: StatutPret) => {
    //     switch (statut) {
    //         case StatutPret.PAYEE:
    //             return "Payée"
    //         case StatutPret.PARTIEL:
    //             return "Partiellement payée"
    //         case StatutPret.EN_ATTENTE:
    //             return "En attente"
    //         default:
    //             return "Inconnu"
    //     }
    // }

    // const getCouleurStatut = (statut: StatutPret) => {
    //     switch (statut) {
    //         case StatutPret.PAYEE:
    //             return "bg-green-100 text-green-800 hover:bg-green-100"
    //         case StatutPret.PARTIEL:
    //             return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
    //         case StatutPret.EN_ATTENTE:
    //             return "bg-red-100 text-red-800 hover:bg-red-100"
    //         default:
    //             return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    //     }
    // }

    if (isLoading) {
        return <Spinner color="danger" />
    }

    if (isError) {
        return (
            <div className="p-8 text-center text-red-500">
                Erreur : {String(error)}
            </div>
        )
    }

    return (
        <div className="w-full px-4 py-6">
            <Card className="shadow-lg border-0">
                <CardHeader className="bg-blue-50">
                    <CardTitle>
                        <div className="flex justify-between items-center gap-4 py-2">
                            <h2 className="font-bold text-xl text-blue-800">Liste des recouvrements</h2>
                            <CreerRecouvrementModal />
                            {/* Ici tu peux remettre PretFilters si tu veux */}
                        </div>
                    </CardTitle>
                </CardHeader>

                <CardContent className="p-0">
                    <PretTable
                        recouvrement={currentRecouvrements}
                        // getCouleurStatut={getCouleurStatut}
                        formatMontant={formatMontant}
                        formatDate={formatDate}
                        // formatStatus={formatStatus}
                    />

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        itemsPerPage={itemsPerPage}
                        totalItems={filteredRecouvrements.length}
                        onPageChange={setCurrentPage}
                        onItemsPerPageChange={(val) => {
                            setItemsPerPage(val)
                            setCurrentPage(1)
                        }}
                    />

                    {filteredRecouvrements.length === 0 && (
                        <div className="p-8 text-center text-gray-500">
                            <p>Aucun recouvrement trouvé</p>
                            {Object.values(filters).some((f) => f) && (
                                <p className="text-sm mt-2">
                                    Essayez de modifier vos critères de recherche
                                </p>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
