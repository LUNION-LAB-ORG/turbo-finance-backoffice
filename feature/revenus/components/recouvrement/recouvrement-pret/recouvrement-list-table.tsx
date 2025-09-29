"use client"

import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { IRecouvrement } from "@/feature/revenus/types/recouvrement/recouvrement.types"
import { usePretList } from "@/feature/revenus/hooks/use-pret-list"
import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import Image from "next/image"
import { RecouvrementTableRow } from "./recouvrement-table-raw"
import { RecouvrementCardMobile } from "./recouvrement-card-mobile"


interface IPretTableProps {
  recouvrement: IRecouvrement[]
  formatMontant: (montant: number) => string
  formatDate: (dateString: string) => string
  onViewDetails?: (recouvrement: IRecouvrement) => void
  handleFilterChange: (filterName: string, value: string) => void
}

export function RecouvrementListTable({
  recouvrement,
  formatMontant,
  formatDate,
  onViewDetails,
  handleFilterChange
}: IPretTableProps) {
  const { facture } = usePretList()
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  // 🔹 utilitaires calcul
  const getTotalFacturePourRestaurant = (restaurantId: string) => {
    const factureRestaurant = facture.find(f => f.id === restaurantId)
    return factureRestaurant
      ? factureRestaurant.totalCommission + factureRestaurant.totalFraisLivraisons
      : 0
  }

  const getCumulRecouvrementsAvant = (recouvActuel: IRecouvrement) => {
    const list = recouvrement
      .filter(r => r.restaurantId === recouvActuel.restaurantId)
      .sort((a, b) => new Date(a.dateRecouvrement).getTime() - new Date(b.dateRecouvrement).getTime())

    const index = list.findIndex(r => r.id === recouvActuel.id)
    return index === -1 ? 0 : list.slice(0, index).reduce((sum, r) => sum + r.montant, 0)
  }

  const getMontantCumuleJusquAPresent = (recouv: IRecouvrement) =>
    getCumulRecouvrementsAvant(recouv) + recouv.montant

  const getResteApresRecouvrement = (recouv: IRecouvrement) => {
    const total = getTotalFacturePourRestaurant(recouv.restaurantId)
    return Math.max(0, total - getMontantCumuleJusquAPresent(recouv))
  }

  const getResteAvantRecouvrement = (recouv: IRecouvrement) => {
    const total = getTotalFacturePourRestaurant(recouv.restaurantId)
    return Math.max(0, total - getCumulRecouvrementsAvant(recouv))
  }

  return (
    <>
      {/* 🔹 Modal fullscreen image */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 bg-black">
          {selectedImage && (
            <Image
              src={selectedImage}
              alt="Preuve agrandie"
              width={1200}
              height={800}
              className="w-full h-auto object-contain"
            />
          )}
        </DialogContent>
      </Dialog>

      {/* 🔹 Version Desktop */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow className="bg-red-500 hover:bg-red-600">
              <TableHead className="font-semibold text-white text-center">Partenaire</TableHead>
              <TableHead className="font-semibold text-white text-center">Montant total</TableHead>
              <TableHead className="font-semibold text-white text-center">Montant cumulé</TableHead>
              <TableHead className="font-semibold text-white text-center">Reste à recouvrir</TableHead>
              <TableHead className="font-semibold text-white text-center">Date</TableHead>
              <TableHead className="font-semibold text-white text-center">Preuve</TableHead>
              <TableHead className="font-semibold text-white text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recouvrement.map((recouv) => (
              <RecouvrementTableRow
                key={recouv.id}
                recouv={recouv}
                formatMontant={formatMontant}
                formatDate={formatDate}
                getTotalFacturePourRestaurant={getTotalFacturePourRestaurant}
                getCumulRecouvrementsAvant={getCumulRecouvrementsAvant}
                getMontantCumuleJusquAPresent={getMontantCumuleJusquAPresent}
                getResteApresRecouvrement={getResteApresRecouvrement}
                getResteAvantRecouvrement={getResteAvantRecouvrement}
                setSelectedImage={setSelectedImage}
                onViewDetails={onViewDetails}
              />
            ))}
          </TableBody>
        </Table>
      </div>

      {/* 🔹 Version Mobile */}
      <div className="md:hidden space-y-4 p-4">
        {recouvrement.map((recouv) => (
          <RecouvrementCardMobile
            key={recouv.id}
            recouv={recouv}
            formatMontant={formatMontant}
            formatDate={formatDate}
            getTotalFacturePourRestaurant={getTotalFacturePourRestaurant}
            getMontantCumuleJusquAPresent={getMontantCumuleJusquAPresent}
            getResteApresRecouvrement={getResteApresRecouvrement}
            setSelectedImage={setSelectedImage}
            onViewDetails={onViewDetails}
          />
        ))}
      </div>
    </>
  )
}
