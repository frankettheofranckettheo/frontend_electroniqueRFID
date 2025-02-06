'use client';

import React, { useState } from 'react';
import { FaCog, FaBell, FaUserShield, FaDatabase, FaSync } from 'react-icons/fa';

export default function ParametresPage() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [autoSync, setAutoSync] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-gray-100 rounded-lg">
            <FaCog className="w-6 h-6 text-gray-600" />
          </div>
          <h1 className="page-title">Paramètres</h1>
        </div>
        <p className="page-subtitle">
          Configurez les paramètres de l&apos;application selon vos besoins
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Notifications */}
        <div className="card">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <FaBell className="w-5 h-5 text-indigo-600" />
              <h2 className="text-lg font-semibold">Notifications</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Notifications push</p>
                  <p className="text-sm text-gray-500">
                    Recevoir des alertes pour les véhicules non conformes
                  </p>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={notificationsEnabled}
                    onChange={(e) => setNotificationsEnabled(e.target.checked)}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Synchronisation */}
        <div className="card">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <FaSync className="w-5 h-5 text-indigo-600" />
              <h2 className="text-lg font-semibold">Synchronisation</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Synchronisation automatique</p>
                  <p className="text-sm text-gray-500">
                    Mettre à jour automatiquement les données
                  </p>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={autoSync}
                    onChange={(e) => setAutoSync(e.target.checked)}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
              <button className="button-secondary w-full">
                Synchroniser maintenant
              </button>
            </div>
          </div>
        </div>

        {/* Sécurité */}
        <div className="card">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <FaUserShield className="w-5 h-5 text-indigo-600" />
              <h2 className="text-lg font-semibold">Sécurité</h2>
            </div>
            <div className="space-y-4">
              <button className="button-secondary w-full">
                Changer le mot de passe
              </button>
              <button className="button-secondary w-full">
                Configurer la double authentification
              </button>
            </div>
          </div>
        </div>

        {/* Base de données */}
        <div className="card">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <FaDatabase className="w-5 h-5 text-indigo-600" />
              <h2 className="text-lg font-semibold">Base de données</h2>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Espace utilisé</span>
                  <span className="text-sm text-gray-500">2.4 GB / 5 GB</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full"
                    style={{ width: '48%' }}
                  ></div>
                </div>
              </div>
              <button className="button-danger w-full">
                Vider le cache
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Préférences d'affichage */}
      <div className="card">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Préférences d&apos;affichage</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Mode sombre</p>
                <p className="text-sm text-gray-500">
                  Activer le thème sombre de l&apos;application
                </p>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={(e) => setDarkMode(e.target.checked)}
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
