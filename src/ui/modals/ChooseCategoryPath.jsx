import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

export default function ChooseCategoryPath({ show, close, params }) {
  const { t } = useTranslation();
  return (
    <Modal size="lg" onHide={close} show={show} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t("searchIn")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container p-5">
          <div className="choose_path">
            <div className="choise">
              <Link
                onClick={close}
                to={`/services${params ? `?${params}` : ""}`}
              >
                <div>
                  <img
                    src="/images/toprojects.png"
                    alt=""
                    className="img-fluid"
                  />
                </div>
                <p>{t("routes.services")}</p>
              </Link>
            </div>
            <div className="choise">
              <Link
                onClick={close}
                to={`/projects${params ? `?${params}` : ""}`}
              >
                <div>
                  <img
                    className="img-fluid"
                    src="/images/toservices.png"
                    alt=""
                  />
                </div>
                <p>{t("routes.projects")}</p>
              </Link>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
