import { initializeApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyC5FxwXY3utSw9hl8bAoE0i3pzu3vCsql8",
  authDomain: "mindbooster-acdc7.firebaseapp.com",
  projectId: "mindbooster-acdc7",
  storageBucket: "mindbooster-acdc7.appspot.com",
  messagingSenderId: "693366132335",
  appId: "1:693366132335:web:424684d337fc3bc5adc79a",
  measurementId: "G-3K2GRVX0ZR"
};

const app = initializeApp(firebaseConfig);
const firestore = initializeFirestore(app, { experimentalForceLongPolling: true })

export default firestore

