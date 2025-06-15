import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { FaAngleRight } from 'react-icons/fa';
import { Button } from 'antd';
import { Modal, message } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export default function Cart() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const { items, removeItemFromCart, updateCartQuantity } =
    useContext(CartContext);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const taxRate = 0.1; // 10% tax or adjust accordingly
  const tax = parseFloat((subtotal * taxRate).toFixed(2));
  const total = parseFloat((subtotal + tax).toFixed(2));

  function handleCheckOutClick() {
    if (!currentUser) {
      navigate('/login');
    } else {
      navigate('/checkout');
    }
  }

  return (
    <div>
      {items.length < 1 && (
        <div className="flex px-4 lg:px-20 justify-center items-center h-screen text-center">
          <p>
            Your cart is empty! Please make sure to add items to cart as you
            explore our products.
          </p>
        </div>
      )}

      {items.length > 0 && (
        <>
          {/* Header */}
          <div className="px-4 lg:px-20 py-10 bg-[#f6f6f6]">
            <h1 className="text-2xl font-bold pb-3">Cart</h1>
            <div className="flex items-center text-sm flex-wrap">
              <p className="text-[#5C5F6A] mr-2">
                Ecommerce <FaAngleRight className="inline" />
              </p>
              <p>Cart</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="px-4 lg:px-20 flex flex-col lg:flex-row gap-10 pt-10">
            {/* Left Section */}
            <div className="w-full lg:w-3/5 pt-6">
              <p className="text-lg font-medium mb-3">Your Cart</p>
              <hr className="text-[#E6E7E8] mb-4" />

              {items.map(item => (
                <div
                  key={`${item.id}-${item.size}`}
                  className="flex justify-between flex-wrap gap-4 mb-8"
                >
                  <div className="flex gap-4 items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-contain bg-[#f6f6f6] rounded"
                    />
                    <div>
                      <h1 className="font-medium">{item.name}</h1>
                      <p className="text-xs text-gray-500 mt-2">
                        Size: {item.size}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-sm">${item.price * item.quantity}.00</p>
                    <div className="flex gap-4 items-center border  py-1 rounded border-[#E6E7E8]">
                      <Button
                        type="text"
                        className="cursor-pointer"
                        disabled={item.quantity <= 1}
                        onClick={() =>
                          updateCartQuantity(item.id, -1, item.size)
                        }
                      >
                        -
                      </Button>
                      <p>{item.quantity}</p>
                      <Button
                        type="text"
                        className="cursor-pointer"
                        onClick={() =>
                          updateCartQuantity(item.id, 1, item.size)
                        }
                      >
                        +
                      </Button>
                    </div>
                    <Button
                      type="text"
                      className="!bg-[#F6F6F6]"
                      onClick={() => {
                        if (window.confirm('Remove item from cart?')) {
                          removeItemFromCart(item.id, item.size);
                        }
                      }}
                    >
                      X
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Section: Order Summary */}
            <div className="w-full lg:w-2/5 border border-[#E6E7E8] px-6 py-8">
              <h1 className="text-lg mb-6 font-medium">Order Summary</h1>
              <div className="flex justify-between mb-4 text-sm">
                <p className="text-[#5C5F6A]">Subtotal:</p>
                <p>${subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between mb-4 text-sm">
                <p className="text-[#5C5F6A]">Shipping:</p>
                <p>Free</p>
              </div>
              <div className="flex justify-between text-sm">
                <p className="text-[#5C5F6A]">Tax:</p>
                <p>${tax.toFixed(2)}</p>
              </div>
              <hr className="text-[#E6E7E8] mt-8" />
              <div className="flex justify-between mt-6 font-semibold">
                <p className="text-[#5C5F6A]">Total:</p>
                <p>${total.toFixed(2)}</p>
              </div>
              <Button
                className="!w-full !bg-[#0E1422] !text-white !mt-5"
                onClick={handleCheckOutClick}
              >
                Checkout
              </Button>
              <NavLink to="/product">
                <Button
                  type="text"
                  className="!text-center !w-full !underline !mt-5"
                >
                  Continue Shopping
                </Button>
              </NavLink>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
