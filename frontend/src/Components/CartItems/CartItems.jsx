import React, { useContext, useRef, useState } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import CryptoJS from "crypto-js";
import { v4 as uuidv4 } from 'uuid';
import API from '../../API';
import { useNavigate, Link } from 'react-router-dom';

const CartItems = () => {
    const { allProducts, cartItems, removeFromCart, getTotalAmount } = useContext(ShopContext);
    const formRef = useRef(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [showShippingForm, setShowShippingForm] = useState(false);
    const [shipping, setShipping] = useState({
        name: '',
        phone: '',
        address: '',
        city: '',
    });
    const [shippingErrors, setShippingErrors] = useState({});
    const navigate = useNavigate();

    const uid = uuidv4();
    const amount = getTotalAmount();
    const tax = Math.round((amount * 0.1) * 100) / 100;
    const totalamount = Math.round((amount + tax) * 100) / 100;
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const userId = userInfo ? userInfo._id || userInfo.id || userInfo.email : "USER_ID";

    const message = `total_amount=${totalamount},transaction_uuid=${uid},product_code=EPAYTEST`;
    const esewasecret = import.meta.env.VITE_ESEWASECRET;
    const hash = CryptoJS.HmacSHA256(message, esewasecret);
    const signature = CryptoJS.enc.Base64.stringify(hash);

    const validateShipping = () => {
        const errors = {};
        if (!shipping.name.trim()) errors.name = 'Name is required';
        if (!/^\d{10}$/.test(shipping.phone)) errors.phone = 'Valid 10-digit phone required';
        if (!shipping.address.trim()) errors.address = 'Address is required';
        if (!shipping.city.trim()) errors.city = 'City is required';
        return errors;
    };

    const handleShippingChange = (e) => {
        setShipping({ ...shipping, [e.target.name]: e.target.value });
    };

    const handleShippingSubmit = (e) => {
        e.preventDefault();
        const errors = validateShipping();
        setShippingErrors(errors);
        if (Object.keys(errors).length === 0) {
            setShowShippingForm(false);
            // Now submit the eSewa form
            formRef.current.submit();
        }
    };

    const handleOrderAndPay = async (event) => {
        event.preventDefault();
        if (!userInfo) {
            navigate('/login');
            return;
        }
        setIsProcessing(true);
        // Show shipping form first
        setShowShippingForm(true);
        setIsProcessing(false);
    };

    return (
        <div className='flex flex-col items-center w-full'>
            {Object.values(cartItems).some(item => item.quantity > 0) ? (
              <>
                <div className='w-full overflow-x-auto custom-scrollbar'>
                  <table className='w-full bg-white rounded-2xl shadow-soft overflow-hidden'>
                      <thead className='bg-gradient-to-r from-orange-600 to-red-600 text-white'>
                          <tr>
                              <th className='p-4 text-left font-bold'>Product</th>
                              <th className='p-4 text-left font-bold hidden md:table-cell'>Title</th>
                              <th className='p-4 text-left font-bold'>Price</th>
                              <th className='p-4 text-left font-bold'>Quantity</th>
                              <th className='p-4 text-left font-bold hidden lg:table-cell'>Size</th>
                              <th className='p-4 text-left font-bold'>Total</th>
                              <th className='p-4 text-center font-bold'>Remove</th>
                          </tr>
                      </thead>
                      <tbody className='divide-y divide-gray-100'>
                          {Object.entries(cartItems).map(([key, item]) => {
                              if (item.quantity > 0) {
                                  // Extract productId and size from key
                                  const [productId, ...sizeParts] = key.split('_');
                                  const size = sizeParts.join('_');
                                  const product = allProducts.find(p => p._id === productId);
                                  if (!product) return null;
                                  return (
                                      <tr className='hover:bg-orange-50 transition-colors duration-150' key={key}>
                                          <td className='p-4'>
                                              <div className='flex items-center gap-3'>
                                                  <img 
                                                      src={Array.isArray(product.image) ? product.image[0] : product.image} 
                                                      alt={product.name} 
                                                      className='w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg shadow-md' 
                                                  />
                                                  <span className='md:hidden font-semibold text-gray-800'>{product.name}</span>
                                              </div>
                                          </td>
                                          <td className='p-4 hidden md:table-cell'>
                                              <span className='font-semibold text-gray-800'>{product.name}</span>
                                          </td>
                                          <td className='p-4'>
                                              <span className='font-bold text-orange-600'>Rs. {product.new_price}</span>
                                          </td>
                                          <td className='p-4'>
                                              <span className='inline-block px-3 py-1 bg-gray-100 rounded-lg font-semibold'>{item.quantity}</span>
                                          </td>
                                          <td className='p-4 hidden lg:table-cell'>
                                              <span className='text-gray-600'>{size || '-'}</span>
                                          </td>
                                          <td className='p-4'>
                                              <span className='font-bold text-gray-800'>Rs. {product.new_price * item.quantity}</span>
                                          </td>
                                          <td className='p-4 text-center'>
                                              <button
                                                  onClick={() => { removeFromCart(key) }}
                                                  className='w-10 h-10 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-all duration-200 hover:scale-110 active:scale-95 flex items-center justify-center'
                                                  aria-label="Remove item"
                                              >
                                                  <i className='fa-solid fa-trash text-sm'></i>
                                              </button>
                                          </td>
                                      </tr>
                                  );
                              }
                              return null;
                          })}
                      </tbody>
                  </table>
                </div>

                {/* Cart Total Section */}
                <div className='w-full max-w-2xl mt-10 bg-white rounded-2xl shadow-soft p-6 lg:p-8'>
                    <h1 className='text-2xl font-bold mb-6 text-gray-800 border-b border-gray-200 pb-3'>Cart Summary</h1>
                    <div className='space-y-4 mb-6'>
                        <div className='flex justify-between items-center py-2'>
                            <span className='text-gray-600 font-medium'>Subtotal</span>
                            <span className='text-gray-800 font-semibold text-lg'>Rs. {amount.toLocaleString()}</span>
                        </div>
                        <div className='flex justify-between items-center py-2'>
                            <span className='text-gray-600 font-medium'>Tax (10%)</span>
                            <span className='text-gray-800 font-semibold text-lg'>Rs. {tax.toLocaleString()}</span>
                        </div>
                        <div className='flex justify-between items-center py-2 border-b-2 border-gray-200 pb-4'>
                            <span className='text-gray-600 font-medium'>Shipping Fee</span>
                            <span className='text-green-600 font-semibold'>Free</span>
                        </div>
                        <div className='flex justify-between items-center pt-2'>
                            <span className='text-xl font-bold text-gray-800'>Total</span>
                            <span className='text-2xl font-extrabold text-orange-600'>Rs. {totalamount.toLocaleString()}</span>
                        </div>
                    </div>

                    <form ref={formRef} action="https://rc-epay.esewa.com.np/api/epay/main/v2/form" method="POST">
                        <input type="hidden" id="amount" name="amount" value={amount} required />
                        <input type="hidden" id="tax_amount" name="tax_amount" value={tax} required />
                        <input type="hidden" id="total_amount" name="total_amount" value={totalamount} required />
                        <input type="hidden" id="transaction_uuid" name="transaction_uuid" value={uid} required />
                        <input type="hidden" id="product_code" name="product_code" value="EPAYTEST" required />
                        <input type="hidden" id="product_service_charge" name="product_service_charge" value="0" required />
                        <input type="hidden" id="product_delivery_charge" name="product_delivery_charge" value="0" required />
                        <input type="hidden" id="success_url" name="success_url" value="http://localhost:5173/success" required />
                        <input type="hidden" id="failure_url" name="failure_url" value="http://localhost:5173/failure" required />
                        <input type="hidden" id="signed_field_names" name="signed_field_names" value="total_amount,transaction_uuid,product_code" required />
                        <input type="hidden" id="signature" name="signature" value={signature} required />
                    <button
                        className='w-full bg-gradient-to-r from-orange-600 to-red-600 px-6 py-4 text-lg text-white font-bold rounded-xl hover:from-orange-700 hover:to-red-700 transform hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
                        onClick={handleOrderAndPay}
                        disabled={isProcessing}
                        type="button"
                    >
                        {isProcessing ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                            </span>
                        ) : (
                            'Proceed To Checkout'
                        )}
                    </button>
                    </form>
                    {showShippingForm && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4 animate-fade-in">
                            <form onSubmit={handleShippingSubmit} className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md animate-scale-in">
                                <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b border-gray-200 pb-3">Shipping Details</h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                                        <input 
                                            name="name" 
                                            value={shipping.name} 
                                            onChange={handleShippingChange} 
                                            placeholder="Enter your full name" 
                                            className="w-full border-2 border-gray-200 p-3 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all duration-200" 
                                        />
                                        {shippingErrors.name && <p className="text-red-500 text-sm mt-1">{shippingErrors.name}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                                        <input 
                                            name="phone" 
                                            value={shipping.phone} 
                                            onChange={handleShippingChange} 
                                            placeholder="10-digit phone number" 
                                            className="w-full border-2 border-gray-200 p-3 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all duration-200" 
                                        />
                                        {shippingErrors.phone && <p className="text-red-500 text-sm mt-1">{shippingErrors.phone}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                                        <input 
                                            name="address" 
                                            value={shipping.address} 
                                            onChange={handleShippingChange} 
                                            placeholder="Street address" 
                                            className="w-full border-2 border-gray-200 p-3 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all duration-200" 
                                        />
                                        {shippingErrors.address && <p className="text-red-500 text-sm mt-1">{shippingErrors.address}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                                        <input 
                                            name="city" 
                                            value={shipping.city} 
                                            onChange={handleShippingChange} 
                                            placeholder="City name" 
                                            className="w-full border-2 border-gray-200 p-3 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all duration-200" 
                                        />
                                        {shippingErrors.city && <p className="text-red-500 text-sm mt-1">{shippingErrors.city}</p>}
                                    </div>
                                </div>
                                <div className="flex gap-3 mt-6">
                                    <button 
                                        type="submit" 
                                        className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-orange-700 hover:to-red-700 transform hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg"
                                    >
                                        Continue to Payment
                                    </button>
                                    <button 
                                        type="button" 
                                        className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transform hover:scale-105 active:scale-95 transition-all duration-200" 
                                        onClick={() => setShowShippingForm(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
              </>
            ) : (
              <div className="w-full max-w-2xl mt-10 bg-white rounded-2xl shadow-soft p-12 text-center">
                <div className="text-6xl mb-4">🛒</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
                <p className="text-gray-600 mb-6">Start adding items to your cart!</p>
                <Link 
                  to="/masks" 
                  className="inline-block bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-orange-700 hover:to-red-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  Continue Shopping
                </Link>
              </div>
            )}
        </div>
    );
};

export default CartItems;