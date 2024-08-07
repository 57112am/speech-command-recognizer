import React, { useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="h-screen">
      {loading && <Spinner />}
      <Header />
      <div className=" w-full bg-contain h-1/2 "> <img  className=" w-full  h-[87.5vh] " src="https://cxscoop.com/wp-content/webp-express/webp-images/uploads/2022/11/7-Use-Cases-for-Speech-Analytics-1440x1072.jpg.webp" alt="" /> </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
