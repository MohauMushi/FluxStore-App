import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

/**
 * Firebase configuration object containing the API keys and identifiers.
 *
 * @constant {Object} firebaseConfig
 * @property {string} apiKey - The API key for Firebase project.
 * @property {string} authDomain - The authentication domain for Firebase project.
 * @property {string} projectId - The unique identifier for the Firebase project.
 * @property {string} storageBucket - The Cloud Storage bucket for the Firebase project.
 * @property {string} messagingSenderId - The sender ID for Firebase Cloud Messaging.
 * @property {string} appId - The unique identifier for the Firebase app.
 */
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

/**
 * Initialize Firebase app and exports Firestore and Auth instances.
 *
 * @function
 * @returns {void}
 */
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig); // Initialize a new Firebase app if none exists
} else {
  app = getApps()[0]; // Use the existing app if already initialized
}

const auth = getAuth(app); // Get Firebase Auth instance
const db = getFirestore(app); // Get Firestore instance

// Exporting Firestore, Firebase app, and Auth instances for usage in the application
export { db, app, auth };
