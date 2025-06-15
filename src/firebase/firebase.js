// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD_rApRuB390ojSfbyhKZauzlGYKYNOXX8',
  authDomain: 'shopping-ecommerce-875ce.firebaseapp.com',
  projectId: 'shopping-ecommerce-875ce',
  storageBucket: 'shopping-ecommerce-875ce.firebasestorage.app',
  messagingSenderId: '1006211950537',
  appId: '1:1006211950537:web:3c05c6a985ca9e2d08ea18',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
