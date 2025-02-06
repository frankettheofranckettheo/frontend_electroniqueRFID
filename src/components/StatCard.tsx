'use client';

import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  change?: {
    value: number;
    isPositive: boolean;
  };
}

export default function StatCard({ title, value, icon, color, change }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className={`p-6 ${color}`}>
        <div className="flex items-center justify-between">
          <div className="bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-sm">
            {icon}
          </div>
          {change && (
            <span
              className={`${
                change.isPositive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              } text-sm font-semibold px-3 py-1 rounded-full`}
            >
              {change.isPositive ? '+' : '-'}
              {Math.abs(change.value)}%
            </span>
          )}
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <p className="text-3xl font-bold mt-2 text-gray-900">{value}</p>
        </div>
      </div>
      <div className="bg-gray-50 px-6 py-3">
        <div className="text-sm text-gray-500">
          Mis à jour {new Date().toLocaleDateString('fr-FR', { 
            hour: '2-digit',
            minute: '2-digit'
          })}
        </div>
      </div>
    </div>
  );
}
