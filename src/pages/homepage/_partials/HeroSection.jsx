import { Button } from 'antd';
import { CgArrowRight } from 'react-icons/cg';
import HeroSectionImage from '../../../assets/herogroup.png';
import { CiDeliveryTruck } from 'react-icons/ci';
import { GiAchievement } from 'react-icons/gi';
import { HiOutlineShieldCheck } from 'react-icons/hi';
import { NavLink } from 'react-router-dom';

export default function HeroSection() {
  return (
    <>
      <div className="px-4 lg:px-20 bg-[#F6F6F6] md:flex justify-between items-center ">
        <div>
          <h1 className="font-bold text-2xl">Fresh Arrivals Online</h1>
          <p className="font-light text-xs mb-5 mt-2">
            Discover Our Newest Collection Today.
          </p>
          <NavLink to="/product">
            <Button className="!bg-[#0E1422] !text-white !text-xs">
              View Collection <CgArrowRight />
            </Button>
          </NavLink>
        </div>
        <div>
          <img src={HeroSectionImage} alt="Image for hero section" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 lg:px-20 pt-20 pb-20">
        <div className=" p-4">
          <div className="bg-[#f6f6f6] rounded-full p-3 w-fit">
            <CiDeliveryTruck className="text-3xl" />
          </div>
          <h1 className="font-bold mt-2">Free Shipping</h1>
          <p className="text-xs mt-2">
            Upgrade your style today and get FREE shipping on all orders! Don't
            miss out.
          </p>
        </div>
        <div className=" p-4 ">
          <div className="bg-[#f6f6f6] rounded-full p-3 w-fit">
            <GiAchievement className="text-3xl" />
          </div>
          <h1 className="font-bold mt-2">Satisfaction Guarantee</h1>
          <p className="text-xs mt-2">
            Shop confidently with our Satisfaction Guarantee: Love it or get a
            refund.
          </p>
        </div>
        <div className=" p-4 ">
          <div className="bg-[#f6f6f6] rounded-full p-3 w-fit">
            <HiOutlineShieldCheck className="text-3xl" />
          </div>
          <h1 className="font-bold mt-2">Secure Payment</h1>
          <p className="text-xs mt-2">
            Your security is our priority. Your payments are secure with us.
          </p>
        </div>
      </div>
    </>
  );
}
