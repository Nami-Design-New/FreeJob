import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import FormInput from "../form/FormInput";

const ChargeModal = ({ showModal, setShowModal, cartTotalPrice }) => {
  const { t } = useTranslation();
  const [chargeValue, setChargeValue] = useState("");
  const [cookies] = useCookies(["token"]);
  const token = cookies?.token;

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
      <Modal.Header className="border-0" closeButton>
        <h5>{t("balance.depositBalance")}</h5>
      </Modal.Header>
      <Modal.Body className="pay_modal">
        {cartTotalPrice && (
          <h3 className="text-center">
            {t("cart.youDontHaveEnoughBallance")}
            <span>
              {cartTotalPrice}
              <i className="fa-solid fa-dollar-sign"></i>
            </span>
          </h3>
        )}

        <form className="form">
          <FormInput
            type="number"
            id="chargeValue"
            name="chargeValue"
            placeholder={"00"}
            value={chargeValue}
            label={t("enterChargeValue")}
            onChange={(e) => setChargeValue(e.target.value)}
          />
        </form>

        <div className="d-flex justify-content-end gap-3 mt-4">
          <button onClick={() => setShowModal(false)} className="cancel-btn">
            {t("cancel")}
          </button>
          <Link
            className="order-now d-flex justify-content-center align-items-center"
            to={
              chargeValue === 0 || chargeValue === ""
                ? ""
                : `https://api.abday.com.sa/payment/${chargeValue}?Authorization=${token}&Redirect_url=${window.location.href}`
            }
          >
            {t("cart.chargeWallet")}
          </Link>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ChargeModal;
