import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ChooseUS = () => {
  useEffect(() => {
    // GSAP Animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#Chooseus",
        start: "top 80%",
        end: "bottom 20%",
        scrub: true,
        toggleActions: "play reverse play reverse",
      },
    });

    // Image Animation (Shift left & up)
    tl.fromTo(
      ".image-section",
      { x: 350, y: 200, opacity: 1 },
      { x: 0, y: 0, opacity: 1, duration: 1.5, ease: "power.out" }
    );

    // Text Animation (Shift right & down)
    tl.fromTo(
      ".text-section",
      { x: -200, y: 50, opacity: 1 },
      { x: -20, y: -120, opacity: 1, duration: 1.5, ease: "power.out" },
      "-=1" // Run both animations simultaneously
    );
  }, []);

  return (
    <div id="Chooseus" className="bg-white py-20 pb-20 min-h-[80vh]">
      {/* Title Section */}
      <div className="text-center w-full mb-16">
        <h2 className="text-5xl font-bold text-gray-900 leading-tight mb-4">
          Why Choose Us as Your Travel Companion
        </h2>
        <p className="text-lg text-gray-600">
          Experience seamless travel planning with our reliable and innovative platform.
        </p>
      </div>

      <div className="relative flex justify-center items-center min-h-screen"> {/* Image Section */}
        <div className="image-section w-[650px] z-5  ">
          <img
            src="/about-img.jpg"
            alt="About Us"
            className="rounded-lg shadow-lg w-full"
          />
        </div>
        {/* Text Section */}
        <div className="text-section shadow-2xl w-[650px] shadow-black/20 bg-white px-16 py-20 rounded-lg z-10 ">
          <h3 className="text-4xl font-semibold text-gray-800 leading-snug mb-8">
            Create Unforgettable <br /> Travel Experiences
          </h3>
          <p className="text-md text-gray-700 leading-relaxed mb-6">
            Our platform offers <b>tailored itineraries</b> that perfectly align with your preferences. Whether you're craving a serene beach escape, a bustling city adventure, or a quiet countryside retreat, we help you explore the world like never before.
          </p>
          <p className="text-md text-gray-700 leading-relaxed mb-6">
            With <b>intelligent trip suggestions</b>, you can effortlessly discover hidden gems and must-see attractions. Our AI-powered planner analyzes your interests and provides personalized recommendations, ensuring you never miss out on unique experiences.
          </p>
          <p className="text-md text-gray-700 leading-relaxed mb-6">
            Enjoy <b>real-time updates and dynamic recommendations</b>, making your travel seamless and stress-free. Get notified about local events, weather changes, and exclusive deals so you can make the most of every moment.
          </p>
          <p className="text-md text-gray-700 leading-relaxed mb-6">
            Whether you're a solo traveler seeking self-discovery or exploring with loved ones, our platform guarantees <b>memorable and well-organized journeys</b>. Share plans with friends, collaborate on itineraries, and make changes in real-time.
          </p>
        </div>

       
      </div>
    </div>
  );
};

export default ChooseUS;
