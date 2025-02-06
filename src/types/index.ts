/*export interface Vehicule {
  id: number;
  tagRFID: string;
  marque: string;
  modele: string;
  annee: number;
  immatriculation: string;
  proprietaire: string;
  conforme: boolean;
  dateVerification?: string;
  dateCreation: string;
  dateMiseAJour: string;
}

export enum TypeNonConformite {
  ASSURANCE_EXPIREE = 'ASSURANCE_EXPIREE',
  VIGNETTE_EXPIREE = 'VIGNETTE_EXPIREE',
  CONTROLE_TECHNIQUE_EXPIRE = 'CONTROLE_TECHNIQUE_EXPIRE'
}

export interface NonConformite {
  id: number;
  vehicule: Vehicule;
  type: TypeNonConformite;
  description: string;
  dateDetection: string;
  resolu: boolean;
  dateResolution?: string;
  verificationMinistere: boolean;
}

export interface User {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  role: 'ADMIN' | 'USER';
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}
*/



export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}
export interface User {
  id?: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  adresse: string;
}

export interface Assurance {
  id?: number;
  numeroPoliceDassurance: string;
  compagnieAssurance: string;
  dateDebut: Date;
  dateFin: Date;
  niveauCouverture: string;
}

export interface ControleTechnique {
  id?: number;
  numeroVisite: string;
  centreControle: string;
  dateControle: Date;
  dateExpiration: Date;
  typeControle: string;
  observations?: string;
  aptitudeCirculation: string;
  montant: number;
}

export interface LicenceTransport {
  id?: number;
  numeroLicence: string;
  typeTransport: string;
  dateEmission: Date;
  dateExpiration: Date;
  itineraire: string;
  montant: number;
  autoriteDemission: string;
  observations?: string;
}

export interface VignetteAutomobile {
  id?: number;
  numeroVignette: string;
  dateEmission: Date;
  dateExpiration: Date;
  montant: number;
  regionPaiement: string;
  numeroBordereau: string;
}

export enum MotifNonConformite {
  ASSURANCE_EXPIREE = "Assurance expirée",
  CONTROLE_TECHNIQUE_EXPIRE = "Contrôle technique expiré",
  VIGNETTE_EXPIREE = "Vignette expirée",
  LICENCE_TRANSPORT_EXPIREE = "Licence de transport expirée",
  TAXES_IMPAYEES = "Taxes impayées",
  LICENCE_TRANSPORT_INVALIDE = "Licence de transport invalide",
  AMENDES_IMPAYEES = "Amendes impayées",
  VEHICULE_VOLE = "vehicule volé",
  VIGNETTE_INVALIDE = "Vignette automobile invalide"
}

export interface VehiculeNonConforme extends Vehicule {
  motifs: MotifNonConformite[];
  detailsNonConformite?: string;
}

export interface Vehicule {
  id: number;
  estConforme: boolean;
  tagRfid: string;
  dateDernierPassage: string;
  datePremierPassage: string;
  motifs?: MotifNonConformite[];
}

export interface VehiculeMinistere {
  id?: number;
  marque: string;
  modele: string;
  anneeFabrication: number;
  tagRfid?: string;
  dateDernierPassage?: Date;
  datePremierPassage?: Date;
  couleur?: string;
  typeVehicule?: string;
  nombrePlaces?: number;
  cylindree?: number;
  carburant?: string;
  categoriePtac?: string;
  dateImportation?: Date;
  region?: string;
  etat?: string;
  typeUsage?: string;
  importation: boolean;
  proprietaire?: User;
  assurance?: Assurance;
  controleTechnique?: ControleTechnique;
  vignette?: VignetteAutomobile;
  licenceTransport?: LicenceTransport;
}

export interface FormatTag {
  tagRfid: string;
}