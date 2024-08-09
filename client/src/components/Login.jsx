import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../redux/authSlice";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

/**
 * Login component that allows users to log in to their account.
 *
 * @component
 * @returns {JSX.Element} A React component that renders the login form.
 */
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  /**
   * Handles form field changes and updates the state accordingly.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  /**
   * Handles form submission, dispatches login action, and navigates on success.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await dispatch(login(formData)).unwrap();
      enqueueSnackbar("Successfully logged in", { variant: "success" });
      navigate(`/dashboard`);
    } catch (error) {
      console.error("Login failed:", error);
      enqueueSnackbar("Invalid Credentials", { variant: "error" });
    }
  };

  return (
    <motion.div
      className="w-full md:w-1/2 p-8"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
		<button
        onClick={() => navigate('/')}
        className="mb-4 text-blue-600 hover:underline"
      >
        &lt; Back to Home
      </button>
      <h1 className="text-3xl font-bold text-center text-gray-700 mb-4">
        Log In
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="text"
            name="email"
            placeholder="Enter Email"
            className="w-full px-4 py-2 border bg-white text-black border-gray-400 rounded-md focus:ring focus:ring-blue-300 focus:border-blue-500"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-600">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            className="w-full px-4 py-2 border bg-white text-black border-gray-400 rounded-md focus:ring focus:ring-blue-300 focus:border-blue-500"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <Link
          to="/auth?type=register"
          className="block text-sm text-center text-blue-600 hover:underline"
          
        >
          Don't have an account? Register Yourself
        </Link>
        <button
          type="submit"
          className="w-full py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          {status === "loading" ? (
            <span className="loading loading-spinner"></span>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default Login;