import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// On récupère les clés depuis le fichier .env via Vite
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Petite fonction pour tester si ça marche
async function testerConnexion() {
  try {
    const docRef = await addDoc(collection(db, "test_connexion"), {
      message: "Bravo ! Mon inventaire est connecté !",
      date: new Date(),
    });
    console.log("Document envoyé avec succès ! ID :", docRef.id);
    alert("Connexion réussie ! Vérifie ta console Firebase.");
  } catch (e) {
    console.error("Erreur de connexion :", e);
    alert("Erreur ! Regarde la console (F12)");
  }
}

// On expose la fonction au bouton (on va créer le bouton juste après)
document.querySelector("#app").innerHTML = `
  <div>
    <h1>Keepthetrackk 📦</h1>
    <button id="btn-test">Tester la connexion Firebase</button>
  </div>
`;

document.querySelector("#btn-test").addEventListener("click", testerConnexion);
