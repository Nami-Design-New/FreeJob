import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import useGetWalletOperations from "../../hooks/accounts/useGetWalletOperations";
import { TRANSACTIONS_STATUS } from "../../utils/contants";
import { formatMoney, formattedDate } from "../../utils/helper";
import DataLoader from "../DataLoader";
import EmptyData from "../EmptyData";
import PaginationComponent from "../PaginationComponent";
import CustomPagination from "../CustomPagination";

export default function Transactions({
  setShowChargeModel,
  setShowWithdrawModel,
}) {
  const { t } = useTranslation();
  const { data: transactions, isLoading } = useGetWalletOperations();
  const [searchParams, setSearchParams] = useSearchParams();
  const statusParam = searchParams.get("status") || "";
  const authedUser = useSelector((state) => state.authedUser.user);

  const [searchFilterData, setSearchFilterData] = useState(
    statusParam ? statusParam.split("-") : []
  );

  function handleApplyFilters() {
    if (searchFilterData.length > 0) {
      if (searchFilterData.includes("all")) {
        searchParams.delete("status");
      } else {
        searchParams.set(
          "status",
          searchFilterData.filter((filter) => filter !== "all").join("-")
        );
      }
    } else {
      searchParams.delete("status");
    }
    // Reset the page parameter to 1 when applying filters
    searchParams.set("page", 1);
    setSearchParams(searchParams);
  }

  const handleCheckboxChange = (e) => {
    setSearchFilterData((prevState) => {
      if (e.target.value === "all") {
        if (e.target.checked) {
          return TRANSACTIONS_STATUS;
        } else {
          return [];
        }
      } else {
        const updatedStatuses = e.target.checked
          ? [...prevState, e.target.value]
          : prevState.filter((status) => status !== e.target.value);

        const allStatuses = TRANSACTIONS_STATUS.filter(
          (status) => status !== "all"
        );
        const areAllStatusesChecked = allStatuses.every((status) =>
          updatedStatuses.includes(status)
        );

        if (areAllStatusesChecked) {
          return ["all", ...updatedStatuses];
        } else {
          return updatedStatuses.filter((status) => status !== "all");
        }
      }
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    handleApplyFilters();
  }

  return (
    <div className="transactions-wrapper">
      <div className="row g-3">
        <div className="col-lg-4">
          <div className="transactions-aside">
            <form onSubmit={handleSubmit}>
              <ul className="order-status">
                {TRANSACTIONS_STATUS.map((status) => (
                  <li
                    key={status}
                    className="d-flex align-items-center gap-2 mb-1"
                  >
                    <input
                      type="checkbox"
                      id={status}
                      name="order-filter"
                      value={status}
                      checked={searchFilterData.includes(status)}
                      onChange={handleCheckboxChange}
                    />
                    <label htmlFor={status}>
                      {t(`transactions.${status}`)}
                    </label>
                  </li>
                ))}
              </ul>

              <button className="search-btn  mt-3" type="submit">
                {t("search.apply")}
              </button>
            </form>
          </div>
        </div>
        <div className="col-lg-8 ">
          {" "}
          <h3>{t("balance.accountBalance")}</h3>
          <div className="cash my-3">
            <div className="row g-1">
              <div className="col-4 ">
                <div className="head">
                  <Link
                    onClick={(e) => {
                      e.preventDefault();
                      setShowWithdrawModel(true);
                    }}
                  >
                    {t("profile.withdraw")}
                  </Link>{" "}
                  <Link
                    onClick={(e) => {
                      e.preventDefault();
                      setShowChargeModel(true);
                    }}
                  >
                    {t("profile.deposit")}
                  </Link>
                </div>
              </div>

              <div className="col-2   ">
                <div
                  className="cash-info"
                  style={{ backgroundColor: "#003912" }}
                >
                  <h6>{formatMoney(authedUser?.total_balance)} </h6>
                  <span className="d-flex align-items-center ">
                    {t("balance.totalBalance")}
                  </span>
                </div>
              </div>
              <div className="col-2 ">
                <div
                  className="cash-info"
                  style={{ backgroundColor: "#9B0D0D" }}
                >
                  <h6>{formatMoney(authedUser?.pending_balance)} </h6>
                  <span className="d-flex align-items-center ">
                    {t("balance.pendingBalance")}
                  </span>
                </div>
              </div>
              <div className="col-2 ">
                <div
                  className="cash-info"
                  style={{ backgroundColor: "#014169" }}
                >
                  <h6>{formatMoney(authedUser?.available_balance)} </h6>
                  <span className="d-flex align-items-center ">
                    {t("balance.availableBalance")}
                  </span>
                </div>
              </div>
              <div className="col-2">
                <div
                  className="cash-info"
                  style={{ backgroundColor: "#E8C201" }}
                >
                  <h6>{formatMoney(authedUser?.wallet)} </h6>
                  <span className="d-flex align-items-center ">
                    {t("balance.wallet")}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {isLoading ? (
            <DataLoader />
          ) : transactions?.data && transactions?.data?.length > 0 ? (
            <>
              {" "}
              <h3>{t("balance.transactions")}</h3>
              <div className="transactions-body">
                {transactions?.data?.map((transaction, index) => (
                  <Link
                    to={`${
                      transaction?.service_order_id || transaction?.project_id
                        ? transaction?.service_order_id
                          ? `/recieved-orders/${transaction?.service_order_id}`
                          : `/projects-orders/${transaction?.project_id}`
                        : ""
                    }`}
                    className="transaction-box"
                    key={index}
                  >
                    <div className="money-wrapper">
                      <h5>
                        {transaction?.price}
                        <i className="fa-solid fa-dollar-sign"></i>
                      </h5>
                    </div>
                    <div className="info-wrapper">
                      <h6 className="info-header">{transaction?.title}</h6>
                      <div className="info-boxes-wrapper">
                        <div className="info-box">
                          <i className="fa-regular fa-timer"></i>
                          {formattedDate(transaction?.created_at)}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
                {transactions?.total > 8 && (
                  <CustomPagination count={transactions?.total} pageSize={8} />
                )}
              </div>
            </>
          ) : (
            <EmptyData>{t("balance.noTransactions")}</EmptyData>
          )}
        </div>
      </div>
    </div>
  );
}
