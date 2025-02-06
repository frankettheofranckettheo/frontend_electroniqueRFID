import axios from 'axios';
import {  VehiculeNonConforme, MotifNonConformite,VignetteAutomobile,LicenceTransport,ControleTechnique,Assurance, User,ApiResponse } from '@/types';


interface Vehicule {
  id: number;
  estConforme: boolean;
  tagRfid: string;
  dateDernierPassage: string;
  datePremierPassage: string;
  motifs?: MotifNonConformite[];
}
// Interface pour les statistiques des véhicules
interface VehiculeStats {
  totalVehicules: number;  // Nombre total de véhicules
  conformes: number;       // Nombre de véhicules conformes
  nonConformes: number;    // Nombre de véhicules non conformes
  enAttente: number;       // Nombre de véhicules en attente (si applicable)
}
// Configuration d'Axios
const apimin = axios.create({
  baseURL: 'https://localhost:9095/bdministere', // Remplace par l'URL de ton backend
  headers: {
    'Content-Type': 'application/json',
  },
});
const api = axios.create({
  baseURL: 'https://localhost:9090/api', // Remplace par l'URL de ton backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export const vehiculeService = {
  getAllVehicules: async (): Promise<ApiResponse<Vehicule[]>> => {
    try {
      const response = await api.get('/vehicules');
      return response.data;
    } catch (error) {
      throw new Error('Erreur lors de la récupération des véhicules');
    }
  },

  getVehiculeByTag: async (tagRFID: string): Promise<ApiResponse<Vehicule>> => {
    try {
      const response = await apimin.get(`/vehicules/tag/${tagRFID}`);
      return response.data;
    } catch (error) {
      throw new Error(`Erreur lors de la récupération du véhicule avec le tag ${tagRFID}`);
    }
  },


  
  getNonConformes: async (): Promise<ApiResponse<VehiculeNonConforme[]>> => {
    try {
      const response = await api.get('/vehicules-non-conformes');
      return response.data;
    } catch (error) {
      throw new Error('Erreur lors de la récupération des véhicules non conformes');
    }
  },
  async getStats(): Promise<ApiResponse<VehiculeStats>> {
    try {
      const response = await fetch('http://localhost:9090/api/vehicules'); // URL de ton API qui retourne tous les véhicules
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des véhicules');
      }
  
      const vehicules: Vehicule[] = await response.json(); // Liste des véhicules
  
      // Calcul des statistiques en fonction de l'attribut estConforme
      const totalVehicules = vehicules.length;
      const conformes = vehicules.filter(v => v.estConforme).length;
      const nonConformes = totalVehicules - conformes;
      const enAttente = 0; // À adapter si tu as une autre logique pour les véhicules "en attente"
  
      // Retourner les statistiques
      return {
        data: {
          totalVehicules,
          conformes,
          nonConformes,
          enAttente,
        },
        success: true,
        message: 'Statistiques récupérées avec succès',
      };
    } catch (error) {
      return {
        data: {
          totalVehicules: 0,
          conformes: 0,
          nonConformes: 0,
          enAttente: 0,
        },
        success: false,
        message: (error as Error).message,
      };
    }
  }
  

 /*
 deleteVehicule: async (id: number): Promise<ApiResponse<void>> => {
    try {
      const response = await api.delete(`/vehicules/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Erreur lors de la suppression du véhicule avec l'ID ${id}`);
    }
  },

  getVehiculeById: async (id: number): Promise<ApiResponse<Vehicule>> => {
    try {
      const response = await api.get(`/vehicules/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Erreur lors de la récupération du véhicule avec l'ID ${id}`);
    }
  },

  createVehicule: async (vehicule: Omit<Vehicule, 'id'>): Promise<ApiResponse<Vehicule>> => {
    try {
      const response = await api.post('/vehicules', vehicule);
      return response.data;
    } catch (error) {
      throw new Error('Erreur lors de la création du véhicule');
    }
  },

  updateVehicule: async (id: number, vehicule: Partial<Vehicule>): Promise<ApiResponse<Vehicule>> => {
    try {
      const response = await api.put(`/vehicules/${id}`, vehicule);
      return response.data;
    } catch (error) {
      throw new Error(`Erreur lors de la mise à jour du véhicule avec l'ID ${id}`);
    }
  },
 */ 

  
};
