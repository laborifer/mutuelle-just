'use client';

import React, { useState } from 'react';
import { 
  UserPlusIcon, 
  GiftIcon, 
  ClipboardDocumentListIcon,
  EnvelopeIcon,
  ShareIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

// Types
interface Filleul {
  id: string;
  nom: string;
  prenom: string;
  dateContrat: string;
  statut: 'en_attente' | 'inscrit' | 'contrat_actif';
}

interface InvitationParrainage {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  dateInvitation: string;
  statut: 'envoyee' | 'consultee' | 'en_cours' | 'finalisee';
}

// Données mockées
const mockFilleuls: Filleul[] = [
  { id: '1', nom: 'Martin', prenom: 'Sophie', dateContrat: '2024-01-15', statut: 'contrat_actif' },
  { id: '2', nom: 'Dubois', prenom: 'Pierre', dateContrat: '2024-02-20', statut: 'inscrit' },
  { id: '3', nom: 'Bernard', prenom: 'Marie', dateContrat: '2024-03-01', statut: 'en_attente' },
];

const mockInvitations: InvitationParrainage[] = [
  { 
    id: '1', 
    nom: 'Petit', 
    prenom: 'Julie', 
    email: 'julie.petit@email.com',
    telephone: '0612345678',
    dateInvitation: '2024-03-10',
    statut: 'envoyee'
  },
  // ... autres invitations
];

export default function ParrainagePage() {
  const [activeTab, setActiveTab] = useState('avantages');
  const [showInvitationForm, setShowInvitationForm] = useState(false);
  const [invitationData, setInvitationData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
  });

  const cagnotte = 90; // Montant mockée de la cagnotte
  const plafond = 150;
  const restant = plafond - cagnotte;

  const handleInvitationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique d'envoi du formulaire
    console.log('Invitation envoyée:', invitationData);
    setShowInvitationForm(false);
  };

  const copyParrainageLink = () => {
    const link = `https://mutuelle-just.fr/parrainage?ref=USER123`;
    navigator.clipboard.writeText(link);
    // Ajouter une notification de succès
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-just-green mb-8">Programme de parrainage</h1>

        {/* Navigation par onglets */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <div className="flex space-x-4 border-b">
            <button
              onClick={() => setActiveTab('avantages')}
              className={
                activeTab === 'avantages'
                  ? 'pb-4 px-4 border-b-2 border-just-pink text-just-pink'
                  : 'pb-4 px-4 text-gray-500 hover:text-just-pink'
              }
            >
              Avantages du parrainage
            </button>
            <button
              onClick={() => setActiveTab('cagnotte')}
              className={
                activeTab === 'cagnotte'
                  ? 'pb-4 px-4 border-b-2 border-just-pink text-just-pink'
                  : 'pb-4 px-4 text-gray-500 hover:text-just-pink'
              }
            >
              Ma cagnotte
            </button>
            <button
              onClick={() => setActiveTab('historique')}
              className={
                activeTab === 'historique'
                  ? 'pb-4 px-4 border-b-2 border-just-pink text-just-pink'
                  : 'pb-4 px-4 text-gray-500 hover:text-just-pink'
              }
            >
              Historique
            </button>
          </div>
        </div>

        {/* Contenu des onglets */}
        {activeTab === 'avantages' && (
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-just-green mb-6">Comment ça marche ?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-just-pink bg-opacity-10 p-4 rounded-full mb-4">
                    <UserPlusIcon className="h-8 w-8 text-just-pink" />
                  </div>
                  <h3 className="font-medium mb-2">1. Parrainez un proche</h3>
                  <p className="text-just-gray">Invitez vos amis et votre famille à rejoindre la mutuelle Just</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="bg-just-pink bg-opacity-10 p-4 rounded-full mb-4">
                    <ClipboardDocumentListIcon className="h-8 w-8 text-just-pink" />
                  </div>
                  <h3 className="font-medium mb-2">2. Ils souscrivent</h3>
                  <p className="text-just-gray">Vos filleuls adhèrent à l'une de nos offres santé</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="bg-just-pink bg-opacity-10 p-4 rounded-full mb-4">
                    <GiftIcon className="h-8 w-8 text-just-pink" />
                  </div>
                  <h3 className="font-medium mb-2">3. Recevez votre récompense</h3>
                  <p className="text-just-gray">Gagnez 30€ par filleul, jusqu'à 150€ par an</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-just-green mb-6">Commencer à parrainer</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <button
                  onClick={() => setShowInvitationForm(true)}
                  className="flex items-center justify-center space-x-3 p-4 border-2 border-just-pink rounded-lg hover:bg-just-pink hover:text-white transition-colors group"
                >
                  <EnvelopeIcon className="h-6 w-6" />
                  <span>Envoyer une invitation par email</span>
                </button>
                <button
                  onClick={copyParrainageLink}
                  className="flex items-center justify-center space-x-3 p-4 border-2 border-just-green rounded-lg hover:bg-just-green hover:text-white transition-colors group"
                >
                  <ShareIcon className="h-6 w-6" />
                  <span>Copier mon lien de parrainage</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cagnotte' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-just-green mb-6">Ma cagnotte parrainage</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="mb-4">
                  <p className="text-just-gray mb-2">Montant cumulé cette année</p>
                  <p className="text-3xl font-bold text-just-pink">{cagnotte} €</p>
                </div>
                <div>
                  <p className="text-just-gray mb-2">Reste à gagner avant le plafond</p>
                  <p className="text-xl font-semibold text-just-green">{restant} €</p>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <p className="font-medium">Progression</p>
                  <p className="text-just-gray">{Math.round((cagnotte/plafond) * 100)}%</p>
                </div>
                <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-just-pink rounded-full transition-all duration-500"
                    style={{ width: `${(cagnotte/plafond) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'historique' && (
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-just-green mb-6">Mes filleuls</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Nom</th>
                      <th className="text-left py-3 px-4">Prénom</th>
                      <th className="text-left py-3 px-4">Date du contrat</th>
                      <th className="text-left py-3 px-4">Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockFilleuls.map((filleul) => (
                      <tr key={filleul.id} className="border-b">
                        <td className="py-3 px-4">{filleul.nom}</td>
                        <td className="py-3 px-4">{filleul.prenom}</td>
                        <td className="py-3 px-4">{new Date(filleul.dateContrat).toLocaleDateString()}</td>
                        <td className="py-3 px-4">
                          <span className={
                            filleul.statut === 'contrat_actif' ? 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800' :
                            filleul.statut === 'inscrit' ? 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800' :
                            'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800'
                          }>
                            {filleul.statut === 'contrat_actif' ? 'Contrat actif' :
                             filleul.statut === 'inscrit' ? 'Inscrit' :
                             'En attente'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-just-green mb-6">Invitations en cours</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Nom</th>
                      <th className="text-left py-3 px-4">Prénom</th>
                      <th className="text-left py-3 px-4">Email</th>
                      <th className="text-left py-3 px-4">Date d'invitation</th>
                      <th className="text-left py-3 px-4">Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockInvitations.map((invitation) => (
                      <tr key={invitation.id} className="border-b">
                        <td className="py-3 px-4">{invitation.nom}</td>
                        <td className="py-3 px-4">{invitation.prenom}</td>
                        <td className="py-3 px-4">{invitation.email}</td>
                        <td className="py-3 px-4">{new Date(invitation.dateInvitation).toLocaleDateString()}</td>
                        <td className="py-3 px-4">
                          <span className={
                            invitation.statut === 'finalisee' ? 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800' :
                            invitation.statut === 'en_cours' ? 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800' :
                            invitation.statut === 'consultee' ? 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800' :
                            'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800'
                          }>
                            {invitation.statut === 'finalisee' ? 'Finalisée' :
                             invitation.statut === 'en_cours' ? 'En cours' :
                             invitation.statut === 'consultee' ? 'Consultée' :
                             'Envoyée'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Modal du formulaire d'invitation */}
        {showInvitationForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <h3 className="text-xl font-semibold text-just-green mb-6">Inviter un filleul</h3>
              <form onSubmit={handleInvitationSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-just-gray mb-1">Nom</label>
                  <input
                    type="text"
                    required
                    value={invitationData.nom}
                    onChange={(e) => setInvitationData({ ...invitationData, nom: e.target.value })}
                    className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-just-pink focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-just-gray mb-1">Prénom</label>
                  <input
                    type="text"
                    required
                    value={invitationData.prenom}
                    onChange={(e) => setInvitationData({ ...invitationData, prenom: e.target.value })}
                    className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-just-pink focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-just-gray mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={invitationData.email}
                    onChange={(e) => setInvitationData({ ...invitationData, email: e.target.value })}
                    className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-just-pink focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-just-gray mb-1">Téléphone</label>
                  <input
                    type="tel"
                    required
                    value={invitationData.telephone}
                    onChange={(e) => setInvitationData({ ...invitationData, telephone: e.target.value })}
                    className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-just-pink focus:border-transparent"
                  />
                </div>
                <div className="flex justify-end space-x-3 pt-4 border-t">
                  <button
                    type="button"
                    onClick={() => setShowInvitationForm(false)}
                    className="px-4 py-2 text-just-gray hover:text-just-pink transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-just-pink text-white rounded-md hover:bg-opacity-90 transition-colors"
                  >
                    Envoyer l'invitation
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 