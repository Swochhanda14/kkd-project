import React from 'react'
import { Link } from 'react-router-dom'

const Offers = () => {
  return (
    <div className='mt-20 mb-16 px-4 sm:px-6 lg:px-8'>
      <div className='relative h-[35rem] md:h-[40rem] rounded-3xl overflow-hidden shadow-2xl group'>
        <img 
          src="https://www.himalayantrekkingalliance.com/wp-content/uploads/2017/03/nepal-handicrafts.jpg" 
          alt="Special Offers" 
          className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700' 
        />
        <div className='absolute inset-0 bg-gradient-to-r from-orange-900/80 via-orange-800/70 to-red-900/80'></div>
        <div className='absolute inset-0 flex items-center justify-center md:justify-start'>
          <div className='max-w-2xl mx-auto md:mx-0 md:ml-12 lg:ml-20 p-8 md:p-12 text-center md:text-left'>
            <div className="mb-4">
              <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-semibold mb-4">
                LIMITED TIME OFFER
              </span>
            </div>
            <h2 className='text-4xl md:text-6xl lg:text-7xl text-white font-extrabold mb-4 leading-tight'>
              Exclusive Offers
              <span className="block bg-gradient-to-r from-orange-200 via-white to-orange-200 bg-clip-text text-transparent">
                For You
              </span>
            </h2>
            <p className='text-white/90 text-lg md:text-xl uppercase font-medium mb-8 tracking-wider'>
              Only Best Sellers Products
            </p>
            <Link
              to="/masks"
              className='inline-block text-white font-bold mt-6 px-8 py-4 border-2 border-white rounded-full hover:bg-white hover:text-orange-700 hover:shadow-2xl hover:shadow-white/50 transform hover:scale-105 transition-all duration-300 tracking-wider'
            >
              Check Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Offers
