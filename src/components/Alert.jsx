import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const Alert = ({ message, onClose }) => {
  const alertRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    // Timer bar animation
    gsap.fromTo(
      timerRef.current,
      { width: "100%" },
      { width: "0%", duration: 30, ease: "linear" }
    );

    // Fade-in animation
    gsap.fromTo(
      alertRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );

    // Auto close after 30 seconds
    const timeout = setTimeout(() => {
      gsap.to(alertRef.current, {
        opacity: 0,
        duration: 0.5,
        onComplete: onClose, // Call the onClose function after fade-out
      });
    }, 30000);

    return () => clearTimeout(timeout);
  }, [onClose]);

  return (
    <div
      ref={alertRef}
      className="fixed top-26 left-6 min-w-sm max-w-[350px] bg-white shadow-lg rounded-lg p-4 z-50"
    >
        <h2 className="text-red-600 uppercase text-2xl font-bold"> ⚠️Alert</h2>
      <p className="text-gray-800 pl-8 leading-tight">{message}</p>
      <div
        ref={timerRef}
        className="h-1 absolute bottom-0 left-0 bg-blue-500 mt-2"
      />
    </div>
  );
};

export default Alert;
