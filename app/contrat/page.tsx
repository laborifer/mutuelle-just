'use client';

import React, { useState, useEffect } from 'react';
import { 
  PencilIcon, 
  DocumentArrowDownIcon, 
  CreditCardIcon, 
  BanknotesIcon,
  UserIcon,
  PhoneIcon,
  EnvelopeIcon,
  HomeIcon,
  IdentificationIcon,
  XMarkIcon,
  CheckIcon,
  UsersIcon,
  ClockIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  PlusCircleIcon,
  MinusCircleIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';
import { useSearchParams } from 'next/navigation';
import { type TypeDemande } from '@/types';

// Définition des objets de demande par type
const objetsDemande: Record<TypeDemande, string[]> = {
  'remboursement': ['Demande de remboursement', 'Suivi de remboursement'],
  'carte-tiers-payant': ['Demande de carte', 'Renouvellement de carte'],
  'attestation': ['Attestation de droits', 'Attestation de paiement'],
  'modification-contrat': ['Changement de RIB', 'Changement d\'adresse'],
  'resiliation': ['Résiliation du contrat'],
  'autre': ['Autre demande'],
  'Changement de situation': ['Ajout de bénéficiaire', 'Changement de RIB', 'Changement d\'adresse'],
  'Remboursement': ['Demande de remboursement', 'Suivi de remboursement'],
  'Devis': ['Devis santé', 'Devis prévoyance'],
  'Carte de mutuelle': ['Demande de carte', 'Renouvellement de carte']
};

interface Beneficiaire {
  nom: string;
  prenom: string;
  dateNaissance: string;
  lienParente: string;
  numeroSecu?: string;
}

interface ContratInfo {
  type: string;
  produit: string;
  numeroContrat: string;
  dateAdhesion: string;
  dateRadiation?: string;
  options: string[];
  beneficiaires: Beneficiaire[];
}

interface OptIns {
  notificationsEmail: boolean;
  notificationsSMS: boolean;
  newsletterEmail: boolean;
  offresEmail: boolean;
  offresSMS: boolean;
}

interface Adherent {
  nom: string;
  prenom: string;
  dateNaissance: string;
  numeroAdherent: string;
  email: string;
  telephoneFixe: string;
  telephoneMobile: string;
  adresse: {
    rue: string;
    codePostal: string;
    ville: string;
  };
  securiteSociale: {
    numero: string;
    caisse: string;
    centre: string;
  };
  contrats: ContratInfo[];
  cotisation: {
    montant: number;
    rib: {
      iban: string;
      bic: string;
    };
  };
  optins: OptIns;
}

// Données mockées pour l'exemple
const adherentData: Adherent = {
  nom: 'Dupont',
  prenom: 'Jean',
  dateNaissance: '15/03/1980',
  numeroAdherent: '123456789',
  email: 'jean.dupont@email.com',
  telephoneFixe: '0123456789',
  telephoneMobile: '0612345678',
  adresse: {
    rue: '123 rue de la Paix',
    codePostal: '75000',
    ville: 'Paris',
  },
  securiteSociale: {
    numero: '1 80 03 75 123 456 789',
    caisse: 'CPAM Paris',
    centre: 'Paris 15e',
  },
  contrats: [
    {
      type: 'Santé',
      produit: 'Just\'Essentielle',
      numeroContrat: 'SANTE-2023-001',
      dateAdhesion: '01/01/2023',
      options: ['ALD sport', 'Assistance'],
      beneficiaires: [
        {
          nom: 'Dupont',
          prenom: 'Jean',
          dateNaissance: '15/03/1980',
          lienParente: 'Adhérent principal',
          numeroSecu: '1 80 03 75 123 456 789'
        },
        {
          nom: 'Dupont',
          prenom: 'Marie',
          dateNaissance: '22/05/1982',
          lienParente: 'Conjoint',
          numeroSecu: '2 82 05 75 123 456 789'
        },
        {
          nom: 'Dupont',
          prenom: 'Lucas',
          dateNaissance: '10/07/2010',
          lienParente: 'Enfant',
          numeroSecu: '1 10 07 75 123 456 789'
        }
      ]
    },
    {
      type: 'Prévoyance',
      produit: 'Just\'Protect',
      numeroContrat: 'PREV-2023-001',
      dateAdhesion: '01/01/2023',
      options: ['Assistance'],
      beneficiaires: [
        {
          nom: 'Dupont',
          prenom: 'Jean',
          dateNaissance: '15/03/1980',
          lienParente: 'Adhérent principal',
          numeroSecu: '1 80 03 75 123 456 789'
        }
      ]
    },
    {
      type: 'Santé',
      produit: 'Just\'Vitale',
      numeroContrat: 'SANTE-2022-001',
      dateAdhesion: '01/01/2022',
      dateRadiation: '31/12/2022',
      options: ['Assistance'],
      beneficiaires: [
        {
          nom: 'Dupont',
          prenom: 'Jean',
          dateNaissance: '15/03/1980',
          lienParente: 'Adhérent principal',
          numeroSecu: '1 80 03 75 123 456 789'
        }
      ]
    }
  ],
  cotisation: {
    montant: 45.50,
    rib: {
      iban: 'FR76 1234 5678 9123 4567 8912 345',
      bic: 'BNPAFRPP',
    },
  },
  optins: {
    notificationsEmail: true,
    notificationsSMS: false,
    newsletterEmail: true,
    offresEmail: false,
    offresSMS: false,
  },
};

// Composant pour les informations avec icône
const InfoWithIcon = ({ icon: Icon, label, value }: { icon: any, label: string, value: string | React.ReactNode }) => (
  <div className="flex items-start space-x-3">
    <Icon className="h-5 w-5 text-just-pink mt-0.5" />
    <div>
      <p className="text-sm text-just-gray">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  </div>
);

// Composant pour le formulaire de modification des coordonnées
const ContactForm = ({ 
  data, 
  onSubmit, 
  onCancel 
}: { 
  data: Pick<Adherent, 'email' | 'telephoneMobile' | 'telephoneFixe' | 'adresse'>,
  onSubmit: (values: Pick<Adherent, 'email' | 'telephoneMobile' | 'telephoneFixe' | 'adresse'>) => void,
  onCancel: () => void
}) => {
  const [formData, setFormData] = useState(data);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-just-gray mb-1">Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-just-pink focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-just-gray mb-1">Téléphone mobile</label>
        <input
          type="tel"
          value={formData.telephoneMobile}
          onChange={(e) => setFormData({ ...formData, telephoneMobile: e.target.value })}
          className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-just-pink focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-just-gray mb-1">Téléphone fixe</label>
        <input
          type="tel"
          value={formData.telephoneFixe}
          onChange={(e) => setFormData({ ...formData, telephoneFixe: e.target.value })}
          className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-just-pink focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-just-gray mb-1">Adresse</label>
        <input
          type="text"
          value={formData.adresse.rue}
          onChange={(e) => setFormData({ 
            ...formData, 
            adresse: { ...formData.adresse, rue: e.target.value }
          })}
          placeholder="Rue"
          className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-just-pink focus:border-transparent mb-2"
        />
        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            value={formData.adresse.codePostal}
            onChange={(e) => setFormData({ 
              ...formData, 
              adresse: { ...formData.adresse, codePostal: e.target.value }
            })}
            placeholder="Code postal"
            className="p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-just-pink focus:border-transparent"
          />
          <input
            type="text"
            value={formData.adresse.ville}
            onChange={(e) => setFormData({ 
              ...formData, 
              adresse: { ...formData.adresse, ville: e.target.value }
            })}
            placeholder="Ville"
            className="p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-just-pink focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t">
        <button
          type="button"
          onClick={onCancel}
          className="flex items-center px-4 py-2 text-just-gray hover:text-just-pink transition-colors"
        >
          <XMarkIcon className="h-4 w-4 mr-1" />
          Annuler
        </button>
        <button
          type="submit"
          className="flex items-center px-4 py-2 bg-just-pink text-white rounded-md hover:bg-opacity-90 transition-colors"
        >
          <CheckIcon className="h-4 w-4 mr-1" />
          Enregistrer
        </button>
      </div>
    </form>
  );
};

// Composant pour la gestion des optins
const OptInsManager = ({ 
  optins, 
  onUpdate 
}: { 
  optins: OptIns,
  onUpdate: (newOptins: OptIns) => void
}) => {
  const handleToggle = (key: keyof OptIns) => {
    onUpdate({
      ...optins,
      [key]: !optins[key]
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="font-medium text-just-green mb-4">Préférences de communication</h3>
      
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-just-gray">Notifications espace adhérent</h4>
        <div className="space-y-2">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={optins.notificationsEmail}
              onChange={() => handleToggle('notificationsEmail')}
              className="h-4 w-4 text-just-pink rounded border-gray-300 focus:ring-just-pink"
            />
            <span className="text-sm">Recevoir les notifications par email</span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={optins.notificationsSMS}
              onChange={() => handleToggle('notificationsSMS')}
              className="h-4 w-4 text-just-pink rounded border-gray-300 focus:ring-just-pink"
            />
            <span className="text-sm">Recevoir les notifications par SMS</span>
          </label>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-sm font-medium text-just-gray">Newsletter et actualités</h4>
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={optins.newsletterEmail}
            onChange={() => handleToggle('newsletterEmail')}
            className="h-4 w-4 text-just-pink rounded border-gray-300 focus:ring-just-pink"
          />
          <span className="text-sm">Recevoir la newsletter mensuelle par email</span>
        </label>
      </div>

      <div className="space-y-3">
        <h4 className="text-sm font-medium text-just-gray">Offres et promotions</h4>
        <div className="space-y-2">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={optins.offresEmail}
              onChange={() => handleToggle('offresEmail')}
              className="h-4 w-4 text-just-pink rounded border-gray-300 focus:ring-just-pink"
            />
            <span className="text-sm">Recevoir les offres par email</span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={optins.offresSMS}
              onChange={() => handleToggle('offresSMS')}
              className="h-4 w-4 text-just-pink rounded border-gray-300 focus:ring-just-pink"
            />
            <span className="text-sm">Recevoir les offres par SMS</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default function ContratPage() {
  const searchParams = useSearchParams();
  const [selectedBeneficiaire, setSelectedBeneficiaire] = useState('');
  const [selectedType, setSelectedType] = useState<TypeDemande | ''>('');
  const [selectedObjet, setSelectedObjet] = useState('');
  const [message, setMessage] = useState('');
  const [fichiers, setFichiers] = useState<File[]>([]);
  const [showFAQ, setShowFAQ] = useState(false);
  const [activeTab, setActiveTab] = useState('infos');
  const [selectedAgence, setSelectedAgence] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [showSimulateur, setShowSimulateur] = useState(false);
  const [expandedContracts, setExpandedContracts] = useState<(number | string)[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [contactData, setContactData] = useState({
    email: adherentData.email,
    telephoneMobile: adherentData.telephoneMobile,
    telephoneFixe: adherentData.telephoneFixe,
    adresse: adherentData.adresse,
  });
  const [optinsData, setOptinsData] = useState(adherentData.optins);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['demande', 'suivi', 'rdv'].includes(tab)) {
      setActiveTab(tab);
    }

    // Initialisation des champs du formulaire avec les paramètres URL
    const typeDemande = searchParams.get('typeDemande');
    const objetDemande = searchParams.get('objetDemande');
    const numeroContrat = searchParams.get('numeroContrat');
    const produit = searchParams.get('produit');

    // Mapping des valeurs d'URL vers les valeurs du formulaire
    const typeMapping: Record<string, TypeDemande> = {
      'changement-situation': 'Changement de situation',
      'remboursement': 'Remboursement',
      'devis': 'Devis',
      'carte-mutuelle': 'Carte de mutuelle'
    };

    const objetMapping: Record<string, string> = {
      'ajout-beneficiaire': 'Ajout de bénéficiaire',
      'changement-rib': 'Changement de RIB',
      'changement-adresse': 'Changement d\'adresse'
    };

    if (typeDemande && typeMapping[typeDemande]) {
      const mappedType = typeMapping[typeDemande];
      setSelectedType(mappedType);
      
      if (objetDemande && objetMapping[objetDemande] && objetsDemande[mappedType]?.includes(objetMapping[objetDemande])) {
        setSelectedObjet(objetMapping[objetDemande]);
      }
    }

    // Si on a un numéro de contrat et un produit, on peut pré-remplir le message
    if (numeroContrat && produit) {
      setMessage(`Demande concernant le contrat n°${numeroContrat} - ${produit}`);
    }
  }, [searchParams]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // ... existing code ...
  };

  const handleSubmit = (values: Pick<Adherent, 'email' | 'telephoneMobile' | 'telephoneFixe' | 'adresse'>) => {
    setContactData(values);
    setIsEditing(false);
  };

  const toggleContrat = (index: number | string) => {
    setExpandedContracts(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête avec informations essentielles */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-2xl font-semibold text-just-green">Mon contrat</h1>
              <p className="text-just-gray mt-1">N° adhérent : {adherentData.numeroAdherent}</p>
            </div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <a href="/documents/carte-mutuelle.pdf" className="flex items-center text-just-pink hover:text-opacity-80">
                <CreditCardIcon className="h-5 w-5 mr-2" />
                <span>Ma carte mutuelle</span>
              </a>
              <button className="flex items-center bg-just-pink text-white px-4 py-2 rounded-md hover:bg-opacity-90">
                <BanknotesIcon className="h-5 w-5 mr-2" />
                <span>Payer ma cotisation</span>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation par onglets */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="border-b">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('infos')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'infos'
                    ? 'border-just-pink text-just-pink'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Informations personnelles
              </button>
              <button
                onClick={() => setActiveTab('contrats')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'contrats'
                    ? 'border-just-pink text-just-pink'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Mes contrats
              </button>
              <button
                onClick={() => setActiveTab('cotisation')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'cotisation'
                    ? 'border-just-pink text-just-pink'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Mes cotisations
              </button>
            </nav>
          </div>

          {/* Contenu des onglets */}
          <div className="p-6">
            {activeTab === 'infos' && (
              <div className="space-y-8">
                {/* Première ligne : Identité et Sécurité sociale */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Identité */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-medium text-just-green mb-4">Identité</h3>
                    <div className="space-y-4">
                      <InfoWithIcon 
                        icon={UserIcon}
                        label="Nom et prénom"
                        value={`${adherentData.nom} ${adherentData.prenom}`}
                      />
                      <InfoWithIcon 
                        icon={IdentificationIcon}
                        label="N° adhérent"
                        value={adherentData.numeroAdherent}
                      />
                    </div>
                  </div>

                  {/* Sécurité sociale */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-medium text-just-green mb-4">Sécurité sociale</h3>
                    <div className="space-y-4">
                      <InfoWithIcon 
                        icon={IdentificationIcon}
                        label="Numéro de sécurité sociale"
                        value={adherentData.securiteSociale.numero}
                      />
                      <InfoWithIcon 
                        icon={HomeIcon}
                        label="Caisse et centre"
                        value={
                          <div>
                            <div>{adherentData.securiteSociale.caisse}</div>
                            <div className="text-just-gray">{adherentData.securiteSociale.centre}</div>
                          </div>
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* Deuxième ligne : Contact et Préférences */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Contact */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium text-just-green">Contact</h3>
                      {!isEditing && (
                        <button 
                          onClick={() => setIsEditing(true)}
                          className="flex items-center text-just-pink hover:text-opacity-80 text-sm"
                        >
                          <PencilIcon className="h-4 w-4 mr-1" />
                          Modifier
                        </button>
                      )}
                    </div>
                    {isEditing ? (
                      <ContactForm
                        data={contactData}
                        onSubmit={handleSubmit}
                        onCancel={() => setIsEditing(false)}
                      />
                    ) : (
                      <div className="space-y-4">
                        <InfoWithIcon 
                          icon={EnvelopeIcon}
                          label="Email"
                          value={contactData.email}
                        />
                        <InfoWithIcon 
                          icon={PhoneIcon}
                          label="Téléphone"
                          value={
                            <div className="space-y-1">
                              <div>{contactData.telephoneMobile} (mobile)</div>
                              {contactData.telephoneFixe && (
                                <div className="text-just-gray">{contactData.telephoneFixe} (fixe)</div>
                              )}
                            </div>
                          }
                        />
                        <InfoWithIcon 
                          icon={HomeIcon}
                          label="Adresse"
                          value={
                            <>
                              {contactData.adresse.rue}<br />
                              {contactData.adresse.codePostal} {contactData.adresse.ville}
                            </>
                          }
                        />
                      </div>
                    )}
                  </div>

                  {/* Préférences de communication */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <OptInsManager
                      optins={optinsData}
                      onUpdate={(newOptins) => setOptinsData(newOptins)}
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'contrats' && (
              <div className="space-y-8">
                {/* Contrats actifs */}
                {adherentData.contrats
                  .filter(contrat => !contrat.dateRadiation)
                  .map((contrat, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg overflow-hidden">
                      {/* En-tête du contrat cliquable */}
                      <button 
                        onClick={() => toggleContrat(index)}
                        className="w-full bg-white border-b border-gray-100 p-4 text-left hover:bg-gray-50 transition-colors group"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center space-x-2">
                              <ShieldCheckIcon className="h-6 w-6 text-just-green" />
                              <div>
                                <h3 className="text-lg font-medium group-hover:text-just-pink transition-colors">
                                  {contrat.type} - {contrat.produit}
                                </h3>
                                <p className="text-xs text-just-gray mt-0.5">Contrat n° {contrat.numeroContrat}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-just-gray">
                              <div className="flex items-center">
                                <ClockIcon className="h-4 w-4 mr-1" />
                                Date d'adhésion : {contrat.dateAdhesion}
                              </div>
                              <div className="flex items-center">
                                <UsersIcon className="h-4 w-4 mr-1" />
                                {contrat.beneficiaires.length} bénéficiaire{contrat.beneficiaires.length > 1 ? 's' : ''}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 text-just-gray group-hover:text-just-pink transition-colors">
                            <span className="text-sm hidden md:inline">{expandedContracts.includes(index) ? 'Réduire' : 'Voir détails'}</span>
                            <div className={`transform transition-transform duration-200 ${expandedContracts.includes(index) ? 'rotate-180' : ''}`}>
                              <ChevronDownIcon className="h-5 w-5" />
                            </div>
                          </div>
                        </div>
                      </button>

                      {/* Contenu du contrat */}
                      {expandedContracts.includes(index) && (
                        <div className="p-4 space-y-6">
                          {/* Actions rapides */}
                          <div className="flex flex-wrap gap-4">
                            <button className="flex items-center px-4 py-2 bg-white rounded-md border border-gray-200 text-just-pink hover:bg-gray-50 transition-colors">
                              <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
                              Grille de garanties
                            </button>
                            <button className="flex items-center px-4 py-2 bg-white rounded-md border border-gray-200 text-just-pink hover:bg-gray-50 transition-colors">
                              <DocumentTextIcon className="h-5 w-5 mr-2" />
                              IPID
                            </button>
                            <button className="flex items-center px-4 py-2 bg-white rounded-md border border-gray-200 text-just-pink hover:bg-gray-50 transition-colors">
                              <DocumentTextIcon className="h-5 w-5 mr-2" />
                              Notice d'assistance
                            </button>
                            <button className="flex items-center px-4 py-2 bg-white rounded-md border border-gray-200 text-just-pink hover:bg-gray-50 transition-colors">
                              <DocumentTextIcon className="h-5 w-5 mr-2" />
                              Règlement mutualiste
                            </button>
                          </div>

                          {/* Options */}
                          <div className="bg-white rounded-md p-4 border border-gray-100">
                            <h4 className="font-medium text-sm mb-3 flex items-center">
                              <ShieldCheckIcon className="h-4 w-4 text-just-green mr-2" />
                              Options incluses
                            </h4>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {contrat.options.map((option, idx) => (
                                <li key={idx} className="flex items-center text-sm text-just-gray">
                                  <CheckIcon className="h-4 w-4 text-just-pink mr-2" />
                                  {option}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Bénéficiaires */}
                          <div className="bg-white rounded-md p-4 border border-gray-100">
                            <div className="flex justify-between items-center mb-3">
                              <h4 className="font-medium text-sm flex items-center">
                                <UsersIcon className="h-4 w-4 text-just-green mr-2" />
                                Bénéficiaires
                              </h4>
                              <a 
                                href={`/contact?typeDemande=changement-situation&objetDemande=ajout-beneficiaire&numeroContrat=${contrat.numeroContrat}&produit=${encodeURIComponent(contrat.produit)}`}
                                className="flex items-center text-just-pink hover:text-opacity-80 text-sm"
                              >
                                <PlusCircleIcon className="h-4 w-4 mr-1" />
                                Ajouter un bénéficiaire
                              </a>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                              {contrat.beneficiaires.map((beneficiaire, idx) => (
                                <div key={idx} className="flex justify-between items-start p-3 bg-gray-50 rounded-md">
                                  <div className="flex items-start space-x-3 flex-1">
                                    <UserIcon className="h-5 w-5 text-just-pink mt-0.5 flex-shrink-0" />
                                    <div className="min-w-0 flex-1">
                                      <p className="font-medium truncate">{beneficiaire.prenom} {beneficiaire.nom}</p>
                                      <p className="text-sm text-just-gray">
                                        {beneficiaire.lienParente} • Né(e) le {beneficiaire.dateNaissance}
                                      </p>
                                      {beneficiaire.numeroSecu && (
                                        <p className="text-sm text-just-gray mt-1 flex items-center">
                                          <IdentificationIcon className="h-4 w-4 mr-1 flex-shrink-0" />
                                          <span className="truncate">{beneficiaire.numeroSecu}</span>
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                  {beneficiaire.lienParente !== 'Adhérent principal' && (
                                    <button 
                                      className="text-gray-400 hover:text-red-600 transition-colors ml-2 flex-shrink-0 rounded-full p-1 hover:bg-red-50"
                                      title="Retirer le bénéficiaire"
                                    >
                                      <MinusCircleIcon className="h-5 w-5" />
                                      <span className="sr-only">Retirer le bénéficiaire</span>
                                    </button>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                          {/* Actions sur le contrat */}
                          <div className="mt-6 pt-6 border-t border-gray-200 flex items-center space-x-6">
                            <a 
                              href={`/contact?typeDemande=changement-situation&objetDemande=changement-contrat&numeroContrat=${contrat.numeroContrat}&produit=${encodeURIComponent(contrat.produit)}`}
                              className="text-just-pink hover:text-just-pink/80 text-sm flex items-center"
                            >
                              <PencilIcon className="h-4 w-4 mr-1" />
                              Modifier mon contrat
                            </a>
                            <button className="text-red-600 hover:text-red-700 text-sm flex items-center">
                              <XMarkIcon className="h-4 w-4 mr-1" />
                              Résilier mon contrat
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                
                {/* Contrats radiés */}
                {adherentData.contrats.some(contrat => contrat.dateRadiation) && (
                  <div className="mt-8">
                    <h3 className="text-just-gray font-medium mb-4">Contrats radiés</h3>
                    {adherentData.contrats
                      .filter(contrat => contrat.dateRadiation)
                      .map((contrat, index) => (
                        <div key={`radiated-${index}`} className="bg-gray-50 rounded-lg overflow-hidden opacity-75">
                          <button 
                            onClick={() => toggleContrat(`radiated-${index}`)}
                            className="w-full bg-white border-b border-gray-100 p-4 text-left hover:bg-gray-50 transition-colors group"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="flex items-center space-x-2">
                                  <ShieldCheckIcon className="h-6 w-6 text-gray-400" />
                                  <div>
                                    <h3 className="text-lg font-medium text-gray-500 group-hover:text-just-pink transition-colors">
                                      {contrat.type} - {contrat.produit}
                                    </h3>
                                    <p className="text-xs text-gray-400 mt-0.5">Contrat n° {contrat.numeroContrat}</p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-400">
                                  <div className="flex items-center">
                                    <ClockIcon className="h-4 w-4 mr-1" />
                                    Radié le {contrat.dateRadiation}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2 text-gray-400 group-hover:text-just-pink transition-colors">
                                <span className="text-sm hidden md:inline">{expandedContracts.includes(`radiated-${index}`) ? 'Réduire' : 'Voir détails'}</span>
                                <div className={`transform transition-transform duration-200 ${expandedContracts.includes(`radiated-${index}`) ? 'rotate-180' : ''}`}>
                                  <ChevronDownIcon className="h-5 w-5" />
                                </div>
                              </div>
                            </div>
                          </button>

                          {expandedContracts.includes(`radiated-${index}`) && (
                            <div className="p-4 space-y-6">
                              <div className="flex flex-wrap gap-4">
                                <button className="flex items-center px-4 py-2 bg-white rounded-md border border-gray-200 text-gray-400 hover:bg-gray-50 transition-colors">
                                  <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
                                  Grille de garanties
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'cotisation' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="mb-6">
                    <h3 className="font-medium mb-2">Montant mensuel</h3>
                    <p className="text-2xl font-semibold text-just-pink">{adherentData.cotisation.montant.toFixed(2)} €</p>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Coordonnées bancaires</h3>
                    <p className="text-sm mb-1"><span className="font-medium">IBAN :</span> {adherentData.cotisation.rib.iban}</p>
                    <p className="text-sm"><span className="font-medium">BIC :</span> {adherentData.cotisation.rib.bic}</p>
                    <button className="text-just-pink hover:text-opacity-80 text-sm mt-2">
                      Modifier mon RIB
                    </button>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium mb-4">Documents et actions</h3>
                  <div className="space-y-4">
                    <a 
                      href="/documents/echeancier-2024.pdf" 
                      download="echeancier-2024.pdf"
                      className="flex items-center text-just-pink hover:text-opacity-80"
                    >
                      <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
                      Télécharger mon échéancier
                    </a>
                    
                    <button className="w-full flex items-center justify-center bg-just-pink text-white px-4 py-2 rounded-md hover:bg-opacity-90">
                      <BanknotesIcon className="h-5 w-5 mr-2" />
                      Payer ma cotisation en ligne
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 