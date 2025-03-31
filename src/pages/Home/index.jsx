import React from "react";
import Hero from "./Hero";
import ChooseUS from "./ChooseUS.jsx";
import Services from "./Services.jsx";
import FaQ from "./FaQ.jsx";
import Contact from "./Contact.jsx";
import NewsLetter from "./NewsLetter.jsx";

const Home = () => {
  return (
    <div className="relative ">
      <Hero />
      <ChooseUS />
      <Services />
      <FaQ />
      <NewsLetter />
      <Contact />
    </div>
  );
};

export default Home;
