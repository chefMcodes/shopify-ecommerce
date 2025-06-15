import { FaAngleRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { PiPackage } from 'react-icons/pi';

export default function OrderConfirmation() {
  return (
    <>
      <div className="px-4 lg:px-20 py-5 bg-[#D5E5D7] ">
        <h1 className="font-bold">Successfull Order</h1>
        <div className="flex gap-1 items-center text-xs">
          <p>Ecommerce</p>
          <FaAngleRight />
          <p>Successfull order</p>
        </div>
      </div>
      <div className="min-h-screen flex flex-col justify-center items-center text-center px-4">
        <PiPackage size={120} />
        <h1 className="text-3xl font-bold mb-4 ">Thanks for shopping</h1>
        <p className="text-lg mb-6">
          Your order has been successfully placed and is now being processed.
        </p>
        <Link
          to="/profile"
          className="bg-black text-white px-6 py-2 rounded hover:opacity-90 transition"
        >
          Go to my account
        </Link>
      </div>
    </>
  );
}
