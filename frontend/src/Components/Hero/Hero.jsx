import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section
      className="relative h-[65vh] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/herobg.jpg')" }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
      <div className="relative max-w-5xl mx-auto px-6 h-full flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-md p-10 rounded-2xl text-white text-center shadow-xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Discover Authentic Handicrafts
          </h1>
          <p className="text-lg text-gray-100 mb-6">
            Handcrafted treasures that tell stories — elevate your space with culture and art.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/masks"
              className="bg-white text-black px-6 py-3 rounded-full hover:bg-gray-200 transition"
            >
              Explore Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
