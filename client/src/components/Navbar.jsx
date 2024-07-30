import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleOpenSignup = () => {
    setShowSignup(true);
    setShowLogin(false);  // Close login if it's open
  };

  const handleCloseSignup = () => setShowSignup(false);

  const handleOpenLogin = () => {
    setShowLogin(true);
    setShowSignup(false);  // Close signup if it's open
  };

  const handleCloseLogin = () => setShowLogin(false);

  return (
    <nav className="bg-gray-100 p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <Link className="flex items-center" to="/">
          <img src="https://adurcup-docs.s3.amazonaws.com/SupplyNote+Logo+-+Complete.svg" alt="home" className="h-10" />
        </Link>
        <button className="lg:hidden p-2" onClick={handleOpenSignup}>
          <span className="block w-6 h-0.5 bg-gray-600 mb-1"></span>
          <span className="block w-6 h-0.5 bg-gray-600 mb-1"></span>
          <span className="block w-6 h-0.5 bg-gray-600"></span>
        </button>
        <ul className="hidden lg:flex space-x-4">
          <li><Link className="text-gray-700 hover:text-blue-600" to="/">Home</Link></li>
          <li><Link className="text-gray-700 hover:text-blue-600" to="#">Link</Link></li>
          <li className="relative group">
            <button className="text-gray-700 hover:text-blue-600">Dropdown</button>
            <ul className="absolute hidden group-hover:block bg-white shadow-lg mt-2 w-48">
              <li><Link className="block px-4 py-2 text-gray-700 hover:bg-gray-100" to="#">Action</Link></li>
              <li><Link className="block px-4 py-2 text-gray-700 hover:bg-gray-100" to="#">Another action</Link></li>
              <li><hr className="border-gray-200" /></li>
              <li><Link className="block px-4 py-2 text-gray-700 hover:bg-gray-100" to="#">Something else here</Link></li>
            </ul>
          </li>
        </ul>
        <button className="btn btn-outline-primary hidden lg:block" onClick={handleOpenSignup}>
          Log In / Sign Up
        </button>

        {/* Sign Up Offcanvas */}
        {showSignup && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-end z-50">
            <div className="bg-white w-full md:w-96 p-6">
              <button className="absolute top-2 right-2 p-2 text-gray-600" onClick={handleCloseSignup}>X</button>
              <img src="https://adurcup-docs.s3.amazonaws.com/SupplyNote+Logo+-+Complete.svg" alt="home" className="mx-auto mb-4" />
              <h5 className="text-center text-lg mb-4">Welcome to URL Shortener</h5>
              <form action="/users/create" method="POST">
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700">Name</label>
                  <input type="text" id="name" name="name" className="mt-1 p-2 w-full border border-gray-300 rounded" required />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700">Email address</label>
                  <input type="email" id="email" name="email" className="mt-1 p-2 w-full border border-gray-300 rounded" required />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="block text-gray-700">Password</label>
                  <input type="password" id="password" name="password" className="mt-1 p-2 w-full border border-gray-300 rounded" required />
                </div>
                <div className="mb-4">
                  <span className="text-sm">By Clicking on "Create Account", I agree to SupplyNote's Terms & Condition</span>
                </div>
                <div className="text-center mb-4">
                  <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Create An Account</button>
                </div>
              </form>
              <h5 className="text-center">Already a user? <Link to="#" onClick={handleOpenLogin} className="text-blue-500">Log In</Link></h5>
            </div>
          </div>
        )}

        {/* Log In Offcanvas */}
        {showLogin && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-end z-50">
            <div className="bg-white w-full md:w-96 p-6">
              <button className="absolute top-2 right-2 p-2 text-gray-600" onClick={handleCloseLogin}>X</button>
              <img src="https://adurcup-docs.s3.amazonaws.com/SupplyNote+Logo+-+Complete.svg" alt="home" className="mx-auto mb-4" />
              <h5 className="text-center text-lg mb-4">Welcome to URL Shortener</h5>
              <form action="/users/create-session" method="POST">
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700">Email address</label>
                  <input type="email" id="email" name="email" className="mt-1 p-2 w-full border border-gray-300 rounded" required />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="block text-gray-700">Password</label>
                  <input type="password" id="password" name="password" className="mt-1 p-2 w-full border border-gray-300 rounded" required />
                </div>
                <div className="text-center mb-4">
                  <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Sign In</button>
                </div>
              </form>
              <h5 className="text-center">Don't have an account? <Link to="#" onClick={handleOpenSignup} className="text-blue-500">Sign Up</Link></h5>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;