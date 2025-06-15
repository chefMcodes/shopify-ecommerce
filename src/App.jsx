import './App.css';
import AppRoutes from './routes/AppRoutes';
import { CartContext } from './context/CartContext';
import { useEffect, useState } from 'react';
import products from './data/product';
import { useAuth } from './context/AuthContext';
import { db } from './firebase/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import {
  saveCartToFirestore,
  getCartFromFirestore,
} from './firebase/firebaseService';

function App() {
  const [shoppingCart, setShoppingCart] = useState({
    items: [],
  });
  const [wishList, setWishList] = useState({
    items: [],
  });
  const [cartInitialized, setCartInitialize] = useState(false);

  const { currentUser, loading } = useAuth();

  function getUserUid(user) {
    return user && user.uid ? user.uid : null;
  }

  useEffect(() => {
    if (loading) return;

    async function fetchCart() {
      const uid = getUserUid(currentUser);
      if (!uid) {
        setShoppingCart({ items: [] });
        setCartInitialize(true);
        return;
      }
      const cartRef = doc(db, 'users', uid, 'cart', 'userCart');
      const cartSnap = await getDoc(cartRef);
      if (cartSnap.exists()) {
        setShoppingCart(cartSnap.data());
      } else {
        setShoppingCart({ items: [] });
      }
      setCartInitialize(true);
    }
    fetchCart();
  }, [currentUser, loading]);

  useEffect(() => {
    if (loading || !cartInitialized) return;

    async function saveCart() {
      const uid = getUserUid(currentUser);
      if (!uid) return;

      const cartRef = doc(db, 'users', uid, 'cart', 'userCart');
      await setDoc(cartRef, shoppingCart, { merge: true });
    }
    saveCart();
  }, [shoppingCart, currentUser, loading, cartInitialized]);

  useEffect(() => {
    if (loading) return;

    async function fetchWishList() {
      const uid = getUserUid(currentUser);
      if (!uid) {
        setWishList({ items: [] });
        return;
      }
      const wishListRef = doc(db, 'users', uid, 'wishlist', 'userWishList');
      const wishListSnap = await getDoc(wishListRef);
      if (wishListSnap.exists()) {
        setWishList(wishListSnap.data());
      } else {
        setWishList({ items: [] });
      }
    }

    fetchWishList();
  }, [currentUser, loading]);

  useEffect(() => {
    if (loading) return;

    async function saveWishList() {
      const uid = getUserUid(currentUser);
      if (!uid) return;

      const wishListRef = doc(db, 'users', uid, 'wishlist', 'userWishList');
      await setDoc(wishListRef, wishList, { merge: true });
    }

    saveWishList();
  }, [wishList, currentUser, loading]);

  function handleWishListToggle(product, quantity, size) {
    setWishList(prev => {
      const exists = prev.items.find(
        item => item.id === product.id && item.size === size
      );

      if (exists) {
        // Remove from wishlist
        const filtered = prev.items.filter(
          item => item.id !== product.id && item.size === size
        );
        return { ...prev, items: filtered };
      } else {
        // Add to wishlist with dateAdded
        const dateAdded = new Date().toISOString(); // or use a formatted date string if you prefer
        console.log('Added to wishlist:', product);
        return {
          ...prev,
          items: [
            ...prev.items,
            {
              ...product,
              size,
              quantity,
              dateAdded,
            },
          ],
        };
      }
    });
  }

  function handleRemoveItemFromWishList(id, size) {
    setWishList(prev => {
      const updatedWishListItem = prev.items.filter(
        item => !(item.id === id && item.size === size)
      );
      return { items: updatedWishListItem };
    });
  }

  // function handleAddWishListToCart(id, quantity, size) {
  //   setShoppingCart(prev => {
  //     const updatedItems = [...prev.items];

  //     const existingCartItemIndex = updatedItems.findIndex(
  //       cartItem => cartItem.id === id && cartItem.size === size
  //     );

  //     if (existingCartItemIndex !== -1) {
  //       const updatedItem = {
  //         //   ...exisitingCartItem,
  //         //   quantity: exisitingCartItem.quantity + 1,
  //         // };
  //         // updatedItems[exisitingCartItem] = updatedItem;
  //         ...updatedItems[existingCartItemIndex],
  //         quantity: updatedItems[existingCartItemIndex].quantity + quantity,
  //       };
  //       updatedItems[existingCartItemIndex] = updatedItem;
  //     } else {
  //       const product = products.find(product => product.id === id);
  //       updatedItems.push({
  //         id: id,
  //         name: product.name,
  //         price: product.price,
  //         quantity,
  //         size,
  //         image: product.image,
  //       });
  //     }

  //     return {
  //       items: updatedItems,
  //     };
  //   });
  // }

  function handleAddToCart(id, quantity, size) {
    setShoppingCart(prevShoppingCart => {
      const updatedItems = [...prevShoppingCart.items];

      const existingCartItemIndex = updatedItems.findIndex(
        cartItem => cartItem.id === id && cartItem.size === size
      );
      // const exisitingCartItem = updatedItems[existingCartItemIndex];
      if (existingCartItemIndex !== -1) {
        const updatedItem = {
          //   ...exisitingCartItem,
          //   quantity: exisitingCartItem.quantity + 1,
          // };
          // updatedItems[exisitingCartItem] = updatedItem;
          ...updatedItems[existingCartItemIndex],
          quantity: updatedItems[existingCartItemIndex].quantity + quantity,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        const dateAdded = new Date().toISOString();
        const product = products.find(product => product.id === id);
        updatedItems.push({
          id: id,
          name: product.name,
          price: product.price,
          quantity,
          size,
          dateAdded,
          image: product.image,
        });
      }

      return {
        items: updatedItems,
      };
    });
    console.log(shoppingCart.items);
  }

  function handleUpdateCartItemQuantity(productId, amount, size) {
    setShoppingCart(prevShoppingCart => {
      const updatedItems = [...prevShoppingCart.items];
      const updatedItemIndex = updatedItems.findIndex(
        item => item.id === productId && item.size === size
      );

      if (updatedItemIndex === -1) return prevShoppingCart;

      const updatedItem = {
        ...updatedItems[updatedItemIndex],
      };

      updatedItem.quantity += amount;

      if (updatedItem.quantity <= 0) {
        updatedItems.splice(updatedItemIndex, 1);
      } else {
        updatedItems[updatedItemIndex] = updatedItem;
      }

      return {
        items: updatedItems,
      };
    });
  }

  function handleRemoveToCart(id, size) {
    setShoppingCart(prevShoppingCart => {
      const updatedItems = prevShoppingCart.items.filter(
        item => !(item.id === id && item.size === size)
      );
      return { items: updatedItems };
    });
  }

  const ctxValue = {
    items: shoppingCart.items,
    wishList: wishList.items,
    addItemToCart: handleAddToCart,
    updateCartQuantity: handleUpdateCartItemQuantity,
    removeItemFromCart: handleRemoveToCart,
    addandRemoveFromWishList: handleWishListToggle,
    removeItemFromWishList: handleRemoveItemFromWishList,
    // addWishListToCart: handleAddWishListToCart,
  };
  return (
    <CartContext.Provider value={ctxValue}>
      <AppRoutes />
    </CartContext.Provider>
  );
}

export default App;
