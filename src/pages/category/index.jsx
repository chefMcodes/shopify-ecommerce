import { Link } from 'react-router-dom';

const categories = [
  {
    title: 'Men',
    image: 'https://source.unsplash.com/400x400/?men,fashion',
    // link: '/category/men',
  },
  {
    title: 'Women',
    image: 'https://source.unsplash.com/400x400/?women,fashion',
    // link: '/category/women',
  },
  {
    title: 'Accessories',
    image: 'https://source.unsplash.com/400x400/?fashion,accessories',
    // link: '/category/accessories',
  },
  {
    title: 'Shoes',
    image: 'https://source.unsplash.com/400x400/?shoes,fashion',
    // link: '/category/shoes',
  },
];

export default function Category() {
  return (
    <div className="px-4 py-10 sm:px-6 lg:px-20 max-w-screen-2xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-10">
        Shop by Category
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={cat.image}
              alt={cat.title}
              className="w-full h-60 object-cover transform group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h2 className="text-white text-xl sm:text-2xl font-semibold">
                {cat.title}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
