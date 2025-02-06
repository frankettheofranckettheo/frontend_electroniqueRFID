'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { vehiculeService } from '@/services/vehiculeService';
import { FaChartBar, FaChartPie, FaChartLine } from 'react-icons/fa';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';

// Enregistrer les composants Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function StatistiquesPage() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['vehiculeStats'],
    queryFn: () => vehiculeService.getStatistics(),
  });

  const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];

  // Données pour le graphique des tendances
  const trendData = {
    labels: months,
    datasets: [
      {
        label: 'Véhicules enregistrés',
        data: stats?.monthlyRegistrations || Array(12).fill(0),
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
        tension: 0.4,
      },
      {
        label: 'Non conformités',
        data: stats?.monthlyNonConformities || Array(12).fill(0),
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
        tension: 0.4,
      },
    ],
  };

  // Données pour le graphique des marques
  const brandData = {
    labels: stats?.brandDistribution?.map((item) => item.brand) || [],
    datasets: [
      {
        data: stats?.brandDistribution?.map((item) => item.count) || [],
        backgroundColor: [
          'rgba(99, 102, 241, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(147, 51, 234, 0.8)',
          'rgba(236, 72, 153, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
      },
    ],
  };

  // Données pour le graphique des statuts
  const statusData = {
    labels: ['Conformes', 'Non Conformes'],
    datasets: [
      {
        data: [stats?.conformCount || 0, stats?.nonConformCount || 0],
        backgroundColor: ['rgba(34, 197, 94, 0.8)', 'rgba(239, 68, 68, 0.8)'],
      },
    ],
  };

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <FaChartBar className="w-6 h-6 text-indigo-600" />
          </div>
          <h1 className="page-title">Statistiques</h1>
        </div>
        <p className="page-subtitle">
          Analyse détaillée de la flotte de véhicules
        </p>
      </div>

      {isLoading ? (
        <div className="text-center py-8">Chargement des statistiques...</div>
      ) : (
        <>
          {/* Cartes de statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="card bg-indigo-50">
              <div className="p-4">
                <h3 className="text-sm font-medium text-indigo-600">Total Véhicules</h3>
                <p className="text-2xl font-bold text-indigo-700">{1 || 0}</p>
              </div>
            </div>
            <div className="card bg-green-50">
              <div className="p-4">
                <h3 className="text-sm font-medium text-green-600">Conformes</h3>
                <p className="text-2xl font-bold text-green-700">{0 || 0}</p>
              </div>
            </div>
            <div className="card bg-red-50">
              <div className="p-4">
                <h3 className="text-sm font-medium text-red-600">Non Conformes</h3>
                <p className="text-2xl font-bold text-red-700">{1 || 0}</p>
              </div>
            </div>
            <div className="card bg-blue-50">
              <div className="p-4">
                <h3 className="text-sm font-medium text-blue-600">Taux de Conformité</h3>
                <p className="text-2xl font-bold text-blue-700">
                  {0 || 0}%
                </p>
              </div>
            </div>
          </div>

          {/* Graphiques */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Tendances */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FaChartLine className="text-indigo-600" />
                Tendances Mensuelles
              </h3>
              <Line
                data={trendData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'bottom',
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                }}
              />
            </div>

            {/* Distribution par marque */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FaChartPie className="text-indigo-600" />
                Distribution par Marque
              </h3>
              <div className="h-[300px] flex items-center justify-center">
                <Pie
                  data={brandData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'bottom',
                      },
                    },
                  }}
                />
              </div>
            </div>

            {/* Statut des véhicules */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FaChartBar className="text-indigo-600" />
                Statut des Véhicules
              </h3>
              <Bar
                data={statusData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                }}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
