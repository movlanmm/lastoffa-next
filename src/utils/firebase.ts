// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY
const authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
const messagingSenderId = process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID
const measurementId = process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID


const firebaseConfig = {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
    measurementId
};



const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app);
export const storage = getStorage(app)
