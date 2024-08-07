import React, { useState } from "react";
import Spinner from "../components/Spinner";
import Header from "../components/Header";
import { Link } from "react-router-dom";

const Home = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="relative h-screen flex flex-col">
      {loading && <Spinner />}
      <Header />
      
      {/* Background image */}
      <div className="flex-1 flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url("https://static.augnito.ai/static/media/our-expertise.0b432cefb4fe3ab0cba3.webp")' }}>
        {/* Centered content */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-6">Welcome to Our Platform</h1>
          <p className="text-lg text-white mb-8">Empower your voice and transform your interactions with our cutting-edge technology.</p>
          <Link to="/auth">
            <button className="bg-blue-500 text-white text-lg font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300">
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;