import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useJwt } from "react-jwt";
import { useDispatch, useSelector } from "react-redux";
import useGetProfile from "./hooks/useGetProfile";
import { setIsLogged, setUser } from "./redux/slices/authedUserSlice";
import DataLoader from "./ui/DataLoader";
import axiosInstance from "./utils/axios";
import i18n from "./utils/i18n";
import { router } from "./providers/router";
import { RouterProvider } from "react-router";
function App() {
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.language.lang);

  const [cookies] = useCookies(["token", "id"]);
  const token = cookies?.token;
  const id = cookies?.id;
  const { decodedToken, isExpired } = useJwt(token);
  // axiosInstance.defaults.headers.common["Authorization"] = `${token}`;
  // Update the Authorization header dynamically
  // useEffect(() => {
  //   if (token && !isExpired) {
  //     axiosInstance.defaults.headers.common["Authorization"] = `${token}`;
  //   } else {
  //     delete axiosInstance.defaults.headers.common["Authorization"];
  //   }
  // }, [token, isExpired]);
  const {
    data: profile,
    isLoading,
    isFetched,
    refetch,
  } = useGetProfile(id, Boolean(token && id && !isExpired));

  useEffect(() => {
    if (Number(decodedToken?.sub) === id && !isExpired) {
      if (isFetched) {
        dispatch(setUser(profile));
        dispatch(setIsLogged(true));
      } else {
        refetch();
      }
    } else {
      dispatch(setIsLogged(false));
      dispatch(setUser({}));
      delete axiosInstance.defaults.headers.common["Authorization"];
    }
  }, [decodedToken?.sub, id, isExpired, profile, isFetched, refetch, dispatch]);

  useEffect(() => {
    sessionStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
    document.body.dir = lang === "ar" ? "rtl" : "ltr";
    i18n.changeLanguage(lang);
  }, [lang]);

  return isLoading ? <DataLoader /> : <RouterProvider router={router} />;
}
export default App;
