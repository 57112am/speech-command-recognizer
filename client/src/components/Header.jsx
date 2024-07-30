import React, { useRef, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import useClickOutside from './useClickOutside';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const menuRef = useClickOutside(() => setIsMenuOpen(false));
  const signupRef = useClickOutside(() => setIsSignupOpen(false));
  const loginRef = useClickOutside(() => setIsLoginOpen(false));

  const handleOpenSignup = () => {
    setIsSignupOpen(true);
    setIsLoginOpen(false);
  };

  const handleCloseSignup = () => setIsSignupOpen(false);

  const handleOpenLogin = () => {
    setIsLoginOpen(true);
    setIsSignupOpen(false);
    setIsMenuOpen(false);
  };

  const handleCloseLogin = () => setIsLoginOpen(false);

  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white relative">
      {/* Hamburger Menu (Visible on all screens) */}
      <button
        className="text-2xl"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <FaBars />
      </button>

      {/* Title */}
      <div className="text-2xl font-bold flex-1 text-center">
        Speech Recognition
      </div>

      {/* Login/Signup Buttons (Visible only on larger screens) */}
      <div className="hidden lg:flex space-x-4">
        <button onClick={handleOpenLogin} className="text-white hover:underline">Login / SignUp</button>
      </div>

      {/* Mobile Menu (Visible only on mobile screens) */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-700 p-4 transition-transform transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:hidden`}
        ref={menuRef}
      >
        <button
          className="text-white text-2xl mb-4"
          onClick={() => setIsMenuOpen(false)}
        >
          &times; {/* Close icon */}
        </button>
        <button className="block text-white hover:underline py-2" onClick={handleOpenLogin}>Login</button>
        <button className="block text-white hover:underline py-2" onClick={handleOpenSignup}>Signup</button>
      </div>

      {/* Sign Up Offcanvas */}
      {isSignupOpen && (
        <Signup handleOpenLogin={handleOpenLogin} handleCloseSignup={handleCloseSignup} signupRef={signupRef} />
      )}

      {/* Log In Offcanvas */}
      {isLoginOpen && (
        <Login handleOpenSignup={handleOpenSignup} handleCloseLogin={handleCloseLogin} loginRef={loginRef} />
      )}
    </header>
  );
};

export default Header;
