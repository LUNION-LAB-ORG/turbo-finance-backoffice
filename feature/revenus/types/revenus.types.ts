export interface PaiementPartiel {
    id: number;
    montant: number;
    date: Date;
    preuvePaiement?: string;
}


export interface Facture {
    id: number;
    partenaire: string;
    montant: number;
    dateEcheance: Date;
    statut: "En attente" | "Partiellement payé" | "Payé";
    paiements: PaiementPartiel[];
    montantPaye: number;
}

export interface Livraison {
    id: number;
    reference: string;
    date: string;
    nomLivreur: string;
    coutLivraison: string;
    coutCommande: string;
    commission: string;
}

export interface Investissement {
    id: number;
    date_pret: string;
    investisseur: string;
    montant_pret: string;
    echeance: string;
}

export interface CommissionFixe {
    id: number,
    date: string,
    restaurant: string,
    localisation: string,
    commission: string,
}

export interface CommissionVariable {
    id: number,
    date: string,
    restaurant: string,
    localisation: string,
    montant_commande: string,
    commission: string,
}
