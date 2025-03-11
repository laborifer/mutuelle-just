import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { UserCircleIcon } from '@heroicons/react/24/outline';

interface UserMenuProps {
  userName: string;
  onLogout: () => void;
}

const UserMenu = ({ userName, onLogout }: UserMenuProps) => {
  return (
    <Menu as="div" className="relative ml-3">
      <Menu.Button className="flex items-center text-base rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-just-pink">
        <span className="sr-only">Ouvrir le menu utilisateur</span>
        <UserCircleIcon className="h-8 w-8 text-just-gray hover:text-just-pink" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-4 py-2 text-base text-gray-900 border-b border-gray-200">
            <p className="font-medium">{userName}</p>
          </div>
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={onLogout}
                className={`${
                  active ? 'bg-gray-100' : ''
                } block w-full text-left px-4 py-2 text-base text-gray-700`}
              >
                Se déconnecter
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default UserMenu; 