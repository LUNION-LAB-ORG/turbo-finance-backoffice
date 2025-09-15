"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarIcon, Upload, FileText } from "lucide-react"
import { format } from "date-fns"
import { PaiementPartiel } from "../../types/revenus.types"

interface PaiementFormProps {
  onSave: (paiement: PaiementPartiel) => void
}

export default function PaiementForm({ onSave }: PaiementFormProps) {
  const [montantPaiement, setMontantPaiement] = useState("")
  const [date, setDate] = useState<Date>()
  const [fichier, setFichier] = useState<File | null>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) setFichier(file)
  }

  const handleSubmit = () => {
    if (!montantPaiement || !date) return

    const paiement: PaiementPartiel = {
      id: Date.now(),
      montant: parseFloat(montantPaiement),
      date: date,
      preuvePaiement: fichier ? fichier.name : undefined,
    }

    onSave(paiement)
    setMontantPaiement("")
    setDate(undefined)
    setFichier(null)
  }

  return (
    <div className="space-y-4">
      <h3 className="font-medium">Enregistrer un paiement</h3>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="montant">Montant du paiement (FCFA)</Label>
          <Input
            id="montant"
            type="number"
            value={montantPaiement}
            onChange={(e) => setMontantPaiement(e.target.value)}
            placeholder="Montant"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">Date du paiement</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "dd/MM/yyyy") : "Sélectionner une date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="preuve">Preuve de paiement</Label>
        <div className="flex items-center gap-2">
          <Label
            htmlFor="preuve"
            className="flex flex-col items-center justify-center border-2 border-dashed rounded-md p-4 cursor-pointer hover:border-primary"
          >
            <Upload className="h-6 w-6 mb-2" />
            <span className="text-sm">Téléverser un fichier</span>
            <Input
              id="preuve"
              type="file"
              className="hidden"
              onChange={handleFileUpload}
              accept=".jpg,.jpeg,.png,.pdf"
            />
          </Label>
          {fichier && (
            <div className="flex items-center text-sm text-muted-foreground">
              <FileText className="mr-2 h-4 w-4" />
              {fichier.name}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSubmit}>Enregistrer le paiement</Button>
      </div>
    </div>
  )
}
