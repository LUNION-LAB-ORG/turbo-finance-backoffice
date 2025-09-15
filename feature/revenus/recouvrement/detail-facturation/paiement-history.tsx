"use client"

import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"
import { format } from "date-fns"
import { PaiementPartiel } from "../../types/revenus.types"

interface PaiementHistoryProps {
  paiements: PaiementPartiel[]
}

export default function PaiementHistory({ paiements }: PaiementHistoryProps) {
  return (
    <div className="space-y-2">
      <h3 className="font-medium">Historique des paiements</h3>
      <div className="border rounded-md">
        {paiements.map((paiement) => (
          <div
            key={paiement.id}
            className="flex justify-between p-3 border-b last:border-b-0"
          >
            <div>
              <p className="font-medium">{paiement.montant.toLocaleString()} FCFA</p>
              <p className="text-sm text-muted-foreground">
                {format(paiement.date, "dd/MM/yyyy")}
              </p>
            </div>
            {paiement.preuvePaiement && (
              <Button variant="ghost" size="sm">
                <FileText className="mr-2 h-4 w-4" />
                Voir la preuve
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
