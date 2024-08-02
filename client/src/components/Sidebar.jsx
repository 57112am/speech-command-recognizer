// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom'; // For navigation links

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <aside className={`fixed top-16 left-0 h-full bg-gray-800 text-white transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} w-64`}>
      <div className="p-6">
        <button
          className="text-gray-300 hover:text-gray-100 mb-6"
          onClick={toggleSidebar}
        >
          <span className="text-2xl">&times;</span>
        </button>
        <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>
        <ul>
          <li className="mb-4">
            <Link to="/dashboard" className="hover:text-gray-400">Home</Link>
          </li>
          <li className="mb-4">
            <Link to="/profile" className="hover:text-gray-400">Profile</Link>
          </li>
          <li className="mb-4">
            <Link to="/settings" className="hover:text-gray-400">Settings</Link>
          </li>
          {/* Add more sidebar items as needed */}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;