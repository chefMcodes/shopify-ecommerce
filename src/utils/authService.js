import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  signOut,
} from 'firebase/auth';

import { auth } from '../firebase/firebase';

const provider = new GoogleAuthProvider();

export async function register(email, password, name) {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  await updateProfile(userCredential.user, { displayName: name });
  return userCredential;
}

export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logout() {
  return signOut(auth);
}

export function signInWithGoogle() {
  return signInWithPopup(auth, provider);
}

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
