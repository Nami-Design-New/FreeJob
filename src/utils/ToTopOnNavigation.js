import { useEffect } from "react";

const ToTopOnNavigation = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
};

export default ToTopOnNavigation;
