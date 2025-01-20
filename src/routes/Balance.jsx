import React, { useState } from "react";
import ChargeModal from "../ui/modals/ChargrModal";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Transactions from "../ui/bankAccounts/Transactions";
import DetailsHeader from "../ui/servicesComponents/serviceDetails/DetailsHeader";

const Balance = () => {
  const { t } = useTranslation();
  const user = useSelector((state) => state.authedUser.user);
  const [showChargeModel, setShowChargeModel] = useState(false);
  const [showWithdrawModel, setShowWithdrawModel] = useState(false);

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {props.content}
    </Tooltip>
  );
  return (
    <section>
      <section className="header_container  ">
        <section className="container-md flex-column flex-md-row align-items-start gap-2   ">
          <DetailsHeader links={t("routes.balance")} />
        </section>
      </section>
      <section className="balance_section">
        <div className="container">
          <div className="blanceHeader">
            <h3>{t("balance.accountBalance")}</h3>
            <div className="btns-wrapper">
              <button className="btn" onClick={() => setShowChargeModel(true)}>
                {t("balance.depositBalance")}
              </button>
              <button
                className="btn"
                onClick={() => setShowWithdrawModel(true)}
              >
                {t("balance.withdrawBalance")}
              </button>
            </div>
          </div>
          <div className="content-body">
            <div className="balance-boxes-wrapper">
              <div className="balance-box">
                <span className="d-flex align-items-center justify-content-between w-100">
                  {t("balance.totalBalance")}
                  <OverlayTrigger
                    placement="bottom"
                    overlay={renderTooltip({
                      content: t("profile.totalBalanceTooltip"),
                    })}
                  >
                    <i className="info-label fa-light fa-circle-info"></i>
                  </OverlayTrigger>
                </span>
                <h6>
                  {user?.total_balance}{" "}
                  <i className="fa-solid fa-dollar-sign"></i>
                </h6>
              </div>
              <div className="balance-box">
                <span className="d-flex align-items-center justify-content-between w-100">
                  {t("balance.pendingBalance")}
                  <OverlayTrigger
                    placement="bottom"
                    overlay={renderTooltip({
                      content: t("profile.pendingBalanceTooltip"),
                    })}
                  >
                    <i className="info-label fa-light fa-circle-info"></i>
                  </OverlayTrigger>
                </span>
                <h6>
                  {user?.pending_balance}{" "}
                  <i className="fa-solid fa-dollar-sign"></i>
                </h6>
              </div>
              <div className="balance-box">
                <span className="d-flex align-items-center justify-content-between w-100">
                  {t("balance.availableBalance")}
                  <OverlayTrigger
                    placement="bottom"
                    overlay={renderTooltip({
                      content: t("profile.availableBalanceTooltip"),
                    })}
                  >
                    <i className="info-label fa-light fa-circle-info"></i>
                  </OverlayTrigger>
                </span>
                <h6>
                  {user?.available_balance}{" "}
                  <i className="fa-solid fa-dollar-sign"></i>
                </h6>
              </div>
              <div className="balance-box">
                <span className="d-flex align-items-center justify-content-between w-100">
                  {t("balance.wallet")}
                  <OverlayTrigger
                    placement="bottom"
                    overlay={renderTooltip({
                      content: t("profile.walletTooltip"),
                    })}
                  >
                    <i className="info-label fa-light fa-circle-info"></i>
                  </OverlayTrigger>
                </span>
                <h6>
                  {user?.wallet} <i className="fa-solid fa-dollar-sign"></i>
                </h6>
              </div>
            </div>
            <Transactions />
          </div>
        </div>
        <ChargeModal
          showModal={showChargeModel}
          setShowModal={setShowChargeModel}
        />
        {/* <WithdrawModal
          showModal={showWithdrawModel}
          setShowModal={setShowWithdrawModel}
        /> */}
      </section>
    </section>
  );
};

export default Balance;
