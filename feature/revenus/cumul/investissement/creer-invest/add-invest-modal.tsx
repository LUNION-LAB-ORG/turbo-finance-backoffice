"use client"
import { CalendarInput } from "@/components/block/dateInput"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { Plus } from "lucide-react"

export function AddInvestModal() {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)

    return (
        <Dialog >
            <form className="w-full">
                <DialogTrigger asChild>
                    <Button
                        variant="default"
                        className="cursor-pointer flex justify-end gap-1 md:gap-2 bg-amber-500 text-white hover:bg-amber-600 hover:text-white"
                    >
                        <Plus />Ajouter <span className="hidden md:flex"> une depense</span>
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-w-[95%] sm:max-w-[600px] w-full mt-3 sm:mt-3 md:mt-0">
                    <DialogHeader>
                        <DialogTitle>Ajouter une investissement</DialogTitle>
                    </DialogHeader>

                    <div className="grid gap-6">
                        {/* Date et heure */}
                        <div className="grid grid-cols-1 gap-3">
                            <div className="flex flex-col gap-1">
                                <Label htmlFor="date-1" className="text-sm text-gray-500">
                                    Date de l'investissement
                                </Label>
                                <CalendarInput
                                    value={selectedDate}
                                    onChange={(date) => setSelectedDate(date)}
                                    placeholder="Sélectionnez une date"
                                />
                            </div>

                        </div>
                        {/* Équipe adverse */}
                        <div className="grid gap-3">
                            <Label htmlFor="investisseur" className="text-sm text-gray-500">
                                Investisseur
                            </Label>
                            <Input id="investisseur" name="investisseur" placeholder="Investisseur" />
                        </div>

                        {/* Montant */}
                        <div className="grid gap-3">
                            <div className="grid gap-3">
                                <Label htmlFor="montant" className="text-sm text-gray-500">
                                    Montant de l'investissement
                                </Label>
                                <Input id="montant" name="montant" placeholder="Montant" type="number" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-3">
                            <div className="flex flex-col gap-1">
                                <Label htmlFor="date-1" className="text-sm text-gray-500">
                                    Echéance
                                </Label>
                                <CalendarInput
                                    value={selectedDate}
                                    onChange={(date) => setSelectedDate(date)}
                                    placeholder="Sélectionnez une date"
                                />
                            </div>

                        </div>
                    </div>

                    {/* Footer */}
                    <DialogFooter className="mt-4 flex flex-col sm:flex-row gap-2 sm:gap-4">
                        <DialogClose asChild>
                            <Button
                                variant="outline"
                                className="rounded-full w-full sm:w-auto cursor-pointer"
                            >
                                Annuler
                            </Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            variant="destructive"
                            className="rounded-full w-full sm:w-auto px-10  cursor-pointer"
                        >
                            Ajouter
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
