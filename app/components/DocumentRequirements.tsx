import React from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

interface DocumentRequirement {
  title: string;
  documents: string[];
}

const documentRequirements: Record<string, DocumentRequirement> = {
  'consultation': {
    title: 'Consultation médicale',
    documents: ['Facture acquittée du praticien']
  },
  'pharmacie': {
    title: 'Pharmacie',
    documents: ['Facture détaillée', 'Ordonnance']
  },
  'dentaire': {
    title: 'Soins dentaires',
    documents: ['Facture détaillée du praticien']
  },
  'devis-dentaire': {
    title: 'Devis dentaire',
    documents: ['Devis détaillé du praticien avec codes CCAM']
  },
  'optique': {
    title: 'Optique',
    documents: ['Facture détaillée', 'Ordonnance de moins de 3 ans']
  },
  'devis-optique': {
    title: 'Devis optique',
    documents: ['Devis détaillé avec correction et options']
  },
  'hospitalisation': {
    title: 'Hospitalisation',
    documents: ['Bulletin de situation', 'Facture détaillée']
  },
  'medecines-douces': {
    title: 'Médecines douces',
    documents: ['Facture détaillée avec cachet du praticien']
  },
  'appareillage': {
    title: 'Appareillage',
    documents: ['Facture détaillée', 'Prescription médicale']
  },
  'devis-auditif': {
    title: 'Devis appareillage auditif',
    documents: ['Devis détaillé du fournisseur']
  },
  'rib': {
    title: 'Changement de RIB',
    documents: ['Nouveau RIB au format IBAN']
  },
  'beneficiaire': {
    title: 'Ajout de bénéficiaire',
    documents: ['Livret de famille ou acte de naissance']
  },
  'adresse': {
    title: 'Changement d\'adresse',
    documents: ['Justificatif de domicile de moins de 3 mois']
  },
  'carte-mutuelle': {
    title: 'Carte de mutuelle',
    documents: ['Pièce d\'identité en cours de validité']
  }
};

interface DocumentRequirementsProps {
  type: string;
}

export default function DocumentRequirements({ type }: DocumentRequirementsProps) {
  const requirement = documentRequirements[type];

  if (!requirement) return null;

  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <div className="flex items-start space-x-3">
        <InformationCircleIcon className="h-5 w-5 text-just-green flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-medium text-just-green mb-2">
            Documents requis pour : {requirement.title}
          </h4>
          <ul className="space-y-2">
            {requirement.documents.map((doc, index) => (
              <li key={index} className="flex items-center text-sm text-just-gray">
                <span className="h-1.5 w-1.5 rounded-full bg-just-pink mr-2" />
                {doc}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
} 