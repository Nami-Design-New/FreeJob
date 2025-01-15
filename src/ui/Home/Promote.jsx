import { useTranslation } from "react-i18next";
import FormButton from "../form/FormButton";

export default function Promote() {
  const { t } = useTranslation();
  return (
    <div className="promote_card ">
      <div className="content  col-md-6">
        <div className="text_content">
          <h1>{t("home.joinFREEJOB")}</h1>
          <p>{t("home.joinFREEJOBDesc")}</p>
        </div>
        <FormButton
          style={{ marginTop: "0", width: "fit-content" }}
          content={t("home.joinNow")}
        />
      </div>
      <div className="d-none d-md-block col-6 rounded overflow-hidden">
        <img src="./images/card2.png" alt="" className="img-fluid rounded " />
      </div>
    </div>
  );
}
