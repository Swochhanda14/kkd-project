import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaUser, FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import { ShopContext } from '../../Context/ShopContext';
import logo from '/logo.png'; // Adjust the path as necessary

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { getTotalCartItems } = useContext(ShopContext);

  const [userInfo, setUserInfo] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    setUserInfo(user);
    setMobileOpen(false);
  }, [location]);

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    setUserInfo(null);
    setShowDropdown(false);
    navigate('/');
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/masks', label: 'Masks' },
    { path: '/decor', label: 'Decor' },
    { path: '/accessories', label: 'Accessories' },
  ];

  const getLinkClass = (path) =>
    `relative px-2 py-1 transition-all duration-300 
     after:content-[''] after:absolute after:left-0 after:bottom-0 
     after:h-[2px] after:w-full after:scale-x-0 after:bg-white 
     after:origin-left after:transition-transform after:duration-300 
     ${location.pathname === path ? 'after:scale-x-100' : ''}`;

  return (
    <nav className="sticky top-0 z-30 bg-gradient-to-r from-orange-700 via-orange-600 to-red-600 text-white shadow-lg backdrop-blur-md supports-[backdrop-filter]:bg-orange-700/95 border-b border-orange-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center group">
          <div className="relative">
            <img src={logo} alt="Karigar Ko Dukaan" className="w-14 h-14 p-1.5 transition-transform duration-300 group-hover:scale-110" />
            <div className="absolute inset-0 bg-white/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          
        </Link>

        <button
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200 active:scale-95"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
        </button>

        <ul className="hidden md:flex space-x-1 lg:space-x-2 uppercase font-semibold text-sm lg:text-base">
          {navLinks.map(({ path, label }) => (
            <li key={path}>
              <Link to={path} className={`${getLinkClass(path)} px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-200`}>
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="px-4 py-2.5 rounded-l-xl outline-none text-gray-800 w-64 focus:ring-2 focus:ring-white/50 focus:bg-white transition-all duration-200 shadow-md"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') handleSearch();
              }}
            />
          </div>
          <button
            className="bg-white text-orange-700 px-5 py-2.5 rounded-r-xl font-semibold hover:bg-orange-50 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        <div className="flex items-center space-x-4 lg:space-x-6 relative">
        {userInfo ? (
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-200 focus:outline-none"
              aria-label="User menu"
            >
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <FaUser className="text-sm" />
              </div>
              <span className="hidden lg:inline font-medium">Hello, {userInfo.name?.split(' ')[0]}</span>
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 shadow-xl rounded-xl z-10 overflow-hidden border border-gray-100 animate-slide-down">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-semibold">{userInfo.name}</p>
                  <p className="text-xs text-gray-500">{userInfo.email}</p>
                </div>
                <button
                  onClick={logoutHandler}
                  className="block w-full px-4 py-3 text-left hover:bg-orange-50 text-red-600 font-medium transition-colors duration-150"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-200"
          >
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <FaUser className="text-sm" />
            </div>
            <span className="hidden lg:inline font-medium">Login</span>
          </Link>
        )}

        <Link to="/cart" className="relative flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-200 group">
          <div className="relative">
            <FaShoppingCart className="text-xl group-hover:scale-110 transition-transform duration-200" />
            {getTotalCartItems() > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-lg animate-bounce-slow">
                {getTotalCartItems()}
              </span>
            )}
          </div>
          <span className="hidden lg:inline font-medium">Cart</span>
        </Link>
        </div>
      </div>
      {mobileOpen && (
        <div className="md:hidden bg-gradient-to-b from-orange-800 to-orange-900 backdrop-blur-lg px-6 pb-6 border-t border-orange-500/20 animate-slide-down">
          <div className="flex flex-col gap-4 pt-4">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search products..."
                className="px-4 py-2.5 rounded-l-xl outline-none text-gray-800 w-full focus:ring-2 focus:ring-white/50 shadow-md"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') handleSearch();
                }}
              />
              <button
                className="bg-white text-orange-700 px-5 py-2.5 rounded-r-xl font-semibold hover:bg-orange-50 active:scale-95 transition-all duration-200 shadow-md"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
            <ul className="grid grid-cols-2 gap-2 uppercase font-semibold">
              {navLinks.map(({ path, label }) => (
                <li key={path}>
                  <Link 
                    to={path} 
                    className={`block px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-200 ${location.pathname === path ? 'bg-white/10' : ''}`} 
                    onClick={() => setMobileOpen(false)}
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/cart" className="block px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-200" onClick={() => setMobileOpen(false)}>
                  Cart
                </Link>
              </li>
              <li>
                {userInfo ? (
                  <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-200" onClick={logoutHandler}>
                    Logout
                  </button>
                ) : (
                  <Link to="/login" className="block px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-200" onClick={() => setMobileOpen(false)}>
                    Login
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
