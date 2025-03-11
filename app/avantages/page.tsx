import React from 'react';

interface AvantageCard {
  icon: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

const avantages: AvantageCard[] = [
  {
    icon: '/icons/teleconsultation.svg',
    title: 'Téléconsultation',
    description: 'En tant qu\'adhérent, vous avez accès sans frais à la téléconsultation médicale via notre partenaire MédecinDirect.',
    buttonText: 'Activer MédecinDirect',
    buttonLink: '#',
  },
  {
    icon: '/icons/licence-sportive.svg',
    title: 'Licence sportive',
    description: 'La Mutuelle Just permet à chaque adhérent et chaque ayant-droit de voir sa licence sportive remboursée jusqu\'à 40 €/an.',
    buttonText: 'Faire une demande',
    buttonLink: '#',
  },
  {
    icon: '/icons/mobile-app.svg',
    title: 'Application Mobile',
    description: 'La Mutuelle Just dispose d\'une application mobile 100% dédiée à ses adhérents. Un nouvel allié santé sur lequel vous pourrez compter pour effectuer une multitude de requêtes.',
    buttonText: 'Télécharger l\'appli',
    buttonLink: '#',
  },
  {
    icon: '/icons/parrainage.svg',
    title: 'Parrainage',
    description: 'Notre meilleur ambassadeur, c\'est vous ! N\'attendez plus et parrainez vos proches, vos amis, vos collègues. Recevez jusqu\'à 300 € !',
    buttonText: 'Parrainer un proche',
    buttonLink: '/avantages/parrainage',
  },
  {
    icon: '/icons/assistance.svg',
    title: 'Just\'Assistance',
    description: 'Avec votre complémentaire santé, vous bénéficiez d\'un contrat d\'Assistance et de Protection Juridique Santé en cas d\'aléas de la vie.',
    buttonText: 'Consulter la notice',
    buttonLink: '#',
  },
  {
    icon: '/icons/sport.svg',
    title: 'A.L.D. Sport',
    description: 'En cas d\'entrée en Affection de Longue Durée exonérante, bénéficiez de la garantie « sport sur ordonnance ».',
    buttonText: 'Consulter la notice',
    buttonLink: '#',
  },
];

export default function AvantagesPage() {
  return (
    <div className="bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-just-green mb-8">Mes avantages</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {avantages.map((avantage, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6 flex flex-col transform transition-all duration-200 ease-in-out hover:scale-[1.02] hover:shadow-md cursor-pointer">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 flex items-center justify-center">
                  <img src={avantage.icon} alt={avantage.title} className="w-10 h-10" />
                </div>
                <h2 className="text-xl font-semibold ml-4">{avantage.title}</h2>
              </div>

              <p className="text-sm text-gray-600 flex-grow mb-6">
                {avantage.description}
              </p>

              <div className="space-y-3">
                <a
                  href={avantage.buttonLink}
                  className="flex items-center justify-center w-full bg-just-pink text-white px-6 py-3 rounded-full hover:bg-opacity-90 transition-colors font-medium"
                >
                  {avantage.buttonText}
                </a>
                <a 
                  href={avantage.buttonLink} 
                  className="flex items-center justify-center w-full border-2 border-just-pink text-just-pink px-6 py-2.5 rounded-full hover:border-pink-300 hover:text-pink-300 transition-colors font-medium"
                >
                  + d'infos
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 