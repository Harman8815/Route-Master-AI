import React from "react";

const NewsLetter = () => {
  return (
    <div
      className="min-h-[55vh]  relative flex items-center justify-center"
      style={{
        background: `url('/video-bg.jpg') no-repeat center/cover`,
        position: "relative",
      }}
    >
      {/* Dark Overlay */}
      <div
        className="absolute inset-0 bg-black opacity-60"
        style={{ zIndex: 1 }}
      ></div>

      <div className="max-w-7xl mx-auto py-20 px-8 text-center text-white relative z-10">
        <h2 className="text-5xl font-bold mb-4">Newsletter</h2>
        <p className="text-gray-400 text-xl">
          Stay updated with our latest news
        </p>
        <div className="flex mt-4 w-4xl">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 rounded-l-2xl ring-2 ring-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-500 text-white px-6 rounded-r-2xl ring-2 ring-blue-500 focus:ring-2 focus:ring-blue-600 hover:bg-blue-600 transition-all">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
