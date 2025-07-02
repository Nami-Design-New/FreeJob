import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function Promote() {
  const { t } = useTranslation();
  return (
    <div className="promote_card ">
      <div className="content  col-md-6">
        <div className="text_content">
          <h1>{t("home.joinEbday")}</h1>
          <p>{t("home.joinEbdayDesc")}</p>
        </div>
        <Link
          className="form_button"
          style={{ marginTop: "0", width: "fit-content" }}
          to={"/services"}
        >
          {t("home.viewServices")}
        </Link>
      </div>
      <div className="d-none d-md-block col-6 rounded overflow-hidden">
        <img src="/images/card2.png" alt="" className="img-fluid rounded " />
      </div>
    </div>
  );
}
