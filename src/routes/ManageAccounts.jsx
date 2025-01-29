import { useTranslation } from "react-i18next";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router";
import useBanksList from "../hooks/accounts/useBankList";
import BankList from "../ui/bankAccounts/BankList";
import DataLoader from "../ui/DataLoader";
import DetailsHeader from "../ui/servicesComponents/serviceDetails/DetailsHeader";

const ManageAccounts = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { isLoading, data: banks } = useBanksList();
  return (
    <section>
      <section className="header_container  ">
        <section className="container-md flex-column flex-md-row align-items-start gap-2   ">
          <DetailsHeader links={t("manageAccounts.headerText")} />
          <button
            className="add_btn"
            onClick={() => navigate("/add-bank-account")}
          >
            <FaPlus />
            {t("manageAccounts.addAccount")}
          </button>
        </section>
      </section>

      {isLoading ? (
        <DataLoader />
      ) : banks?.length > 0 ? (
        <section className="banks">
          <BankList banks={banks} />
        </section>
      ) : (
        <section className="empty_bank_account">
          <img src="/images/bank-building.png" />
          <section className="add_bank_account">
            <h3>There Is No Bank Account</h3>
            <button
              className="add_btn"
              onClick={() => navigate("/add-bank-account")}
            >
              <FaPlus />
              {t("manageAccounts.addAccount")}
            </button>
          </section>
        </section>
      )}
    </section>
  );
};

export default ManageAccounts;
