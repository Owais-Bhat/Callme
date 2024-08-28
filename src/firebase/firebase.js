import { initializeApp, getApp, getApps } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAl0G8Pb8CenP11JshSJOPoDpQtaAu6Ugw",
  authDomain: "callme-ccc43.firebaseapp.com",
  databaseURL: "https://callme-ccc43-default-rtdb.firebaseio.com",
  projectId: "callme-ccc43",
  storageBucket: "callme-ccc43.appspot.com",
  messagingSenderId: "1076782276158",
  appId: "1:1076782276158:web:d062abbc65d98038397b6f",
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const database = getDatabase(app);

// Set persistence for the auth instance
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log(
      "Authentication persistence is set to browserLocalPersistence."
    );
  })
  .catch((error) => {
    console.error("Error setting persistence:", error);
  });

export { auth, database };
