import { FaAngleRight } from 'react-icons/fa';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { NavLink } from 'react-router-dom';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { placeOrder } from '../../firebase/firebaseService';
import { clearCartInFirestore } from '../../firebase/firebaseService';

export default function Checkout() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });

  console.log(formData);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const { items } = useContext(CartContext);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const taxRate = 0.1; // 10% tax or adjust accordingly
  const tax = parseFloat((subtotal * taxRate).toFixed(2));
  const total = parseFloat((subtotal + tax).toFixed(2));

  const handlePlaceOrder = async () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    // Check for empty fields
    const isEmpty = Object.values(formData).some(val => val.trim() === '');
    if (isEmpty) {
      // message.error('Please fill out all shipping fields.');
      toast.error('Please fill out all shipping fields.', {
        position: 'top-center',
        autoClose: 3000,
      });
      return;
    }

    const orderPayload = {
      shipping: formData,
      items,
      subtotal,
      tax,
      total,
    };

    try {
      await placeOrder(currentUser.uid, orderPayload);
      toast.success('Order placed successfully!', {
        position: 'top-center',
        autoClose: 3000,
      });

      // Optionally clear cart (your choice)
      await clearCartInFirestore(currentUser.uid);

      navigate('/orderConfirmation'); // Create this page
    } catch (err) {
      console.error(err);
      toast.error('Failed to place order.', {
        position: 'top-center',
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="">
      <div className="bg-[#f6f6f6] py-8 px-4 lg:px-20">
        <h1 className="text-2xl">Checkout</h1>
        <div className="flex items-center gap-3">
          <p className="text-[#5C5F6A]">Ecommerce</p>
          <FaAngleRight />
          <p>Checkout</p>
        </div>
      </div>

      {/* Responsive Checkout Section */}
      <div className="px-4 lg:px-20 flex flex-col lg:flex-row gap-10 py-10">
        {/* Shipping Address */}
        <div className="w-full lg:w-1/2">
          <h2 className="pb-10 font-bold">Shipping Address</h2>

          {/* Street Address */}
          <div className="mb-4">
            <label
              htmlFor="street"
              className="text-[#474B57] block text-sm font-medium mb-1"
            >
              Street Address
            </label>
            <input
              type="text"
              id="street"
              name="street"
              value={formData.street}
              onChange={e =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              className="w-full border px-3 py-2 rounded border-[#E6E7E8]"
            />
          </div>

          {/* City and State */}
          <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="city"
                className="text-[#474B57] block text-sm font-medium mb-1"
              >
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={e =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                className="w-full border px-3 py-2 rounded border-[#E6E7E8]"
              />
            </div>
            <div>
              <label
                htmlFor="state"
                className="text-[#474B57] block text-sm font-medium mb-1"
              >
                State
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={e =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                className="w-full border px-3 py-2 rounded border-[#E6E7E8]"
              />
            </div>
          </div>

          {/* Zip Code and Country */}
          <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="zip"
                className="text-[#474B57] block text-sm font-medium mb-1"
              >
                Zip Code
              </label>
              <input
                type="text"
                id="zip"
                name="zip"
                value={formData.zip}
                onChange={e =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                className="w-full border px-3 py-2 rounded border-[#E6E7E8]"
              />
            </div>
            <div>
              <label
                htmlFor="country"
                className="text-[#474B57] block text-sm font-medium mb-1"
              >
                Country
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={e =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                className="w-full border px-3 py-2 rounded border-[#E6E7E8]"
              />
            </div>
          </div>

          {/* Email and Full Name */}
          <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="email"
                className="text-[#474B57] block text-sm font-medium mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={e =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                className="w-full border px-3 py-2 rounded border-[#E6E7E8]"
              />
            </div>
            <div>
              <label
                htmlFor="fullName"
                className="text-[#474B57] block text-sm font-medium mb-1"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={e =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                className="w-full border px-3 py-2 rounded border-[#E6E7E8]"
              />
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-1/2 border-t lg:border-t-0 lg:border-l border-[#E6E7E8] pt-10 lg:pt-0 lg:px-16">
          <h1 className="text-xl font-semibold">Your Order</h1>

          <div className="flex justify-between mt-6 pb-6 items-start">
            <div className="flex gap-3 flex-wrap">
              {items.map((item, index) => (
                <img
                  key={index}
                  src={item.image}
                  alt="Cart"
                  className="w-10 h-10 object-cover rounded-full bg-[#f6f6f6]"
                />
              ))}
            </div>
            <NavLink to="/cart">
              <Button>Edit Cart</Button>
            </NavLink>
          </div>

          <div className="flex justify-between mb-2">
            <p className="text-[#5C5F6A]">Subtotal:</p>
            <p>${subtotal.toFixed(2)}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-[#5C5F6A]">Shipping:</p>
            <p>Free</p>
          </div>
          <div className="flex justify-between mb-4">
            <p className="text-[#5C5F6A]">Tax:</p>
            <p>${tax.toFixed(2)}</p>
          </div>

          <hr className="border-[#E6E7E8] my-4" />

          <div className="flex justify-between font-semibold text-lg mb-4">
            <p className="text-[#5C5F6A]">Total:</p>
            <p>${total.toFixed(2)}</p>
          </div>

          <Button
            className="!w-full !bg-[#0E1422] !text-white !mt-5"
            onClick={handlePlaceOrder}
          >
            Place Order
          </Button>
        </div>
      </div>
    </div>
  );
}
