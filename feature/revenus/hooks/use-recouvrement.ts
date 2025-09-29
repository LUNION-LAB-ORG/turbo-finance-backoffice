"use client"
import { useMemo, useCallback } from "react";
import { useQueryStates } from 'nuqs';
import { recouvrementFiltersClient } from '../filters/recouvrement.filter';
import { IRecouvrement, IRecouvrementParams } from '../types/recouvrement/recouvrement.types';
import { useRecouvrementListQuery } from "../queries/recouvrement/recouvrement-list.query";

export interface IUseRecouvrementProps {
    initialData?: IRecouvrement[];
}

export function useRecouvrementList({ initialData = [] }: IUseRecouvrementProps = {}) {
    // Gestion des paramètres d'URL via Nuqs
    const [filters, setFilters] = useQueryStates(recouvrementFiltersClient.filter, recouvrementFiltersClient.option);

    // Construction des paramètres de recherche pour l'API
    const currentSearchParams: IRecouvrementParams = useMemo(() => {
        const params: IRecouvrementParams = {
            page: filters.page,
            limit: filters.limit,
        };

        // Ajouter les filtres seulement s'ils ne sont pas vides
        if (filters.search) params.search = filters.search;
        if (filters.nomRestaurant) params.nomRestaurant = filters.nomRestaurant;
        if (filters.dateRecouvrement) params.dateRecouvrement = filters.dateRecouvrement;
        if (filters.montant > 0) params.montant = filters.montant;

        return params;
    }, [filters]);

    console.log("currentSearchParams", currentSearchParams);

    // Récupération des données via la query
    const { data, isLoading, isError, error, isFetching } = useRecouvrementListQuery(currentSearchParams);

    const recouvrement = data || initialData;

    // Fonction pour gérer les changements de filtres
    const handleFilterChange = useCallback((filterName: string, value: string | number) => {
        setFilters(prev => ({
            ...prev,
            [filterName]: value,
            page: 1, // Reset à la première page quand on filtre
        }));
    }, [setFilters]);

    // Fonction pour réinitialiser tous les filtres
    const resetFilters = useCallback(() => {
        setFilters({
            page: 1,
            limit: 10,
            search: '',
            nomRestaurant: '',
            dateRecouvrement: '',
            montant: 0,
        });
    }, [setFilters]);

    // Fonction pour réinitialiser un filtre spécifique
    const resetFilter = useCallback((filterName: string) => {
        setFilters(prev => ({
            ...prev,
            [filterName]: filterName === 'montant' ? 0 : '',
            page: 1,
        }));
    }, [setFilters]);

    return {
        recouvrement: Array.isArray(recouvrement) ? recouvrement : [],
        isLoading: isLoading || isFetching,
        isError,
        error,
        filters,
        handleFilterChange,
        resetFilters,
        resetFilter,
        setFilters,
    };
}