"use client";

// hooks/useInvestissementList.ts
import { useMemo, useCallback } from "react";
import { useQueryStates } from 'nuqs';
import { recouvrementFiltersClient } from '../filters/recouvrement.filter';
import { IRecouvrement, IRecouvrementParams } from '../types/recouvrement/recouvrement.types';
import { useRecouvrementListQuery } from "../queries/recouvrement/recouvrement-list.query";
import { useGlobalFilterListener } from "@/hooks/use-global-filter-listener";

export interface IUseRecouvrementProps {
    initialData?: IRecouvrement[];
}

export function useRecouvrementList({ initialData = [] }: IUseRecouvrementProps = {}) {
    // Gestion des paramètres d'URL via Nuqs
    const [filters, setFilters] = useQueryStates(recouvrementFiltersClient.filter, recouvrementFiltersClient.option);

    // Écouter les filtres globaux de la navbar
    useGlobalFilterListener({
        moduleName: 'recouvrement',
        onFilterChange: (globalFilters) => {
            // Appliquer les filtres globaux aux filtres locaux
            setFilters(prev => ({
                ...prev,
                ...globalFilters,
                page: 1, // Reset à la première page quand on filtre
            }));
        },
        onFilterClear: () => {
            // Réinitialiser tous les filtres
            setFilters(prev => ({
                ...prev,
                search: '',
                restaurantId: '',
                dateRecouvrement: '',
                montant: 0,
                statut: '',
                page: 1,
            }));
        }
    });

    // Construction des paramètres de recherche
    const currentSearchParams: IRecouvrementParams = useMemo(() => {
        const params: IRecouvrementParams = {
            page: filters.page,
            limit: filters.limit,
            search: filters.search,
            factureId: filters.factureId,
            dateRecouvrement: filters.dateRecouvrement,
            restaurantId: filters.restaurantId,
            montant: filters.montant,
        };
        
        // Ajouter le search seulement s'il n'est pas vide
        if (filters.search) {
            params.search = filters.search;
        }
        
        return params;
    }, [filters]);

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

    // Fonction pour gérer les changements de pagination
    const handlePageChange = useCallback((page: number) => {
        setFilters(prev => ({
            ...prev,
            page,
        }));
    }, [setFilters]);

    // Fonction pour gérer les changements de limite
    const handleLimitChange = useCallback((limit: number) => {
        setFilters(prev => ({
            ...prev,
            limit,
            page: 1, // Reset à la première page quand on change la limite
        }));
    }, [setFilters]);

    return {
        recouvrement,
        isLoading: isLoading || isFetching,
        isError,
        error,
        filters,
        handleFilterChange,
        handlePageChange,
        handleLimitChange,
    };
}