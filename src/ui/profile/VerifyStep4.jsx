import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const VerifyStep4 = () => {
  const { t } = useTranslation();
  return (
    <div className="verify_done">
      <img src="/images/7efs.gif" />
      <div className="row justify-content-center">
        <div className="col-10 text-center">
          <h5 className="text-center">{t("auth.verificationSuccess")}</h5>
          <Link to="/">
            {t("homePage")} <i className="fa-solid fa-angle-left"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyStep4;
