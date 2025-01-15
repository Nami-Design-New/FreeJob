import { useTranslation } from "react-i18next";
import { FILTER_STATUS } from "../../utils/contants";
import { useSearchParams } from "react-router";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
export default function SideBarOrdersFilter({ isOpen, setIsOpen }) {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const statusParam = searchParams.get("status") || "";
  const [searchFilterData, setSearchFilterData] = useState(
    statusParam ? statusParam.split("-") : []
  );

  function handleCheckboxChange(e) {
    const { value, checked } = e.target;

    setSearchFilterData((prevState) => {
      if (value === "all") {
        return checked ? [...FILTER_STATUS] : [];
      } else {
        const updatedStatuses = checked
          ? [...prevState, value]
          : prevState.filter((status) => status !== value);
        const allStatuses = FILTER_STATUS.filter((status) => status !== "all");
        const areAllSelected = allStatuses.every((status) =>
          updatedStatuses.includes(status)
        );

        return areAllSelected
          ? ["all", ...allStatuses]
          : updatedStatuses.filter((s) => s !== "all");
      }
    });
  }

  function handleApplyFilters() {
    const filteredStatuses = searchFilterData.filter(
      (status) => status !== "all"
    );

    const newSearchParams = new URLSearchParams(searchParams);

    if (filteredStatuses.length > 0) {
      newSearchParams.set("status", filteredStatuses.join("-"));
    } else {
      newSearchParams.delete("status");
    }

    setSearchParams(newSearchParams);
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleApplyFilters();
  }

  return (
    <section className={`sidebar_orders_filter ${isOpen ? "active" : ""}`}>
      <section className="sidebar_orders_filter_header">
        <h2>Orders Status</h2>
        <button>
          <IoMdClose onClick={() => setIsOpen(false)} />
        </button>
      </section>
      <form onSubmit={handleSubmit}>
        <ul className="order_filter_input_group">
          {FILTER_STATUS.map((status) => (
            <li key={status}>
              <input
                type="checkbox"
                id={status}
                name="order-filter"
                value={status}
                onChange={handleCheckboxChange}
              />
              <label htmlFor={status}>{t(`status.${status}`)}</label>
            </li>
          ))}
        </ul>
        <button className="submit_Filter_button">{t("search.apply")}</button>
      </form>
    </section>
  );
}
