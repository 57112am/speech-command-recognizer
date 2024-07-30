import React, { useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";

const Home = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div>
        {loading && <Spinner />}
        <Header />
        {/* <Navbar /> */}
    </div>
  );
};

export default Home;
