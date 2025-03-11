import { Fragment } from 'react';
import { Transition } from '@headlessui/react';
import { CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export interface Notification {
  id: string;
  type: 'remboursement' | 'demande' | 'info';
  title: string;
  message: string;
  date: string;
  read: boolean;
  link?: string;
}

interface NotificationsPanelProps {
  isOpen: boolean;
  notifications: Notification[];
  onClose: () => void;
  onMarkAsRead: (id: string) => void;
}

const mockNotifications: Notification[] = [
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
];

export default function NotificationsPanel({ isOpen, onClose, onMarkAsRead }: NotificationsPanelProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'remboursement':
        return <CheckCircleIcon className="h-6 w-6 text-green-500" />;
      case 'demande':
        return <InformationCircleIcon className="h-6 w-6 text-blue-500" />;
      case 'info':
        return <ExclamationCircleIcon className="h-6 w-6 text-yellow-500" />;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <Transition
      show={isOpen}
      as={Fragment}
      enter="transition ease-out duration-200"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <div className="absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Fermer</span>
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {mockNotifications.length === 0 ? (
              <p className="text-gray-500 text-center py-4">Aucune notification</p>
            ) : (
              mockNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-start space-x-3 p-3 rounded-lg ${
                    notification.read ? 'bg-white' : 'bg-gray-50'
                  } hover:bg-gray-100 transition-colors duration-200`}
                  onClick={() => onMarkAsRead(notification.id)}
                >
                  <div className="flex-shrink-0">{getIcon(notification.type)}</div>
                  <div className="flex-1 min-w-0">
                    {notification.link ? (
                      <Link href={notification.link} className="block">
                        <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                        <p className="text-sm text-gray-500">{notification.message}</p>
                        <p className="text-xs text-gray-400 mt-1">{formatDate(notification.date)}</p>
                      </Link>
                    ) : (
                      <>
                        <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                        <p className="text-sm text-gray-500">{notification.message}</p>
                        <p className="text-xs text-gray-400 mt-1">{formatDate(notification.date)}</p>
                      </>
                    )}
                  </div>
                  {!notification.read && (
                    <div className="flex-shrink-0">
                      <div className="h-2 w-2 bg-just-pink rounded-full"></div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Transition>
  );
} 