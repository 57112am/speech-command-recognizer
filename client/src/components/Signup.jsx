import React from "react";

const Signup = ({handleOpenLogin, handleCloseSignup, signupRef}) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-end z-50">
      <div
        className="bg-white w-full h-full md:w-96 md:h-auto p-6"
        ref={signupRef}
      >
        <button
          className="absolute top-2 right-2 p-2 text-gray-600"
          onClick={handleCloseSignup}
        >
          X
        </button>
        <img
          src="https://adurcup-docs.s3.amazonaws.com/SupplyNote+Logo+-+Complete.svg"
          alt="home"
          className="mx-auto mb-4"
        />
        <h5 className="text-center text-lg mb-4">Welcome to URL Shortener</h5>
        <form action="/users/create" method="POST">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-1 p-2 w-full border border-gray-300 rounded"
              required
            />
          </div>
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
          <div className="mb-4">
            <span className="text-sm text-gray-700">
              By Clicking on "Create An Account", I agree to Terms &
              Condition
            </span>
          </div>
          <div className="text-center mb-4">
            <button
              type="submit"
              className="bg-blue-500 px-4 py-2 rounded"
            >
              Create An Account
            </button>
          </div>
        </form>
        <h5 className="text-center text-gray-700">
          Already a user? &nbsp;
          <button onClick={handleOpenLogin} className="text-blue-500">
            Log In
          </button>
        </h5>
      </div>
    </div>
  );
};

export default Signup;
