import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authcontext';
import { useState } from 'react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span className="text-xl font-bold text-gray-900">Mentor<span className="text-blue-600">Hub</span></span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-600 hover:text-blue-600 transition font-medium">Home</Link>
            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 transition font-medium">Dashboard</Link>
                <Link to="/profile" className="text-gray-600 hover:text-blue-600 transition font-medium">Profile</Link>
                {user.role === 'mentor' && (
                  <Link to="/become-mentor" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium text-sm">
                    Mentor Setup
                  </Link>
                )}
                <div className="flex items-center gap-3 ml-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-sm">
                    {user.name?.charAt(0)?.toUpperCase()}
                  </div>
                  <span className="text-sm text-gray-700 font-medium">{user.name}</span>
                  <button onClick={handleLogout} className="text-sm text-gray-500 hover:text-red-600 transition">
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="text-gray-600 hover:text-blue-600 transition font-medium">Login</Link>
                <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium text-sm">
                  Get Started
                </Link>
              </div>
            )}
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 rounded-lg hover:bg-gray-100">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t px-4 py-3 space-y-2">
          <Link to="/" className="block py-2 text-gray-600 hover:text-blue-600" onClick={() => setMenuOpen(false)}>Home</Link>
          {user ? (
            <>
              <Link to="/dashboard" className="block py-2 text-gray-600 hover:text-blue-600" onClick={() => setMenuOpen(false)}>Dashboard</Link>
              <Link to="/profile" className="block py-2 text-gray-600 hover:text-blue-600" onClick={() => setMenuOpen(false)}>Profile</Link>
              {user.role === 'mentor' && (
                <Link to="/become-mentor" className="block py-2 text-blue-600 font-medium" onClick={() => setMenuOpen(false)}>Mentor Setup</Link>
              )}
              <button onClick={handleLogout} className="block py-2 text-red-500">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="block py-2 text-gray-600 hover:text-blue-600" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/register" className="block py-2 text-blue-600 font-medium" onClick={() => setMenuOpen(false)}>Get Started</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
