import { BsGlobe } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../redux/slices/languageSlice";
import i18next from "i18next";
import { useNavigate } from "react-router-dom";
function LanguageToggle() {
  const lang = useSelector((state) => state.language.lang);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toggleLanguage = () => {
    navigate(0);
    const newLang = lang === "en" ? "ar" : "en";
    i18next.changeLanguage(newLang);
    dispatch(setLanguage(newLang));
    document.documentElement.lang = newLang;
    document.body.dir = newLang === "ar" ? "rtl" : "ltr";
  };

  return (
    <div className="d-flex justify-content-end">
      <button className="langButton btn btn-light " onClick={toggleLanguage}>
        {lang === "en" ? "عربي" : "English"}
        <i className="mx-1">
          <BsGlobe />
        </i>
      </button>
    </div>
  );
}

export default LanguageToggle;
