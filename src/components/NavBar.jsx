import { useContext, useState } from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { TiShoppingCart } from 'react-icons/ti';
import { CgProfile } from 'react-icons/cg';
import { HiMenu, HiX } from 'react-icons/hi';
import LogoMark from '../assets/LogoMark.png'; // adjust this to your actual logo path
import { NavLink } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import products from '../data/product';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { items } = useContext(CartContext);
  const [query, setQuery] = useState('');

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  const cartQuantity = items.length;

  return (
    <header className="px-4 lg:px-20 py-3 shadow-sm">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src={LogoMark}
            alt="Logo Mark"
            className="h-8 w-8 object-contain"
          />
          <span className="text-lg font-semibold">Ecommerce</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex gap-6 items-center text-sm">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/category">Categories</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>

        {/* Right Icons + Search */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="relative">
            <Input
              placeholder="Search product"
              prefix={<SearchOutlined />}
              allowClear
              className="w-[200px] xl:w-[300px]"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />

            {query && (
              <div className="absolute z-10 bg-white border border-gray-200 rounded mt-1 w-full max-h-60 overflow-auto shadow">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map(product => (
                    <NavLink
                      key={product.id}
                      to={`/product/${product.id}`}
                      className="block px-4 py-2 hover:bg-gray-100 text-sm text-black"
                      onClick={() => setQuery('')} // Optional: Clear search after click
                    >
                      {product.name}
                    </NavLink>
                  ))
                ) : (
                  <p className="px-4 py-2 text-sm text-gray-500 text-center">
                    Product doesn’t exist
                  </p>
                )}
              </div>
            )}
          </div>
          <NavLink to="/cart">
            <div className="">
              <TiShoppingCart size={24} className="absolute top-4" />
              <p className="bg-red-600 relative left-3 top-2 px-1 rounded-full text-xs  flex justify-center">
                {cartQuantity}
              </p>
            </div>
          </NavLink>
          <NavLink to="/profile">
            <CgProfile size={24} />
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex gap-2 lg:hidden">
          <div className="flex gap-5  ">
            <div>
              <NavLink to="/cart">
                <TiShoppingCart size={26} className="absolute" />
                <p className="bg-red-600 relative left-3 top-3 px-1 rounded-full text-xs  flex justify-center">
                  {cartQuantity}
                </p>
              </NavLink>
            </div>
            <NavLink to="/profile">
              <CgProfile size={24} />
            </NavLink>
          </div>
          <button
            className="lg:hidden text-2xl"
            onClick={() => setIsMenuOpen(prev => !prev)}
          >
            {isMenuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Content */}
      {isMenuOpen && (
        <div className="lg:hidden mt-4 flex flex-col gap-4">
          <Input
            placeholder="Search product"
            prefix={<SearchOutlined />}
            allowClear
            className="w-full"
          />
          <nav className="flex flex-col gap-3 text-sm">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/category">Categories</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </nav>
          {/* <div className="flex gap-5 mt-2">
            <div>
              <NavLink to="/cart">
                <TiShoppingCart size={26} className="absolute" />
                <p className="bg-red-600 relative left-3 top-3 px-1 rounded-full text-xs  flex justify-center">
                  {cartQuantity}
                </p>
              </NavLink>
            </div>
            <NavLink to="/profile">
              <CgProfile size={24} />
            </NavLink>
          </div> */}
        </div>
      )}
    </header>
  );
};

export default NavBar;
