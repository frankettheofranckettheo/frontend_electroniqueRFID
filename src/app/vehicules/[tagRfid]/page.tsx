import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { IoArrowBack } from "react-icons/io5";

interface Vehicule {
  id?: number;
  marque: string;
  modele: string;
  anneeFabrication: number;
  tagRfid: string;
  dateDernierPassage: string;
  datePremierPassage: string;
  couleur?: string;
  typeVehicule?: string;
  nombrePlaces?: number;
  carburant?: string;
  proprietaire?: { nom: string; prenom: string };
  assurance?: { numeroPoliceDassurance: string; compagnieAssurance: string; dateDebut: string; dateFin: string };
  controleTechnique?: { numeroVisite: string; centreControle: string; dateControle: string; dateExpiration: string };
  vignette?: { numeroVignette: string; dateEmission: string; dateExpiration: string };
  licenceTransport?: { numeroLicence: string; dateEmission: string; dateExpiration: string };
}

const fetchVehicule = async (tagRfid: string): Promise<Vehicule | null> => {
  try {
    const response = await fetch(`http://localhost:9095/bdministere/vehicules/tag/${tagRfid}`, {
      cache: "no-store", // Évite la mise en cache pour obtenir des données récentes
    });
    if (!response.ok) throw new Error("Véhicule non trouvé");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

const formatDate = (dateString?: string) => {
  if (!dateString) return "Non renseigné";
  const dateObj = new Date(dateString);
  return isNaN(dateObj.getTime()) ? "Date invalide" : format(dateObj, "dd/MM/yyyy HH:mm", { locale: fr });
};

const VehiculeDetailsPage = async ({ params }: { params: { tagRfid?: string } }) => {
  if (!params?.tagRfid) return <div>Paramètre manquant</div>;

  const vehicule = await fetchVehicule(params.tagRfid);
  if (!vehicule) return <div>Véhicule non trouvé</div>;

  return (
    <div className="space-y-8 p-6 bg-gray-100 min-h-screen">
      {/* Flèche de retour */}
      <div className="flex items-center mb-6">
        <a href="/vehicules" className="text-blue-500 hover:text-blue-700 flex items-center space-x-2">
          <IoArrowBack size={24} />
          <span className="text-lg font-semibold">Retour</span>
        </a>
      </div>

      <div className="bg-white p-8 shadow-lg rounded-lg space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center">
          {vehicule.marque} - {vehicule.modele}
        </h1>
        <p className="text-lg text-gray-600 text-center">
          <strong>Tag RFID:</strong> {vehicule.tagRfid}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p><strong>Année de fabrication:</strong> {vehicule.anneeFabrication}</p>
            <p><strong>Couleur:</strong> {vehicule.couleur || "Non renseignée"}</p>
            <p><strong>Type de véhicule:</strong> {vehicule.typeVehicule || "Non renseigné"}</p>
            <p><strong>Carburant:</strong> {vehicule.carburant || "Non renseigné"}</p>
            <p><strong>Nombre de places:</strong> {vehicule.nombrePlaces ?? "Non renseigné"}</p>
          </div>
          <div>
            <p><strong>Dernier passage:</strong> {formatDate(vehicule.dateDernierPassage)}</p>
            <p><strong>Premier passage:</strong> {formatDate(vehicule.datePremierPassage)}</p>
          </div>
        </div>

        {vehicule.assurance && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold">Assurance:</h3>
            <p><strong>Numéro de police:</strong> {vehicule.assurance.numeroPoliceDassurance}</p>
            <p><strong>Compagnie:</strong> {vehicule.assurance.compagnieAssurance}</p>
            <p><strong>Période:</strong> {formatDate(vehicule.assurance.dateDebut)} - {formatDate(vehicule.assurance.dateFin)}</p>
          </div>
        )}

        {vehicule.controleTechnique && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold">Contrôle Technique:</h3>
            <p><strong>Numéro:</strong> {vehicule.controleTechnique.numeroVisite}</p>
            <p><strong>Centre:</strong> {vehicule.controleTechnique.centreControle}</p>
            <p><strong>Contrôle:</strong> {formatDate(vehicule.controleTechnique.dateControle)}</p>
            <p><strong>Expiration:</strong> {formatDate(vehicule.controleTechnique.dateExpiration)}</p>
          </div>
        )}

        {vehicule.vignette && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold">Vignette Automobile:</h3>
            <p><strong>Numéro de vignette:</strong> {vehicule.vignette.numeroVignette}</p>
            <p><strong>Date d'émission:</strong> {formatDate(vehicule.vignette.dateEmission)}</p>
            <p><strong>Date d'expiration:</strong> {formatDate(vehicule.vignette.dateExpiration)}</p>
          </div>
        )}

        {vehicule.licenceTransport && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold">Licence de Transport:</h3>
            <p><strong>Numéro de licence:</strong> {vehicule.licenceTransport.numeroLicence}</p>
            <p><strong>Émission:</strong> {formatDate(vehicule.licenceTransport.dateEmission)}</p>
            <p><strong>Expiration:</strong> {formatDate(vehicule.licenceTransport.dateExpiration)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VehiculeDetailsPage;
