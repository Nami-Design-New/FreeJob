import DetailsHeader from "../ui/servicesComponents/serviceDetails/DetailsHeader";
import { useLocation, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { FaPlus } from "react-icons/fa";
import BankList from "../ui/bankAccounts/BankList";

const ManageAccounts = () => {
  let account = true;

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const segments = pathname
    .split("/")
    .filter((segment) => segment === "manage-accounts")[0]
    .split("-")
    .join(" ");
  const { t } = useTranslation();
  return (
    <section>
      <section className="header_container  ">
        <section className="container-md flex-column flex-md-row align-items-start gap-2   ">
          <DetailsHeader links={segments} />
          <button
            className="add_btn"
            onClick={() => navigate("/add-bank-account")}
          >
            <FaPlus />
            Add Bank Account
          </button>
        </section>
      </section>

      {account ? (
        <section className="banks">

        <BankList />
        </section>
      ) : (
        <section className="empty_bank_account">
          <img src="./images/bank-building.png" />
          <section className="add_bank_account">
            <h3>There Is No Bank Account</h3>
            <button
              className="add_btn"
              onClick={() => navigate("/add-bank-account")}
            >
              <FaPlus />
              Add Bank Account
            </button>
          </section>
        </section>
      )}
    </section>
  );
};

export default ManageAccounts;
