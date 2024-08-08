import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

const Auth = () => {
  const location = useLocation();
  const [isRegister, setIsRegister] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const type = queryParams.get('type');
    setIsRegister(type === 'register');
  }, [location]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row items-center w-full max-w-6xl bg-white shadow-xl rounded-lg overflow-hidden">
        {!isRegister ? (
          <>
            <Login />
            <div className="hidden md:block p-5 w-1/2">
              <img
                src="https://contenthub-static.grammarly.com/blog/wp-content/uploads/2022/11/Nov.-blog-header_Figures_of_speech-760x391.png"
                alt="Login Illustration"
                className="object-cover h-full w-full"
              />
            </div>
          </>
        ) : (
          <>
            <div className="hidden md:block p-5 w-1/2">
              <img
                src="https://cdn.botpenguin.com/assets/website/Voice_Recognition_d576eb6f8e.webp"
                alt="Register Illustration"
                className="object-cover h-full w-full"
              />
            </div>
            <Register />
          </>
        )}
      </div>
    </div>
  );
};

export default Auth;