"use client";

// hooks/useInvestissementList.ts
import { useMemo, useCallback } from "react";
import { useQueryStates } from 'nuqs';
import { pretFiltersClient } from '../filters/pret.filter';
import { IFacture, IFactureParams } from '../types/recouvrement/prets.types';
import { usePretListQuery } from "../queries/prets/pret-list.query";
import { useGlobalFilterListener } from "@/hooks/use-global-filter-listener";

export interface IUsePretListProps {
    initialData?: IFacture[];
}

export function usePretList({ initialData = [] }: IUsePretListProps = {}) {
    // Gestion des paramètres d'URL via Nuqs
    const [filters, setFilters] = useQueryStates(pretFiltersClient.filter, pretFiltersClient.option);

    // Écouter les filtres globaux de la navbar
    useGlobalFilterListener({
        moduleName: 'pret',
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
    const currentSearchParams: IFactureParams = useMemo(() => {
        const params: IFactureParams = {
            page: filters.page,
            limit: filters.limit,
        };
        
        // Ajouter le search seulement s'il n'est pas vide
        if (filters.search) {
            params.search = filters.search;
        }
        
        return params;
    }, [filters]);

    // Récupération des données via la query
    const { data, isLoading, isError, error, isFetching } = usePretListQuery(currentSearchParams);

    const facture = data || initialData;

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
        facture,
        isLoading: isLoading || isFetching,
        isError,
        error,
        filters,
        handleFilterChange,
        handlePageChange,
        handleLimitChange,
    };
}