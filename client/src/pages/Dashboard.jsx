import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import AudioRecorder from '../components/AudioRecorder';
import LoggedInNavbar from '../components/LoggedInNavbar';
import SingleWord from '../components/SingleWord';
import Sidebar from '../components/Sidebar';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false); // Sidebar initially closed on small screens
  const [words, setWords] = useState([]);
  const [title, setTitle] = useState("");

  // Detect screen size changes
  const handleResize = () => {
    if (window.innerWidth >= 768) {
      setSidebarOpen(true);
    } else {
      setSidebarOpen(false);
    }
  };

  useEffect(() => {
    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleWordSelect = (title, words) => {
    setTitle(title);
    setWords(words);
    if (window.innerWidth < 768) {
      setSidebarOpen(false); // Close the sidebar on small screens
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        setTitle={setTitle} 
        setWords={setWords} 
        onWordSelect={handleWordSelect} // Pass the handler to Sidebar
      />

      {/* Main content area */}
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <LoggedInNavbar />
        
        <div className="p-6 flex flex-col flex-1">
          {words.length > 0 ? (
            <SingleWord words={words} title={title} setWords={setWords} />
          ) : (
            <AudioRecorder />
          )}
        </div>
      </div>

      {/* Sidebar toggle button */}
      <button
        className={`fixed top-16 ${isSidebarOpen ? 'left-64' : 'left-0'} bg-gray-800 text-white p-2 rounded-full shadow-lg z-40`}
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <FaChevronLeft className="text-2xl" /> : <FaChevronRight className="text-2xl" />}
      </button>
    </div>
  );
};

export default Dashboard;