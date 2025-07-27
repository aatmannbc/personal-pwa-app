import { initializeApp } from 'firebase/app';
import { getFirestore, enableNetwork, disableNetwork } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import firebaseConfig from '../config/firebase.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore (database)
export const db = getFirestore(app);

// Initialize Auth
export const auth = getAuth(app);

// PWA offline support
export const enableOfflineSupport = () => {
  return disableNetwork(db);
};

export const enableOnlineSupport = () => {
  return enableNetwork(db);
};

// Check if online
export const isOnline = () => {
  return navigator.onLine;
};

export default app;
