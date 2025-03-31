import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div
      id="hero-section"
      className=" z-10 flex items-center justify-center min-h-screen"
    >
      <div className="bg-transparent text-white bg-opacity-90 p-10 max-w-7xl text-center">
        <h1 className="text-6xl font-extrabold  leading-tight mb-6">
          Your Next Adventure 
        </h1>
        <p className="text-lg  mb-4">
          Discover breathtaking destinations, craft personalized itineraries,
          and make lifelong memories with Trip Planner.
        </p>
        <p className="text-lg mb-8">
          Whether you're exploring hidden gems or planning a dream vacation,
          we've got you covered.
        </p>

        <Link
          to="/create-trip"
          className="bg-white  text-black text-lg px-6 py-3 rounded-3xl shadow-md hover:bg-blue-600 hover:text-white transition"
        >
          🚀 Let's Get Started
        </Link>
      </div>
    </div>
  );
};

export default Hero;
