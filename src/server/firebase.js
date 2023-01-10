import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAAbpPsGqCUru1SUyBriclT_TPziRU-NTM",
  authDomain: "shoppy-dfb89.firebaseapp.com",
  databaseURL: "https://shoppy-dfb89-default-rtdb.firebaseio.com",
  projectId: "shoppy-dfb89",
  storageBucket: "shoppy-dfb89.appspot.com",
  messagingSenderId: "925404219436",
  appId: "1:925404219436:web:9b374f790e68e12e8e2989",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const database = getDatabase(app);
export const provider = new GoogleAuthProvider();
export const auth = getAuth();

export default db;
