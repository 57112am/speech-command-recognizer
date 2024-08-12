import React, { useState, useEffect } from "react";
import AudioRecorder from "../components/AudioRecorder";
import LoggedInNavbar from "../components/LoggedInNavbar";
import SingleWord from "../components/SingleWord";
import Sidebar from "../components/Sidebar";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

/**
 * Dashboard component that serves as the main interface for authenticated users.
 * It includes a sidebar, an audio recorder, and a list of words selected by the user.
 *
 * @component
 * @example
 * return (
 *   <Dashboard />
 * )
 *
 * @returns {JSX.Element} The rendered dashboard component.
 */
const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false); // Sidebar initially closed on small screens
  const [words, setWords] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  /**
   * Handles resizing of the window to show or hide the sidebar based on screen size.
   * Opens the sidebar if the screen width is >= 768px, otherwise hides it.
   * @function handleResize
   */
  const handleResize = () => {
    if (window.innerWidth >= 768) {
      setSidebarOpen(true);
    } else {
      setSidebarOpen(false);
    }
  };

  useEffect(() => {
    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /**
   * Toggles the sidebar open or closed.
   * @function toggleSidebar
   */
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  /**
   * Handles selecting a word, setting the title, words, and date in the state.
   * Also closes the sidebar on small screens.
   *
   * @function handleWordSelect
   * @param {string} title - The title of the selected word group.
   * @param {string[]} words - The list of words associated with the title.
   * @param {string} date - The date associated with the selected words.
   */
  const handleWordSelect = (title, words, date) => {
    setTitle(title);
    setWords(words);
    setDate(date);
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
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        <LoggedInNavbar />

        <div className="p-6 flex flex-col flex-1">
          {words.length > 0 ? (
            <SingleWord
              words={words}
              title={title}
              setWords={setWords}
              date={date}
            />
          ) : (
            <AudioRecorder />
          )}
        </div>
      </div>

      {/* Sidebar toggle button */}
      <button
        className={`fixed top-16 ${
          isSidebarOpen ? "left-64" : "left-0"
        } bg-gray-800 text-white p-2 rounded-full shadow-lg z-40`}
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? (
          <FaChevronLeft className="text-2xl" />
        ) : (
          <FaChevronRight className="text-2xl" />
        )}
      </button>
    </div>
  );
};

export default Dashboard;