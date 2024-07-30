import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';

const MenuBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div>
      {/* Button to toggle menu */}
      <button
        className="text-2xl text-gray-800 p-2 lg:hidden"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <FaBars />
      </button>

      {/* Menu List */}
      <div
        className={`fixed top-0 left-0 w-full h-1/2 bg-gray-800 text-white transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-y-0' : '-translate-y-full'
        } lg:hidden`}
      >
        <div className="flex flex-col items-center justify-center h-full">
          <button
            className="text-2xl absolute top-4 right-4"
            onClick={() => setIsMenuOpen(false)}
          >
            &times; {/* Close icon */}
          </button>
          <a href="#home" className="text-xl py-4" onClick={() => setIsMenuOpen(false)}>Home</a>
          <a href="#services" className="text-xl py-4" onClick={() => setIsMenuOpen(false)}>Services</a>
          <a href="#about" className="text-xl py-4" onClick={() => setIsMenuOpen(false)}>About</a>
          <a href="#contact" className="text-xl py-4" onClick={() => setIsMenuOpen(false)}>Contact</a>
        </div>
      </div>
    </div>
  );
};

export default MenuBar;
