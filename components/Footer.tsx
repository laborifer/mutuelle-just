import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Logo */}
          <div className="col-span-1">
            <Image
              src="https://www.just.fr/images/logo.png"
              alt="Mutuelle Just"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
          </div>

          {/* Remboursements */}
          <div>
            <h3 className="text-just-green font-semibold mb-4">Remboursements</h3>
            <ul className="space-y-2">
              <li><Link href="/contact?tab=demande" className="text-just-gray hover:text-just-pink text-sm">Demander un remboursement</Link></li>
              <li><Link href="/remboursements" className="text-just-gray hover:text-just-pink text-sm">Consulter mes remboursements</Link></li>
            </ul>
          </div>

          {/* Contrat */}
          <div>
            <h3 className="text-just-green font-semibold mb-4">Contrat</h3>
            <ul className="space-y-2">
              <li><Link href="/contrat" className="text-just-gray hover:text-just-pink text-sm">Mes informations</Link></li>
              <li><Link href="/contrat#cotisations" className="text-just-gray hover:text-just-pink text-sm">Mes cotisations</Link></li>
              <li><Link href="/documents/carte-mutuelle.pdf" className="text-just-gray hover:text-just-pink text-sm">Ma carte de mutuelle</Link></li>
            </ul>
          </div>

          {/* Avantages */}
          <div>
            <h3 className="text-just-green font-semibold mb-4">Avantages</h3>
            <ul className="space-y-2">
              <li><Link href="/garanties" className="text-just-gray hover:text-just-pink text-sm">Mes garanties</Link></li>
              <li><Link href="/garanties#teleconsultation" className="text-just-gray hover:text-just-pink text-sm">Téléconsultation</Link></li>
              <li><Link href="/parrainage" className="text-just-gray hover:text-just-pink text-sm">Parrainage</Link></li>
            </ul>
          </div>

          {/* Aide */}
          <div>
            <h3 className="text-just-green font-semibold mb-4">Aide</h3>
            <ul className="space-y-2">
              <li><Link href="/contact?tab=demande" className="text-just-gray hover:text-just-pink text-sm">Faire une demande</Link></li>
              <li><Link href="/faq" className="text-just-gray hover:text-just-pink text-sm">FAQ</Link></li>
              <li><Link href="/contact?tab=rdv" className="text-just-gray hover:text-just-pink text-sm">Prendre rendez-vous</Link></li>
            </ul>
          </div>
        </div>

        {/* Liens légaux et réseaux sociaux */}
        <div className="mt-8 pt-8 border-t">
          <div className="flex flex-col items-center space-y-8">
            {/* Liens légaux centrés */}
            <div className="flex flex-wrap justify-center gap-4 text-sm text-just-gray">
              <Link href="/cgu" className="hover:text-just-pink">CGU</Link>
              <Link href="/mentions-legales" className="hover:text-just-pink">Mentions légales</Link>
              <Link href="/donnees-personnelles" className="hover:text-just-pink">Données personnelles</Link>
              <Link href="/politique-cookies" className="hover:text-just-pink">Politique cookies</Link>
              <Link href="/gestion-cookies" className="hover:text-just-pink">Gestion des cookies</Link>
            </div>
            {/* Réseaux sociaux */}
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/MutuelleJust" target="_blank" rel="noopener noreferrer" className="text-just-gray hover:text-just-pink">
                <FaFacebookF className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/mutuellej" target="_blank" rel="noopener noreferrer" className="text-just-gray hover:text-just-pink">
                <FaInstagram className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/company/mutuelle-just" target="_blank" rel="noopener noreferrer" className="text-just-gray hover:text-just-pink">
                <FaLinkedinIn className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 