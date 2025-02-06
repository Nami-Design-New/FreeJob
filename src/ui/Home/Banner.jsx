import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function Banner() {
  const { t } = useTranslation();
  return (
    <>
      <div className="banner_home">
        <h1>{t("home.withABDAY")}</h1>
        <Link
          to={"/services"}
          className="form_button"
          style={{
            color: "black",
            backgroundColor: "white",
            width: "fit-content",
            marginTop: "0",
            padding: "0.5rem 0.8rem",
            fontSize: "0.75rem",
          }}
        >
          {t("home.viewServices")}
        </Link>
      </div>
    </>
  );
}
