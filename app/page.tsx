'use client';

import React from 'react';
import { DocumentIcon, CreditCardIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Remboursement {
  date: string;
  soin: string;
  montant: number;
}

interface Demande {
  date: string;
  type: string;
  statut: string;
}

// Données mockées pour l'exemple
const mockRemboursements: Remboursement[] = [
  { date: '15/02/2024', soin: 'Consultation généraliste', montant: 25.00 },
  { date: '10/02/2024', soin: 'Pharmacie', montant: 15.50 },
  { date: '05/02/2024', soin: 'Dentiste', montant: 150.00 },
];

const mockDemandes: Demande[] = [
  { date: '16/02/2024', type: 'Devis dentaire', statut: 'En cours' },
  { date: '12/02/2024', type: 'Prise en charge hospitalisation', statut: 'Validée' },
  { date: '08/02/2024', type: 'Changement RIB', statut: 'Terminée' },
];

// Styles personnalisés pour le carrousel
const swiperStyles = `
  .swiper-button-next,
  .swiper-button-prev {
    color: #E4316F;
    width: 35px;
    height: 35px;
    background: white;
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .swiper-button-next:after,
  .swiper-button-prev:after {
    font-size: 18px;
  }

  .swiper-pagination-bullet {
    background: #E4316F;
    opacity: 0.5;
  }

  .swiper-pagination-bullet-active {
    opacity: 1;
  }
`;

const carouselItems = [
  {
    id: 1,
    image: 'https://adherent.just.fr/upload/carrousel/photo1.jpg',
    alt: 'Information importante 1'
  },
  {
    id: 2,
    image: 'https://adherent.just.fr/upload/carrousel/photo2.jpg',
    alt: 'Information importante 2'
  }
];

export default function HomePage() {
  const adherent = {
    prenom: 'Jean',
    numero: '123456789',
    nom: 'Dupont',
    email: 'jean.dupont@email.com',
    telephone: '0612345678',
    contrats: ['Santé', 'Prévoyance'],
    beneficiaires: 3
  };

  return (
    <div className="bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Message de bienvenue */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-semibold text-just-green">
                Bonjour {adherent.prenom} !
              </h1>
              <div className="mt-2 space-y-1">
                <p className="text-just-gray">
                  N° adhérent : {adherent.numero}
                </p>
                <p className="text-just-gray">
                  {adherent.contrats.length > 1 ? 
                    `Vous êtes couvert par ${adherent.contrats.length} contrats : ${adherent.contrats.join(' et ')}` : 
                    `Vous êtes couvert par un contrat ${adherent.contrats[0]}`
                  }
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-just-gray">Dernière connexion</p>
              <p className="font-medium">15/02/2024 à 14:30</p>
            </div>
          </div>
        </div>

        {/* Carrousel */}
        <div className="mb-8">
          <style>{swiperStyles}</style>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 10000 }}
            className="rounded-lg overflow-hidden shadow-sm max-h-[220px]"
          >
            {carouselItems.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="relative h-[220px] flex items-center justify-center bg-white">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Raccourcis */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 flex items-center space-x-4">
            <CreditCardIcon className="h-8 w-8 text-just-pink" />
            <div>
              <h3 className="font-medium">Carte de mutuelle</h3>
              <a href="/documents/carte-mutuelle.pdf" download className="text-just-pink text-sm hover:underline">Télécharger ma carte</a>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 flex items-center space-x-4">
            <DocumentIcon className="h-8 w-8 text-just-pink" />
            <div>
              <h3 className="font-medium">Envoyer un document</h3>
              <a href="/contact" className="text-just-pink text-sm hover:underline">Transmettre</a>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 flex items-center space-x-4">
            <QuestionMarkCircleIcon className="h-8 w-8 text-just-pink" />
            <div>
              <h3 className="font-medium">Besoin d'aide ?</h3>
              <a href="/faq" className="text-just-pink text-sm hover:underline">Consulter la FAQ</a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Derniers remboursements */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-just-green mb-4">
              Mes derniers remboursements
            </h2>
            <div className="space-y-4">
              {mockRemboursements.map((remb, index) => (
                <div key={index} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-medium">{remb.soin}</p>
                    <p className="text-sm text-just-gray">{remb.date}</p>
                  </div>
                  <span className="font-medium text-just-pink">{remb.montant.toFixed(2)} €</span>
                </div>
              ))}
            </div>
            <a href="/remboursements" className="block text-just-pink text-sm mt-4 hover:underline">
              Voir tous mes remboursements
            </a>
          </div>

          {/* Dernières demandes */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-just-green mb-4">
              Mes dernières demandes
            </h2>
            <div className="space-y-4">
              {mockDemandes.map((demande, index) => (
                <div key={index} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-medium">{demande.type}</p>
                    <p className="text-sm text-just-gray">{demande.date}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    demande.statut === 'En cours' ? 'bg-just-light-pink text-just-pink' :
                    demande.statut === 'Validée' ? 'bg-just-light-green text-just-green' :
                    'bg-gray-100 text-just-gray'
                  }`}>
                    {demande.statut}
                  </span>
                </div>
              ))}
            </div>
            <a href="/contact" className="block text-just-pink text-sm mt-4 hover:underline">
              Voir toutes mes demandes
            </a>
          </div>

          {/* Informations contrat */}
          <div className="bg-white rounded-lg shadow-sm p-6 md:col-span-2">
            <h2 className="text-xl font-semibold text-just-green mb-4">
              Mon contrat
            </h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-just-gray">Type de contrat</p>
                  <p className="font-medium">Santé - Just'Essentielle</p>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-just-gray">Date d'adhésion</p>
                    <p className="font-medium">01/01/2023</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-just-gray">Bénéficiaires</p>
                    <p className="font-medium">{adherent.beneficiaires} personne{adherent.beneficiaires > 1 ? 's' : ''}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <a href="/contrat" className="text-just-pink text-sm hover:underline">
                Voir tous mes contrats
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 