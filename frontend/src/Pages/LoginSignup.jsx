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
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-orange-800">Sign Up</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${errors.name ? 'border-red-500' : ''}`}
            />
            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${errors.email ? 'border-red-500' : ''}`}
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${errors.password ? 'border-red-500' : ''}`}
            />
            {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
          </div>

          <div>
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${errors.address ? 'border-red-500' : ''}`}
            />
            {errors.address && <p className="text-sm text-red-500 mt-1">{errors.address}</p>}
          </div>

          <div>
            <input
              type="text"
              placeholder="Contact Number"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${errors.contact ? 'border-red-500' : ''}`}
            />
            {errors.contact && <p className="text-sm text-red-500 mt-1">{errors.contact}</p>}
          </div>

          <div className="flex items-start gap-2 mt-2">
            <input
              type="checkbox"
              checked={agreed}
              onChange={() => setAgreed(!agreed)}
            />
            <label className="text-sm text-gray-600">
              I agree to the Terms of Service and Privacy Policy.
            </label>
          </div>
          {errors.agreed && <p className="text-sm text-red-500">{errors.agreed}</p>}

          <button
            type="submit"
            className="w-full bg-orange-800 text-white py-2 rounded-md hover:bg-orange-700 transition"
            disabled={loading}
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-orange-700 font-semibold hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginSignup;
