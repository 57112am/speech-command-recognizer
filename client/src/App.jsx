import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import toast, { Toaster } from "react-hot-toast";
import PrivateRoute from "./components/PrivateRoute";
import { useSelector } from "react-redux";
import Dashboard from "./pages/Dashboard";
const App = () => {
  const obj = useSelector((state) => state.auth);
  // console.log(obj);
  // const user = JSON.parse(localStorage.getItem("userInfo"));
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={obj._id ? <Dashboard /> : <Navigate to='/' />}
        />
      </Routes>
    </Router>
  );
};

export default App;
