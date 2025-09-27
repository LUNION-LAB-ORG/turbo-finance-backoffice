"use client"

import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Download, Eye } from "lucide-react"
import { IRecouvrement } from "@/feature/revenus/types/recouvrement/recouvrement.types"
import { usePretList } from "@/feature/revenus/hooks/use-pret-list"
import { RecouvrementDetailModal } from "./recouvrement-detail-modal"

interface IPretTableProps {
    recouvrement: IRecouvrement[]
    formatMontant: (montant: number) => string
    formatDate: (dateString: string) => string
    onViewDetails?: (recouvrement: IRecouvrement) => void
    onDownloadProof?: (recouvrement: IRecouvrement) => void
}

export function PretTable({ 
    recouvrement, 
    formatMontant, 
    formatDate,
    onViewDetails,
    onDownloadProof
}: IPretTableProps) {
    const {facture} = usePretList()
    
    // Calculer le montant total à recouvrir pour un restaurant donné
    const getTotalFacturePourRestaurant = (restaurantId: string) => {
        const factureRestaurant = facture.find(f => f.id === restaurantId);
        
        if (factureRestaurant) {
            return factureRestaurant.totalCommission + factureRestaurant.totalFraisLivraisons;
        }
        
        return 0;
    };

    // Calculer la somme cumulée des recouvrements avant le recouvrement actuel
    const getCumulRecouvrementsAvant = (recouvrementActuel: IRecouvrement) => {
        const recouvrementsDuRestaurant = recouvrement
            .filter(recouv => recouv.restaurantId === recouvrementActuel.restaurantId)
            .sort((a, b) => new Date(a.dateRecouvrement).getTime() - new Date(b.dateRecouvrement).getTime());
        
        const indexActuel = recouvrementsDuRestaurant.findIndex(recouv => recouv.id === recouvrementActuel.id);
        
        if (indexActuel === -1) return 0;
        
        // Somme des recouvrements avant l'actuel (exclus)
        return recouvrementsDuRestaurant
            .slice(0, indexActuel)
            .reduce((sum, recouv) => sum + recouv.montant, 0);
    };

    // Calculer le montant cumulé JUSQU'À ce recouvrement (inclus)
    const getMontantCumuleJusquAPresent = (recouv: IRecouvrement) => {
        const cumulAvant = getCumulRecouvrementsAvant(recouv);
        return cumulAvant + recouv.montant; // Inclut le recouvrement actuel
    };

    // Calculer le reste à recouvrir APRÈS ce recouvrement (cumulatif)
    const getResteApresRecouvrement = (recouv: IRecouvrement) => {
        const totalFacture = getTotalFacturePourRestaurant(recouv.restaurantId);
        const cumulTotal = getMontantCumuleJusquAPresent(recouv);
        
        return Math.max(0, totalFacture - cumulTotal);
    };

    // Calculer le reste à recouvrir AVANT ce recouvrement
    const getResteAvantRecouvrement = (recouv: IRecouvrement) => {
        const totalFacture = getTotalFacturePourRestaurant(recouv.restaurantId);
        const cumulAvant = getCumulRecouvrementsAvant(recouv);
        
        return Math.max(0, totalFacture - cumulAvant);
    };

    // Obtenir le nom du restaurant
    const getNomRestaurant = (recouv: IRecouvrement) => {
        return recouv.nomRestaurant || recouv.restaurantId || "Non spécifié";
    }

    // Obtenir le total de la facture pour un restaurant
    const getTotalFacture = (recouv: IRecouvrement) => {
        return getTotalFacturePourRestaurant(recouv.restaurantId);
    }

    // Télécharger la preuve
    const handleDownloadProof = (recouv: IRecouvrement) => {
        if (onDownloadProof) {
            onDownloadProof(recouv);
        } else {
            if (recouv.preuve) {
                const link = document.createElement('a');
                link.href = `/api/proofs/${recouv.preuve}`;
                link.download = recouv.preuve;
                link.click();
            }
        }
    }

    // Voir les détails
    const handleViewDetails = (recouv: IRecouvrement) => {
        if (onViewDetails) {
            onViewDetails(recouv);
        }
    }

    return (
        <>
            {/* Version Desktop */}
            <div className="hidden md:block">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-red-500 hover:bg-red-600">
                            <TableHead className="font-semibold text-white text-center">Partenaire</TableHead>
                            <TableHead className="font-semibold text-white text-center">Montant total de la facture</TableHead>
                            <TableHead className="font-semibold text-white text-center">Montant recouvré (cumulé)</TableHead>
                            <TableHead className="font-semibold text-white text-center">Reste à recouvrir</TableHead>
                            <TableHead className="font-semibold text-white text-center">Date recouvrement</TableHead>
                            <TableHead className="font-semibold text-white text-center">Preuve</TableHead>
                            <TableHead className="font-semibold text-white text-center">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {recouvrement.map((recouv) => (
                            <TableRow key={recouv.id} className="transition-colors hover:bg-gray-50">
                                <TableCell className="text-center text-sm uppercase">
                                    {getNomRestaurant(recouv)}
                                </TableCell>

                                <TableCell className="font-semibold text-center text-sm">
                                    {formatMontant(getTotalFacture(recouv))} FCFA
                                </TableCell>

                                <TableCell className="font-semibold text-center text-sm text-blue-600">
                                    {/* Montant cumulé jusqu'à présent */}
                                    {formatMontant(getMontantCumuleJusquAPresent(recouv))} FCFA
                                    <div className="text-xs text-gray-500">
                                        Avant: {formatMontant(getCumulRecouvrementsAvant(recouv))} FCFA
                                    </div>
                                </TableCell>

                                

                                <TableCell className="font-semibold text-center text-sm text-red-600">
                                    {/* Reste APRÈS ce recouvrement (cumulatif) */}
                                    {formatMontant(getResteApresRecouvrement(recouv))} FCFA
                                    <div className="text-xs text-gray-500">
                                        Avant: {formatMontant(getResteAvantRecouvrement(recouv))} FCFA
                                    </div>
                                </TableCell>

                                <TableCell className="text-center text-sm">
                                    {formatDate(recouv.dateRecouvrement)}
                                </TableCell>

                                <TableCell className="text-center text-sm">
                                    {recouv.preuve ? (
                                        <Button 
                                            variant="outline" 
                                            size="sm"
                                            onClick={() => handleDownloadProof(recouv)}
                                            className="text-xs"
                                        >
                                            <Download className="h-3 w-3 mr-1" />
                                            Télécharger
                                        </Button>
                                    ) : (
                                        <span className="text-gray-400 text-xs">Aucune</span>
                                    )}
                                </TableCell>

                                <TableCell className="text-center">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button size="sm" variant="outline">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="cursor-pointer">
                                               <RecouvrementDetailModal recouvrement={recouv} />
                                            </DropdownMenuItem>
                                            {recouv.preuve && (
                                                <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="cursor-pointer">
                                                    <Download className="h-4 w-4 mr-2" />
                                                    Télécharger preuve
                                                </DropdownMenuItem>
                                            )}
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
                {recouvrement.map((recouv) => (
                    <div key={recouv.id} className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md">
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex-1">
                                <h3 className="font-semibold text-sm md:text-base uppercase">
                                    {getNomRestaurant(recouv)}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    Recouvrement le: {formatDate(recouv.dateRecouvrement)}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-gray-600 text-sm">Montant facture:</span>
                                <span className="font-bold">
                                    {formatMontant(getTotalFacture(recouv))} FCFA
                                </span>
                            </div>
                            
                            <div className="flex justify-between">
                                <span className="text-gray-600 text-sm">Montant cumulé:</span>
                                <span className="font-bold text-blue-600">
                                    {formatMontant(getMontantCumuleJusquAPresent(recouv))} FCFA
                                </span>
                            </div>
                            
                            <div className="flex justify-between">
                                <span className="text-gray-600 text-sm">Montant opération:</span>
                                <span className="font-bold text-green-600">
                                    {formatMontant(recouv.montant)} FCFA
                                </span>
                            </div>
                            
                            <div className="flex justify-between">
                                <span className="text-gray-600 text-sm">Reste à recouvrir:</span>
                                <span className="font-bold text-red-600">
                                    {formatMontant(getResteApresRecouvrement(recouv))} FCFA
                                </span>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 text-sm">Preuve:</span>
                                {recouv.preuve ? (
                                    <Button 
                                        variant="outline" 
                                        size="sm"
                                        onClick={() => handleDownloadProof(recouv)}
                                        className="text-xs"
                                    >
                                        <Download className="h-3 w-3 mr-1" />
                                        Télécharger
                                    </Button>
                                ) : (
                                    <span className="text-gray-400 text-xs">Aucune preuve</span>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-end mt-3 space-x-2">
                            <Button 
                                size="sm" 
                                variant="outline" 
                                className="text-xs"
                                onClick={() => handleViewDetails(recouv)}
                            >
                                <Eye className="h-3 w-3 mr-1" />
                                Détails
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}