import { jwtDecode } from "jwt-decode";
import { useEffect, useMemo, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { setIsLogged, setUser } from "../redux/slices/authedUserSlice";
import axiosInstance from "../utils/axiosInstance";
import useGetProfile from "./useGetProfile";

export default function useAuth() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);
  const [cookies, , removeCookie] = useCookies(["token", "id"]);
  const { token, id } = cookies;

  const { decodedToken, isExpired } = useMemo(() => {
    if (!token) return { decodedToken: null, isExpired: true };

    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      const expired = decoded.exp < currentTime;
      return { decodedToken: decoded, isExpired: expired };
    } catch (error) {
      console.error("Error decoding token:", error);
      return { decodedToken: null, isExpired: true };
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `bearer ${token}`;
    }
  }, [token]);

  const {
    data: profile,
    isFetched,
    refetch,
  } = useGetProfile(Boolean(token && id && !isExpired));

  useEffect(() => {
    if (isExpired || Number(decodedToken?.sub) !== Number(id)) {
      dispatch(setIsLogged(false));
      removeCookie("token");
      removeCookie("id");
      setLoading(false);
      dispatch(setUser({}));
      return;
    }

    const fetchProfile = async () => {
      try {
        if (isFetched) {
          if (profile) {
            dispatch(setUser(profile));
            dispatch(setIsLogged(true));
          } else {
            console.log("Profile data not available, refetching...");
            await refetch();
          }
        } else {
          await refetch();
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        dispatch(setIsLogged(false));
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [
    decodedToken?.sub,
    dispatch,
    id,
    isExpired,
    isFetched,
    profile,
    refetch,
    removeCookie,
  ]);

  return { loading, isAuthed };
}
