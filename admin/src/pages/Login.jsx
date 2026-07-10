import React, { useState } from 'react';
import { FiUser, FiLock } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import logo from '../assets/logo-removebg-preview.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // We can show a loading toast if needed, but button state is fine for now
    
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + '/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('adminToken', data.token);
        toast.success('Welcome back, Admin!');
        navigate('/dashboard');
      } else {
        toast.error(data.message || 'Invalid credentials');
      }
    } catch (err) {
      toast.error('Unable to connect to server. Please try again later.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2F415D] p-4">
      
      {/* Card Container */}
      <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-4xl min-h-[500px]">
        
        {/* Left Section (Abstract Design) */}
        <div className="hidden md:flex md:w-5/12 relative overflow-hidden bg-gradient-to-br from-brand via-red-500 to-pink-500 p-8 items-center justify-center">
          
          {/* Decorative shapes to mimic the reference image */}
          <div className="absolute top-0 left-0 w-full h-full opacity-80" style={{
            background: 'linear-gradient(135deg, rgba(199,14,23,0.9) 0%, rgba(239,68,68,0.8) 50%, rgba(251,113,133,0.9) 100%)',
            clipPath: 'polygon(0 0, 100% 0, 100% 30%, 20% 50%, 100% 70%, 100% 100%, 0 100%)'
          }}></div>
          
          <div className="absolute top-0 left-0 w-full h-full opacity-60" style={{
            background: 'linear-gradient(45deg, rgba(199,14,23,1) 0%, rgba(239,68,68,0.6) 100%)',
            clipPath: 'polygon(0 0, 80% 0, 0 80%)'
          }}></div>

          {/* White cutout area for tabs (visual only, per reference) */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-l-3xl p-4 pl-8 shadow-inner z-10 flex flex-col gap-4">
            <div className="text-gray-800 font-bold text-sm tracking-wider cursor-pointer">LOGIN</div>
          </div>
        </div>

        {/* Right Section (Login Form) */}
        <div className="w-full md:w-7/12 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white relative">
          
          {/* Logo & Title */}
          <div className="flex flex-col items-center mb-10">
            <img src={logo} alt="AK Crackers Logo" className="w-32 h-auto mb-4 drop-shadow-md" />
            <h1 className="text-3xl font-heading font-extrabold text-brand tracking-widest uppercase">
              LOGIN
            </h1>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="w-full max-w-sm mx-auto">
            
            {/* Email Field */}
            <div className="mb-6 relative border-b border-gray-300 focus-within:border-brand transition-colors">
              <div className="absolute inset-y-0 left-0 flex items-center text-gray-400">
                <FiUser className="text-lg" />
              </div>
              <input 
                type="email" 
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-8 py-3 bg-transparent border-none outline-none text-gray-700 placeholder-gray-400 font-body"
              />
            </div>

            {/* Password Field */}
            <div className="mb-8 relative border-b border-gray-300 focus-within:border-brand transition-colors">
              <div className="absolute inset-y-0 left-0 flex items-center text-gray-400">
                <FiLock className="text-lg" />
              </div>
              <input 
                type="password" 
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-8 py-3 bg-transparent border-none outline-none text-gray-700 placeholder-gray-400 font-body"
              />
            </div>

            {/* Footer actions */}
            <div className="flex items-center justify-between">
              <a href="#" className="text-sm font-semibold text-brand hover:text-red-700 transition-colors">
                Forgot Password?
              </a>
              <button 
                type="submit" 
                disabled={isLoading}
                className="bg-brand hover:bg-red-700 disabled:opacity-70 text-white font-bold py-3 px-10 rounded-full shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
              >
                {isLoading ? 'VERIFYING...' : 'LOGIN'}
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default Login;
