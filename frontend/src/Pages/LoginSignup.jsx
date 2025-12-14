import React, { useState } from 'react';
import API from '../API';
import { Link, useNavigate } from 'react-router-dom';

const LoginSignup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!name.trim()) validationErrors.name = 'Name is required';
    else if (!/^[a-zA-Z\s]+$/.test(name.trim())) validationErrors.name = 'Name must only contain letters and spaces';

    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!email.trim()) validationErrors.email = 'Email is required';
    else if (!emailRegex.test(email)) validationErrors.email = 'Email must be a valid Gmail address';

    if (!password) validationErrors.password = 'Password is required';
    else if (password.length < 8) validationErrors.password = 'Password must be at least 8 characters long';
    // else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}/.test(password)) validationErrors.password = 'Password must contain uppercase, lowercase, number, and special character';

    if (!address.trim()) validationErrors.address = 'Address is required';
    if (!contact.trim()) validationErrors.contact = 'Contact number is required';

    if (contact && (!/^\d{10}$/.test(contact) || !contact.startsWith('98'))) {
      validationErrors.contact = 'Please enter a valid 10-digit contact number starting with "98"';
    }

    if (!agreed) {
      validationErrors.agreed = 'You must agree to the terms and privacy policy';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    const data = { name, email, password, address, contact };

    try {
      const res = await API.post('/user', data);

      if (res.status === 201) {
        localStorage.setItem('userInfo', JSON.stringify(res.data));
        navigate('/');
      } else {
        alert(res.data?.message || 'Error Registering User');
      }
    } catch (err) {
      alert('Error Registering User: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-gradient-to-br from-gray-50 via-orange-50/30 to-gray-50 py-12 px-4">
      <div className="bg-white shadow-2xl rounded-3xl p-8 md:p-12 w-full max-w-2xl border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-2 gradient-text">Create Account</h2>
          <p className="text-gray-600">Join us and start shopping</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
                  errors.name 
                    ? 'border-red-500 focus:ring-red-200' 
                    : 'border-gray-200 focus:border-orange-500 focus:ring-orange-200'
                }`}
              />
              {errors.name && <p className="text-sm text-red-500 mt-2 flex items-center gap-1">
                <span>⚠</span> {errors.name}
              </p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input
                type="email"
                placeholder="your.email@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
                  errors.email 
                    ? 'border-red-500 focus:ring-red-200' 
                    : 'border-gray-200 focus:border-orange-500 focus:ring-orange-200'
                }`}
              />
              {errors.email && <p className="text-sm text-red-500 mt-2 flex items-center gap-1">
                <span>⚠</span> {errors.email}
              </p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <input
              type="password"
              placeholder="At least 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
                errors.password 
                  ? 'border-red-500 focus:ring-red-200' 
                  : 'border-gray-200 focus:border-orange-500 focus:ring-orange-200'
              }`}
            />
            {errors.password && <p className="text-sm text-red-500 mt-2 flex items-center gap-1">
              <span>⚠</span> {errors.password}
            </p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
              <input
                type="text"
                placeholder="Your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
                  errors.address 
                    ? 'border-red-500 focus:ring-red-200' 
                    : 'border-gray-200 focus:border-orange-500 focus:ring-orange-200'
                }`}
              />
              {errors.address && <p className="text-sm text-red-500 mt-2 flex items-center gap-1">
                <span>⚠</span> {errors.address}
              </p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Number</label>
              <input
                type="text"
                placeholder="98XXXXXXXX"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
                  errors.contact 
                    ? 'border-red-500 focus:ring-red-200' 
                    : 'border-gray-200 focus:border-orange-500 focus:ring-orange-200'
                }`}
              />
              {errors.contact && <p className="text-sm text-red-500 mt-2 flex items-center gap-1">
                <span>⚠</span> {errors.contact}
              </p>}
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
            <input
              type="checkbox"
              checked={agreed}
              onChange={() => setAgreed(!agreed)}
              className="mt-1 w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
            />
            <label className="text-sm text-gray-700">
              I agree to the <span className="text-orange-600 font-semibold">Terms of Service</span> and <span className="text-orange-600 font-semibold">Privacy Policy</span>.
            </label>
          </div>
          {errors.agreed && <p className="text-sm text-red-500 flex items-center gap-1">
            <span>⚠</span> {errors.agreed}
          </p>}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-3.5 rounded-xl font-bold text-lg hover:from-orange-700 hover:to-red-700 transform hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating account...
              </span>
            ) : (
              'Sign Up'
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-orange-600 font-bold hover:text-orange-700 hover:underline transition-colors">
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginSignup;
