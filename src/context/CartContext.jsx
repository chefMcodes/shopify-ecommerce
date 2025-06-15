import { createContext } from 'react';

export const CartContext = createContext({
  items: [],
  wishList: { items: [] },
  addItemToCart: () => {},
  updateCartQuantity: () => {},
  removeItemFromCart: () => {},
  addandRemoveFromWishList: () => {},
  removeItemFromWishList: () => {},
  // addWishListToCart: () => {},
});
