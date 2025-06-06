import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
// import logo from '../../assets/images/logo.png';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { currentUser, logout } = useAuth();


  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = async () => {
    try {
      await logout();
      setIsMenuOpen(false);
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <nav className="bg-transparent shadow-none py-3 px-6">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo + Brand - Always on the left */}
        <Link to="/" className="flex items-center order-1 lg:order-none">
          <img src="/images/logo.png" alt="SnapOverlay Logo" className="h-8 w-auto mr-2" />
          {/* <span className="text-xl font-bold text-purple-700">SnapOverlay</span> */}
        </Link>

        {/* Hamburger Menu - On the right for mobile */}
        <div className="flex items-center order-3 lg:order-none lg:hidden">
          {currentUser && (
            <Link to="/my-hub" className="text-purple-700 mr-4 lg:mr-0">
              <User size={24} />
            </Link>
          )}
          <button
            onClick={toggleMenu}
            className="text-purple-700 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Navigation Links - Hidden on mobile unless menu is open */}
        <div className={`
          fixed inset-0 z-20 bg-white transform transition-transform duration-300 ease-in-out lg:relative lg:inset-auto lg:bg-transparent lg:transform-none lg:flex lg:items-center order-2 lg:order-none
          ${isMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="flex flex-col h-full p-8 space-y-6 lg:space-y-0 lg:space-x-8 lg:p-0 lg:flex-row">
            <button
              onClick={toggleMenu}
              className="text-purple-700 self-end focus:outline-none lg:hidden"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
            <Link
              to="/"
              className="text-lg font-medium text-gray-800 hover:text-purple-700 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            {currentUser ? (
              <>
                <Link to="/create-event" className="text-lg font-medium text-gray-800 hover:text-purple-700 transition-colors" onClick={() => setIsMenuOpen(false)}>
                  Create Event
                </Link>
                <Link to="/my-hub" className="text-lg font-medium text-gray-800 hover:text-purple-700 transition-colors" onClick={() => setIsMenuOpen(false)}>
                  My Hub
                </Link>
                {currentUser && (
                  <Link to="/admin" className="text-lg font-medium text-gray-800 hover:text-purple-700 transition-colors" onClick={() => setIsMenuOpen(false)}>
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="text-lg font-medium text-gray-800 hover:text-purple-700 transition-colors text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <><Link to="/login" className="text-lg font-medium text-gray-800 hover:text-purple-700 transition-colors" onClick={() => setIsMenuOpen(false)}>
                Login
              </Link>
                {/* <Link to="/join" className="text-lg font-medium text-gray-800 hover:text-purple-700 transition-colors" onClick={() => setIsMenuOpen(false)}>
                  Join Event
                </Link> */}
              </>
            )}
          </div>
        </div>

        {/* User Icon - Hidden on mobile (shown in the menu button area instead) */}
        {currentUser && (
          <Link to="/my-hub" className="hidden lg:flex items-center text-purple-700 order-3 lg:order-none">
            <User size={24} />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;