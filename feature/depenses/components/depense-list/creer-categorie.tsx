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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { Plus } from "lucide-react"

export function CreerCategorieModal() {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)

    return (
        <Dialog >
            <form className="w-full">
                <DialogTrigger asChild>
                    <Button
                        variant="default"
                        className="cursor-pointer flex items-center gap-1 md:gap-2"
                    >
                        <Plus />Ajouter <span className="hidden md:flex"> une categorie</span>
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-w-[95%] sm:max-w-[600px] w-full mt-3 sm:mt-3 md:mt-0">
                    <DialogHeader>
                        <DialogTitle>Ajouter une categorie</DialogTitle>
                        <DialogDescription>
                            Ajoutez une nouvelle categorie
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-6">
                        {/* Équipe adverse */}
                        <div className="grid gap-3">
                            <Label htmlFor="name" className="text-sm text-gray-500">
                                Nom
                            </Label>
                            <Input id="name" name="name" placeholder="Nom" />
                        </div>

                        {/* Date et heure */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="flex flex-col gap-1">
                                <Label htmlFor="date" className="text-sm text-gray-500">
                                    Date de la création de la categorie
                                </Label>
                                <CalendarInput
                                    value={selectedDate}
                                    onChange={(date) => setSelectedDate(date)}
                                    placeholder="Sélectionnez une date"
                                />
                            </div>
                        
                            
                        </div>

                    
                        {/* Stade */}
                        <div className="grid gap-3">
                            <Label htmlFor="description" className="text-sm text-gray-500">
                               Description
                            </Label>
                            <Input id="description" name="description" placeholder="Description" />
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
                            variant="default"
                            className="rounded-full w-full sm:w-auto px-10  cursor-pointer"
                        >
                            Créer
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
