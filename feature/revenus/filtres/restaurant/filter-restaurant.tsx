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

export default function FilterRestaurant() {
    return (
        <div className="w-full px-4 py-6">
            <Select>
                <SelectTrigger className="w-[170px] md:w-[250px] lg:w-[350px]">
                    <Filter className="w-6 h-6"/>
                    <SelectValue placeholder="Rechercher par restaurant" />

                </SelectTrigger>
                <SelectContent>

                    <SelectGroup>
                        <SelectLabel>Restaurants</SelectLabel>
                        <SelectItem value="apple">Restaurant 1</SelectItem>
                        <SelectItem value="banana">Restaurant 2</SelectItem>
                        <SelectItem value="blueberry">Restaurant 3</SelectItem>
                        <SelectItem value="grapes">Restaurant 4</SelectItem>
                        <SelectItem value="pineapple">Restaurant 5</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}
