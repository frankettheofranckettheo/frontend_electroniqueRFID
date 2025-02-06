"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa';
import Link from 'next/link';

interface Vehicule {
  id: number;
  estConforme: boolean;
  tagRfid: string;
  dateDernierPassage: string;
  datePremierPassage: string;
  motifs?: MotifNonConformite[];
}

interface MotifNonConformite {
  description: string;
}

export default function VehiculesPage() {
  const searchTerm = useState('');
  const [selectedMotifs, setSelectedMotifs] = useState<MotifNonConformite[] | null>(null);

  const fetchVehicules = async (): Promise<Vehicule[]> => {
    const response = await axios.get('http://localhost:9090/api/vehicules'); // Remplacez par votre endpoint réel
    return response.data;
  };

  const { data: vehicules, isLoading } = useQuery({
    queryKey: ['vehicules'],
    queryFn: fetchVehicules,
  });

  const openMotifsModal = (motifs: MotifNonConformite[] | undefined) => {
    setSelectedMotifs(motifs || []);
  };

  const closeMotifsModal = () => {
    setSelectedMotifs(null);
  };

  const filteredVehicules = vehicules?.filter((vehicule) =>
    Object.values(vehicule).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'dd/MM/yyyy HH:mm', { locale: fr });
  };

  return (
    <div className="space-y-8 p-4 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800">Gestion des Véhicules</h1>

      <div className="bg-white p-6 shadow-md rounded-lg">
        <table className="table-auto w-full text-left">
          <thead>
            <tr className="bg-gray-100 text-gray-600">
              <th className="p-4">Tag RFID</th>
              <th className="p-4">Premier Passage</th>
              <th className="p-4">Dernier Passage</th>
              <th className="p-4">Conformité</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredVehicules?.map((vehicule) => (
              <tr key={vehicule.id} className="hover:bg-gray-50">
                <td className="p-4">{vehicule.tagRfid}</td>
                <td className="p-4">{formatDate(vehicule.datePremierPassage)}</td>
                <td className="p-4">{formatDate(vehicule.dateDernierPassage)}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 text-sm rounded-full ${
                      vehicule.estConforme
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {vehicule.estConforme ? 'Conforme' : 'Non Conforme'}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex space-x-4">
                    <Link href={`/vehicules/${vehicule.tagRfid}`} className="text-indigo-600">
                      <FaInfoCircle className="inline-block mr-1" />
                      Détails
                    </Link>
                    {!vehicule.estConforme && vehicule.motifs && (
                      <button
                        onClick={() => openMotifsModal(vehicule.motifs)}
                        className="text-red-600"
                      >
                        <FaExclamationTriangle className="inline-block mr-1" />
                        Motifs
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isLoading && <p className="text-center text-gray-500 py-4">Chargement...</p>}
        {!isLoading && filteredVehicules?.length === 0 && (
          <p className="text-center text-gray-500 py-4">Aucun véhicule trouvé</p>
        )}
      </div>

      {/* Modal */}
      {selectedMotifs && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Motifs de Non-Conformité</h2>
            
            <ul className="space-y-2">
              {selectedMotifs.map((motif, index) => (
                <li key={index} className="text-gray-700">
                  <FaExclamationTriangle className="inline-block mr-2 text-red-600" />
                  {motif.description}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex justify-end">
              <button
                onClick={closeMotifsModal}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
