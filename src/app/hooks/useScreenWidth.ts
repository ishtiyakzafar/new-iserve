"use client";
import { useState, useEffect } from "react";

const useScreenWidth = () => {
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => setScreenWidth(window.innerWidth);

    // Set initial width
    updateWidth();

    // Add event listener
    window.addEventListener("resize", updateWidth);

    // Cleanup event listener on unmount
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return screenWidth;
};

export default useScreenWidth;
