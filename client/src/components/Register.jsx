import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signup } from "../redux/authSlice";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Register = ({ toggle }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password.length < 6) {
      enqueueSnackbar("Password must be at least 6 characters long", {
        variant: "warning",
      });
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      enqueueSnackbar("Passwords do not match", { variant: "error" });
      return;
    }
    try {
      await dispatch(
        signup({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        })
      ).unwrap();
      enqueueSnackbar("Registration successful!", { variant: "success" });
      navigate(`/dashboard`);
    } catch (error) {
      console.error("Registration failed:", error);
      enqueueSnackbar("Registration failed. Please try again.", {
        variant: "error",
      });
    }
  };

  return (
    <motion.div
      className="w-full md:w-1/2 p-8"
      initial={{ opacity: 0, x: 50 }}
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
        Register Yourself
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-600">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            placeholder="John Doe"
            className="w-full px-4 py-2 border bg-white text-black border-gray-400 rounded-md focus:ring focus:ring-blue-300 focus:border-blue-500"
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
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
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-600">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full px-4 py-2 border bg-white text-black border-gray-400 rounded-md focus:ring focus:ring-blue-300 focus:border-blue-500"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <Link
          to="#"
          className="block text-sm text-center text-blue-600 hover:underline"
          onClick={toggle}
        >
          Already have an account? Login
        </Link>
        <button
          type="submit"
          className="w-full py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          {status === "loading" ? (
            <span className="loading loading-spinner"></span>
          ) : (
            "Register"
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default Register;