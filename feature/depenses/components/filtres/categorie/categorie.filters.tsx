import * as React from "react"
import { Filter } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function FilterCategorie() {
    return (
        <div className="w-full px-4 py-6">
            <Select>
                <SelectTrigger className="w-[100px] md:w-[150px] lg:w-[200px]">
                    <Filter className="w-6 h-6"/>
                    <SelectValue placeholder="Rechercher par categorie" />

                </SelectTrigger>
                <SelectContent>

                    <SelectGroup>
                        <SelectLabel>Catégories</SelectLabel>
                        <SelectItem value="apple">Salaires</SelectItem>
                        <SelectItem value="banana">Entretien</SelectItem>
                        <SelectItem value="blueberry">Transport</SelectItem>
                        <SelectItem value="grapes">Energie</SelectItem>
                        <SelectItem value="pineapple">Autres</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}
