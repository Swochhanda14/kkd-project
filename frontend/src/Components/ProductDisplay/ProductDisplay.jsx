// import React, { useContext, useState, useEffect } from 'react';
// import { ShopContext } from '../../Context/ShopContext';

// const ProductDisplay = (props) => {
//     const { product } = props;
//     const { addToCart } = useContext(ShopContext);
//     const [quantity, setQuantity] = useState(1);

//     const handleQuantityChange = (e) => {
//         setQuantity(Number(e.target.value));
//     };


//     const handleAddToCart = () => {
//         if (quantity > 0) {
//             addToCart(product._id, quantity);
//         } else {
//             console.log('Quantity must be greater than 0');
//         }
//     };

//     return (
//         <div>
//             <div className='pl-20 py-5 flex gap-10'>
//                 {/* <div className='w-14 flex flex-col gap-3'>
//                     <img src={product.image} alt="" className='border p-1' />
//                     <img src={product.image} alt="" className='border p-1' />
//                     <img src={product.image} alt="" className='border p-1' />
//                 </div> */}
//                 <div className='w-[500px] border p-5'>
//                     <img src={product.image} alt="" />
//                 </div>
//                 <div className='w-[60%] flex flex-col gap-10 items-start'>
//                     <div className='flex flex-col gap-5'>
//                         <p className='text-4xl font-bold'>{product.name}</p>
//                         <p className='text-2xl font-medium text-red-700 mt-3'>
//                             Rs.{product.new_price} 
//                             <span className='line-through text-gray-500 ml-2'>
//                                 Rs.{product.old_price}
//                             </span>
//                         </p>
//                     </div>
//                     <div className='mt-5 flex gap-2 items-center'>
//                         <p className='text-lg font-medium'>Qty</p>
//                         <input 
//                             type="number" 
//                             className='border-2 p-1 w-20 rounded-md' 
//                             value={quantity}
//                             onChange={handleQuantityChange} 
//                             min="1" 
//                         />
//                         <p className='text-lg font-medium text-gray-700 capitalize'>in stock</p>
//                     </div>
//                     <button 
//                         onClick={handleAddToCart} 
//                         className='transition-all p-3 w-1/3 text-lg text-white rounded-lg font-semibold bg-black hover:shadow-xl hover:scale-105 hover:shadow-gray-400 border-0'
//                     >
//                         Add to Cart
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProductDisplay;

import React, { useContext, useState } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import Rating from '../Rating';

const ProductDisplay = (props) => {
    const { product } = props;
    const { addToCart } = useContext(ShopContext);
    const [quantity, setQuantity] = useState(1);
    const [mainImage, setMainImage] = useState();
    const [selectedSize, setSelectedSize] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);

    React.useEffect(() => {
        if (Array.isArray(product.image) && product.image.length > 0) {
            setMainImage(product.image[0]);
            setCurrentIndex(0);
        } else if (typeof product.image === 'string') {
            setMainImage(product.image);
            setCurrentIndex(0);
        }
    }, [product.image]);

    const handlePrevImage = () => {
        if (Array.isArray(product.image) && product.image.length > 1) {
            const newIndex = (currentIndex - 1 + product.image.length) % product.image.length;
            setMainImage(product.image[newIndex]);
            setCurrentIndex(newIndex);
        }
    };
    const handleNextImage = () => {
        if (Array.isArray(product.image) && product.image.length > 1) {
            const newIndex = (currentIndex + 1) % product.image.length;
            setMainImage(product.image[newIndex]);
            setCurrentIndex(newIndex);
        }
    };

    const handleQuantityChange = (e) => {
        setQuantity(Number(e.target.value));
    };

    const handleAddToCart = () => {
        if (quantity > 0) {
            addToCart(product._id, quantity,selectedSize);
        } else {
            console.log('Quantity must be greater than 0');
        }
    };

    return (
        <div className="bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Product Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-10 rounded-lg shadow-xl">

                    {/* Product Image Section */}
                    <div className="flex flex-col space-y-6">
                        <div className="w-full h-[550px] bg-gray-100 rounded-lg overflow-hidden relative flex items-center justify-center">
                            {Array.isArray(product.image) && product.image.length > 1 && (
                                <button onClick={handlePrevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-2xl rounded-full p-2 shadow z-10">
                                    &#8592;
                                </button>
                            )}
                            <img src={mainImage} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                            {Array.isArray(product.image) && product.image.length > 1 && (
                                <button onClick={handleNextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-2xl rounded-full p-2 shadow z-10">
                                    &#8594;
                                </button>
                            )}
                        </div>
                        {/* Gallery Thumbnails */}
                        {Array.isArray(product.image) && product.image.length > 1 && (
                            <div className="flex gap-3 mt-2">
                                {product.image.map((img, idx) => (
                                    <img
                                        key={idx}
                                        src={img}
                                        alt={`Thumbnail ${idx+1}`}
                                        className={`w-24 h-24 object-cover border-2 p-1 rounded-lg cursor-pointer transition duration-300 ${mainImage === img ? 'border-cyan-600' : 'border-gray-300'}`}
                                        onClick={() => setMainImage(img)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Details Section */}
                    <div className="flex flex-col justify-between space-y-8">
                        {/* Product Title & Price */}
                        <div className="space-y-4">
                            <h1 className="text-4xl font-bold text-gray-800">{product.name}</h1>
                            <p className="text-2xl text-red-600 font-semibold">
                                Rs. {product.new_price}
                                <span className="line-through text-gray-500 ml-4 text-lg">Rs. {product.old_price}</span>
                            </p>

                            {/* Rating Section */}
                            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                        </div>

                        {/* Product Description */}
                        <div className="text-gray-700 space-y-4">
                            <h2 className="text-xl font-semibold">Product Description</h2>
                            <p>{product.description}</p>
                        </div>

                        {/* Quantity Selector & Stock Info */}
                        <div className="flex items-center space-x-4">
                            <label className="text-lg font-medium text-gray-800">Quantity</label>
                            <input
                                type="number"
                                value={quantity}
                                onChange={handleQuantityChange}
                                className="border-2 p-2 w-20 rounded-lg text-center focus:ring-2 focus:ring-blue-500 outline-none transition duration-300"
                                min="1"
                            />
                            <p className='text-lg font-medium text-gray-700 capitalize'>{product.quantity} left in stock</p>
                            <p className="text-lg text-gray-600">In Stock</p>
                        </div>

                        {/* Size Selector */}
                        {Array.isArray(product.size) && product.size.length > 0 && (
                            <div className="flex items-center space-x-4">
                                <label className="text-lg font-medium text-gray-800">Size</label>
                                <select
                                    value={selectedSize}
                                    onChange={e => setSelectedSize(e.target.value)}
                                    className="border-2 p-2 rounded-lg text-center focus:ring-2 focus:ring-blue-500 outline-none transition duration-300"
                                >
                                    <option value="" disabled>Select size</option>
                                    {product.size.map((sz, idx) => (
                                        <option key={idx} value={sz}>{sz}</option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {/* Add to Cart Button */}
                        <button
                            onClick={handleAddToCart}
                            className="bg-black text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-gray-800 hover:shadow-lg transition duration-300"
                            >
                            Add to Cart
                        </button>

                        {/* Additional Product Info */}
                        {/* <div className="text-gray-600">
                            <h2 className="text-xl font-semibold">Product Features</h2>
                            <ul className="list-disc pl-5 mt-2 space-y-2">
                                <li>Luxurious and durable material</li>
                                <li>Available in various sizes</li>
                                <li>Perfect for all types of workouts</li>
                                <li>Exclusive design only at Gymnasia</li>
                            </ul>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDisplay;
