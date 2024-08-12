import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Auth from "./components/Auth";
import { useSelector } from "react-redux";

/**
 * Main application component that sets up the routing.
 * It renders different pages based on the user's authentication state.
 *
 * @component
 * @returns {JSX.Element} The rendered application component with routing.
 */
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