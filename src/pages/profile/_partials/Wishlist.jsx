import { useContext } from 'react';
import { CartContext } from '../../../context/CartContext';
import { Button } from 'antd';
import { FaRegHeart } from 'react-icons/fa';

export default function Wishlist() {
  const { wishList, addItemToCart, removeItemFromWishList } =
    useContext(CartContext);

  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-12">
      {wishList.length < 1 && (
        <h1 className="mb-10 text-xl font-semibold">Wishlist</h1>
      )}
      {wishList.length < 1 && (
        <div className="text-center text-gray-600">
          <p>Your wishlist is empty! Please add an item to your wishlist.</p>
        </div>
      )}

      {wishList.map(list => (
        <div
          key={`${list.id}-${list.size}`}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4 border-b border-gray-200"
        >
          <div className="flex gap-4 items-start sm:items-center w-full sm:w-auto">
            <img
              src={list.image}
              alt="Item image"
              className="w-20 h-20 object-cover bg-[#f6f6f6] rounded-md"
            />
            <div className="flex flex-col gap-1">
              <p className="text-base font-medium">{list.name}</p>
              <p className="text-sm text-[#5C5F6A]">
                Added on:{' '}
                {new Date(list.dateAdded).toLocaleDateString('en-US', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
              <Button
                type="text"
                className=" !text-red-500"
                onClick={() => removeItemFromWishList(list.id, list.size)}
              >
                Remove item
              </Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mt-2 sm:mt-0">
            <p className="text-sm font-medium">${list.price}.00</p>
            <Button
              className="!border-black w-full sm:w-auto"
              onClick={() => addItemToCart(list.id, list.quantity, list.size)}
            >
              Add to cart
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
