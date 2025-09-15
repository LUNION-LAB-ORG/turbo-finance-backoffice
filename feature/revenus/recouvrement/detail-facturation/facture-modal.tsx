"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Facture, PaiementPartiel } from "../../types/revenus.types"
import PaiementForm from "./facture-form"
import PaiementHistory from "./paiement-history"


interface FactureDialogProps {
  facture: Facture | null
  onClose: () => void
  onSave: (paiement: PaiementPartiel) => void
}

export default function FactureDialog({ facture, onClose, onSave }: FactureDialogProps) {
  if (!facture) return null

  const formaterDate = (date: Date) => format(date, "dd MMMM yyyy", { locale: fr })

  return (
    <Dialog open={!!facture} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Détails du recouvrement</DialogTitle>
          <DialogDescription>
            Gestion des paiements pour {facture.partenaire}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Infos principales */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Montant total</Label>
              <p className="text-lg font-semibold">{facture.montant.toLocaleString()} FCFA</p>
            </div>
            <div>
              <Label>Montant payé</Label>
              <p className="text-lg font-semibold">{facture.montantPaye.toLocaleString()} FCFA</p>
            </div>
            <div>
              <Label>Reste à payer</Label>
              <p className="text-lg font-semibold">{(facture.montant - facture.montantPaye).toLocaleString()} FCFA</p>
            </div>
            <div>
              <Label>Date d'échéance</Label>
              <p className="text-lg font-semibold">{formaterDate(facture.dateEcheance)}</p>
            </div>
          </div>

          {/* Formulaire paiement */}
          <PaiementForm onSave={onSave} />

          {/* Historique paiements */}
          {facture.paiements.length > 0 && (
            <PaiementHistory paiements={facture.paiements} />
          )}

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Annuler
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
