'use client';

import React from 'react';
import { Vehicule } from '@/types';

interface VehiculeFormProps {
  initialData?: Partial<Vehicule>;
  onSubmit: (data: Partial<Vehicule>) => void;
  isLoading?: boolean;
}

export default function VehiculeForm({
  initialData = {},
  onSubmit,
  isLoading = false,
}: VehiculeFormProps) {
  const [formData, setFormData] = React.useState<Partial<Vehicule>>({
    tagRFID: '',
    marque: '',
    modele: '',
    annee: new Date().getFullYear(),
    immatriculation: '',
    proprietaire: '',
    ...initialData,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'annee' ? parseInt(value) : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="tagRFID"
            className="block text-sm font-medium text-gray-700"
          >
            Tag RFID
          </label>
          <input
            type="text"
            id="tagRFID"
            name="tagRFID"
            value={formData.tagRFID}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="immatriculation"
            className="block text-sm font-medium text-gray-700"
          >
            Immatriculation
          </label>
          <input
            type="text"
            id="immatriculation"
            name="immatriculation"
            value={formData.immatriculation}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="marque"
            className="block text-sm font-medium text-gray-700"
          >
            Marque
          </label>
          <input
            type="text"
            id="marque"
            name="marque"
            value={formData.marque}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="modele"
            className="block text-sm font-medium text-gray-700"
          >
            Modèle
          </label>
          <input
            type="text"
            id="modele"
            name="modele"
            value={formData.modele}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="annee"
            className="block text-sm font-medium text-gray-700"
          >
            Année
          </label>
          <input
            type="number"
            id="annee"
            name="annee"
            value={formData.annee}
            onChange={handleChange}
            min="1900"
            max={new Date().getFullYear()}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="proprietaire"
            className="block text-sm font-medium text-gray-700"
          >
            Propriétaire
          </label>
          <input
            type="text"
            id="proprietaire"
            name="proprietaire"
            value={formData.proprietaire}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isLoading ? 'Enregistrement...' : 'Enregistrer'}
        </button>
      </div>
    </form>
  );
}
