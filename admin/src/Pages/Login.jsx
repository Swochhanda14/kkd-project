import React, { useState } from 'react';
import logo from '/logo.png';
import API from '../API';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      
      const res = await API.post('/admin/search', { email, password });
      
      if (res.data === 'success') {
        navigate('/dashboard');
      } else {
        setError(res.data); 
      }
    } catch (err) {
      setError('An error occurred while logging in.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 flex items-center justify-center p-4">
      <main className="w-full max-w-md">
        <div className="mb-12 flex items-center justify-center gap-3">
          <img src={logo} alt="Logo" className="h-12 mix-blend-screen" />
          <p className="text-white font-bold text-2xl font-poppins">Karigar Ko Dukaan</p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-2xl border border-white/20">
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-center">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
            <div className="text-center mb-6">
              <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">Admin Login</h1>
              <p className="text-gray-300">Access your admin dashboard</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Email</label>
              <div className="w-full transform border-2 border-white/20 rounded-xl bg-white/5 backdrop-blur-sm text-lg duration-300 focus-within:border-indigo-400 focus-within:bg-white/10">
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border-none bg-transparent outline-none placeholder:text-gray-400 text-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Password</label>
              <div className="w-full transform border-2 border-white/20 rounded-xl bg-white/5 backdrop-blur-sm text-lg duration-300 focus-within:border-indigo-400 focus-within:bg-white/10">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border-none bg-transparent outline-none placeholder:text-gray-400 text-white focus:outline-none"
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full transform rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 py-4 font-bold text-lg text-white duration-300 hover:from-indigo-700 hover:to-purple-700 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl transition-all"
            >
              LOG IN
            </button>

            <a href="#" className="transform text-center font-semibold text-gray-400 duration-300 hover:text-white text-sm">
              FORGOT PASSWORD?
            </a>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Login;
