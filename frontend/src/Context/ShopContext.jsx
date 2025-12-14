import React, { createContext, useState, useEffect } from 'react';
import API from '../API';
export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        // Fetch products from your API
        API.get('/product') // Adjust the endpoint as per your backend route
            .then((response) => {
                setAllProducts(response.data); // Assuming response.data is the list of products
                // Only set cartItems if it's empty (first load)
                setCartItems(prev => {
                    // If prev is empty or contains only zero-quantity items, reset
                    const hasNonZero = Object.values(prev).some(v => v?.quantity > 0);
                    return (!hasNonZero && Object.keys(prev).length === response.data.length)
                        ? getDefaultCart(response.data)
                        : prev;
                });
            })
            .catch((error) => {
                console.error('Error fetching products', error);
            });
    }, []);

    // Default cart: { [id]: { quantity: 0, size: "" } }
    const getDefaultCart = (products) => {
        let cart = {};
        products.forEach((product) => {
            cart[product._id] = { quantity: 0, size: "" };
        });
        return cart;
    };

    // Add to cart with size
    const addToCart = (itemId, quantity = 1, size = "") => {
        // Check if user is logged in
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (!userInfo) {
            alert('Please log in to add items to your cart.');
            return;
        }
        setCartItems((prev) => {
            const key = size ? `${itemId}_${size}` : itemId;
            // Find the product and its stock
            const [productId] = key.split('_');
            const product = allProducts.find(p => p._id === productId);
            const stock = product ? product.quantity : Infinity;
            const currentQty = prev[key]?.quantity || 0;
            // Prevent adding more than stock
            if (currentQty + quantity > stock) {
                alert('Cannot add more than available stock!');
                return prev;
            }
            return {
                ...prev,
                [key]: {
                    quantity: currentQty + quantity,
                    size: size || prev[key]?.size || ""
                }
            };
        });
    };

    // Remove from cart
    const removeFromCart = (itemId) => {
        setCartItems((prev) => {
            const currentQty = prev[itemId]?.quantity || 0;
            return {
                ...prev,
                [itemId]: {
                    ...prev[itemId],
                    quantity: Math.max(0, currentQty - 1)
                }
            };
        });
    };

    // Get total amount
    const getTotalAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item]?.quantity > 0) {
                // Extract productId from composite key (productId_size)
                const [productId] = item.split('_');
                const itemInfo = allProducts.find((product) => product._id === productId);
                if (itemInfo) {
                    totalAmount += itemInfo.new_price * cartItems[item].quantity;
                }
            }
        }
        return totalAmount;
    };

    // Get total cart items
    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item]?.quantity > 0) {
                totalItem += cartItems[item].quantity;
            }
        }
        return totalItem;
    };

    const contextValue = {
        allProducts,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalAmount,
        getTotalCartItems,
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;