// components/filtres/restaurant-filtre.tsx
"use client"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState, useEffect } from "react"
import { useRecouvrementList } from "@/feature/revenus/hooks/use-recouvrement";

interface RestaurantFiltreProps {
  onFilterChange?: (filterName: string, value: string) => void;
}

export default function RestaurantFiltre({ onFilterChange }: RestaurantFiltreProps) {
  const [restaurants, setRestaurants] = useState<string[]>([])
  const { recouvrement, filters, handleFilterChange } = useRecouvrementList()

  // Extraire les noms de restaurants uniques
  useEffect(() => {
    if (recouvrement.length > 0) {
      const uniqueRestaurants = Array.from(
        new Set(recouvrement.map(rec => rec.nomRestaurant).filter(Boolean))
      ).sort()
      setRestaurants(uniqueRestaurants)
    }
  }, [recouvrement])

  // Gérer le changement de restaurant
  const handleRestaurantChange = (value: string) => {
    const filterValue = value === 'all' ? '' : value
    
    // Utiliser la fonction handleFilterChange du hook qui gère nuqs
    handleFilterChange('nomRestaurant', filterValue)
    
    // Callback optionnel
    if (onFilterChange) {
      onFilterChange('nomRestaurant', filterValue)
    }
  }

  return (
    <div className="w-full max-w-xs">
      <Select 
        value={filters.nomRestaurant || 'all'} 
        onValueChange={handleRestaurantChange}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Sélectionner un restaurant" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous les restaurants</SelectItem>
          {restaurants.map((restaurant) => (
            <SelectItem key={restaurant} value={restaurant}>
              {restaurant}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}