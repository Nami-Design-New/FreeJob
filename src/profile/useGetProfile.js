import { useState, useEffect } from "react";
import { useLocation } from "react-router";

const useGetUserProfile = () => {
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const freelancer = location.state?.freelancer;
    setUser(freelancer);
  }, [location]);

  return user;
};

export default useGetUserProfile;
