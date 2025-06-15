import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from '../pages/homepage';
import Listing from '../pages/listing';
import Product from '../pages/product';
import Cart from '../pages/cart';
import CheckOut from '../pages/checkout';
import NavBar from '../components/NavBar';
import Profile from '../pages/profile';
import Category from '../pages/category';
import About from '../pages/About';
import Contact from '../pages/contact';
import Login from '../pages/authentication/_partials/Login';
import ProtectedRoute from '../components/ProtectedRoute';
import Signup from '../pages/authentication/_partials/SignUp';
import Wishlist from '../pages/profile/_partials/Wishlist';
import Order from '../pages/profile/_partials/Order';

import { useEffect } from 'react';
import { AuthProvider } from '../context/AuthContext';
import OrderConfirmation from '../pages/Order-confirmation';

function AppContent() {
  const location = useLocation();

  // Define paths where NavBar should not be shown
  const hideNavOnPaths = ['/profile'];

  // Check if current path starts with any of the hidden paths
  const shouldHideNav = hideNavOnPaths.some(path =>
    location.pathname.startsWith(path)
  );

  useEffect(() => {
    window.scrollTo(0, 0); // Optional: scroll to top on route change
  }, [location.pathname]);

  return (
    <>
      {!shouldHideNav && <NavBar />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product" element={<Listing />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/category" element={<Category />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/orderConfirmation" element={<OrderConfirmation />} />

        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        >
          <Route index element={<Order />} />
          <Route path="orders" element={<Order />} />
          <Route path="wishlist" element={<Wishlist />} />
        </Route>
      </Routes>
    </>
  );
}

export default function AppRoutes() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}
