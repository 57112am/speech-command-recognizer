import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import useClickOutside from "./useClickOutside";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuRef = useClickOutside(() => setIsMenuOpen(false));

  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white relative">
      <button
        className="text-2xl"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <FaBars />
      </button>

      <div className="text-2xl font-bold flex-1 text-center">
        Speech Recognizer
      </div>

      <div className="hidden md:flex lg:flex space-x-4 ">
        <Link
          to="/auth"
          className="text-white bg-[#4CAF50] p-3 rounded-lg shadow-lg hover:bg-[#45a049] transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:ring-opacity-50"
        >
          Login / SignUp
        </Link>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black opacity-50 z-40"
            onClick={() => setIsMenuOpen(false)}
          ></div>
          <div
            className={`fixed top-0 left-0 w-[15rem] h-full bg-gray-700 p-4 transition-transform duration-300 ease-in-out transform ${
              isMenuOpen ? "translate-x-0" : "-translate-x-full"
            } z-50`}
            ref={menuRef}
          >
            <button
              className="text-white text-2xl mb-4"
              onClick={() => setIsMenuOpen(false)}
            >
              &times;
            </button>
            <div className="text-white mb-4">
              <ul>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-4 rounded-md hover:bg-gray-600 transition-colors duration-200"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-4 rounded-md hover:bg-gray-600 transition-colors duration-200"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-4 rounded-md hover:bg-gray-600 transition-colors duration-200"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-4 rounded-md hover:bg-gray-600 transition-colors duration-200"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <Link
              to="/auth"
              className="block w-full py-2 mb-2 rounded-md bg-blue-500 text-center text-white hover:bg-blue-600 transition-colors duration-200"
            >
              Login
            </Link>
            <Link
              to="/auth"
              className="block w-full py-2 mb-2 rounded-md bg-blue-500 text-center text-white hover:bg-blue-600 transition-colors duration-200"
            >
              Signup
            </Link>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;