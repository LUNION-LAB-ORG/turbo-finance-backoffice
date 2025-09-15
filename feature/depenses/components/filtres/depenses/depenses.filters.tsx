"use client"

import { CalendarInput } from "@/components/block/dateInput"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default function FilterDepenses() {
  return (
    <div className="flex justify-center items-center gap-2">
      {/* Recherche par montant */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          id="montant"
          type="text"
          placeholder="Rechercher par montant"
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Recherche par date */}
      <div className="relative">
        <CalendarInput
          placeholder="Rechercher par date"

        />
      </div>
    </div>
  )
}
