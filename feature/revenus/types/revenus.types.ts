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