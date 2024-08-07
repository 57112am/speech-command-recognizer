import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

const Auth = () => {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row items-center w-full max-w-6xl bg-white shadow-xl rounded-lg overflow-hidden">
        {!isRegister ? (
          <>
            <Login toggle={() => setIsRegister(true)} />
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
            <Register toggle={() => setIsRegister(false)} />
          </>
        )}
      </div>
    </div>
  );
};

export default Auth;