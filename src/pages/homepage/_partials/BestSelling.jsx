import products from '../../../data/product';
import { useNavigate } from 'react-router-dom';

export default function BestSelling() {
  const navigate = useNavigate();

  const bestSellingProducts = products.slice(0, 4);
  return (
    <div className="p-4 lg:px-20 pb-20">
      <p>SHOP NOW</p>
      <h2 className="text-xl font-semibold mb-4">Best Selling</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {bestSellingProducts.map(product => (
          <div
            key={product.id}
            className="p-4  hover:shadow-md transition"
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
