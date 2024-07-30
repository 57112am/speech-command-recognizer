import React from "react";

const Login = ({handleOpenSignup, handleCloseLogin, loginRef}) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-end z-50">
      <div
        className="bg-white w-full h-full md:w-96 md:h-auto p-6"
        ref={loginRef}
      >
        <button
          className="absolute top-2 right-2 p-2 text-gray-600"
          onClick={handleCloseLogin}
        >
          X
        </button>
        <img
          src="https://adurcup-docs.s3.amazonaws.com/SupplyNote+Logo+-+Complete.svg"
          alt="home"
          className="mx-auto mb-4"
        />
        <h5 className="text-center text-lg mb-4">Welcome to URL Shortener</h5>
        <form action="/users/create-session" method="POST">
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 p-2 w-full border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 p-2 w-full border border-gray-300 rounded"
              required
            />
          </div>
          <div className="text-center mb-4">
            <button
              type="submit"
              className="bg-blue-500 px-4 py-2 rounded"
            >
              Sign In
            </button>
          </div>
        </form>
        <h5 className="text-center text-gray-700">
          Don't have an account? &nbsp;
          <button onClick={handleOpenSignup} className="text-blue-500">
            Sign Up
          </button>
        </h5>
      </div>
    </div>
  );
};

export default Login;
