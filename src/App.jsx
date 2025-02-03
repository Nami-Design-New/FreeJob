import { RouterProvider } from "react-router-dom";
import { router } from "./providers/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsLogged } from "./redux/slices/authedUserSlice";
import useAuth from "./hooks/helpers/useAuth";
import i18n from "./utils/i18n";
import DataLoader from "./ui/DataLoader";

function App() {
  const { isAuthed, loading } = useAuth();
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.language.lang);

  useEffect(() => {
    sessionStorage.setItem("lang", lang);
    i18n.changeLanguage(lang);
    document.body.dir = lang === "en" ? "ltr" : "rtl";
  }, [lang]);
  
  useEffect(() => {
    dispatch(setIsLogged(isAuthed));
  }, [dispatch, isAuthed]);

  return loading ? <DataLoader minHeight="100vh" /> : <RouterProvider router={router} />;
}
export default App;
