'use client';

import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface FAQCategory {
  title: string;
  subcategories: {
    title: string;
    questions: {
      question: string;
      answer: string;
    }[];
  }[];
}

const faqData: FAQCategory[] = [
  {
    title: "Santé",
    subcategories: [
      {
        title: "La complémentaire santé",
        questions: [
          {
            question: "Pourquoi souscrire un contrat santé ?",
            answer: "La complémentaire santé permet de compléter les remboursements de la Sécurité sociale et de réduire votre reste à charge. Elle vous permet d'accéder à de meilleurs soins tout en maîtrisant votre budget santé."
          },
          {
            question: "Comment utiliser ma carte de mutuelle ?",
            answer: "Votre carte de mutuelle vous permet de bénéficier du tiers payant chez les professionnels de santé. Présentez-la simplement lors de vos consultations pour éviter l'avance des frais."
          },
          {
            question: "Quelles sont les dépenses de santé non remboursées par la Sécurité sociale ?",
            answer: "Certaines dépenses comme les dépassements d'honoraires, certains soins dentaires, l'optique ou les médecines douces ne sont pas ou peu remboursées par la Sécurité sociale."
          }
        ]
      },
      {
        title: "Les démarches",
        questions: [
          {
            question: "Comment transmettre mes devis ?",
            answer: "Vous pouvez transmettre vos devis directement depuis votre espace adhérent en les déposant dans la rubrique 'Envoyer un document' ou en les envoyant par courrier."
          },
          {
            question: "Comment adresser une demande de remboursement ?",
            answer: "Pour une demande de remboursement, connectez-vous à votre espace adhérent et utilisez le service 'Demande de remboursement' en joignant vos justificatifs scannés."
          }
        ]
      }
    ]
  },
  {
    title: "Prévoyance",
    subcategories: [
      {
        title: "Comprendre la prévoyance",
        questions: [
          {
            question: "Qu'est-ce que la prévoyance ?",
            answer: "La prévoyance est une protection qui permet de faire face aux aléas de la vie (arrêt de travail, invalidité, décès) en garantissant un maintien de revenus pour vous et vos proches."
          }
        ]
      }
    ]
  },
  {
    title: "Mon contrat",
    subcategories: [
      {
        title: "Gérer mon contrat",
        questions: [
          {
            question: "Comment modifier mes informations personnelles ?",
            answer: "Connectez-vous à votre espace adhérent, rubrique 'Mon contrat'. Vous pourrez y modifier vos coordonnées, ajouter des bénéficiaires ou mettre à jour vos informations bancaires."
          },
          {
            question: "Comment ajouter un bénéficiaire ?",
            answer: "Dans votre espace adhérent, section 'Mon contrat', cliquez sur 'Gérer les bénéficiaires' puis 'Ajouter un bénéficiaire'. Remplissez le formulaire avec les informations demandées."
          }
        ]
      }
    ]
  }
];

const frequentQuestions = [
  {
    question: "Comment faire une demande de remboursement ?",
    answer: "Pour faire une demande, rendez-vous sur la page 'Contact' et sélectionnez le type de demande souhaité. Remplissez le formulaire en ligne et joignez les pièces justificatives requises. Pour les soins courants, la transmission est automatique via votre carte Vitale."
  },
  {
    question: "Quelles pièces justificatives dois-je fournir ?",
    answer: `<div>
      <p>Les pièces à fournir dépendent du type de demande. Tous les documents doivent être lisibles et comporter vos nom, prénom et date des soins.</p>
      
      <div class='mt-4'>
        <p class='font-medium text-just-green'>Demandes de remboursement :</p>
        <ul class='list-disc pl-4 mt-2 space-y-1'>
          <li>Consultation médicale : facture acquittée du praticien</li>
          <li>Pharmacie : facture détaillée et ordonnance</li>
          <li>Soins dentaires : facture détaillée du praticien</li>
          <li>Optique : facture détaillée + ordonnance de moins de 3 ans</li>
          <li>Hospitalisation : bulletin de situation + facture détaillée</li>
          <li>Médecines douces : facture détaillée avec cachet du praticien</li>
          <li>Appareillage : facture détaillée + prescription médicale</li>
        </ul>
      </div>

      <div class='mt-4'>
        <p class='font-medium text-just-green'>Devis :</p>
        <ul class='list-disc pl-4 mt-2 space-y-1'>
          <li>Dentaire : devis détaillé du praticien avec codes CCAM</li>
          <li>Optique : devis détaillé avec correction et options</li>
          <li>Appareillage auditif : devis détaillé du fournisseur</li>
        </ul>
      </div>

      <div class='mt-4'>
        <p class='font-medium text-just-green'>Changements de situation :</p>
        <ul class='list-disc pl-4 mt-2 space-y-1'>
          <li>Changement de RIB : nouveau RIB au format IBAN</li>
          <li>Ajout de bénéficiaire : livret de famille ou acte de naissance</li>
          <li>Changement d'adresse : justificatif de domicile de moins de 3 mois</li>
          <li>Carte de mutuelle : pièce d'identité en cours de validité</li>
        </ul>
      </div>

      <p class='mt-4'>Format accepté : PDF, JPG ou PNG, taille maximale 5 Mo par document.</p>
    </div>`
  },
  {
    question: "Comment télécharger ma carte de mutuelle ?",
    answer: "Vous pouvez télécharger votre carte de mutuelle depuis la page d'accueil en cliquant sur 'Télécharger ma carte' dans la section 'Carte de mutuelle'."
  },
  {
    question: "Comment suivre mes remboursements ?",
    answer: "Vous pouvez suivre vos remboursements en temps réel depuis votre espace adhérent dans la rubrique 'Mes remboursements'. Vous recevez également une notification par email à chaque nouveau remboursement."
  },
  {
    question: "Sous quel délai serai-je remboursé ?",
    answer: "Les remboursements sont effectués sous 48h après réception du décompte de la Sécurité sociale pour les soins courants. Pour les autres prestations, le délai est de 5 jours ouvrés après réception des justificatifs complets."
  },
  {
    question: "Comment sont traitées mes demandes ?",
    answer: "Vos demandes sont traitées par ordre chronologique. Vous pouvez suivre leur avancement dans la rubrique 'Mes demandes' de votre espace adhérent. Un email vous est envoyé à chaque changement de statut. Si des pièces sont manquantes, vous en serez informé dans les 48h."
  }
];

export default function FAQPage() {
  const [openCategory, setOpenCategory] = React.useState<number | null>(null);
  const [openSubcategory, setOpenSubcategory] = React.useState<{cat: number, sub: number} | null>(null);
  const [openQuestion, setOpenQuestion] = React.useState<number | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');

  // Fonction pour filtrer les données de la FAQ en fonction de la recherche
  const filteredFaqData = React.useMemo(() => {
    if (!searchQuery.trim()) return faqData;

    const query = searchQuery.toLowerCase().trim();
    
    return faqData.map(category => ({
      ...category,
      subcategories: category.subcategories.map(subcategory => ({
        ...subcategory,
        questions: subcategory.questions.filter(
          q => q.question.toLowerCase().includes(query) || 
               q.answer.toLowerCase().includes(query)
        )
      })).filter(sub => sub.questions.length > 0)
    })).filter(cat => cat.subcategories.length > 0);
  }, [searchQuery]);

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-just-green mb-8">
          Foire aux questions
        </h1>

        {/* Barre de recherche */}
        <div className="mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-just-gray" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-just-pink focus:border-transparent"
              placeholder="Rechercher une question..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {searchQuery && (
            <p className="mt-2 text-sm text-just-gray">
              {filteredFaqData.reduce(
                (total, category) => total + category.subcategories.reduce(
                  (subTotal, subcategory) => subTotal + subcategory.questions.length, 0
                ), 0
              )} résultat(s) trouvé(s)
            </p>
          )}
        </div>

        {/* Questions fréquentes */}
        {!searchQuery && (
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-just-green mb-6">
              Questions fréquentes
            </h2>
            <div className="grid gap-4">
              {frequentQuestions.slice(0, 5).map((item, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <button
                    onClick={() => setOpenQuestion(openQuestion === index ? null : index)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="text-just-pink font-medium pr-8">{item.question}</h3>
                    <svg
                      className={`w-5 h-5 text-just-pink transform transition-transform ${openQuestion === index ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openQuestion === index && (
                    <div className="px-6 py-4 border-t border-gray-100">
                      <div 
                        className="text-just-gray text-sm"
                        dangerouslySetInnerHTML={{ __html: item.answer }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Catégories existantes */}
        <div className={`space-y-6 ${!searchQuery && 'mt-12'}`}>
          {filteredFaqData.map((category, catIndex) => (
            <div key={catIndex} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <button
                className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50"
                onClick={() => setOpenCategory(openCategory === catIndex ? null : catIndex)}
              >
                <h2 className="text-xl font-medium text-just-green">{category.title}</h2>
                <svg
                  className={`w-6 h-6 transform transition-transform ${openCategory === catIndex ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {(openCategory === catIndex || searchQuery) && (
                <div className="border-t">
                  {category.subcategories.map((subcategory, subIndex) => (
                    <div key={subIndex} className="border-b last:border-b-0">
                      <button
                        className="w-full px-6 py-3 flex justify-between items-center hover:bg-gray-50 text-left"
                        onClick={() => setOpenSubcategory(
                          openSubcategory?.cat === catIndex && openSubcategory?.sub === subIndex
                            ? null
                            : {cat: catIndex, sub: subIndex}
                        )}
                      >
                        <h3 className="text-lg font-medium text-just-gray">{subcategory.title}</h3>
                        <svg
                          className={`w-5 h-5 transform transition-transform ${
                            openSubcategory?.cat === catIndex && openSubcategory?.sub === subIndex ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {(openSubcategory?.cat === catIndex && openSubcategory?.sub === subIndex || searchQuery) && (
                        <div className="bg-gray-50 px-6 py-4">
                          <div className="space-y-4">
                            {subcategory.questions.map((item, qIndex) => (
                              <div key={qIndex} className="rounded-lg bg-white shadow-sm">
                                <button
                                  className="w-full px-4 py-3 flex justify-between items-center text-left"
                                  onClick={() => setOpenQuestion(
                                    openQuestion === qIndex ? null : qIndex
                                  )}
                                >
                                  <span className="text-just-pink font-medium">{item.question}</span>
                                  <svg
                                    className={`w-5 h-5 transform transition-transform ${
                                      openQuestion === qIndex ? 'rotate-180' : ''
                                    }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                  </svg>
                                </button>
                                {openQuestion === qIndex && (
                                  <div className="px-4 py-3 border-t">
                                    <p className="text-just-gray text-sm">{item.answer}</p>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 