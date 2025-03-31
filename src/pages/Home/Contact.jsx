import React from "react";

const Contact = () => {
  return (
    <div className="bg-gray-100 py-20 px-8">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          If you need, Just drop us a line
        </h1>
        <p className="text-lg text-gray-600">
          We are here to help you plan your perfect trip with ease.
        </p>
      </div>

      {/* Contact Form */}
      <div className="w-[80%] mx-auto  p-12">
        <form className="flex flex-row flex-wrap gap-8 justify-center">
          {/* Left Side - Inputs */}
          <div className="w-[40%] space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                placeholder="Enter the subject"
                className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Right Side - Message */}
          <div className="w-[40%] flex flex-col space-y-1">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Your Message
            </label>
            <textarea
              id="message"
              rows="9"
              placeholder="Enter your message here..."
              className="w-full flex-1 p-4 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            <button
              type="submit"
              className="w-40 mt-2 bg-blue-800 text-white py-3 rounded-[20rem] hover:bg-violet-800 transition-all"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
