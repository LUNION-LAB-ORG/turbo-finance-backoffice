"use client";

// hooks/useInvestissementList.ts
import { useMemo, useCallback } from "react";
import { useQueryStates } from 'nuqs';
import { investissementFiltersClient } from '../filters/investissement.filter';
import { IInvestissement, IInvestissementParams } from '../types/revenus.types';
import { useInvestissementListQuery } from "../queries/investissement/investissement-list.query";

export interface IUseInvestissementListProps {
    initialData?: IInvestissement[];
}

export function useInvestissementList({ initialData = [] }: IUseInvestissementListProps = {}) {
    // Gestion des paramètres d'URL via Nuqs
    const [filters, setFilters] = useQueryStates(investissementFiltersClient.filter, investissementFiltersClient.option);

    // Construction des paramètres de recherche
    const currentSearchParams: IInvestissementParams = useMemo(() => {
        const params: IInvestissementParams = {
            page: filters.page,
            limit: filters.limit,
        };
        
        // Ajouter les paramètres de filtre seulement s'ils ne sont pas vides
        if (filters.nomInvestisseur) {
            params.nomInvestisseur = filters.nomInvestisseur;
        }
        
        if (filters.dateInvestissement) {
            params.dateInvestissement = filters.dateInvestissement;
        }
        
        if (filters.deadline) {
            params.deadline = filters.deadline;
        }
        
        if (filters.montant && filters.montant > 0) {
            params.montant = filters.montant;
        }
        
        return params;
    }, [filters]);

    // Récupération des données via la query
    const { data, isLoading, isError, error, isFetching } = useInvestissementListQuery(currentSearchParams);

    const investissements = data || initialData;

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
        investissements,
        isLoading: isLoading || isFetching,
        isError,
        error,
        filters,
        handleFilterChange,
        handlePageChange,
        handleLimitChange,
    };
}