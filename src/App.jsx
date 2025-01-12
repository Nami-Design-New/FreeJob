import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RouterProvider } from "react-router";
import { router } from "./providers/router";
import i18n from "./utils/i18n";
function App() {
  const lang = useSelector((state) => state.language.lang);

  useEffect(() => {
    sessionStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
    document.body.dir = lang === "ar" ? "rtl" : "ltr";
    i18n.changeLanguage(lang);
  }, [lang]);
  return <RouterProvider router={router} />;
}
export default App;
