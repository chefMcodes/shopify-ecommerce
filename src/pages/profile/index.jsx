import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { logout } from '../../utils/authService';
import { toast } from 'react-toastify';
import {
  FaAngleRight,
  FaRegHeart,
  FaBars,
  FaTimes,
  FaSpinner,
} from 'react-icons/fa';
import { TiShoppingCart } from 'react-icons/ti';
import { IoIosHome, IoIosLogOut } from 'react-icons/io';
import { FiKey } from 'react-icons/fi';
import { CiDeliveryTruck } from 'react-icons/ci';
import { RiAccountCircleLine } from 'react-icons/ri';
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();
  const { currentUser, loading } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (loading) {
    return <FaSpinner />;
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />; // 👈 redirect if not logged in
  }

  async function handleLogOut() {
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    if (!confirmLogout) return;

    try {
      await logout();
      toast.success('Logout successfully', {
        position: 'top-center',
        autoClose: 3000,
      });
      navigate('/');
    } catch (error) {
      toast.error('Error logging out', {
        position: 'top-center',
        autoClose: 3000,
      });
    }
  }

  const menuLinks = [
    { to: 'orders', label: 'Order', icon: <TiShoppingCart /> },
    { to: 'wishlist', label: 'Wishlist', icon: <FaRegHeart /> },
  ];

  return (
    <div>
      {/* Header */}
      <div className="bg-[#f6f6f6] px-4 md:px-10 lg:px-20 py-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-semibold">My Account</h1>

          {/* Toggle Button for Mobile */}
          <button
            className="block md:hidden text-xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        <div className="flex items-center text-sm gap-1 text-[#5C5F6A] mt-1">
          <p>Ecommerce</p>
          <FaAngleRight />
          <p className="text-black">My Account</p>
        </div>
      </div>

      {/* Layout */}
      <div className="px-4 md:px-10 lg:px-20 py-6 flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div
          className={`${
            isMenuOpen ? 'block' : 'hidden'
          } md:block rounded-md md:w-1/3 lg:w-1/5 bg-white `}
        >
          <ul className=" text-sm">
            {menuLinks.map(({ to, label, icon }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  onClick={() => setIsMenuOpen(false)} // Close on mobile when item clicked
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-3 ${
                      isActive
                        ? 'bg-[#F6F6F6] font-semibold'
                        : 'hover:bg-gray-50'
                    }`
                  }
                >
                  {icon}
                  {label}
                </NavLink>
              </li>
            ))}
            <li className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
              <Button
                type="text"
                className="!flex items-center gap-2 !text-sm !p-0"
                onClick={handleLogOut}
              >
                <IoIosLogOut />
                <p>Log Out</p>
              </Button>
            </li>
            <NavLink
              to="/"
              className="px-4 py-3 hover:bg-gray-50 cursor-pointer"
            >
              <Button
                type="text"
                className="!flex items-center gap-2 !text-sm !p-0"
              >
                <IoIosHome />
                <p>Go Home</p>
              </Button>
            </NavLink>
          </ul>
        </div>

        {/* Main Content */}
        <div className="w-full border-l border-[#E9E9EB] p-4 min-h-[200px] bg-white ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
