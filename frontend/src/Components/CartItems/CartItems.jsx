import React, { useContext, useRef, useState } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import CryptoJS from "crypto-js";
import { v4 as uuidv4 } from 'uuid';
import API from '../../API';
import { useNavigate } from 'react-router-dom';

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
        <div className='p-5 flex flex-col items-center'>
            <table className='w-3/4'>
                <thead>
                    <tr className='border-b-2 font-[Poppins]'>
                        <th className='p-5 text-left'>Products</th>
                        <th className='p-5 text-left'>Title</th>
                        <th className='p-5 text-left'>Price</th>
                        <th className='p-5 text-left'>Quantity</th>
                        <th className='p-5 text-left'>Size</th>
                        <th className='p-5 text-left'>Total</th>
                        <th className='p-5 text-left'>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(cartItems).map(([key, item]) => {
                        if (item.quantity > 0) {
                            // Extract productId and size from key
                            const [productId, ...sizeParts] = key.split('_');
                            const size = sizeParts.join('_');
                            const product = allProducts.find(p => p._id === productId);
                            if (!product) return null;
                            return (
                                <tr className='border-b-2' key={key}>
                                    <td className='p-5'>
                                        <img src={Array.isArray(product.image) ? product.image[0] : product.image} alt={product.name} className='w-10 h-10' />
                                    </td>
                                    <td className='p-5'>{product.name}</td>
                                    <td className='p-5'>Rs.{product.new_price}</td>
                                    <td className='p-5 text-center'>{item.quantity}</td>
                                    <td className='p-5 text-center'>{size || '-'}</td>
                                    <td className='p-5'>Rs.{product.new_price * item.quantity}</td>
                                    <td className='p-5 text-center text-2xl text-red-600'>
                                        <i onClick={() => { removeFromCart(key) }} className='fa-solid fa-trash cursor-pointer'></i>
                                    </td>
                                </tr>
                            );
                        }
                        return null;
                    })}
                </tbody>
            </table>

            {/* Cart Total Section */}
            {Object.values(cartItems).some(item => item.quantity > 0) && (
                <div className='w-3/4 mt-10'>
                    <h1 className='text-xl font-bold font-[Poppins]'>Cart Total</h1>
                    <table className='w-1/2'>
                        <tbody>
                            <tr>
                                <td className='p-3 pl-0 text-left'>Subtotal</td>
                                <td className='p-3 pl-20 text-right'>Rs.{amount}</td>
                            </tr>
                            <tr>
                                <td className='p-3 pl-0 text-left'>Tax</td>
                                <td className='p-3 pl-20 text-right'>Rs.{tax}</td>
                            </tr>
                            <tr className='border-b-4'>
                                <td className='p-3 pl-0 text-left'>Shipping Fee</td>
                                <td className='p-3 pl-20 text-right'>Free</td>
                            </tr>
                            <tr>
                                <th className='p-3 pl-0 text-left'>Total</th>
                                <td className='p-3 pl-20 text-right'>Rs.{totalamount}</td>
                            </tr>
                        </tbody>
                    </table>

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
                            className='bg-orange-700 px-5 py-3 text-xl mt-10 text-white font-medium rounded-lg hover:scale-105 hover:shadow-lg hover:shadow-orange-500 transition-all'
                            onClick={handleOrderAndPay}
                            disabled={isProcessing}
                            type="button"
                        >
                            {isProcessing ? 'Processing...' : 'Proceed To Checkout'}
                        </button>
                    </form>
                    {showShippingForm && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                            <form onSubmit={handleShippingSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                                <h2 className="text-xl font-bold mb-4">Shipping Details</h2>
                                <div className="mb-3">
                                    <input name="name" value={shipping.name} onChange={handleShippingChange} placeholder="Full Name" className="w-full border p-2 rounded" />
                                    {shippingErrors.name && <p className="text-red-500 text-sm">{shippingErrors.name}</p>}
                                </div>
                                <div className="mb-3">
                                    <input name="phone" value={shipping.phone} onChange={handleShippingChange} placeholder="Phone Number" className="w-full border p-2 rounded" />
                                    {shippingErrors.phone && <p className="text-red-500 text-sm">{shippingErrors.phone}</p>}
                                </div>
                                <div className="mb-3">
                                    <input name="address" value={shipping.address} onChange={handleShippingChange} placeholder="Address" className="w-full border p-2 rounded" />
                                    {shippingErrors.address && <p className="text-red-500 text-sm">{shippingErrors.address}</p>}
                                </div>
                                <div className="mb-3">
                                    <input name="city" value={shipping.city} onChange={handleShippingChange} placeholder="City" className="w-full border p-2 rounded" />
                                    {shippingErrors.city && <p className="text-red-500 text-sm">{shippingErrors.city}</p>}
                                </div>
                                <div className="flex gap-2 mt-4">
                                    <button type="submit" className="bg-orange-700 text-white px-4 py-2 rounded">Continue to Payment</button>
                                    <button type="button" className="bg-gray-400 text-white px-4 py-2 rounded" onClick={() => setShowShippingForm(false)}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CartItems;