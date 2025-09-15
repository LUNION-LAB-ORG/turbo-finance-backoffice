"use client"

import { TableRow, TableCell } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertCircle, Clock, FileText } from "lucide-react"
import { Facture } from "../../types/revenus.types"

interface FactureRowProps {
  facture: Facture
  onSelect: (facture: Facture) => void
  formaterDate: (date: Date) => string
}

export default function FactureRow({ facture, onSelect, formaterDate }: FactureRowProps) {
  const getCouleurStatut = (statut: string) => {
    switch (statut) {
      case "Payé": return "bg-green-100 text-green-800 hover:bg-green-100"
      case "Partiellement payé": return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      case "En attente": return "bg-red-100 text-red-800 hover:bg-red-100"
      default: return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  const getIconeStatut = (statut: string) => {
    switch (statut) {
      case "Payé": return <CheckCircle className="h-4 w-4 mr-1" />
      case "Partiellement payé": return <AlertCircle className="h-4 w-4 mr-1" />
      case "En attente": return <Clock className="h-4 w-4 mr-1" />
      default: return <FileText className="h-4 w-4 mr-1" />
    }
  }

  return (
    <TableRow 
      className="cursor-pointer hover:bg-gray-0"
      onClick={() => onSelect(facture)}
    >
      <TableCell className="font-medium">{facture.partenaire}</TableCell>
      <TableCell>{facture.montant.toLocaleString()} FCFA</TableCell>
      <TableCell>{formaterDate(facture.dateEcheance)}</TableCell>
      <TableCell>{facture.montantPaye.toLocaleString()} FCFA</TableCell>
      <TableCell>
        <Badge className={getCouleurStatut(facture.statut)}>
          {getIconeStatut(facture.statut)}
          {facture.statut}
        </Badge>
      </TableCell>
      <TableCell className="text-right">
        <Button variant="outline" size="sm">Détails</Button>
      </TableCell>
    </TableRow>
  )
}
