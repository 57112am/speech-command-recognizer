import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Auth from "./components/Auth"; // Import the Auth component
import { useSelector } from "react-redux";

const App = () => {
  const obj = useSelector((state) => state.auth);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={obj._id ? <Navigate to="/dashboard" /> : <Home />}
        />
        <Route
          path="/dashboard"
          element={obj._id ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/auth"
          element={obj._id ? <Navigate to="/dashboard" /> : <Auth />}
        />
        {/* Route for Auth component */}
      </Routes>
    </Router>
  );
};

export default App;
