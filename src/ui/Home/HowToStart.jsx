import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export default function HowToStart() {
  const lang = useSelector((state) => state.language.lang);
  const { t } = useTranslation();
  return (
    <div className="howToStart">
      <h1 className="howToStart_header mb-5">{t("home.doYouhaveProject")}</h1>
      <div className="howToStart_content">
        <ul className="howToStart_text">
          <li className="main_item">
            <span>{t("home.addProject")}</span>
            <ul>
              <li className="sub_item">{t("home.addProjectDesc")}</li>{" "}
            </ul>
          </li>
          <li className="main_item">
            <span> {t("home.choosefreelancer")}</span>
            <ul>
              <li className="sub_item">{t("home.choosefreelancerDec")}</li>
            </ul>
          </li>
          <li className="main_item">
            <span> {t("home.receiveProject")}</span>
            <ul>
              {" "}
              <li className="sub_item">{t("home.receiveProjectDec")}</li>{" "}
            </ul>
          </li>
        </ul>
        <div
          className={`${
            lang === "ar" ? "ar" : ""
          } howToStart_imgaeContainer d-none d-lg-block`}
        >
          <img src="/images/card1.png" className="img-fluid" />
        </div>
      </div>
    </div>
  );
}
