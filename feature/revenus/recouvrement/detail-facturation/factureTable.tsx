"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import FactureRow from "./facture-row"
import { Facture } from "../../types/revenus.types"

interface FactureTableProps {
  factures: Facture[]
  onSelect: (facture: Facture) => void
  formaterDate: (date: Date) => string
}

export default function FactureTable({ factures, onSelect, formaterDate }: FactureTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Partenaire</TableHead>
          <TableHead>Montant de la facture</TableHead>
          <TableHead>Date d'échéance</TableHead>
          <TableHead>Montant payé</TableHead>
          <TableHead>Statut</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {factures.map((facture) => (
          <FactureRow
            key={facture.id}
            facture={facture}
            onSelect={onSelect}
            formaterDate={formaterDate}
          />
        ))}
      </TableBody>
    </Table>
  )
}
