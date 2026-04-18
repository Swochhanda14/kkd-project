import React, { useEffect } from 'react'
import {Routes,Route, useLocation} from 'react-router-dom'
import { setFavicon } from './utils/setFavicon'

import Home from "./Pages/Home"
import ShopCategory from "./Pages/ShopCategory"
import Product from "./Pages/Product"
import Cart from "./Pages/Cart"
import LoginSignup from "./Pages/LoginSignup"
import Login from './Pages/Login'
import PaymentSuccess from './Pages/PaymentSuccess'
import PaymentFailure from './Pages/PaymentFailure'
import SearchResults from './Pages/SearchResults'
import About from './Pages/About'
import Contact from './Pages/Contact'

const RouterComponent = () => {
  const location = useLocation();

  useEffect(() => {
    // Set favicon and title based on route
    if (location.pathname.startsWith('/cart')) {
      setFavicon('/cart.png');
      document.title = 'Cart | Karigar Ko Dukaan';
    } else if (location.pathname.startsWith('/product')) {
      setFavicon('/logo.png');
      document.title = 'Product | Karigar Ko Dukaan';
    } else if (location.pathname.startsWith('/login')) {
      setFavicon('/logo.png');
      document.title = 'Login | Karigar Ko Dukaan';
    } else if (location.pathname.startsWith('/search')) {
      setFavicon('/logo.png');
      document.title = 'Search Results | Karigar Ko Dukaan';
    } else if (location.pathname.startsWith('/masks')) {
      setFavicon('/logo.png');
      document.title = 'Masks | Karigar Ko Dukaan';
    } else if (location.pathname.startsWith('/decor')) {
      setFavicon('/logo.png');
      document.title = 'Decor | Karigar Ko Dukaan';
    } else if (location.pathname.startsWith('/accessories')) {
      setFavicon('/logo.png');
      document.title = 'Accessories | Karigar Ko Dukaan';
    } else if (location.pathname.startsWith('/about')) {
      setFavicon('/logo.png');
      document.title = 'About | Karigar Ko Dukaan';
    } else if (location.pathname.startsWith('/contact')) {
      setFavicon('/logo.png');
      document.title = 'Contact | Karigar Ko Dukaan';
    } else {
      setFavicon('/logo.png');
      document.title = 'Karigar Ko Dukaan';
    }
  }, [location.pathname]);

  return (
    <div>
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/masks' element={<ShopCategory category="masks" />} />
          <Route path='/decor' element={<ShopCategory category="decor" />} />
          <Route path='/accessories' element={<ShopCategory category="accessories" />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/loginsignup" element={<LoginSignup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/success" element={<PaymentSuccess />} />
          <Route path="/failure" element={<PaymentFailure />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
    </div>
  )
}

export default RouterComponent
