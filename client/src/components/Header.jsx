import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaChevronDown } from "react-icons/fa";
import useClickOutside from "../hooks/useClickOutside";

/**
 * Header component that displays the navigation bar with dropdown menus
 * and a hamburger menu for mobile screens.
 *
 * @component
 * @returns {JSX.Element} A React component that renders the header with navigation links and dropdown menus.
 */
const Header = () => {
  const [dropdown, setDropdown] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dropdownRefs = {
    product: useRef(null),
    company: useRef(null),
    resources: useRef(null),
  };

  /**
   * Toggles the dropdown menu for the specified menu item.
   *
   * @param {string} menu - The menu item to toggle ("product", "company", "resources").
   */
  const handleDropdownToggle = (menu) => {
    setDropdown(dropdown === menu ? null : menu);
  };

  useClickOutside(() => setDropdown(null), dropdownRefs.product);
  useClickOutside(() => setDropdown(null), dropdownRefs.company);
  useClickOutside(() => setDropdown(null), dropdownRefs.resources);

  return (
    <header className="flex justify-between h-20 items-center p-4 bg-[#061D2A] text-white relative">
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
      <nav className="hidden md:flex space-x-8">
        <div className="flex-grow"></div> {/* Empty flex-grow div to push items to the right */}

        {/* Product Dropdown */}
        <div className="relative" ref={dropdownRefs.product}>
          <button
            className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors duration-300"
            onClick={() => handleDropdownToggle("product")}
          >
            <span>Product</span>
            <FaChevronDown className={`transition-transform ${dropdown === "product" ? "rotate-180" : ""}`} />
          </button>
          {dropdown === "product" && (
            <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-40">
              <Link to="/product1" className="block px-4 py-2 text-black hover:bg-gray-100">
                Product 1
              </Link>
              <Link to="/product2" className="block px-4 py-2 text-black hover:bg-gray-100">
                Product 2
              </Link>
              <Link to="/product3" className="block px-4 py-2 text-black hover:bg-gray-100">
                Product 3
              </Link>
            </div>
          )}
        </div>

        {/* Company Dropdown */}
        <div className="relative" ref={dropdownRefs.company}>
          <button
            className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors duration-300"
            onClick={() => handleDropdownToggle("company")}
          >
            <span>Company</span>
            <FaChevronDown className={`transition-transform ${dropdown === "company" ? "rotate-180" : ""}`} />
          </button>
          {dropdown === "company" && (
            <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-40">
              <Link to="/company1" className="block px-4 py-2 text-black hover:bg-gray-100">
                Company 1
              </Link>
              <Link to="/company2" className="block px-4 py-2 text-black hover:bg-gray-100">
                Company 2
              </Link>
              <Link to="/company3" className="block px-4 py-2 text-black hover:bg-gray-100">
                Company 3
              </Link>
            </div>
          )}
        </div>

        {/* Resources Dropdown */}
        <div className="relative" ref={dropdownRefs.resources}>
          <button
            className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors duration-300"
            onClick={() => handleDropdownToggle("resources")}
          >
            <span>Resources</span>
            <FaChevronDown className={`transition-transform ${dropdown === "resources" ? "rotate-180" : ""}`} />
          </button>
          {dropdown === "resources" && (
            <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-40">
              <Link to="/resource1" className="block px-4 py-2 text-black hover:bg-gray-100">
                Resource 1
              </Link>
              <Link to="/resource2" className="block px-4 py-2 text-black hover:bg-gray-100">
                Resource 2
              </Link>
              <Link to="/resource3" className="block px-4 py-2 text-black hover:bg-gray-100">
                Resource 3
              </Link>
            </div>
          )}
        </div>

        <Link to="/contact-sales" className="text-white hover:text-gray-300 transition-colors duration-300">
          Contact Sales
        </Link>
      </nav>

      {/* Hamburger Icon for Mobile */}
      <button
        className="text-2xl md:hidden absolute right-4"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <FaBars />
      </button>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <>
          <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={() => setIsMenuOpen(false)}></div>
          <div
            className={`fixed top-0 right-0 w-full h-full bg-gray-800 p-6 transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "translate-x-full"} z-50`}
            ref={dropdownRefs.menu}
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
                {/* Similar dropdowns for Product, Company, and Resources */}
              </ul>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;