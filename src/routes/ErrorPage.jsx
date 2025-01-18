import { Link } from "react-router";
import { useTranslation } from "react-i18next";

function ErrorPage() {
  const { t } = useTranslation();
  return (
    <section className="cart-section container">
      <div className="row">
        <div className="col-12 p-2">
          <div className="error-section">
            <img src="./images/error-404.svg" alt="error image" />
            <h2>404</h2>
            <h2>{t("error.pageNotFound")}</h2>
            <Link to="/">
              <i className="fa-solid fa-home"></i>
              <span>{t("error.goHome")}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ErrorPage;
