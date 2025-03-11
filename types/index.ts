export type TypeDemande = 
  | 'remboursement'
  | 'carte-tiers-payant'
  | 'attestation'
  | 'modification-contrat'
  | 'resiliation'
  | 'autre'
  | 'Changement de situation'
  | 'Remboursement'
  | 'Devis'
  | 'Carte de mutuelle';

export type ObjetDemande = {
  id: string;
  label: string;
  type: TypeDemande;
  requiresFile?: boolean;
};

export type Beneficiaire = {
  id: string;
  nom: string;
  prenom: string;
  dateNaissance: string;
  lienParente: string;
}; 