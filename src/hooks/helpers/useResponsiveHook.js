import { useState, useEffect } from "react";

export const useResponsiveState = (query) => {
  const [isMatch, setIsMatch] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const handleResize = () => setIsMatch(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleResize);
    handleResize();
    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, [query]);

  return isMatch;
};
