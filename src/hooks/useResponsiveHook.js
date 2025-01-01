import { useState, useEffect } from "react";

export const useResponsiveState = (query) => {
  const [isMatch, setIsMatch] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    const handleResize = () => setIsMatch(mediaQuery.matches);
    handleResize(); // Set initial value based on current match

    mediaQuery.addEventListener("change", handleResize); // Attach listener

    return () => {
      mediaQuery.removeEventListener("change", handleResize); // Clean up listener
    };
  }, [query]);

  return isMatch;
};
