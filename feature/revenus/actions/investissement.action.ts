"use server";

import { ActionResponse } from "@/types";
import { handleServerActionError } from "@/utils/handleServerActionError";
import { InvestissementCreateDTO, InvestissementUpdateDTO } from "../schemas/investissement.schema";
import { IInvestissement, IInvestissementParams } from "../types/revenus.types";
import { investissementAPI } from "../apis/investissement.api";

export const obtenirTousInvestissementsAction = async (params: IInvestissementParams): Promise<ActionResponse<IInvestissement[]>> => {
    try {
        const response = await investissementAPI.obtenirTousInvestissements(params);
        return {
            success: true,
            data: response,
            message: "Investissements obtenues avec succès",
        }
    } catch (error) {
        return handleServerActionError(error, "Erreur lors de la récupération des investissements");
    }
}
export const obtenirInvestissementAction = async (id: string): Promise<ActionResponse<IInvestissement>> => {
    try {
        const response = await investissementAPI.obtenirInvestissement(id);
        return {
            success: true,
            data: response,
            message: "Investissements obtenues avec succès",
        }
    } catch (error) {
        return handleServerActionError(error, "Erreur lors de la récupération des investissements");
    }
}

export const ajouterInvestissementAction = async (data: InvestissementCreateDTO): Promise<ActionResponse<IInvestissement>> => {
    try {
        const response = await investissementAPI.ajouterInvestissement(data);
        return {
            success: true,
            data: response,
            message: "Investissement ajoutée avec succès",
        }
    } catch (error) {
        return handleServerActionError(error, "Erreur lors de l'ajout de l'investissement");
    }
}

export const modifierInvestissementAction = async (id: string, data: InvestissementUpdateDTO): Promise<ActionResponse<IInvestissement>> => {
    try {
        const response = await investissementAPI.modifierInvestissement(id, data);
        return {
            success: true,
            data: response,
            message: "Investissement modifiée avec succès",
        }
    } catch (error) {
        return handleServerActionError(error, "Erreur lors de la modification de l'investissement");
    }
}

export const supprimerInvestissementAction = async (id: string): Promise<ActionResponse<IInvestissement>> => {
    try {
        const data = await investissementAPI.supprimerInvestissement(id);
        return {
            success: true,
            data: data,
            message: "Investissement supprimée avec succès",
        }
    } catch (error) {
        return handleServerActionError(error, "Erreur lors de la suppression de la dépense");
    }
}
