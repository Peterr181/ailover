import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_DB_APIKEY,

  authDomain: process.env.NEXT_PUBLIC_DB_AUTHDOMAIN,

  projectId: process.env.NEXT_PUBLIC_DB_PROJECTID,

  storageBucket: process.env.NEXT_PUBLIC_DB_STORAGEBUCKET,

  messagingSenderId: process.env.NEXT_PUBLIC_DB_SENDERID,

  appId: process.env.NEXT_PUBLIC_DB_APPID,
};



const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth();

export const storage = getStorage(app);

export { app, db, auth };
