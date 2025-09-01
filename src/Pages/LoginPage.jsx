import React, { useState } from "react";
import login from "../assets/login.png";
const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login with:", email, password);

      if (onLogin) {
      onLogin();
    }
  };

  return (

<div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
  {/* Main Box */}
  <div className="flex flex-col lg:flex-row bg-white shadow-2xl rounded-2xl overflow-hidden max-w-4xl w-full">
    
    {/* Left - Image */}
    <div className="flex-1 hidden lg:block">
      <img
        src={login}
        alt="Login Visual"
        className="w-full h-full object-cover object-center"
      />
    </div>

    {/* Right - Form */}
    <div className="flex-1 p-8 flex flex-col justify-center">
      
      {/* <p className="text-2xl font-bold text-gray-800 mb-6  italic">The music you love, all in one place.</p> */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Please Login here</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <button
          type="submit"
          className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition duration-300 cursor-pointer"
        >
          Login
        </button>
      </form>
      <p className="text-sm text-gray-500 mt-4">
        Don’t have an account? <a href="#" className="text-red hover:underline">Sign Up</a>
      </p>
    </div>
  </div>
</div>

  );
};

export default Login;
