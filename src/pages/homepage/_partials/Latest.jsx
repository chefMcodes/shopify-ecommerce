import products from '../../../data/product';
import { useNavigate } from 'react-router-dom';

export default function Latest() {
  const navigate = useNavigate();
  const latestProducts = products.slice(4, 8);
  return (
    <div className="px-4 lg:px-20 py-20">
      <h1 className="text-center text-lg font-bold">Latest</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {latestProducts.map(product => (
          <div
            key={product.id}
            className=" p-4  hover:shadow-md transition"
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <div className="bg-[#F6F6F6]">
              <img
                src={product.image}
                alt={product.name}
                className="w-full  object-cover rounded mb-3"
              />
            </div>
            <h3 className="text-lg font-medium">{product.name}</h3>
            <div className="flex gap-5 items-center">
              <p
                className={`text-sm ${
                  product.inStock ? 'text-green-600' : 'text-red-500'
                }`}
              >
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </p>
              <p className="text-gray-600">${product.price}.00</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
