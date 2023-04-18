import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD3sC4PHMOU6VNLCPPCLH9Oe6Nv6HcUkNk",
    authDomain: "crud-zenhome.firebaseapp.com",
    projectId: "crud-zenhome",
    storageBucket: "crud-zenhome.appspot.com",
    messagingSenderId: "661185104837",
    appId: "1:661185104837:web:fb31b33ff39de0d49a19ac"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export {db}