import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useMediaQuery from '../hooks/useMediaQuery';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: 'Models', href: '/models' },
    { name: 'Datasets', href: '/datasets' },
    { name: 'MCPs', href: '/mcps' },
    { name: 'Spaces', href: '/spaces' },
  ];

  const handleNavigation = (href: string) => {
    navigate(href);
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center justify-between w-full">
            {/* Logo */}
            <div className="flex-shrink-0">
              <button
                onClick={() => handleNavigation('/')}
                className="navbar-logo text-2xl font-bold text-white tracking-tight hover:text-blue-100 transition-colors duration-300"
              >
                ModelHub
              </button>
            </div>
            
            {/* Desktop Navigation Items */}
            {isDesktop && (
              <div className="flex space-x-8 ml-8">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleNavigation(item.href)}
                    className={`nav-item inline-flex items-center px-3 pt-1 text-sm font-medium transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 ${
                      location.pathname === item.href
                        ? 'text-white border-b-2 border-white'
                        : 'text-blue-100 hover:text-white'
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            )}

            {/* Mobile menu button */}
            {!isDesktop && (
              <div>
                <button
                  type="button"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-blue-100 hover:bg-blue-600/50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors duration-300"
                >
                  <span className="sr-only">Open main menu</span>
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={isMenuOpen 
                        ? "M6 18L18 6M6 6l12 12" 
                        : "M4 6h16M4 12h16M4 18h16"}
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {!isDesktop && isMenuOpen && (
        <div className="mobile-menu glass-effect">
          <div className="pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.href)}
                className={`nav-item block w-full text-left pl-3 pr-4 py-2 text-base font-medium ${
                  location.pathname === item.href
                    ? 'text-white bg-blue-600/50'
                    : 'text-white hover:text-blue-100 hover:bg-blue-600/50'
                } transition-colors duration-300`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 