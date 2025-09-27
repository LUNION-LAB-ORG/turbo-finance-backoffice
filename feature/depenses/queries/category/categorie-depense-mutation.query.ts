"use client";

import {
    useMutation,
} from '@tanstack/react-query';
import { useInvalidateDepenseQuery } from './index.query';
import { toast } from "sonner";
import { processAndValidateFormData } from "ak-zod-form-kit";
import { ajouterCategorieDepenseAction, modifierCategorieDepenseAction, supprimerCategorieDepenseAction } from '../../actions/categorie-depense.action';
import { CategorieDepenseCreateDTO, CategorieDepenseUpdateDTO } from '../../schemas/categorie-depense.schema';
import { CategorieDepenseCreateSchema, CategorieDepenseUpdateSchema } from '../../schemas/categorie-depense.schema';

export const useAjouterCategorieDepenseMutation = () => {
    const invalidateDepenseQuery = useInvalidateDepenseQuery()

    return useMutation({
        mutationFn: async (data: CategorieDepenseCreateDTO) => {
            // Validation des données
            const validation = processAndValidateFormData(CategorieDepenseCreateSchema, data,
                {
                    outputFormat: "object",
                })

            if (!validation.success) {
                throw new Error(validation.errorsInString || "Une erreur est survenue lors de la validation des données.");
            }

            // Appel de l'API avec l'action
            const result = await ajouterCategorieDepenseAction(validation.data as CategorieDepenseCreateDTO);

            if (!result.success) {
                throw new Error(result.error || "Erreur lors de l'ajout de la dépense");
            }

            return result.data!;
        },
        onSuccess: async () => {
            await invalidateDepenseQuery();
            toast.success("Depense ajoutée avec succès");
        },

        onError: async (error) => {
            toast.error("Erreur lors de l'ajout de la dépense:", {
                description: error.message,
            });
        },
    });
};

export const useModifierCategorieDepenseMutation = () => {
    const invalidateDepenseQuery = useInvalidateDepenseQuery()
    return useMutation({
        mutationFn: async ({ id, data }: { id: string, data: CategorieDepenseUpdateDTO }) => {
            // Validation des données
            const validation = processAndValidateFormData(CategorieDepenseUpdateSchema, data,
                {
                    outputFormat: "object"

                })
            if (!validation.success) {
                throw new Error(validation.errorsInString || "Une erreur est survenue lors de la validation des données.");
            }

            const result = await modifierCategorieDepenseAction(id, validation.data as CategorieDepenseUpdateDTO)
            if (!result.success) {
                throw new Error(result.error || "Erreur lors de la modification de la dépense");
            }
            return result.data!;
        },
        onSuccess: async () => {
            await invalidateDepenseQuery();
            toast.success("Depense modifiée avec succès");
        },
        onError: async (error) => {
            toast.error("Erreur modification depense:", {
                description: error.message,
            });
        },
    });
};

export const useSupprimerDepenseMutation = () => {
    const invalidateDepenseQuery = useInvalidateDepenseQuery()
    return useMutation({
        mutationFn: async (id: string) => {
            if (!id) {
                throw new Error("L'identifiant de la dépense est requis.");
            }
            const result = await supprimerCategorieDepenseAction(id)
            if (!result.success) {
                throw new Error(result.error || "Erreur lors de la suppression de la dépense");
            }
            return result.data!;
        },
        onSuccess: async () => {
            await invalidateDepenseQuery();
            toast.success("Depense supprimée avec succès");
        },
        onError: async (error) => {
            toast.error("Erreur suppression depense:", {
                description: error.message,
            });
        },
    });
};