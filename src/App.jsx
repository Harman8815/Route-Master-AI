import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ViewTrip from "./pages/ViewTrip.jsx";
import CreateTrip from "./pages/CreateTrip";
import Footer from './components/Footer.jsx'
const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-trip" element={<CreateTrip />} />
        <Route path="/trip/:tripId" element={<ViewTrip />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
