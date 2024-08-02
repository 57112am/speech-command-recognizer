// Login Component
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/authSlice";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Login = ({ handleOpenSignup, handleCloseLogin, loginRef }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const {status, error} = useSelector((state)=>state.auth);
  console.log(status);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Assuming the login action returns a promise with user details
      const user = await dispatch(login(formData)).unwrap();
      enqueueSnackbar('Successfully logged in', { variant: 'success' }, { autoHideDuration: 1000 });
      // Redirect to the user's dashboard after successful login
      navigate(`/dashboard`); // Use a dynamic route based on user details
    } catch (error) {
      console.error("Login failed:", error);
      enqueueSnackbar('Invalid Credentials', { variant: 'error' }, { autoHideDuration: 1000 });
    }
  };

  return (
    <div className="top-0 right-0 h-full bg-white flex items-center justify-end z-50">
      <div
        className="bg-white w-full lg:h-full md:w-96 md:h-auto p-6 relative"
        ref={loginRef}
      >
        <button
          className="absolute top-4 right-4 p-2 text-gray-600 hover:bg-black hover:text-white"
          onClick={handleCloseLogin}
        >
          X
        </button>
        <img
          src="https://www.merillife.com/assets/images/home/new/meril_logo_new.png"
          alt="home"
          className="mx-auto mb-4"
        />
        <h5 className="text-center text-black mb-4">
          Welcome to Speech Recognizer
        </h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded text-black bg-white"
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
              className="mt-1 p-2 w-full border border-gray-300 rounded text-black bg-white"
              required
            />
          </div>
          <div className="text-center mb-4">
            <button
              type="submit"
              className="bg-blue-500 px-4 py-2 rounded text-white"
            >
              {status==="loading"?<span className='loading loading-spinner '></span>:"Log In"}
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