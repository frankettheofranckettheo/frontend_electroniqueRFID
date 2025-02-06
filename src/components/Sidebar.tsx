'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FaHome,
  FaCar,
  FaExclamationTriangle,
  FaEnvelope,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
} from 'react-icons/fa';
import Image from 'next/image';

export default function Sidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const menuItems = [
    { label: 'Dashboard', icon: FaHome, href: '/' },
    { label: 'Véhicules', icon: FaCar, href: '/vehicules' },
    { label: 'Non Conformes', icon: FaExclamationTriangle, href: '/non-conformes' },
    { label: 'Statistiques', icon: FaChartBar, href: '/statistiques' },
    { label: 'Contact', icon: FaEnvelope, href: '/contact' },
    { label: 'Paramètres', icon: FaCog, href: '/parametres' },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <div className="bg-gray-900 text-white fixed left-0 top-0 h-full w-64 flex flex-col transition-all duration-300 ease-in-out">
      {/* Logo et titre */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center space-x-4">
          <div className="relative w-10 h-10">
            <div className="absolute inset-0 bg-indigo-500 rounded-xl rotate-6 transition-transform group-hover:rotate-12" />
            <div className="absolute inset-0 bg-white rounded-lg flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="Logo"
                width={32}
                height={32}
                className="rounded-lg transform transition-transform group-hover:scale-110"
              />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">RFID Track</h1>
            <p className="text-xs text-gray-400">Gestion de flotte</p>
          </div>
        </div>
      </div>

      {/* Menu principal */}
      <nav className="flex-1 overflow-y-auto py-6">
        <div className="px-4 mb-6">
          <h2 className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Menu Principal
          </h2>
        </div>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center px-6 py-3 text-sm font-medium transition-all duration-200 ${
                active
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <span
                className={`p-2 rounded-lg mr-3 transition-all duration-200 ${
                  active
                    ? 'bg-indigo-700 text-white'
                    : 'bg-gray-800 text-gray-400 group-hover:text-white group-hover:bg-gray-700'
                }`}
              >
                <Icon className="w-5 h-5" />
              </span>
              <span className="flex-1">{item.label}</span>
              {active && (
                <div className="w-1.5 h-8 bg-white rounded-l-full" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Profil utilisateur */}
      <div className="border-t border-gray-800 p-4">
        <div className="flex items-center space-x-3 px-2 py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-semibold">
              JD
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-white">Franck Daniel</h3>
            <p className="text-xs text-gray-400">Administrateur</p>
          </div>
          <button className="p-1.5 rounded-lg hover:bg-gray-700 text-gray-400 hover:text-white transition-colors duration-200">
            <FaSignOutAlt className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
