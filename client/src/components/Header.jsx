import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaChevronDown } from "react-icons/fa";
import useClickOutside from "./useClickOutside";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdown, setDropdown] = useState(null);

  // Refs for each dropdown
  const dropdownRefs = {
    product: useRef(null),
    company: useRef(null),
    resources: useRef(null),
  };

  const menuRef = useClickOutside(() => setIsMenuOpen(false));

  // Function to close dropdown when clicking outside
  const handleOutsideClick = (menu) => {
    if (dropdown === menu) {
      setDropdown(null);
    }
  };

  // Apply useClickOutside to each dropdown
  useClickOutside(() => handleOutsideClick("product"), dropdownRefs.product);
  useClickOutside(() => handleOutsideClick("company"), dropdownRefs.company);
  useClickOutside(() => handleOutsideClick("resources"), dropdownRefs.resources);

  const handleDropdownToggle = (menu) => {
    setDropdown(dropdown === menu ? null : menu);
  };

  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white relative">
      {/* Logo/Title */}
      <div className="text-2xl font-bold flex items-center">
        <Link to="/">
          <img
            src="https://www.merillife.com/assets/images/home/new/meril_logo_new.png"
            alt="Logo"
            className="w-32 h-auto"
          />
        </Link>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex lg:flex space-x-8 flex-grow justify-center">
        <div className="relative" ref={dropdownRefs.product}>
          <button
            className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors duration-300"
            onClick={() => handleDropdownToggle("product")}
          >
            <span>Product</span>
            <FaChevronDown className={`transition-transform ${dropdown === "product" ? "rotate-180" : ""}`} />
          </button>
          {dropdown === "product" && (
            <div className="absolute left-0 mt-2 w-48 bg-gray-700 rounded-lg shadow-lg z-40">
              <Link
                to="/product1"
                className="block px-4 py-2 text-white hover:bg-gray-600"
              >
                Product 1
              </Link>
              <Link
                to="/product2"
                className="block px-4 py-2 text-white hover:bg-gray-600"
              >
                Product 2
              </Link>
              <Link
                to="/product2"
                className="block px-4 py-2 text-white hover:bg-gray-600"
              >
                Product 3
              </Link>
            </div>
          )}
        </div>

        <div className="relative" ref={dropdownRefs.company}>
          <button
            className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors duration-300"
            onClick={() => handleDropdownToggle("company")}
          >
            <span>Company</span>
            <FaChevronDown className={`transition-transform ${dropdown === "company" ? "rotate-180" : ""}`} />
          </button>
          {dropdown === "company" && (
            <div className="absolute left-0 mt-2 w-48 bg-gray-700 rounded-lg shadow-lg z-40">
              <Link
                to="/company1"
                className="block px-4 py-2 text-white hover:bg-gray-600"
              >
                Company 1
              </Link>
              <Link
                to="/company2"
                className="block px-4 py-2 text-white hover:bg-gray-600"
              >
                Company 2
              </Link>
              <Link
                to="/company2"
                className="block px-4 py-2 text-white hover:bg-gray-600"
              >
                Company 3
              </Link>
            </div>
          )}
        </div>

        <div className="relative" ref={dropdownRefs.resources}>
          <button
            className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors duration-300"
            onClick={() => handleDropdownToggle("resources")}
          >
            <span>Resources</span>
            <FaChevronDown className={`transition-transform ${dropdown === "resources" ? "rotate-180" : ""}`} />
          </button>
          {dropdown === "resources" && (
            <div className="absolute left-0 mt-2 w-48 bg-gray-700 rounded-lg shadow-lg z-40">
              <Link
                to="/resource1"
                className="block px-4 py-2 text-white hover:bg-gray-600"
              >
                Resource 1
              </Link>
              <Link
                to="/resource2"
                className="block px-4 py-2 text-white hover:bg-gray-600"
              >
                Resource 2
              </Link>
              <Link
                to="/resource2"
                className="block px-4 py-2 text-white hover:bg-gray-600"
              >
                Resource 3
              </Link>
            </div>
          )}
        </div>

        <Link
          to="/contact"
          className="text-white hover:text-gray-300 transition-colors duration-300"
        >
          Contact
        </Link>
      </nav>

      {/* Hamburger Icon */}
      <button
        className="text-2xl md:hidden absolute right-4"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <FaBars />
      </button>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black opacity-50 z-40"
            onClick={() => setIsMenuOpen(false)}
          ></div>
          <div
            className={`fixed top-0 right-0 w-full h-full bg-gray-800 p-6 transition-transform duration-300 ease-in-out ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            } z-50`}
            ref={menuRef}
          >
            <button
              className="text-white text-3xl absolute top-6 right-6"
              onClick={() => setIsMenuOpen(false)}
            >
              &times;
            </button>
            <div className="flex flex-col items-center justify-center h-full space-y-6">
              <ul className="space-y-6">
                <li>
                  <Link
                    to="/"
                    className="text-white text-2xl block hover:bg-gray-700 px-4 py-2 rounded-md transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </Link>
                </li>
                <li className="relative">
                  <button
                    className="text-white text-2xl block w-full text-left hover:bg-gray-700 px-4 py-2 rounded-md transition-colors duration-200"
                    onClick={() => handleDropdownToggle("mobileProduct")}
                  >
                    Product
                    <FaChevronDown className={`inline ml-2 transition-transform ${dropdown === "mobileProduct" ? "rotate-180" : ""}`} />
                  </button>
                  {dropdown === "mobileProduct" && (
                    <div className="mt-2 ml-4 space-y-2">
                      <Link
                        to="/product1"
                        className="text-white text-xl block hover:bg-gray-600 px-4 py-2 rounded-md transition-colors duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Product 1
                      </Link>
                      <Link
                        to="/product2"
                        className="text-white text-xl block hover:bg-gray-600 px-4 py-2 rounded-md transition-colors duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Product 2
                      </Link>
                      <Link
                        to="/product2"
                        className="text-white text-xl block hover:bg-gray-600 px-4 py-2 rounded-md transition-colors duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Product 3
                      </Link>
                    </div>
                  )}
                </li>
                <li className="relative">
                  <button
                    className="text-white text-2xl block w-full text-left hover:bg-gray-700 px-4 py-2 rounded-md transition-colors duration-200"
                    onClick={() => handleDropdownToggle("mobileCompany")}
                  >
                    Company
                    <FaChevronDown className={`inline ml-2 transition-transform ${dropdown === "mobileCompany" ? "rotate-180" : ""}`} />
                  </button>
                  {dropdown === "mobileCompany" && (
                    <div className="mt-2 ml-4 space-y-2">
                      <Link
                        to="/company1"
                        className="text-white text-xl block hover:bg-gray-600 px-4 py-2 rounded-md transition-colors duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Company 1
                      </Link>
                      <Link
                        to="/company2"
                        className="text-white text-xl block hover:bg-gray-600 px-4 py-2 rounded-md transition-colors duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Company 2
                      </Link>
                      <Link
                        to="/company2"
                        className="text-white text-xl block hover:bg-gray-600 px-4 py-2 rounded-md transition-colors duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Company 3
                      </Link>
                    </div>
                  )}
                </li>
                <li className="relative">
                  <button
                    className="text-white text-2xl block w-full text-left hover:bg-gray-700 px-4 py-2 rounded-md transition-colors duration-200"
                    onClick={() => handleDropdownToggle("mobileResources")}
                  >
                    Resources
                    <FaChevronDown className={`inline ml-2 transition-transform ${dropdown === "mobileResources" ? "rotate-180" : ""}`} />
                  </button>
                  {dropdown === "mobileResources" && (
                    <div className="mt-2 ml-4 space-y-2">
                      <Link
                        to="/resource1"
                        className="text-white text-xl block hover:bg-gray-600 px-4 py-2 rounded-md transition-colors duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Resource 1
                      </Link>
                      <Link
                        to="/resource2"
                        className="text-white text-xl block hover:bg-gray-600 px-4 py-2 rounded-md transition-colors duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Resource 2
                      </Link>
                      <Link
                        to="/resource2"
                        className="text-white text-xl block hover:bg-gray-600 px-4 py-2 rounded-md transition-colors duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Resource 3
                      </Link>
                    </div>
                  )}
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-white text-2xl block hover:bg-gray-700 px-4 py-2 rounded-md transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;