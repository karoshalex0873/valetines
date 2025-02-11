import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import image from '../assets/balloon.png';


// Balloon Component
const Balloons = () => {
  const balloonsRef = useRef([]); // Ref to store balloon elements

  useEffect(() => {
    // GSAP animation for each balloon
    balloonsRef.current.forEach((balloon, index) => {
      const duration = Math.random() * 10 + 10; // Random duration (10-20s)
      const delay = Math.random() * 5; // Random delay (0-5s)
      const xMovement = (Math.random() - 0.5) * 200; // Random horizontal movement (-100px to 100px)

      gsap.fromTo(
        balloon,
        {
          y: "100vh", // Start below the screen
          x: "0px", // Start at the same horizontal position
          opacity: 1,
          rotation: 0,
        },
        {
          y: "-120vh", // Move above the screen
          x: `${xMovement}px`, // Add horizontal movement
          rotation: 360, // Rotate the balloon
          opacity: 0, // Fade out
          duration: duration,
          delay: delay,
          ease: "none",
          repeat: -1, // Infinite loop
        }
      );
    });
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {Array.from({ length: 20 }).map((_, index) => {
        const left = `${Math.random() * 100}%`; // Random horizontal position
        const size = `${Math.random() * 50 + 50}px`; // Random size (50-100px)im
        return (
          <img
            key={index}
            ref={(el) => (balloonsRef.current[index] = el)} // Store ref for GSAP
            src={image}
            alt="Balloon"
            className="absolute"
            style={{
              left: left,
              bottom: "-10%", // Start below the screen
              width: size,
              height: "auto",
            }}
          />
        );
      })}
    </div>
  );
};

export default Balloons;