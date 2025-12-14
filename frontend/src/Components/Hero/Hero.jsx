import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section
      className="relative h-[70vh] md:h-[80vh] bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: "url('/herobg.jpg')" }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-orange-900/20 to-transparent" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-xl p-8 md:p-12 rounded-3xl text-white text-center shadow-2xl border border-white/20 animate-fade-in max-w-3xl">
          <div className="mb-6">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 leading-tight">
              <span className="block">Discover</span>
              <span className="block bg-gradient-to-r from-orange-300 via-white to-orange-300 bg-clip-text text-transparent">
                Authentic Handicrafts
              </span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent mx-auto mb-4"></div>
          </div>
          <p className="text-lg md:text-xl text-gray-100 mb-8 leading-relaxed max-w-2xl mx-auto">
            Handcrafted treasures that tell stories — elevate your space with culture and art from the heart of Nepal.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/masks"
              className="group relative bg-white text-orange-700 px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl overflow-hidden"
            >
              <span className="relative z-10">Explore Now</span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-100 to-red-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <Link
              to="/about"
              className="group relative bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
