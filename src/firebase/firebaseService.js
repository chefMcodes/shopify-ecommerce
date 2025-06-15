// src/utils/firebaseService.js
import { db } from '../firebase/firebase';
import {
  doc,
  setDoc,
  getDocs,
  collection,
  deleteDoc,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';

export const saveCartToFirestore = async (uid, cartItems) => {
  const batch = cartItems.map(item => {
    const docRef = doc(db, `users/${uid}/cartItems/${item.id}_${item.size}`);
    return setDoc(docRef, item);
  });
  await Promise.all(batch);
};

export const getCartFromFirestore = async uid => {
  const querySnapshot = await getDocs(collection(db, `users/${uid}/cartItems`));
  const cartItems = [];
  querySnapshot.forEach(doc => {
    cartItems.push(doc.data());
  });
  return cartItems;
};

export const removeCartItemFromFirestore = async (uid, id, size) => {
  const docRef = doc(db, `users/${uid}/cartItems/${id}_${size}`);
  await deleteDoc(docRef);
};

export const placeOrder = async (uid, orderPayload) => {
  const ordersRef = collection(db, `users/${uid}/orders`);
  const newOrder = {
    ...orderPayload,
    createdAt: serverTimestamp(),
  };
  await addDoc(ordersRef, newOrder);
};

export const clearCartInFirestore = async uid => {
  const cartRef = collection(db, `users/${uid}/cartItems`);
  const querySnapshot = await getDocs(cartRef);

  const deletions = querySnapshot.docs.map(docSnap => deleteDoc(docSnap.ref));

  await Promise.all(deletions);
};
