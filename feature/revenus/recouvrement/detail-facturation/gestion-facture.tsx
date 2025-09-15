"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import FactureTable from "./factureTable"
import FactureDialog from "./facture-modal"
import { Facture, PaiementPartiel } from "../../types/revenus.types"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

export default function GestionRecouvrement() {
  const router = useRouter()
  const [factures, setFactures] = useState<Facture[]>([
    {
      id: 1,
      partenaire: "Entreprise ABC",
      montant: 150000,
      dateEcheance: new Date(2024, 9, 15),
      statut: "En attente",
      paiements: [],
      montantPaye: 0,
    },
    {
      id: 2,
      partenaire: "Société XYZ",
      montant: 275000,
      dateEcheance: new Date(2024, 9, 20),
      statut: "Partiellement payé",
      paiements: [
        { id: 1, montant: 100000, date: new Date(2024, 8, 10), preuvePaiement: "recu_xyz.pdf" },
      ],
      montantPaye: 100000,
    },
    {
      id: 3,
      partenaire: "Compagnie 123",
      montant: 500000,
      dateEcheance: new Date(2024, 9, 5),
      statut: "Payé",
      paiements: [
        { id: 1, montant: 500000, date: new Date(2024, 8, 25), preuvePaiement: "virement_123.jpg" },
      ],
      montantPaye: 500000,
    },
  ])

  const [selectedFacture, setSelectedFacture] = useState<Facture | null>(null)

  const formaterDate = (date: Date) => format(date, "dd MMMM yyyy", { locale: fr })

  const enregistrerPaiement = (paiement: PaiementPartiel) => {
    if (!selectedFacture) return

    const nouvellesFactures = factures.map((facture) => {
      if (facture.id === selectedFacture.id) {
        const nouveauxPaiements = [...facture.paiements, paiement]
        const nouveauMontantPaye = facture.montantPaye + paiement.montant

        let nouveauStatut: Facture["statut"] = "En attente"
        if (nouveauMontantPaye >= facture.montant) {
          nouveauStatut = "Payé"
        } else if (nouveauMontantPaye > 0) {
          nouveauStatut = "Partiellement payé"
        }

        return { ...facture, paiements: nouveauxPaiements, montantPaye: nouveauMontantPaye, statut: nouveauStatut }
      }
      return facture
    })

    setFactures(nouvellesFactures)
    setSelectedFacture(null)
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Button variant="outline" onClick={() => router.back()}>
        <ArrowLeft /> Retour
      </Button>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestion des Recouvrements</h1>
          <p className="text-muted-foreground">Suivi et gestion des paiements en attente de recouvrement</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Factures en attente de recouvrement</CardTitle>
          <CardDescription>Liste des factures à recouvrer avec leur statut actuel</CardDescription>
        </CardHeader>
        <CardContent>
          <FactureTable factures={factures} onSelect={setSelectedFacture} formaterDate={formaterDate} />
        </CardContent>
      </Card>

      <FactureDialog
        facture={selectedFacture}
        onClose={() => setSelectedFacture(null)}
        onSave={enregistrerPaiement}
      />
    </div>
  )
}
