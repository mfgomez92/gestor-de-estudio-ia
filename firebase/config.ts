// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported as isAnalyticsSupported } from "firebase/analytics";
import type { Analytics } from "firebase/analytics";
// Your web app's Firebase configuration
// Estas variables se leerán desde tu archivo .env.local
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const firebaseEnvMap: Partial<Record<keyof typeof firebaseConfig, string>> = {
  apiKey: "NEXT_PUBLIC_FIREBASE_API_KEY",
  authDomain: "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
  projectId: "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
  storageBucket: "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
  messagingSenderId: "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
  appId: "NEXT_PUBLIC_FIREBASE_APP_ID",
};

const missingEnvVars = Object.entries(firebaseEnvMap)
  .filter(([key]) => {
    const value = firebaseConfig[key as keyof typeof firebaseConfig];
    return value === undefined || value === null || value === "";
  })
  .map(([, envVar]) => envVar);

if (missingEnvVars.length > 0) {
  const errorMessage = `Missing Firebase config values. Define the env vars: ${missingEnvVars.join(", ")}`;
  throw new Error(errorMessage);
}

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const db = getFirestore(app);
const storage = getStorage(app);

let analyticsPromise: Promise<Analytics | null> | null = null;

const getAppAnalytics = () => {
  if (typeof window === "undefined") {
    return Promise.resolve(null);
  }

  if (!analyticsPromise) {
    analyticsPromise = isAnalyticsSupported().then((supported) =>
      supported ? getAnalytics(app) : null,
    );
  }

  return analyticsPromise;
};

export { db, storage, getAppAnalytics };
