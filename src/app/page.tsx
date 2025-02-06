"use client"


import React, { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { FaCar, FaExclamationTriangle, FaCheckCircle, FaClock } from 'react-icons/fa';
import StatCard from '@/components/StatCard';
import { vehiculeService } from '@/services/vehiculeService';
import { sseService } from '@/services/sseService';

export default function DashboardPage() {
  const queryClient = useQueryClient();

  // Accéder correctement aux statistiques
  const { data: statsResponse } = useQuery({
    queryKey: ['vehiculeStats'],
    queryFn: () => vehiculeService.getStats(),
  });

  // Vérifier si les données existent avant de les utiliser
  const stats = statsResponse?.data;
const playNotificationSound = () => {
  const audio = new Audio("/notification.mp3");
  audio.play().catch(error => console.error("Erreur lors de la lecture du son: ", error));
};
  useEffect(() => {
    // Connect to SSE and refresh the whole page when events are received
    sseService.connect(() => {
      
      playNotificationSound();
      // Lors de l'événement SSE de "refresh", on recharge toute la page et on actualise les données
      window.location.reload(); // Rafraîchissement complet de la page

      // Invalidons les requêtes pour forcer un rechargement des données
      queryClient.invalidateQueries({ queryKey: ['vehiculeStats'] });
    });

    return () => {
      sseService.disconnect();
    };
  }, [queryClient]);

  const statCards = [
    {
      title: 'Total Véhicules',
      value: stats?.totalVehicules || 0,  // Utilisation de stats?.totalVehicules
      icon: <FaCar className="w-6 h-6 text-blue-600" />,
      color: 'bg-blue-50',
      change: { value: 12, isPositive: true },
    },
    {
      title: 'Non Conformes',
      value: stats?.nonConformes || 0,   // Utilisation de stats?.nonConformes
      icon: <FaExclamationTriangle className="w-6 h-6 text-red-600" />,
      color: 'bg-red-50',
      change: { value: 5, isPositive: false },
    },
    {
      title: 'Conformes',
      value: stats?.conformes || 0,      // Utilisation de stats?.conformes
      icon: <FaCheckCircle className="w-6 h-6 text-green-600" />,
      color: 'bg-green-50',
      change: { value: 8, isPositive: true },
    },
    {
      title: 'En Attente',
      value: stats?.enAttente || 0,     // Utilisation de stats?.enAttente
      icon: <FaClock className="w-6 h-6 text-yellow-600" />,
      color: 'bg-yellow-50',
      change: { value: 3, isPositive: true },
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="page-title">Tableau de bord</h1>
        <p className="page-subtitle">
          Aperçu général du système de suivi des véhicules
        </p>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Activités Récentes */}
      <div className="card">
        <h2 className="section-title">Activités Récentes</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                  <FaCar className="w-5 h-5 text-indigo-600" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  Nouveau véhicule enregistré
                </p>
                <p className="text-sm text-gray-500">
                  {new Date().toLocaleDateString('fr-FR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
              <div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Conforme
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Graphique ou tableau récapitulatif */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="section-title">Distribution par Marque</h2>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-gray-500">Graphique à venir</p>
          </div>
        </div>

        <div className="card">
          <h2 className="section-title">Statuts des Véhicules</h2>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-gray-500">Graphique à venir</p>
          </div>
        </div>
      </div>
    </div>
  );
}
