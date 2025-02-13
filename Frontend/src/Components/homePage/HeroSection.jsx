import React, { useEffect, useRef } from "react";
import Typed from "typed.js";

const HeroSection = () => {
  const typedElement = useRef(null);

  useEffect(() => {
    const typed = new Typed(typedElement.current, {
      strings: [
        "We bring ideas to life!",
        "Creating amazing experiences.",
        "Innovating for the future.",
      ],
      typeSpeed: 50,
      backSpeed: 30,
      loop: true,
    });

    return () => typed.destroy(); // Clean up on unmount
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-30 text-black text-center px-4 bg-[#FFF5ED]">
      <h1 className="text-4xl sm:text-5xl font-bold">
        <span ref={typedElement} />
      </h1>
    </div>
  );
};

export default HeroSection;