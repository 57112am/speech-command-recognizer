import React, { useState } from "react";
import Spinner from "../components/Spinner";
import Header from "../components/Header";
import { Link } from "react-router-dom";

/**
 * Home component that serves as the landing page for the application.
 * It includes a header, a background image, and buttons for login and registration.
 * 
 * @component
 * @example
 * return (
 *   <Home />
 * )
 * 
 * @returns {JSX.Element} The rendered home page component.
 */
const Home = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div 
      className="relative h-screen flex flex-col bg-cover bg-center" 
      style={{ backgroundImage: 'url("https://static.augnito.ai/static/media/our-expertise.0b432cefb4fe3ab0cba3.webp")' }}
    >
      {loading && <Spinner />}
      <Header />
      
      <div className="flex-1 flex items-center justify-center px-4 sm:px-8 lg:px-16">
        {/* Centered content */}
        <div className="flex flex-col justify-start items-start max-w-4xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6">Speech Recognition made easy with Voice AI</h1>
          <p className="text-lg text-white mb-8">
            Our Model enables effortless medical workflows via Automatic Speech Recognition & Natural Language Processing.
          </p>
          <div className="flex space-x-4">
            <Link to="/auth?type=login">
              <button className="bg-blue-500 text-white text-lg font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300">
                Login
              </button>
            </Link>
            <Link to="/auth?type=register">
              <button className="bg-green-500 text-white text-lg font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-green-600 transition duration-300">
                Register
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;