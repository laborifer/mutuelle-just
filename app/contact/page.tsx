'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  CalendarIcon, 
  PaperAirplaneIcon, 
  ClockIcon, 
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  CalculatorIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';
import DocumentRequirements from '../components/DocumentRequirements';

interface Beneficiaire {
  id: string;
  nom: string;
}

interface Message {
  id: string;
  date: string;
  auteur: string;
  contenu: string;
  type: 'adherent' | 'mutuelle';
}

interface Demande {
  id: string;
  numero: string;
  date: string;
  type: string;
  objet: string;
  statut: 'En cours' | 'Terminé';
  beneficiaire: string;
  messages: Message[];
  fichiers: string[];
}

interface FAQ {
  question: string;
  reponse: string;
  type: string;
}

// Données fictives
const mockBeneficiaires: Beneficiaire[] = [
  { id: '1', nom: 'Jean Dupont' },
  { id: '2', nom: 'Marie Dupont' },
  { id: '3', nom: 'Lucas Dupont' }
];

const typeMapping: Record<string, string> = {
  'Consultation': 'consultation',
  'Pharmacie': 'pharmacie',
  'Dentaire': 'dentaire',
  'Optique': 'optique',
  'Hospitalisation': 'hospitalisation',
  'Médecines douces': 'medecines-douces',
  'Appareillage': 'appareillage',
  'Devis dentaire': 'devis-dentaire',
  'Devis optique': 'devis-optique',
  'Devis auditif': 'devis-auditif',
  'Changement de RIB': 'rib',
  'Ajout de bénéficiaire': 'beneficiaire',
  'Changement d\'adresse': 'adresse',
  'Demande de carte': 'carte-mutuelle'
};

type TypeDemande = 'Remboursement' | 'Devis' | 'Changement de situation' | 'Carte de mutuelle';

const typesDemande: TypeDemande[] = [
  'Remboursement',
  'Devis',
  'Changement de situation',
  'Carte de mutuelle'
];

const objetsDemande: Record<TypeDemande, string[]> = {
  'Remboursement': [
    'Consultation',
    'Pharmacie',
    'Dentaire',
    'Optique',
    'Hospitalisation',
    'Médecines douces',
    'Appareillage'
  ],
  'Devis': [
    'Devis dentaire',
    'Devis optique',
    'Devis auditif'
  ],
  'Changement de situation': [
    'Changement de RIB',
    'Ajout de bénéficiaire',
    'Changement d\'adresse'
  ],
  'Carte de mutuelle': [
    'Demande de carte'
  ]
};

const mockFAQ: FAQ[] = [
  {
    type: 'Remboursement',
    question: 'Quel est le délai moyen de remboursement ?',
    reponse: 'Les remboursements sont effectués sous 48h après réception des informations de la Sécurité sociale.'
  },
  {
    type: 'Carte de tiers payant',
    question: 'Comment obtenir une nouvelle carte de tiers payant ?',
    reponse: 'Vous pouvez demander une nouvelle carte directement depuis votre espace adhérent ou contacter notre service client.'
  },
  {
    type: 'Changement de situation',
    question: 'Quels justificatifs fournir pour un changement d\'adresse ?',
    reponse: 'Un justificatif de domicile de moins de 3 mois (facture d\'électricité, de gaz, d\'eau ou de téléphone).'
  }
];

const mockDemandes: Demande[] = [
  {
    id: '1',
    numero: 'DEM-2024-001',
    date: '2024-03-15',
    type: 'Remboursement',
    objet: 'Consultation',
    statut: 'En cours',
    beneficiaire: 'Jean Dupont',
    messages: [
      {
        id: '1',
        date: '2024-03-15T10:30:00',
        auteur: 'Jean Dupont',
        contenu: 'Bonjour, je n\'ai toujours pas reçu le remboursement de ma consultation du 1er mars.',
        type: 'adherent'
      },
      {
        id: '2',
        date: '2024-03-15T14:20:00',
        auteur: 'Service Adhérents',
        contenu: 'Bonjour, nous avons bien reçu votre demande. Nous sommes en attente des informations de la Sécurité sociale. Le remboursement sera effectué dès réception.',
        type: 'mutuelle'
      }
    ],
    fichiers: ['feuille-de-soins.pdf']
  },
  {
    id: '2',
    numero: 'DEM-2024-002',
    date: '2024-03-10',
    type: 'Carte de tiers payant',
    objet: 'Demande de carte',
    statut: 'Terminé',
    beneficiaire: 'Marie Dupont',
    messages: [
      {
        id: '3',
        date: '2024-03-10T09:15:00',
        auteur: 'Marie Dupont',
        contenu: 'Je souhaiterais obtenir une nouvelle carte de tiers payant.',
        type: 'adherent'
      },
      {
        id: '4',
        date: '2024-03-10T11:30:00',
        auteur: 'Service Adhérents',
        contenu: 'Votre demande a été traitée. Votre nouvelle carte sera envoyée sous 5 jours ouvrés.',
        type: 'mutuelle'
      }
    ],
    fichiers: []
  }
];

const mockAgences = [
  {
    id: '1',
    nom: 'Agence de Valenciennes',
    adresse: '12 Place d\'Armes, 59300 Valenciennes'
  },
  {
    id: '2',
    nom: 'Agence de Lille',
    adresse: '45 Rue Nationale, 59000 Lille'
  }
];

const urlToTypeMapping: Record<string, TypeDemande> = {
  'changement-situation': 'Changement de situation',
  'remboursement': 'Remboursement',
  'devis': 'Devis',
  'carte-mutuelle': 'Carte de mutuelle'
};

const urlToObjetMapping: Record<string, string> = {
  'ajout-beneficiaire': 'Ajout de bénéficiaire',
  'changement-rib': 'Changement de RIB',
  'changement-adresse': 'Changement d\'adresse'
};

export default function ContactPage() {
  const searchParams = useSearchParams();
  const [selectedBeneficiaire, setSelectedBeneficiaire] = useState('');
  const [selectedType, setSelectedType] = useState<TypeDemande | ''>('');
  const [selectedObjet, setSelectedObjet] = useState('');
  const [message, setMessage] = useState('');
  const [fichiers, setFichiers] = useState<File[]>([]);
  const [showFAQ, setShowFAQ] = useState(false);
  const [activeTab, setActiveTab] = useState('demande');
  const [selectedAgence, setSelectedAgence] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [showSimulateur, setShowSimulateur] = useState(false);
  const [expandedDemande, setExpandedDemande] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');

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

    if (typeDemande) {
      const mappedType = urlToTypeMapping[typeDemande];
      if (mappedType && typesDemande.includes(mappedType)) {
        setSelectedType(mappedType);
        if (objetDemande) {
          const mappedObjet = urlToObjetMapping[objetDemande];
          if (mappedObjet && objetsDemande[mappedType]?.includes(mappedObjet)) {
            setSelectedObjet(mappedObjet);
          }
        }
      }
    }

    // Si on a un numéro de contrat et un produit, on peut pré-remplir le message
    if (numeroContrat && produit) {
      setMessage(`Demande concernant le contrat n°${numeroContrat} - ${produit}`);
    }
  }, [searchParams]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFichiers(Array.from(e.target.files));
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value as TypeDemande;
    setSelectedType(newType);
    // Réinitialiser l'objet de la demande lors du changement de type
    setSelectedObjet('');
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation par onglets */}
        <div className="flex space-x-1 rounded-xl bg-gray-100 p-1 mb-8">
          <button
            onClick={() => setActiveTab('demande')}
            className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
              activeTab === 'demande'
                ? 'bg-white text-just-pink shadow'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <ChatBubbleLeftRightIcon className="h-5 w-5 mr-2" />
            Faire une demande
          </button>
          <button
            onClick={() => setActiveTab('suivi')}
            className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
              activeTab === 'suivi'
                ? 'bg-white text-just-pink shadow'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <ClockIcon className="h-5 w-5 mr-2" />
            Suivi des demandes
          </button>
          <button
            onClick={() => setActiveTab('rdv')}
            className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
              activeTab === 'rdv'
                ? 'bg-white text-just-pink shadow'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <CalendarIcon className="h-5 w-5 mr-2" />
            Prendre rendez-vous
          </button>
        </div>

        {/* Contenu des onglets */}
        {activeTab === 'demande' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-just-green mb-6">
              Faire une demande
            </h2>

            {/* Formulaire de demande */}
            <div className="space-y-6">
              {/* Sélection du bénéficiaire */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bénéficiaire concerné
                </label>
                <select
                  value={selectedBeneficiaire}
                  onChange={(e) => setSelectedBeneficiaire(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-just-pink focus:border-just-pink"
                >
                  <option value="">Sélectionnez un bénéficiaire</option>
                  {mockBeneficiaires.map((ben) => (
                    <option key={ben.id} value={ben.id}>
                      {ben.nom}
                    </option>
                  ))}
                </select>
              </div>

              {/* Type de demande */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type de demande
                </label>
                <select
                  value={selectedType}
                  onChange={handleTypeChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-just-pink focus:border-just-pink"
                >
                  <option value="">Sélectionnez un type</option>
                  {typesDemande.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Objet de la demande */}
              {selectedType && objetsDemande[selectedType] && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Objet de la demande
                  </label>
                  <select
                    value={selectedObjet}
                    onChange={(e) => setSelectedObjet(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-just-pink focus:border-just-pink"
                  >
                    <option value="">Sélectionnez un objet</option>
                    {objetsDemande[selectedType].map((objet) => (
                      <option key={objet} value={objet}>
                        {objet}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* FAQ contextuelle */}
              {selectedType && mockFAQ.filter((item) => item.type === selectedType).length > 0 && (
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-medium text-just-green mb-4">
                    Questions fréquentes sur {selectedType}
                  </h3>
                  <div className="space-y-4">
                    {mockFAQ.filter((item) => item.type === selectedType).map((item, index) => (
                      <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
                        <p className="font-medium text-just-pink mb-2">{item.question}</p>
                        <p className="text-sm text-gray-600">{item.reponse}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Votre message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-just-pink focus:border-just-pink"
                  placeholder="Décrivez votre demande..."
                />
              </div>

              {/* Upload de fichiers */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Documents justificatifs
                </label>
                
                {selectedObjet && (
                  <DocumentRequirements type={typeMapping[selectedObjet]} />
                )}

                <div className="mt-4 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-just-pink hover:text-pink-500"
                      >
                        <span>Télécharger un fichier</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          multiple
                          onChange={handleFileChange}
                        />
                      </label>
                      <p className="pl-1">ou glisser-déposer</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, PDF jusqu'à 10MB
                    </p>
                  </div>
                </div>
                {fichiers.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {fichiers.map((file, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100"
                      >
                        <DocumentTextIcon className="h-4 w-4 mr-2 text-just-pink" />
                        {file.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Bouton d'envoi */}
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    // Logique d'envoi
                    setMessage('');
                    setFichiers([]);
                    setSelectedBeneficiaire('');
                    setSelectedType('');
                    setSelectedObjet('');
                  }}
                  className="bg-just-pink text-white px-6 py-2 rounded-lg hover:bg-pink-700 transition-colors flex items-center"
                >
                  <PaperAirplaneIcon className="h-5 w-5 mr-2" />
                  Envoyer la demande
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'suivi' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-just-green">
                Suivi des demandes
              </h2>
              <div className="flex gap-4">
                <select className="appearance-none px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-just-pink focus:border-just-pink">
                  <option value="">Tous les types</option>
                  {typesDemande.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <select className="appearance-none px-3 pr-8 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-just-pink focus:border-just-pink">
                  <option value="">Toutes les dates</option>
                  <option value="1">Dernier mois</option>
                  <option value="3">3 derniers mois</option>
                  <option value="6">6 derniers mois</option>
                  <option value="12">Cette année</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              {mockDemandes.map((demande) => (
                <div key={demande.id} className="border rounded-lg overflow-hidden">
                  {/* En-tête de la demande - toujours visible */}
                  <div 
                    onClick={() => setExpandedDemande(expandedDemande === demande.id ? null : demande.id)}
                    className="p-4 hover:bg-gray-50 cursor-pointer flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-6">
                      <div className="flex-shrink-0">
                        <span className={`inline-flex items-center justify-center h-10 w-10 rounded-full ${
                          demande.statut === 'En cours' ? 'bg-just-light-green' : 'bg-gray-100'
                        }`}>
                          <DocumentTextIcon className={`h-5 w-5 ${
                            demande.statut === 'En cours' ? 'text-just-green' : 'text-gray-500'
                          }`} />
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">Demande n°{demande.numero}</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            demande.statut === 'En cours' 
                              ? 'bg-just-light-green text-just-green' 
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            {demande.statut}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">
                          {demande.type} - {formatDate(demande.date)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      {demande.fichiers.length > 0 && (
                        <span className="text-sm text-gray-500">
                          {demande.fichiers.length} document{demande.fichiers.length > 1 ? 's' : ''}
                        </span>
                      )}
                      <span className="text-sm text-gray-500">
                        {demande.messages.length} message{demande.messages.length > 1 ? 's' : ''}
                      </span>
                      <ChevronDownIcon 
                        className={`h-5 w-5 text-gray-400 transform transition-transform ${
                          expandedDemande === demande.id ? 'rotate-180' : ''
                        }`} 
                      />
                    </div>
                  </div>

                  {/* Contenu détaillé - visible uniquement si expandedDemande === demande.id */}
                  {expandedDemande === demande.id && (
                    <div className="border-t">
                      {/* Documents joints */}
                      {demande.fichiers.length > 0 && (
                        <div className="p-4 bg-gray-50 border-b">
                          <h4 className="text-sm font-medium mb-3">Documents associés</h4>
                          <div className="flex flex-wrap gap-2">
                            {demande.fichiers.map((fichier, index) => (
                              <a
                                key={index}
                                href="#"
                                className="inline-flex items-center px-3 py-1 rounded-full bg-white border text-sm hover:bg-gray-50 transition-colors"
                              >
                                <DocumentTextIcon className="h-4 w-4 mr-2 text-just-pink" />
                                {fichier}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Historique des messages */}
                      <div className="p-4">
                        <h4 className="text-sm font-medium mb-4">Échanges</h4>
                        <div className="space-y-4 mb-6">
                          {demande.messages.map((message) => (
                            <div
                              key={message.id}
                              className={`flex ${
                                message.type === 'adherent' ? 'justify-end' : 'justify-start'
                              }`}
                            >
                              <div
                                className={`max-w-[80%] rounded-lg p-4 ${
                                  message.type === 'adherent'
                                    ? 'bg-just-light-pink text-just-pink'
                                    : 'bg-gray-100'
                                }`}
                              >
                                <div className="flex items-center mb-2">
                                  <span className="font-medium text-sm">
                                    {message.auteur}
                                  </span>
                                  <span className="text-xs text-gray-500 ml-2">
                                    {new Date(message.date).toLocaleString('fr-FR')}
                                  </span>
                                </div>
                                <p className="text-sm">{message.contenu}</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Zone de réponse */}
                        {demande.statut !== 'Terminé' && (
                          <div className="flex gap-4">
                            <textarea
                              value={newMessage}
                              onChange={(e) => setNewMessage(e.target.value)}
                              placeholder="Votre réponse..."
                              className="flex-1 min-h-[100px] p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-just-pink"
                            />
                            <button 
                              className="bg-just-pink text-white px-6 py-2 h-fit rounded-lg hover:bg-pink-700 transition-colors flex items-center"
                              onClick={() => {
                                // Logique d'envoi du message
                                setNewMessage('');
                              }}
                            >
                              <PaperAirplaneIcon className="h-5 w-5 mr-2" />
                              Envoyer
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'rdv' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-just-green mb-6">
              Prendre rendez-vous en agence
            </h2>

            <div className="space-y-6">
              {/* Sélection de l'agence */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Choisissez une agence
                </label>
                <select
                  value={selectedAgence}
                  onChange={(e) => setSelectedAgence(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-just-pink focus:border-just-pink"
                >
                  <option value="">Sélectionnez une agence</option>
                  {mockAgences.map((agence) => (
                    <option key={agence.id} value={agence.id}>
                      {agence.nom}
                    </option>
                  ))}
                </select>
              </div>

              {/* Affichage des informations de l'agence sélectionnée */}
              {selectedAgence && (
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="mb-6">
                    <h3 className="font-medium text-just-green mb-2">
                      {mockAgences.find((a) => a.id === selectedAgence)?.nom}
                    </h3>
                    <p className="text-gray-600">
                      {mockAgences.find((a) => a.id === selectedAgence)?.adresse}
                    </p>
                  </div>

                  {/* Sélection de la date */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-4">
                      Sélectionnez une date
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {Array.from({ length: 8 }, (_, i) => {
                        const date = new Date();
                        date.setDate(date.getDate() + i + 1);
                        return (
                          <button
                            key={i}
                            onClick={() => setSelectedDate(date.toISOString())}
                            className={`p-4 rounded-lg border text-center ${
                              selectedDate === date.toISOString()
                                ? 'border-just-pink bg-just-light-pink text-just-pink'
                                : 'border-gray-200 hover:border-just-pink'
                            }`}
                          >
                            <div className="font-medium">
                              {date.toLocaleDateString('fr-FR', { weekday: 'short' })}
                            </div>
                            <div className="text-sm">
                              {date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Sélection de l'heure */}
                  {selectedDate && (
                    <div className="mt-6">
                      <h4 className="text-sm font-medium text-gray-700 mb-4">
                        Sélectionnez un horaire
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'].map((time) => (
                          <button
                            key={time}
                            className="p-4 rounded-lg border border-gray-200 hover:border-just-pink text-center"
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Bouton de confirmation */}
                  {selectedDate && (
                    <div className="mt-8 flex justify-end">
                      <button
                        onClick={() => {
                          // Logique de confirmation du rendez-vous
                          setSelectedAgence('');
                          setSelectedDate('');
                        }}
                        className="bg-just-pink text-white px-6 py-2 rounded-lg hover:bg-pink-700 transition-colors flex items-center"
                      >
                        <CalendarIcon className="h-5 w-5 mr-2" />
                        Confirmer le rendez-vous
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Simulateur de remboursement */}
        {showSimulateur && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-lg w-full p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-just-green">
                  Simulateur de remboursement
                </h3>
                <button
                  onClick={() => setShowSimulateur(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Fermer</span>
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type de soin
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-just-pink focus:border-just-pink">
                    <option value="">Sélectionnez un type de soin</option>
                    <option value="consultation">Consultation</option>
                    <option value="optique">Optique</option>
                    <option value="dentaire">Dentaire</option>
                    <option value="hospitalisation">Hospitalisation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Montant des soins
                  </label>
                  <div className="relative rounded-lg shadow-sm">
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-just-pink focus:border-just-pink pr-12"
                      placeholder="0.00"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">€</span>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-just-pink text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors">
                  Calculer le remboursement
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 