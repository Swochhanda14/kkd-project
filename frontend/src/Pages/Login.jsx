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
    <div className="flex items-center justify-center min-h-[80vh] bg-gradient-to-br from-gray-50 via-orange-50/30 to-gray-50 py-12 px-4">
      <div className="bg-white shadow-2xl rounded-3xl p-8 md:p-12 w-full max-w-md border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-2 gradient-text">Welcome Back</h2>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              placeholder="Enter your email"
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

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              placeholder="Enter your password"
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
                Logging in...
              </span>
            ) : (
              'Log In'
            )}
          </button>
        </form>

        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-center text-red-600 font-medium">{error}</p>
          </div>
        )}

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/loginsignup" className="text-orange-600 font-bold hover:text-orange-700 hover:underline transition-colors">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
