import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsGlobe } from "react-icons/bs";

function LanguageToggle() {
  const [language, setLanguage] = useState("en");

  const toggleLanguage = () => {
    const newLang = language === "en" ? "ar" : "en";
    setLanguage(newLang);
    localStorage.setItem("language", newLang);
    document.documentElement.lang = newLang;
    // document.body.dir = newLang === "ar" ? "rtl" : "ltr";
  };

  return (
    <div className="d-flex justify-content-end">
      <button className="langButton btn btn-light " onClick={toggleLanguage}>
        {language === "en" ? "Arabic" : "الإنجليزية"}
        <i className="mx-1">
          <BsGlobe />
        </i>
      </button>
    </div>
  );
}

export default LanguageToggle;
