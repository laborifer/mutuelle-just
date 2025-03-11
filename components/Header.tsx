'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { BellIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';
import NotificationsPanel, { Notification } from './NotificationsPanel';
import UserMenu from './UserMenu';

const Header = () => {
  const pathname = usePathname();
  const [isNotificationsPanelOpen, setIsNotificationsPanelOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'remboursement',
      title: 'Nouveau remboursement',
      message: 'Consultation Dr Martin - 25€ remboursés',
      date: '2024-03-20T10:30:00',
      read: false,
      link: '/remboursements'
    },
    {
      id: '2',
      type: 'demande',
      title: 'Demande traitée',
      message: 'Votre demande de carte tiers payant a été traitée',
      date: '2024-03-19T15:45:00',
      read: false,
      link: '/contact?tab=suivi'
    },
    {
      id: '3',
      type: 'info',
      title: 'Rappel cotisation',
      message: 'Votre cotisation sera prélevée le 5 avril',
      date: '2024-03-18T09:00:00',
      read: true
    }
  ]);

  const unreadCount = notifications.filter(notif => !notif.read).length;

  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const handleLogout = () => {
    // TODO: Implémenter la déconnexion
    console.log('Déconnexion...');
  };

  const navigation = [
    { name: 'Accueil', href: '/' },
    { name: 'Mon contrat', href: '/contrat' },
    { name: 'Mes remboursements', href: '/remboursements' },
    { name: 'Nous contacter', href: '/contact' },
    { name: 'Mes avantages', href: '/avantages' }
  ];

  // TODO: Récupérer le nom de l'utilisateur depuis le contexte d'authentification
  const userName = 'Jean Dupont';

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center h-16">
            <Image
              src="https://www.just.fr/images/logo.png"
              alt="Logo Mutuelle Just"
              width={100}
              height={33}
              priority
              className="object-contain"
              style={{ maxHeight: '40px', width: 'auto' }}
            />
          </Link>

          {/* Navigation principale */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`inline-flex items-center px-1 pt-1 text-base font-medium border-b-2 ${
                  pathname === item.href
                    ? 'border-just-pink text-just-pink'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Menu mobile */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-just-pink"
              aria-expanded="false"
            >
              <span className="sr-only">Ouvrir le menu</span>
              {/* Icon menu */}
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Actions rapides */}
          <div className="flex items-center space-x-4">
            {/* FAQ */}
            <Link href="/faq" className="text-just-gray hover:text-just-pink p-2">
              <QuestionMarkCircleIcon className="h-6 w-6" />
            </Link>

            {/* Notifications */}
            <div className="relative">
              <button 
                className="text-just-gray hover:text-just-pink p-2 relative"
                onClick={() => setIsNotificationsPanelOpen(!isNotificationsPanelOpen)}
              >
                <BellIcon className="h-6 w-6" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 flex items-center justify-center">
                    <span className="absolute w-3 h-3 bg-just-pink rounded-full"></span>
                    <span className="relative text-[10px] text-white font-bold">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  </span>
                )}
              </button>

              {/* Panneau de notifications */}
              <div className="absolute right-0 z-50">
                <NotificationsPanel
                  isOpen={isNotificationsPanelOpen}
                  notifications={notifications}
                  onClose={() => setIsNotificationsPanelOpen(false)}
                  onMarkAsRead={handleMarkAsRead}
                />
              </div>
            </div>

            {/* Menu utilisateur */}
            <UserMenu userName={userName} onLogout={handleLogout} />
          </div>
        </div>
      </div>

      {/* Menu mobile panel */}
      <div className="hidden md:hidden">
        <div className="pt-2 pb-3 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                pathname === item.href
                  ? 'bg-just-light-pink border-just-pink text-just-pink'
                  : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header; 