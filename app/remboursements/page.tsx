'use client';

import React, { useState, useMemo } from 'react';
import { 
  CalendarIcon, 
  DocumentTextIcon, 
  CreditCardIcon, 
  ChartBarIcon, 
  BanknotesIcon, 
  ChevronDownIcon,
  MagnifyingGlassIcon,
  HeartIcon,
  BuildingOfficeIcon,
  EyeIcon,
  BeakerIcon,
  SpeakerWaveIcon,
  SparklesIcon,
  PrinterIcon
} from '@heroicons/react/24/outline';

interface Remboursement {
  id: string;
  dateSoins: string;
  datePaiement: string;
  beneficiaire: string;
  typePrestation: string;
  nomTiers: string;
  typePaiement: 'adherent' | 'professionnel';
  montantTotal: number;
  montantSecu: number;
  montantMutuelle: number;
  details: {
    prestation: string;
    dateDebut: string;
    dateFin: string;
  };
}

interface Forfait {
  type: string;
  montantRestant: number;
  montantTotal: number;
}

const mockRemboursements: Remboursement[] = [
  {
    id: '1',
    dateSoins: '2024-03-01',
    datePaiement: '2024-03-10',
    beneficiaire: 'Jean Dupont',
    typePrestation: 'Consultation',
    nomTiers: 'Dr Martin',
    typePaiement: 'professionnel',
    montantTotal: 25.00,
    montantSecu: 17.50,
    montantMutuelle: 7.50,
    details: {
      prestation: 'Consultation généraliste',
      dateDebut: '2024-03-01',
      dateFin: '2024-03-01'
    }
  },
  {
    id: '2',
    dateSoins: '2024-02-15',
    datePaiement: '2024-02-28',
    beneficiaire: 'Marie Dupont',
    typePrestation: 'Dentaire',
    nomTiers: 'Dr Blanc',
    typePaiement: 'adherent',
    montantTotal: 450.00,
    montantSecu: 150.00,
    montantMutuelle: 250.00,
    details: {
      prestation: 'Couronne céramique',
      dateDebut: '2024-02-15',
      dateFin: '2024-02-15'
    }
  },
  {
    id: '3',
    dateSoins: '2024-02-10',
    datePaiement: '2024-02-20',
    beneficiaire: 'Lucas Dupont',
    typePrestation: 'Optique',
    nomTiers: 'Optic 2000',
    typePaiement: 'professionnel',
    montantTotal: 350.00,
    montantSecu: 50.00,
    montantMutuelle: 250.00,
    details: {
      prestation: 'Monture + verres progressifs',
      dateDebut: '2024-02-10',
      dateFin: '2024-02-10'
    }
  },
  {
    id: '4',
    dateSoins: '2024-02-05',
    datePaiement: '2024-02-15',
    beneficiaire: 'Jean Dupont',
    typePrestation: 'Pharmacie',
    nomTiers: 'Pharmacie Centrale',
    typePaiement: 'adherent',
    montantTotal: 45.60,
    montantSecu: 31.92,
    montantMutuelle: 13.68,
    details: {
      prestation: 'Médicaments prescrits',
      dateDebut: '2024-02-05',
      dateFin: '2024-02-05'
    }
  },
  {
    id: '5',
    dateSoins: '2024-01-20',
    datePaiement: '2024-02-01',
    beneficiaire: 'Marie Dupont',
    typePrestation: 'Kinésithérapie',
    nomTiers: 'Cabinet Kiné Santé',
    typePaiement: 'professionnel',
    montantTotal: 150.00,
    montantSecu: 90.00,
    montantMutuelle: 60.00,
    details: {
      prestation: 'Séance de rééducation (5 séances)',
      dateDebut: '2024-01-20',
      dateFin: '2024-01-31'
    }
  },
  {
    id: '6',
    dateSoins: '2024-01-15',
    datePaiement: '2024-01-25',
    beneficiaire: 'Jean Dupont',
    typePrestation: 'Radiologie',
    nomTiers: 'Centre d\'Imagerie Médicale',
    typePaiement: 'adherent',
    montantTotal: 75.00,
    montantSecu: 52.50,
    montantMutuelle: 22.50,
    details: {
      prestation: 'Radio du thorax',
      dateDebut: '2024-01-15',
      dateFin: '2024-01-15'
    }
  },
  {
    id: '7',
    dateSoins: '2024-01-10',
    datePaiement: '2024-01-20',
    beneficiaire: 'Lucas Dupont',
    typePrestation: 'Consultation spécialiste',
    nomTiers: 'Dr Dubois',
    typePaiement: 'professionnel',
    montantTotal: 50.00,
    montantSecu: 35.00,
    montantMutuelle: 15.00,
    details: {
      prestation: 'Consultation pédiatre',
      dateDebut: '2024-01-10',
      dateFin: '2024-01-10'
    }
  },
  {
    id: '8',
    dateSoins: '2024-01-05',
    datePaiement: '2024-01-15',
    beneficiaire: 'Marie Dupont',
    typePrestation: 'Analyses médicales',
    nomTiers: 'Laboratoire Central',
    typePaiement: 'adherent',
    montantTotal: 85.00,
    montantSecu: 59.50,
    montantMutuelle: 25.50,
    details: {
      prestation: 'Bilan sanguin complet',
      dateDebut: '2024-01-05',
      dateFin: '2024-01-05'
    }
  },
  {
    id: '9',
    dateSoins: '2023-12-20',
    datePaiement: '2024-01-05',
    beneficiaire: 'Jean Dupont',
    typePrestation: 'Ostéopathie',
    nomTiers: 'Cabinet Ostéo Plus',
    typePaiement: 'professionnel',
    montantTotal: 60.00,
    montantSecu: 0.00,
    montantMutuelle: 45.00,
    details: {
      prestation: 'Séance d\'ostéopathie',
      dateDebut: '2023-12-20',
      dateFin: '2023-12-20'
    }
  },
  {
    id: '10',
    dateSoins: '2023-12-15',
    datePaiement: '2023-12-28',
    beneficiaire: 'Marie Dupont',
    typePrestation: 'Orthodontie',
    nomTiers: 'Dr Blanc',
    typePaiement: 'adherent',
    montantTotal: 800.00,
    montantSecu: 193.50,
    montantMutuelle: 500.00,
    details: {
      prestation: 'Pose appareil dentaire',
      dateDebut: '2023-12-15',
      dateFin: '2023-12-15'
    }
  }
];

const mockForfaits: Forfait[] = [
  { type: 'Bien-être', montantRestant: 120, montantTotal: 150 },
  { type: 'Prévention', montantRestant: 80, montantTotal: 100 },
  { type: 'E-santé', montantRestant: 50, montantTotal: 50 },
  { type: 'Licence sportive', montantRestant: 30, montantTotal: 50 }
];

// Mapping des types de prestations avec leurs icônes
const getIconForPrestation = (typePrestation: string) => {
  const iconMapping: Record<string, React.ElementType> = {
    'Consultation': HeartIcon,
    'Pharmacie': BeakerIcon,
    'Hospitalisation': BuildingOfficeIcon,
    'Optique': EyeIcon,
    'Dentaire': SparklesIcon,
    'Orthodontie': SparklesIcon,
    'Auditif': SpeakerWaveIcon,
    'Ostéopathie': HeartIcon,
    'Kinésithérapie': HeartIcon,
    'Radiologie': SparklesIcon,
    'Analyses médicales': BeakerIcon
  };

  return iconMapping[typePrestation] || HeartIcon;
};

export default function RemboursementsPage() {
  const [typeFiltre, setTypeFiltre] = useState('tous');
  const [moisFiltre, setMoisFiltre] = useState('');
  const [anneeFiltre, setAnneeFiltre] = useState('2024');
  const [searchQuery, setSearchQuery] = useState('');
  const [remboursementOuvert, setRemboursementOuvert] = useState<string | null>(null);

  const remboursementsGroupes = useMemo(() => {
    const remboursementsFiltres = mockRemboursements.filter(remb => {
      const dateRemb = new Date(remb.datePaiement);
      const moisMatch = !moisFiltre || dateRemb.getMonth() + 1 === parseInt(moisFiltre);
      const anneeMatch = !anneeFiltre || dateRemb.getFullYear() === parseInt(anneeFiltre);
      const typePaiementMatch = typeFiltre === 'tous' || remb.typePaiement === typeFiltre;

      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        return (
          moisMatch &&
          anneeMatch &&
          typePaiementMatch &&
          (remb.typePrestation.toLowerCase().includes(searchLower) ||
           remb.beneficiaire.toLowerCase().includes(searchLower) ||
           remb.nomTiers.toLowerCase().includes(searchLower) ||
           remb.details.prestation.toLowerCase().includes(searchLower) ||
           remb.montantTotal.toString().includes(searchLower) ||
           remb.montantMutuelle.toString().includes(searchLower))
        );
      }

      return moisMatch && anneeMatch && typePaiementMatch;
    });

    // Grouper par période de paiement
    const groupes = remboursementsFiltres.reduce((acc, remb) => {
      const date = new Date(remb.datePaiement);
      const periode = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
      if (!acc[periode]) {
        acc[periode] = [];
      }
      acc[periode].push(remb);
      return acc;
    }, {} as Record<string, Remboursement[]>);

    // Trier les périodes par date décroissante
    return Object.entries(groupes)
      .sort(([a], [b]) => b.localeCompare(a))
      .map(([periode, remboursements]) => ({
        periode,
        remboursements: remboursements.sort((a, b) => 
          new Date(b.datePaiement).getTime() - new Date(a.datePaiement).getTime()
        )
      }));
  }, [mockRemboursements, moisFiltre, anneeFiltre, typeFiltre, searchQuery]);

  const handlePrint = () => {
    // Simulation de la génération d'un PDF pour l'exemple
    const periode = remboursementsGroupes.length > 0 
      ? new Date(parseInt(remboursementsGroupes[0].periode.split('-')[0]), parseInt(remboursementsGroupes[0].periode.split('-')[1]) - 1)
          .toLocaleString('fr-FR', { month: 'long', year: 'numeric' })
      : '';
    
    alert(`Génération du PDF des remboursements pour ${periode}...`);
  };

  return (
    <div className="bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Raccourcis */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-just-green mb-4">Raccourcis</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <a 
              href="/contact"
              className="flex items-center space-x-2 text-just-pink hover:bg-pink-50 p-4 rounded-lg transition-colors duration-150 group"
            >
              <DocumentTextIcon className="h-6 w-6 flex-shrink-0 transition-transform duration-150 group-hover:scale-110" />
              <span className="whitespace-nowrap font-medium">Demander un remboursement</span>
            </a>
            <a 
              href="/contact?tab=suivi"
              className="flex items-center space-x-2 text-just-pink hover:bg-pink-50 p-4 rounded-lg transition-colors duration-150 group"
            >
              <ChartBarIcon className="h-6 w-6 flex-shrink-0 transition-transform duration-150 group-hover:scale-110" />
              <span className="font-medium">Suivi des demandes</span>
            </a>
            <button 
              onClick={() => {
                const link = document.createElement('a');
                link.href = 'data:application/pdf;base64,JVBERi0xLjcKCjEgMCBvYmogICUgZW50cnkgcG9pbnQKPDwKICAvVHlwZSAvQ2F0YWxvZwogIC9QYWdlcyAyIDAgUgo+PgplbmRvYmoKCjIgMCBvYmoKPDwKICAvVHlwZSAvUGFnZXMKICAvTWVkaWFCb3ggWyAwIDAgMjAwIDIwMCBdCiAgL0NvdW50IDEKICAvS2lkcyBbIDMgMCBSIF0KPj4KZW5kb2JqCgozIDAgb2JqCjw8CiAgL1R5cGUgL1BhZ2UKICAvUGFyZW50IDIgMCBSCiAgL1Jlc291cmNlcyA8PAogICAgL0ZvbnQgPDwKICAgICAgL0YxIDQgMCBSIAogICAgPj4KICA+PgogIC9Db250ZW50cyA1IDAgUgo+PgplbmRvYmoKCjQgMCBvYmoKPDwKICAvVHlwZSAvRm9udAogIC9TdWJ0eXBlIC9UeXBlMQogIC9CYXNlRm9udCAvVGltZXMtUm9tYW4KPj4KZW5kb2JqCgo1IDAgb2JqICAlIHBhZ2UgY29udGVudAo8PAogIC9MZW5ndGggNDQKPj4Kc3RyZWFtCkJUCjcwIDUwIFRECi9GMSAxMiBUZgooR3JpbGxlIGRlIGdhcmFudGllcykgVGoKRVQKZW5kc3RyZWFtCmVuZG9iagoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDEwIDAwMDAwIG4gCjAwMDAwMDAwNzkgMDAwMDAgbiAKMDAwMDAwMDE3MyAwMDAwMCBuIAowMDAwMDAwMzAxIDAwMDAwIG4gCjAwMDAwMDAzODAgMDAwMDAgbiAKdHJhaWxlcgo8PAogIC9TaXplIDYKICAvUm9vdCAxIDAgUgo+PgpzdGFydHhyZWYKNDkyCiUlRU9G';
                link.download = 'grille_garanties.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="flex items-center space-x-2 text-just-pink hover:bg-pink-50 p-4 rounded-lg transition-colors duration-150 group"
            >
              <CreditCardIcon className="h-6 w-6 flex-shrink-0 transition-transform duration-150 group-hover:scale-110" />
              <span className="font-medium">Mes garanties</span>
            </button>
            <a 
              href="/contact"
              className="flex items-center space-x-2 text-just-pink hover:bg-pink-50 p-4 rounded-lg transition-colors duration-150 group"
            >
              <BanknotesIcon className="h-6 w-6 flex-shrink-0 transition-transform duration-150 group-hover:scale-110" />
              <span className="font-medium">Modifier mon RIB</span>
            </a>
          </div>
        </div>

        {/* Forfaits */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-just-green mb-4">Mes forfaits</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {mockForfaits.map((forfait, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">{forfait.type}</h3>
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block text-just-pink">
                        {Math.round((forfait.montantRestant / forfait.montantTotal) * 100)}%
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-just-green">
                        {forfait.montantRestant}€ / {forfait.montantTotal}€
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-pink-100">
                    <div
                      style={{ width: `${(forfait.montantRestant / forfait.montantTotal) * 100}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-just-pink"
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button 
            onClick={() => {
              const link = document.createElement('a');
              link.href = 'data:application/pdf;base64,JVBERi0xLjcKCjEgMCBvYmogICUgZW50cnkgcG9pbnQKPDwKICAvVHlwZSAvQ2F0YWxvZwogIC9QYWdlcyAyIDAgUgo+PgplbmRvYmoKCjIgMCBvYmoKPDwKICAvVHlwZSAvUGFnZXMKICAvTWVkaWFCb3ggWyAwIDAgMjAwIDIwMCBdCiAgL0NvdW50IDEKICAvS2lkcyBbIDMgMCBSIF0KPj4KZW5kb2JqCgozIDAgb2JqCjw8CiAgL1R5cGUgL1BhZ2UKICAvUGFyZW50IDIgMCBSCiAgL1Jlc291cmNlcyA8PAogICAgL0ZvbnQgPDwKICAgICAgL0YxIDQgMCBSIAogICAgPj4KICA+PgogIC9Db250ZW50cyA1IDAgUgo+PgplbmRvYmoKCjQgMCBvYmoKPDwKICAvVHlwZSAvRm9udAogIC9TdWJ0eXBlIC9UeXBlMQogIC9CYXNlRm9udCAvVGltZXMtUm9tYW4KPj4KZW5kb2JqCgo1IDAgb2JqICAlIHBhZ2UgY29udGVudAo8PAogIC9MZW5ndGggNDQKPj4Kc3RyZWFtCkJUCjcwIDUwIFRECi9GMSAxMiBUZgooR3JpbGxlIGRlIGdhcmFudGllcykgVGoKRVQKZW5kc3RyZWFtCmVuZG9iagoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDEwIDAwMDAwIG4gCjAwMDAwMDAwNzkgMDAwMDAgbiAKMDAwMDAwMDE3MyAwMDAwMCBuIAowMDAwMDAwMzAxIDAwMDAwIG4gCjAwMDAwMDAzODAgMDAwMDAgbiAKdHJhaWxlcgo8PAogIC9TaXplIDYKICAvUm9vdCAxIDAgUgo+PgpzdGFydHhyZWYKNDkyCiUlRU9G';
              link.download = 'grille_garanties.pdf';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            className="text-just-pink text-sm hover:underline mt-4 inline-block"
          >
            Voir ma grille de garantie
          </button>
        </div>

        {/* Liste des remboursements */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-just-green">Historique des remboursements</h2>
              <div className="flex items-center gap-4">
                <p className="text-sm text-just-gray">
                  {remboursementsGroupes.reduce((total, groupe) => total + groupe.remboursements.length, 0)} remboursement{remboursementsGroupes.reduce((total, groupe) => total + groupe.remboursements.length, 0) > 1 ? 's' : ''} trouvé{remboursementsGroupes.reduce((total, groupe) => total + groupe.remboursements.length, 0) > 1 ? 's' : ''}
                </p>
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-2 px-4 py-2 text-just-pink hover:bg-pink-50 rounded-lg transition-colors duration-150"
                >
                  <PrinterIcon className="h-5 w-5" />
                  <span>Imprimer</span>
                </button>
              </div>
            </div>

            {/* Filtres et recherche */}
            <div className="flex flex-col gap-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher par type de soin, bénéficiaire, professionnel..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-just-pink focus:border-transparent"
                />
              </div>
              <div className="flex flex-wrap gap-4">
                <select
                  value={typeFiltre}
                  onChange={(e) => setTypeFiltre(e.target.value)}
                  className="appearance-none border rounded p-2 pr-8 bg-white relative cursor-pointer bg-[url('data:image/svg+xml;charset=utf-8,<svg xmlns=%22http://www.w3.org/2000/svg%22 fill=%22none%22 viewBox=%220 0 20 20%22><path stroke=%22%236b7280%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22 stroke-width=%221.5%22 d=%22m6 8 4 4 4-4%22/></svg>')] bg-[length:20px] bg-[right_4px_center] bg-no-repeat"
                >
                  <option value="tous">Tous les paiements</option>
                  <option value="adherent">Paiement à l'adhérent</option>
                  <option value="professionnel">Paiement aux professionnels</option>
                </select>

                <select
                  value={moisFiltre}
                  onChange={(e) => setMoisFiltre(e.target.value)}
                  className="appearance-none border rounded p-2 pr-8 bg-white relative cursor-pointer bg-[url('data:image/svg+xml;charset=utf-8,<svg xmlns=%22http://www.w3.org/2000/svg%22 fill=%22none%22 viewBox=%220 0 20 20%22><path stroke=%22%236b7280%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22 stroke-width=%221.5%22 d=%22m6 8 4 4 4-4%22/></svg>')] bg-[length:20px] bg-[right_4px_center] bg-no-repeat"
                >
                  <option value="">Tous les mois</option>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map(mois => (
                    <option key={mois} value={mois}>
                      {new Date(2024, mois - 1).toLocaleString('fr-FR', { month: 'long' })}
                    </option>
                  ))}
                </select>

                <select
                  value={anneeFiltre}
                  onChange={(e) => setAnneeFiltre(e.target.value)}
                  className="appearance-none border rounded p-2 pr-8 bg-white relative cursor-pointer bg-[url('data:image/svg+xml;charset=utf-8,<svg xmlns=%22http://www.w3.org/2000/svg%22 fill=%22none%22 viewBox=%220 0 20 20%22><path stroke=%22%236b7280%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22 stroke-width=%221.5%22 d=%22m6 8 4 4 4-4%22/></svg>')] bg-[length:20px] bg-[right_4px_center] bg-no-repeat"
                >
                  {[2024, 2023, 2022].map(annee => (
                    <option key={annee} value={annee}>{annee}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {remboursementsGroupes.map(({ periode, remboursements }) => {
              const [annee, mois] = periode.split('-');
              const date = new Date(parseInt(annee), parseInt(mois) - 1);
              return (
                <div key={periode}>
                  <h3 className="px-6 py-3 bg-gray-50 text-lg font-semibold text-just-pink">
                    Paiements effectués en {date.toLocaleString('fr-FR', { month: 'long', year: 'numeric' })}
                  </h3>
                  <table className="min-w-full table-fixed divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="w-[120px] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                          Date de paiement
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Prestation
                        </th>
                        <th scope="col" className="w-[180px] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type de paiement
                        </th>
                        <th scope="col" className="w-[120px] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Remboursement
                        </th>
                        <th scope="col" className="w-[160px] px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {remboursements.map((remb) => (
                        <React.Fragment key={remb.id}>
                          <tr className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {new Date(remb.datePaiement).toLocaleDateString('fr-FR')}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              <div className="flex items-start gap-3">
                                {React.createElement(getIconForPrestation(remb.typePrestation), {
                                  className: "h-5 w-5 text-just-pink flex-shrink-0 mt-0.5"
                                })}
                                <div className="min-w-0">
                                  <p className="font-medium truncate">{remb.typePrestation}</p>
                                  <div className="flex items-center gap-2 text-just-gray text-xs">
                                    <span className="truncate">{remb.beneficiaire}</span>
                                    <span className="text-gray-300">•</span>
                                    <span className="truncate">{remb.nomTiers}</span>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm truncate">
                              <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                remb.typePaiement === 'adherent' 
                                  ? 'bg-just-light-pink text-just-pink' 
                                  : 'bg-just-light-green text-just-green'
                              }`}>
                                {remb.typePaiement === 'adherent' ? 'Paiement à l\'adhérent' : 'Paiement à un tiers'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-just-pink font-semibold">
                              {remb.montantMutuelle.toFixed(2)}€
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                              <button
                                onClick={() => setRemboursementOuvert(remb.id === remboursementOuvert ? null : remb.id)}
                                className="text-just-pink hover:text-just-pink/80 flex items-center gap-1 ml-auto"
                              >
                                <span>{remb.id === remboursementOuvert ? 'Masquer les détails' : 'Voir les détails'}</span>
                                <ChevronDownIcon 
                                  className={`h-4 w-4 transition-transform duration-200 ${
                                    remb.id === remboursementOuvert ? 'rotate-180' : ''
                                  }`}
                                />
                              </button>
                            </td>
                          </tr>
                          {remb.id === remboursementOuvert && (
                            <tr>
                              <td colSpan={7} className="px-6 py-4 bg-gray-50">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div className="space-y-4">
                                    <div>
                                      <p className="text-just-gray text-sm">Date des soins</p>
                                      <p className="font-medium">{new Date(remb.dateSoins).toLocaleDateString('fr-FR')}</p>
                                    </div>
                                    <div>
                                      <p className="text-just-gray text-sm">Prestation détaillée</p>
                                      <p className="font-medium">{remb.details.prestation}</p>
                                    </div>
                                    {remb.details.dateDebut !== remb.details.dateFin && (
                                      <div>
                                        <p className="text-just-gray text-sm">Période de soins</p>
                                        <p className="font-medium">
                                          Du {new Date(remb.details.dateDebut).toLocaleDateString('fr-FR')} au{' '}
                                          {new Date(remb.details.dateFin).toLocaleDateString('fr-FR')}
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                  <div>
                                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                                      <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                          <span className="text-just-gray text-sm">Montant total</span>
                                          <span className="font-medium">{remb.montantTotal.toFixed(2)} €</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                          <span className="text-just-gray text-sm">Part Sécurité sociale</span>
                                          <span className="font-medium text-just-green">{remb.montantSecu.toFixed(2)} €</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                          <span className="text-just-gray text-sm">Part mutuelle</span>
                                          <span className="font-medium text-just-pink">{remb.montantMutuelle.toFixed(2)} €</span>
                                        </div>
                                        <div className="flex justify-between items-center pt-2 border-t">
                                          <span className="text-just-gray text-sm font-medium">Reste à charge</span>
                                          <span className="font-medium text-gray-900">
                                            {(remb.montantTotal - remb.montantSecu - remb.montantMutuelle).toFixed(2)} €
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            })}
          </div>

          {remboursementsGroupes.length === 0 && (
            <div className="p-12 text-center">
              <p className="text-just-gray">Aucun remboursement trouvé pour cette période</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 