'use client';  // <- Cette ligne indique à Next.js que ce fichier est un composant client

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation"; // Remplacer useRouter de next/router par celui de next/navigation

// Définition des types
interface Vehicule {
  id: number;
  estConforme: boolean;
  tagRfid: string;
  dateDernierPassage: string;
  datePremierPassage: string;
}

interface VehiculeNonConforme extends Vehicule {
  motifs: MotifNonConformite[];
  detailsNonConformite: string;
}

interface MotifNonConformite {
  description: string;
}

// Service API pour récupérer les véhicules non conformes
const fetchVehiculesNonConformes = async (): Promise<VehiculeNonConforme[]> => {
  const response = await axios.get("http://localhost:9090/api/vehicules-non-conformes");
  return response.data;
};

// Composant principal
const VehiculesNonConformes: React.FC = () => {
  const { data, isLoading, error } = useQuery<VehiculeNonConforme[], Error>({
    queryKey: ["vehiculesNonConformes"],  // Corrected usage of queryKey
    queryFn: fetchVehiculesNonConformes,  // Corrected usage of queryFn
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedVehicule, setSelectedVehicule] = useState<VehiculeNonConforme | null>(null);
  const itemsPerPage = 5;

  const router = useRouter();  // Correct usage of useRouter for client-side navigation

  if (isLoading) return <div className="text-center p-4">Chargement...</div>;
  if (error instanceof Error) return <div className="text-center p-4">Une erreur s'est produite: {error.message}</div>;

  // Pagination
  const totalItems = data?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedData = data?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleVoirMotifs = (vehicule: VehiculeNonConforme) => {
    setSelectedVehicule(vehicule);
  };

  const handleVoirDetails = (vehicule: VehiculeNonConforme) => {
    router.push(`/vehicules/${vehicule.tagRfid}`);  // Naviguer vers la page de détails du véhicule en utilisant tagRfid
  };

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-3xl font-bold text-center text-gray-800">Véhicules Non Conformes</h1>

      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-3 text-left">ID</th>
            <th className="px-4 py-3 text-left">Tag RFID</th>
            <th className="px-4 py-3 text-left">Date Premier Passage</th>
            <th className="px-4 py-3 text-left">Date Dernier Passage</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData?.map((vehicule) => (
            <tr key={vehicule.id} className="hover:bg-gray-100">
              <td className="px-4 py-3">{vehicule.id}</td>
              <td className="px-4 py-3">{vehicule.tagRfid}</td>
              <td className="px-4 py-3">{vehicule.datePremierPassage}</td>
              <td className="px-4 py-3">{vehicule.dateDernierPassage}</td>
              <td className="px-4 py-3 flex justify-center gap-2">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                  onClick={() => handleVoirMotifs(vehicule)}
                >
                  Voir Motifs
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                  onClick={() => handleVoirDetails(vehicule)} // Passez l'objet 'vehicule' entier
                >
                  Détails
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center mt-4 gap-2">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-full transition-colors ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"
            }`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Modal pour les motifs */}
      {selectedVehicule && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-2/3 max-w-2xl">
            <h2 className="text-xl font-semibold mb-4">Motifs Non Conformité - {selectedVehicule.tagRfid}</h2>
            <ul className="list-disc pl-6 space-y-2">
              {selectedVehicule.motifs.map((motif, index) => (
                <li key={index} className="text-gray-700">{motif.description}</li>
              ))}
            </ul>
            <p className="mt-4"><strong>Détails Non Conformité:</strong> {selectedVehicule.detailsNonConformite}</p>
            <div className="flex justify-end mt-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                onClick={() => setSelectedVehicule(null)}
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehiculesNonConformes;
