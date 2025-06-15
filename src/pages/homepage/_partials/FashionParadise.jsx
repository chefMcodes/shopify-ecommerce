import { Button } from 'antd';
import categoryImage from '../../../assets/categoryImage.png';
import { CgArrowRight } from 'react-icons/cg';
import { NavLink } from 'react-router-dom';

export default function FashionParadise() {
  return (
    <div className="bg-[#F6F6F6] px-4 lg:px-20 py-10 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold">Browse Our Fashion Paradise!</h1>
        <p className="font-light py-3">
          Step into a world of style and explore our diverse collection of
          clothing categories.
        </p>
        <NavLink to="/product">
          <Button className="!bg-[#0E1422] !text-white">
            Start Browsing <CgArrowRight />
          </Button>
        </NavLink>
      </div>
      <div>
        <img src={categoryImage} alt="Category Image" className="w-52" />
      </div>
    </div>
  );
}
