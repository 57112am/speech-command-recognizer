// Signup Component
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signup } from "../redux/authSlice";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Signup = ({ handleOpenLogin, handleCloseSignup, signupRef }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password.length < 6) {
      enqueueSnackbar('Password must be at least 6 characters long', { variant: 'warning' }, { autoHideDuration: 1000 });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      enqueueSnackbar('Passwords do not match', { variant: 'error' }, { autoHideDuration: 1000 });
      return;
    }
    try {
      await dispatch(signup({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword
      })).unwrap();
      enqueueSnackbar('Signup successful!', { variant: 'success' }, { autoHideDuration: 1000 });
      // Redirect to a new page after successful signup
      navigate(`/dashboard`); // Use a dynamic route based on user details
    } catch (error) {
      console.error("Signup failed:", error);
      enqueueSnackbar('Signup failed. Please try again.', { variant: 'error' }, { autoHideDuration: 1000 });
    }
  };

  return (
    <div className="fixed top-0 right-0 h-full bg-white flex items-center justify-end z-50">
      <div
        className="bg-white w-full h-full md:w-96 md:h-auto p-6 relative"
        ref={signupRef}
      >
        <button
          className="absolute top-2 right-2 p-2 text-gray-600 hover:bg-black hover:text-white"
          onClick={handleCloseSignup}
        >
          X
        </button>
        <img
          src="https://www.merillife.com/assets/images/home/new/meril_logo_new.png"
          alt="home"
          className="mx-auto mb-4"
        />
        <h5 className="text-center text-black text-lg mb-4">
          Welcome to Speech Recognizer
        </h5>
        <form onSubmit={handleSubmit}>
          {/* Form fields */}
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 text-black bg-white rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 text-black bg-white rounded"
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
              value={formData.password}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 text-black bg-white rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 text-black bg-white rounded"
              required
            />
          </div>
          <div className="text-center mb-4">
            <button type="submit" className="bg-blue-500 px-4 py-2 rounded text-white">
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