import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="bg-gray-900 text-white py-16 px-8">
      
      <div className="max-w-7xl mx-auto flex flex-wrap gap-12">

        {/* Left Section (60%) */}
        <div className="w-full md:w-3/5 space-y-8">
          
          {/* About Us */}
          <div>
            <h2 className="text-2xl font-bold mb-4">About Us</h2>
            <p className="text-gray-400 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor 
              incididunt ut labore dolore magna aliqua.
            </p>
            <p className="text-gray-500 mt-4">
              Copyright ©2025 All rights reserved 
            </p>
          </div>

          

        </div>

        {/* Right Section (20%) */}
        <div className="w-full md:w-1/5 flex flex-col items-start space-y-6">
          
          {/* Follow Us */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Follow Us</h2>
            <p className="text-gray-400">Let us be social</p>
          </div>

          {/* Social Media Icons */}
          <div className="flex gap-4">
            <a href="#" className="text-gray-400 hover:text-blue-500 transition-all">
              <FaFacebookF size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-500 transition-all">
              <FaTwitter size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-pink-500 transition-all">
              <FaInstagram size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-600 transition-all">
              <FaLinkedinIn size={24} />
            </a>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Footer;
