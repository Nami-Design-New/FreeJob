import { useState } from "react";
import { useTranslation } from "react-i18next";
import Transactions from "../ui/bankAccounts/Transactions";
import ChargeModal from "../ui/modals/ChargrModal";
import WithdrawModal from "../ui/modals/WithdrawModal";
import DetailsHeader from "../ui/servicesComponents/serviceDetails/DetailsHeader";

const Balance = () => {
  const { t } = useTranslation();

  const [showChargeModel, setShowChargeModel] = useState(false);
  const [showWithdrawModel, setShowWithdrawModel] = useState(false);

  return (
    <section>
      <section className="header_container  ">
        <section className="container-md flex-column flex-md-row align-items-start gap-2   ">
          <DetailsHeader links={t("routes.balance")} />
        </section>
      </section>
      <section className="balance_section">
        <div className="container">
          <div className="content-body">
            <Transactions
              setShowChargeModel={setShowChargeModel}
              setShowWithdrawModel={setShowWithdrawModel}
            />
          </div>
        </div>
        <ChargeModal
          showModal={showChargeModel}
          setShowModal={setShowChargeModel}
        />
        <WithdrawModal
          showModal={showWithdrawModel}
          setShowModal={setShowWithdrawModel}
        />
      </section>
    </section>
  );
};

export default Balance;
