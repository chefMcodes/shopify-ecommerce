import { FaAngleRight } from 'react-icons/fa';
import products from '../../data/product';
import { useNavigate } from 'react-router-dom';
import NewsLetter from '../../components/NewsLetter';
import Footer from '../../components/Footer';

export default function Listing() {
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-[#f6f6f6] flex px-4 lg:px-20 items-center py-5 gap-2">
        <p className="text-[#5C5F6A]">Ecommerce</p>
        <FaAngleRight className="text-[#5C5F6A]" />
        <p>Search</p>
      </div>
      <div className="px-4 sm:px-6 md:px-8 lg:px-20 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <div
              key={product.id}
              className="border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full sm:h-48 md:h-80 rounded-md mb-4 bg-[#F6F6F6]"
              />
              <h1 className="text-lg font-semibold mb-2">{product.name}</h1>
              <div className="flex gap-10 text-sm items-center ">
                {product.inStock && (
                  <p className="border border-[#E6E7E8] rounded-full px-3 py-1">
                    IN STOCK
                  </p>
                )}
                <p className="text-gray-600">${product.price}.00</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <NewsLetter />
      <Footer />
    </>
  );
}
