import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import SubmitButton from "../form/SubmitButton";

function DeleteAcountModal({
  setShowModal,
  showModal,
  eventFunction,
  loading,
}) {
  const { t } = useTranslation();

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
      <Modal.Header className="border-0" closeButton />
      <Modal.Body className="pay_modal">
        <h3>{t("auth.areYouSureYouWantToDeleteYourAccount")} </h3>
        <div className="d-flex justify-content-end gap-3 mt-4">
          <button onClick={() => setShowModal(false)} className="cancel-btn">
            {t("cancel")}
          </button>
          <SubmitButton
            name={t("auth.confirm")}
            loading={loading}
            onClick={eventFunction}
            className={"delete-btn"}
          />
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default DeleteAcountModal;
