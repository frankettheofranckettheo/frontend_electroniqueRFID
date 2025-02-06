"use client"
import { EventSourcePolyfill } from "event-source-polyfill";

class SSEService {
    private eventSource: EventSourcePolyfill | null = null;
    private readonly url = "http://localhost:9090/envoyer/tag/subscribe";
    private readonly reconnectInterval = 1000; // 5 secondes avant de tenter une reconnexion

    private playNotificationSound() {
        const audio = new Audio("/notification.mp3");
        audio.play().catch(error => console.error("Erreur lors de la lecture du son: ", error));
    }

    connect(onRefresh: () => void) {
        if (this.eventSource) {
            this.disconnect();
        }

        console.log("🔗 Tentative de connexion SSE...");

        this.eventSource = new EventSourcePolyfill(this.url, {
            heartbeatTimeout: 86400000, // Timeout pour éviter la déconnexion automatique
            withCredentials: false, // Si besoin d'authentification, changer à true
        });

        // ✅ Connexion établie avec succès
        this.eventSource.onopen = () => {
            console.log("✅ Connexion SSE établie avec succès.");
        };

        // 📩 Réception d'un message SSE
        this.eventSource.onmessage = (event) => {
            console.log("📩 SSE event reçu:", event);
            console.log("📄 Data:", event.data);

            if (event.data.includes("refresh")) {
                console.log("🔄 Rafraîchissement déclenché !");
                this.playNotificationSound();
                onRefresh();
            }
        };

        // ❌ Gestion des erreurs et tentative de reconnexion
        this.eventSource.onerror = (error) => {
            console.error("❌ Erreur SSE détectée:", error);

            this.disconnect();
            console.log(`🔄 Tentative de reconnexion dans ${this.reconnectInterval / 1000} secondes...`);

            setTimeout(() => this.connect(onRefresh), this.reconnectInterval);
        };
    }

    disconnect() {
        if (this.eventSource) {
            console.log("🔌 Déconnexion SSE.");
            this.eventSource.close();
            this.eventSource = null;
        }
    }
}

// Export d'une instance unique du service
export const sseService = new SSEService();
