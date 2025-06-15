import {
  FaGithub,
  FaInstagram,
  FaCcMastercard,
  FaCcAmex,
} from 'react-icons/fa';
import { CiYoutube } from 'react-icons/ci';
import { RiVisaFill } from 'react-icons/ri';

export default function Footer({ ...props }) {
  return (
    <footer {...props} className="px-4 lg:px-20">
      <div className="flex flex-col md:flex-row justify-between flex-wrap gap-10 py-10">
        {/* Left Section */}
        <div className="max-w-sm">
          <h1 className="font-bold text-2xl">Ecommerce</h1>
          <p className="font-light pt-4">
            DevCut is a YouTube channel for
            <br /> practical project-based learning.
          </p>
          <div className="flex gap-5 pt-5 text-xl">
            <FaGithub />
            <FaInstagram />
            <CiYoutube />
          </div>
        </div>

        {/* Middle Links Section */}
        <div className="flex flex-col sm:flex-row gap-10 font-light">
          <div>
            <h1 className="pb-4 font-medium">SUPPORT</h1>
            <ul className="flex flex-col gap-3">
              <li>FAQ</li>
              <li>Terms of use</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div>
            <h1 className="pb-4 font-medium">COMPANY</h1>
            <ul className="flex flex-col gap-3">
              <li>About Us</li>
              <li>Contact</li>
              <li>Careers</li>
            </ul>
          </div>
          <div>
            <h1 className="pb-4 font-medium">SHOP</h1>
            <ul className="flex flex-col gap-3">
              <li>My Account</li>
              <li>Checkout</li>
              <li>Cart</li>
            </ul>
          </div>
        </div>

        {/* Payment Section */}
        <div>
          <h1 className="font-medium">ACCEPTED PAYMENTS</h1>
          <div className="flex gap-5 pt-5 text-2xl">
            <FaCcMastercard />
            <FaCcAmex />
            <RiVisaFill />
          </div>
        </div>
      </div>

      <hr />
      <p className="text-center py-4 text-sm font-light">
        © 2023 DevCut. All rights reserved.
      </p>
    </footer>
  );
}
