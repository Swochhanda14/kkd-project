import React, { useState } from 'react';
import API from '../API';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};
    if (!email) validationErrors.email = 'Email is required';
    if (!password) validationErrors.password = 'Password is required';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      validationErrors.email = 'Please enter a valid email address';
    }

    if (password && password.length < 8) {
      validationErrors.password = 'Password must be at least 8 characters long';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setError('');
    setLoading(true);

    try {
      const res = await API.post('/user/login', { email, password });

      console.log('Login response:', res.data);

      if (res.data.status === 'success') {
        localStorage.setItem('userInfo', JSON.stringify(res.data.user));
        alert('Logged in Successfully');
        navigate('/');
      } else {
        setError(res.data.message || 'Login failed.');
      }
    } catch (err) {
      console.error('Login error:', err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Server error during login.');
      }
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-orange-800">Login</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              value={email}
              placeholder="Your Email Address"
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                errors.email ? 'border-red-500' : ''
              }`}
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
          </div>

          <div>
            <input
              type="password"
              value={password}
              placeholder="Your Password"
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                errors.password ? 'border-red-500' : ''
              }`}
            />
            {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-orange-800 text-white py-2 rounded-md hover:bg-orange-700 transition"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        {error && (
          <p className="mt-4 text-center text-red-600 font-medium">{error}</p>
        )}

        <p className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?{' '}
          <Link to="/loginsignup" className="text-orange-700 font-semibold hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
