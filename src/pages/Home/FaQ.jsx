import React, { useState, useEffect, useRef } from "react";
import CountUp from "react-countup";

const FaQ = () => {
  const [inView, setInView] = useState(false);
  const statsRef = useRef(null);

  const handleScroll = () => {
    if (statsRef.current) {
      const rect = statsRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Trigger when either half of the section is in view from top or bottom
      const isVisible =
        (rect.top < windowHeight * 0.5 && rect.bottom > 0) || // Top half visible
        (rect.bottom > windowHeight * 0.5 && rect.top < windowHeight); // Bottom half visible

      setInView(isVisible);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check visibility on initial render

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div id="faq" className="bg-gray-50 py-20 px-8">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-blue-900">
          Frequently Asked Questions
        </h1>
        <p className="text-gray-600 mt-4">
          Here are some common questions about our AI-powered trip planner.
        </p>
      </div>

      {/* Main Content */}
      <div className="flex justify-center gap-10 max-w-4xl mx-auto items-center">
        {/* Left Section: Stats */}
        <div ref={statsRef} className="flex flex-col gap-8 ml-20">
          <div className="flex items-center flex-col gap-1 justify-center">
            <span className="text-5xl font-bold text-blue-500 mr-4">
              {inView ? <CountUp end={5000} duration={2} /> : 0}
            </span>
            <p className="text-gray-700">Trips Planned</p>
          </div>

          <div className="flex items-center flex-col gap-1 justify-center">
            <span className="text-5xl font-bold text-blue-500 mr-4">
              {inView ? <CountUp end={1200} duration={2} /> : 0}
            </span>
            <p className="text-gray-700">Destinations Covered</p>
          </div>

          <div className="flex items-center flex-col gap-1 justify-center">
            <span className="text-5xl font-bold text-blue-500 mr-4">
              {inView ? <CountUp end={98} duration={2} /> : 0}%
            </span>
            <p className="text-gray-700">Customer Satisfaction</p>
          </div>

          <div className="flex items-center flex-col gap-1 justify-center">
            <span className="text-5xl font-bold text-blue-500 mr-4">
              {inView ? <CountUp end={24} duration={2} /> : 0}
            </span>
            <p className="text-gray-700">Hours Support Available</p>
          </div>
        </div>

        {/* Right Section: FAQs */}
        <div className="space-y-5">
          <div className="p-1 ">
            <h3 className="text-xl font-semibold text-blue-900">
              💡 How does the AI trip planner customize my itinerary?
            </h3>
            <p className="text-gray-600 mt-2 text-sm">
              Our AI uses your preferences, travel history, and real-time data
              to create personalized itineraries.
            </p>
          </div>

          <div className="p-1 ">
            <h3 className="text-xl font-semibold text-blue-900">
              🌎 Can I use the planner for international travel?
            </h3>
            <p className="text-gray-600 mt-2">
              Yes! Our AI trip planner covers both domestic and international
              destinations.
            </p>
          </div>

          <div className="p-1 ">
            <h3 className="text-xl font-semibold text-blue-900">
              🚀 Is the trip planner mobile-friendly?
            </h3>
            <p className="text-gray-600 mt-2">
              Yes! You can access your trip plans on mobile devices, tablets,
              and desktops.
            </p>
          </div>

          <div className="p-1 ">
            <h3 className="text-xl font-semibold text-blue-900">
              🔒 Is my personal data safe with your platform?
            </h3>
            <p className="text-gray-600 mt-2">
              Yes, we prioritize your privacy. All data is encrypted and
              securely stored.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaQ;
