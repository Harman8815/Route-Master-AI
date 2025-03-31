import React from "react";
import { FaTools, FaStar, FaThumbsUp, FaCogs, FaUserShield, FaHeadset } from "react-icons/fa";

const Card = ({ logo: Logo, title, description }) => {
    return (
      <div className="service-card">
        <div className="service-card-header">
          <Logo className="service-card-icon" />
          <h3 className="service-card-title">{title}</h3>
        </div>
        <p className="service-card-description">{description}</p>
      </div>
    );
  };

const Services = () => {
  const data = [
    { logo: FaTools, title: "Expert Technicians", description: "Usage of the Internet is becoming more common due to rapid advancement of technology and power." },
    { logo: FaUserShield, title: "Professional Service", description: "Usage of the Internet is becoming more common due to rapid advancement of technology and power." },
    { logo: FaHeadset, title: "Great Support", description: "Usage of the Internet is becoming more common due to rapid advancement of technology and power." },
    { logo: FaCogs, title: "Technical Skills", description: "Usage of the Internet is becoming more common due to rapid advancement of technology and power." },
    { logo: FaThumbsUp, title: "Highly Recommended", description: "Usage of the Internet is becoming more common due to rapid advancement of technology and power." },
    { logo: FaStar, title: "Positive Reviews", description: "Usage of the Internet is becoming more common due to rapid advancement of technology and power." }
  ];

  return (
    <div id="Services" className="bg-red py-20 h-screen">
      <div className="text-center w-full mb-16">
        <h2 className="text-5xl font-bold text-gray-900 leading-tight mb-4">
          Some Features that Made us Unique
        </h2>
        <p className="text-lg text-gray-600">
          Who are in extremely love with eco friendly system.
        </p>
      </div>

      {/* 3x2 Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto px-4">
        {data.map((item, index) => (
          <Card key={index} logo={item.logo} title={item.title} description={item.description} />
        ))}
      </div>
    </div>
  );
};

export default Services;
