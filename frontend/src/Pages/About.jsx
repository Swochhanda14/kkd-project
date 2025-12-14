import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

const About = () => {
    return (
        <div className='flex flex-col items-center justify-center mt-10'>
            <div className='flex items-center justify-evenly mt-20 w-2/3 gap-10'>
                <img
                    src="https://images.unsplash.com/photo-1673339065001-a30d6c343cdd?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                    className='h-100 rounded-lg max-w-sm'
                />
                <div className='flex flex-col gap-6 max-w-xl'>
                    <h1 className='text-4xl font-semibold'>Know About Us</h1>
                    <p className='text-justify text-base leading-relaxed text-gray-700'>
                        Welcome to our world of authentic Nepali handicrafts — where every product is more than just an item, it's a piece of living tradition. Our mission is to bring you handcrafted treasures that reflect the soul of Nepal, created by artisans who have honed their skills through generations. From intricately carved wooden masks and traditional textiles to timeless decor and accessories, each piece tells a story of culture, craftsmanship, and care. We work closely with local communities to ensure every item is ethically sourced, sustainably made, and rich with meaning. Whether you're decorating your home or looking for a meaningful gift, our collection offers a genuine connection to the beauty and heritage of Nepal.
                    </p>

                    {/* <button className='flex items-center self-start gap-2 mt-2 bg-orange-700 text-white px-5 py-2 rounded-md hover:bg-orange-600 transition-all'>
                        Learn More <FaArrowRight />
                    </button> */}
                </div>
            </div>
        </div>
    );
};

export default About;
