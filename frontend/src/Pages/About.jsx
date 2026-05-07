import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

const About = () => {
    return (
        <div className='flex flex-col items-center justify-center mt-20 mb-16 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-7xl mx-auto'>
                <div className='text-center mb-12'>
                    <h1 className='text-4xl md:text-5xl font-extrabold mb-4 gradient-text'>Know About Us</h1>
                    <div className="w-32 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto"></div>
                </div>
                <div className='flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12'>
                    <div className='flex-shrink-0 w-full lg:w-1/2'>
                        <img
                            src="https://images.unsplash.com/photo-1673339065001-a30d6c343cdd?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="About Us"
                            className='w-full h-auto rounded-2xl shadow-2xl object-cover hover:scale-105 transition-transform duration-500'
                        />
                    </div>
                    <div className='flex flex-col gap-6 max-w-2xl'>
                        <p className='text-justify text-base lg:text-lg leading-relaxed text-gray-700'>
                            Welcome to to our world of authentic Nepali handicrafts — where every product is more than just an item, it's a piece of living tradition. Our mission is to bring you handcrafted treasures that reflect the soul of Nepal, created by artisans who have honed their skills through generations.
                        </p>
                        <p className='text-justify text-base lg:text-lg leading-relaxed text-gray-700'>
                            From intricately carved wooden masks and traditional textiles to timeless decor and accessories, each piece tells a story of culture, craftsmanship, and care. We work closely with local communities to ensure every item is ethically sourced, sustainably made, and rich with meaning.
                        </p>
                        <p className='text-justify text-base lg:text-lg leading-relaxed text-gray-700'>
                            Whether you're decorating your home or looking for a meaningful gift, our collection offers a genuine connection to the beauty and heritage of Nepal.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
