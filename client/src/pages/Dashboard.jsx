import React, { useState } from 'react';
import AudioRecorder from '../components/AudioRecorder';
import LoggedInNavbar from '../components/LoggedInNavbar';
import Sidebar from '../components/Sidebar';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa'; // Import icons

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} />

      {/* Main content area */}
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <LoggedInNavbar />
        
        <div className="p-6 flex flex-col flex-1">
          <AudioRecorder />
        </div>
      </div>

      {/* Sidebar toggle button, visible when sidebar is closed */}
      {!isSidebarOpen && (
        <button
          className="fixed top-16 left-0 bg-gray-800 text-white p-2 rounded-r-full shadow-lg z-40"
          onClick={toggleSidebar}
        >
          <FaChevronRight className="text-2xl" />
        </button>
      )}

      {/* Sidebar toggle button, visible when sidebar is open */}
      {isSidebarOpen && (
        <button
          className="fixed top-16 left-64 bg-gray-800 text-white p-2 rounded-l-full shadow-lg z-40"
          onClick={toggleSidebar}
        >
          <FaChevronLeft className="text-2xl" />
        </button>
      )}
    </div>
  );
};

export default Dashboard;