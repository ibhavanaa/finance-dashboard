'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaUser, FaLock } from 'react-icons/fa';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!username || !password) {
      toast.error('Please enter both fields.');
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
  'https://finance-dashboard-i4gu.onrender.com/api/auth/login',
  { username, password },
  { withCredentials: true } // ← this is necessary for cookie/session auth
);

      localStorage.setItem('token', res.data.token);
      toast.success('Login successful!');
      router.push('/dashboard');
    } catch (err: any) {
      toast.error('Invalid credentials!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-lg w-full animate-fade-in">
        <h1 className="text-4xl font-extrabold text-center text-indigo-800 mb-2 drop-shadow-sm">
          💼 Financial Dashboard
        </h1>
        <p className="text-sm text-center text-gray-500 mb-6">
          Admin login required to access the system.
        </p>

        <div className="space-y-5">
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 shadow-sm bg-white">
            <FaUser className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Username"
              className="w-full focus:outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 shadow-sm bg-white">
            <FaLock className="text-gray-400 mr-2" />
            <input
              type="password"
              placeholder="Password"
              className="w-full focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className={`w-full py-3 rounded-md font-semibold text-white transition duration-200 ${
              loading
                ? 'bg-indigo-300 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>

        <div className="mt-6 text-center text-gray-500 text-sm">
          💡 <span className="font-medium">Demo Admin Credentials:</span>
          <div className="text-sm mt-1">
            <strong>Username:</strong> <code>admin</code> <br />
            <strong>Password:</strong> <code>admin123</code>
          </div>
        </div>
      </div>
    </div>
  );
}
