// frontend/src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/axiosConfig';

function Dashboard({ setIsAuthenticated }) {
  const [dashboardMessage, setDashboardMessage] = useState('Loading dashboard data...');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch dashboard content
    apiClient.get('/dashboard')
      .then(response => {
        setDashboardMessage(response.data.message);
      })
      .catch(() => {
        setIsAuthenticated(false);
        navigate('/login');
      });
      
    // Fetch user details for display
    apiClient.get('/check-auth')
      .then(res => setUser(res.data.user))
      .catch(() => setUser(null));

  }, [navigate, setIsAuthenticated]);

  const handleLogout = async () => {
    try {
      await apiClient.post('/logout');
      setIsAuthenticated(false);
      navigate('/login');
    } catch (error) {
      alert('Logout failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-indigo-600">My App</h1>
            </div>
            <div className="flex items-center">
               <span className="text-sm font-medium text-gray-700 mr-4">
                  {user ? `Signed in as ${user.email}` : 'Loading...'}
               </span>
              <button
                onClick={handleLogout}
                className="px-3 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="p-8">
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
          <p className="text-gray-700">{dashboardMessage}</p>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;