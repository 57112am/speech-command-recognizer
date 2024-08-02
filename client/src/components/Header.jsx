import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux"; 
import { signup, login, logout } from "../redux/authSlice";
import { FaBars } from "react-icons/fa";
import Signup from "./Signup";
import Login from "./Login";
import useClickOutside from "./useClickOutside";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  
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

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white relative">
      <button className="text-2xl" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <FaBars />
      </button>

      <div className="text-2xl font-bold flex-1 text-center">
        Speech Recognizer
      </div>

      <div className="hidden md:flex lg:flex space-x-4 ">
        {!user ? (
          <button
            onClick={handleOpenLogin}
            className="text-white bg-[#4CAF50] p-3 rounded-lg shadow-lg hover:bg-[#45a049] transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:ring-opacity-50"
          >
            Login / SignUp
          </button>
        ) : (
          <button
            onClick={handleLogout}
            className="text-white bg-red-600 p-3 rounded-lg shadow-lg hover:bg-red-700 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
          >
            Logout
          </button>
        )}
      </div>

      <div
        className={`fixed top-0 left-0 w-[15rem] h-full bg-gray-700 p-4 transition-transform duration-300 ease-in-out transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        ref={menuRef}
      >
        <button
          className="text-white text-2xl mb-4"
          onClick={() => setIsMenuOpen(false)}
        >
          &times;
        </button>
        <div className="text-white mb-4">
          {/* Sidebar Details */}
          {/* <div className="mb-4">
            <h2 className="text-lg font-bold">Welcome</h2>
            <p className="text-sm">User Name</p>
            <p className="text-sm">user@example.com</p>
          </div> */}
          <div className="mb-4">
            <ul>
              <li>
                <a href="#" className="block py-2 px-4 rounded-md hover:bg-gray-600 transition-colors duration-200">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="block py-2 px-4 rounded-md hover:bg-gray-600 transition-colors duration-200">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="block py-2 px-4 rounded-md hover:bg-gray-600 transition-colors duration-200">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="block py-2 px-4 rounded-md hover:bg-gray-600 transition-colors duration-200">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
        <button
          className="block w-full py-2 mb-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200"
          onClick={handleOpenLogin}
        >
          Login
        </button>
        <button
          className="block w-full py-2 mb-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200"
          onClick={handleOpenSignup}
        >
          Signup
        </button>
      </div>

      {/* Overlay */}
      {(isLoginOpen || isSignupOpen) && (
        <div className="fixed inset-0 bg-black opacity-50 "></div>
      )}
      <div
        className={`fixed top-0 right-0 h-full transition-transform duration-300 ease-in-out transform ${
          isLoginOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {isLoginOpen && (
          <Login
            handleOpenSignup={handleOpenSignup}
            handleCloseLogin={handleCloseLogin}
            loginRef={loginRef}
          />
        )}
        {isSignupOpen && (
          <Signup
            handleOpenLogin={handleOpenLogin}
            handleCloseSignup={handleCloseSignup}
            signupRef={signupRef}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
