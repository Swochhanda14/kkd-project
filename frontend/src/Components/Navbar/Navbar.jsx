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
    <nav className="sticky top-0 z-30 bg-gradient-to-r from-orange-800 to-red-700/90 text-white backdrop-blur supports-[backdrop-filter]:bg-orange-800/80">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Karigar Ko Dukaan" className="w-12 h-12 p-1" />
        </Link>

        <button
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-md bg-white/10 hover:bg-white/20 transition"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <FaTimes /> : <FaBars />}
        </button>

        <ul className="hidden md:flex space-x-6 uppercase">
          {navLinks.map(({ path, label }) => (
            <li key={path}>
              <Link to={path} className={getLinkClass(path)}>
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center">
          <input
            type="text"
            placeholder="Search products..."
            className="px-3 py-2 rounded-l-lg outline-none text-black w-56 focus:ring-2 focus:ring-orange-400"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') handleSearch();
            }}
          />
          <button
            className="bg-white text-orange-800 px-4 py-2 rounded-r-lg font-semibold hover:bg-orange-100 transition"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        <div className="flex items-center space-x-6 relative">
        {userInfo ? (
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center space-x-2 focus:outline-none"
              aria-label="User menu"
            >
              <FaUser className="text-xl" />
              <span>Hello, {userInfo.name?.split(' ')[0]}</span>
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-black shadow-md rounded-md z-10">
                <button
                  onClick={logoutHandler}
                  className="block w-full px-4 py-2 text-left hover:bg-orange-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="flex items-center space-x-2"
          >
            <FaUser className="text-xl" />
            <span>Login</span>
          </Link>
        )}

        <Link to="/cart" className="relative flex items-center space-x-2">
          <FaShoppingCart className="text-xl" />
          <span>Cart</span>
          {getTotalCartItems() > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-semibold w-5 h-5 rounded-full flex items-center justify-center shadow-md">
              {getTotalCartItems()}
            </span>
          )}
        </Link>
        </div>
      </div>
      {mobileOpen && (
        <div className="md:hidden bg-orange-900/95 backdrop-blur px-6 pb-4">
          <div className="flex flex-col gap-3 pt-2">
            <div className="flex">
              <input
                type="text"
                placeholder="Search products..."
                className="px-3 py-2 rounded-l-lg outline-none text-black w-full focus:ring-2 focus:ring-orange-400"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') handleSearch();
                }}
              />
              <button
                className="bg-white text-orange-800 px-4 py-2 rounded-r-lg font-semibold hover:bg-orange-100 transition"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
            <ul className="grid grid-cols-2 gap-2 uppercase">
              {navLinks.map(({ path, label }) => (
                <li key={path}>
                  <Link to={path} className="block px-3 py-2 rounded-md hover:bg-white/10" onClick={() => setMobileOpen(false)}>
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/cart" className="block px-3 py-2 rounded-md hover:bg-white/10" onClick={() => setMobileOpen(false)}>
                  Cart
                </Link>
              </li>
              <li>
                {userInfo ? (
                  <button className="w-full text-left px-3 py-2 rounded-md hover:bg-white/10" onClick={logoutHandler}>
                    Logout
                  </button>
                ) : (
                  <Link to="/login" className="block px-3 py-2 rounded-md hover:bg-white/10" onClick={() => setMobileOpen(false)}>
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
