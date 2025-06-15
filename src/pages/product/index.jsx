import { useParams } from 'react-router-dom';
import products from '../../data/product';
import { FaAngleRight, FaRegHeart, FaHeart } from 'react-icons/fa';
import { Alert, Button } from 'antd';
import NewsLetter from '../../components/NewsLetter';
import Footer from '../../components/Footer';
import { useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import { toast } from 'react-toastify';

export default function Product() {
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));
  const { addItemToCart } = useContext(CartContext);
  const { addandRemoveFromWishList, wishList } = useContext(CartContext);

  if (!product) return <p>Product not found</p>;
  console.log(wishList);

  const isInWishlist = wishList.find(item => item.id === product.id);

  return (
    <>
      <div className="px-4 lg:px-20">
        <div className="flex flex-wrap items-center py-3 text-sm">
          <p className="font-light">
            Ecommerce <FaAngleRight className="inline" />
          </p>
          <p className="ml-2">{product.name}</p>
        </div>

        <div className="flex flex-col lg:flex-row justify-between gap-10  pb-20">
          {/* Image Section */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-full max-w-md h-auto object-contain bg-[#f6f6f6]"
            />
          </div>

          {/* Product Info Section */}
          <div className="w-full lg:w-1/2">
            <h1 className="text-2xl font-bold pb-3">{product.name}</h1>
            <p className="border inline-block rounded-full px-3 py-1 text-xs border-[#E6E7E8] mb-2">
              {product.inStock ? 'IN STOCK' : 'Out of Stock'}
            </p>

            <p className="text-gray-700 pt-4 font-bold text-lg">
              ${product.price}.00
            </p>

            {/* Size */}
            <p className="pt-4 text-xs pb-2">SELECT SIZE</p>
            <div className="flex flex-wrap gap-2">
              {product.size.map(si => (
                <Button
                  key={si}
                  onClick={() => setSelectedSize(si)}
                  className={`border !m-0 px-3 py-1 rounded transition ${
                    selectedSize === si
                      ? '  !border-black !text-black'
                      : '!border-gray-300'
                  }`}
                >
                  {si}
                </Button>
              ))}
            </div>

            {/* Quantity */}
            <p className="pt-6 text-md mb-3">QUANTITY</p>
            <div className="flex items-center border rounded border-[#E6E7E8] w-fit px-4 gap-6 py-1">
              <p
                className="font-bold text-2xl cursor-pointer"
                onClick={() => setQuantity(prev => Math.max(prev - 1, 1))}
              >
                -
              </p>
              <p>{quantity}</p>
              <p
                className="font-bold text-2xl cursor-pointer"
                onClick={() => setQuantity(prev => Math.max(prev + 1))}
              >
                +
              </p>
            </div>

            {/* Add to cart */}
            <div className="flex items-center !mt-8">
              <Button
                onClick={() => {
                  if (!selectedSize) {
                    toast.error('Please select a size', {
                      position: 'top-center',
                      autoClose: 3000,
                    });
                    return;
                  } else {
                    toast.success('Successfully added to cart', {
                      position: 'top-center',
                      autoClose: 2000,
                    });
                  }
                  addItemToCart(product.id, quantity, selectedSize);
                }}
                className="!bg-[#0E1422] !text-white !text-xs  !px-20 w-full sm:w-auto"
              >
                Add to cart
              </Button>
              <Button
                className="!ml-2 flex items-center gap-1"
                onClick={() => {
                  if (!selectedSize) {
                    toast.error('Please select a size', {
                      position: 'top-center',
                      autoClose: 3000,
                    });
                    return;
                  } else {
                  }
                  addandRemoveFromWishList(product, quantity, selectedSize);
                  toast[isInWishlist ? 'info' : 'success'](
                    isInWishlist
                      ? 'Removed from wishlist'
                      : 'Added to wishlist',
                    { position: 'top-center', autoClose: 2000 }
                  );
                }}
              >
                {/* {isInWishlist ? '' : ''} */}
                {isInWishlist ? (
                  <FaHeart className="text-red-500" />
                ) : (
                  <FaRegHeart />
                )}
              </Button>
            </div>
            <p className="font-light pt-2 text-sm">
              — Free shipping on orders $100+
            </p>
          </div>
        </div>
      </div>

      <NewsLetter />
      <Footer />
    </>
  );
}
