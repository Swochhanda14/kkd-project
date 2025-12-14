import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaPinterest, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-orange-800 via-orange-700 to-red-700 text-white mt-20 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        {/* Brand Info */}
        <div className="lg:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-2xl lg:text-3xl font-bold font-poppins">Karigar Ko Dukaan</h2>
          </div>
          <p className="text-sm lg:text-base text-white/90 leading-relaxed mb-4">
            Celebrating tradition through authentic, handmade art from the heart of Nepal.
          </p>
          <div className="flex gap-4 mt-6">
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-200 hover:scale-110">
              <FaInstagram className="text-lg" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-200 hover:scale-110">
              <FaPinterest className="text-lg" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-200 hover:scale-110">
              <FaWhatsapp className="text-lg" />
            </a>
          </div>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg lg:text-xl font-bold mb-4 pb-2 border-b border-white/20">Quick Links</h3>
          <ul className="space-y-3 text-sm lg:text-base">
            <li>
              <Link to="/" className="text-white/80 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                <span className="w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                Home
              </Link>
            </li>
            <li>
              <Link to="/masks" className="text-white/80 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                <span className="w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                Shop
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-white/80 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                <span className="w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-white/80 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                <span className="w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg lg:text-xl font-bold mb-4 pb-2 border-b border-white/20">Newsletter</h3>
          <p className="text-sm lg:text-base text-white/80 mb-4">Subscribe for updates and exclusive offers.</p>
          <form className="flex flex-col gap-2">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="px-4 py-3 rounded-lg text-gray-800 w-full outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200" 
            />
            <button 
              type="submit"
              className="bg-white text-orange-700 px-6 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Contact / Socials */}
        <div>
          <h3 className="text-lg lg:text-xl font-bold mb-4 pb-2 border-b border-white/20">Stay Connected</h3>
          <ul className="space-y-3 text-sm lg:text-base text-white/80">
            <li className="flex items-start gap-2">
              <span className="font-semibold text-white">Email:</span>
              <a href="mailto:info@karigarkodukaan.com" className="hover:text-white transition-colors duration-200">
                info@karigarkodukaan.com
              </a>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-semibold text-white">Phone:</span>
              <a href="tel:+9779843340949" className="hover:text-white transition-colors duration-200">
                +977 984-3340949
              </a>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-semibold text-white">Address:</span>
              <span>123 Karigar Ave, Handicraft City</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/20 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm lg:text-base py-6 text-white/80">
          &copy; {new Date().getFullYear()} Karigar Ko Dukaan. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
