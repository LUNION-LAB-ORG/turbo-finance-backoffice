"use client"
import { CalendarInput } from "@/components/block/dateInput"
import { useState } from "react"
export default function FilterPeriode() {
    const [selectedDateDebut, setSelectedDateDebut] = useState<Date | undefined>(undefined)
    const [selectedDateFin, setSelectedDateFin] = useState<Date | undefined>(undefined)
    return (
        <div className="flex justify-evenly items-center gap-2">
            <CalendarInput
                value={selectedDateDebut}
                onChange={(date) => setSelectedDateDebut(date)}
                placeholder="Date de début"
                className="w-[200px]"
            />
            <CalendarInput
                value={selectedDateFin}
                onChange={(date) => setSelectedDateFin(date)}
                placeholder="Date de fin"
                className="w-[200px]"
            />
        </div>
    )
}