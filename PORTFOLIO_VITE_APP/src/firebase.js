import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyBAC6WDSyvKRk50ztYFNZks1cUYPVasrpY",
    authDomain: "darshan-portfolio-99802.firebaseapp.com",
    projectId: "darshan-portfolio-99802",
    storageBucket: "darshan-portfolio-99802.firebasestorage.app",
    messagingSenderId: "726207946375",
    appId: "1:726207946375:web:c65f763489a58f6c37e222",
    measurementId: "G-L0BVNLM5KB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export { db, analytics };
