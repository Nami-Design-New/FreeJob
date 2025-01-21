import { useTranslation } from "react-i18next";
import { FILTER_STATUS } from "../../utils/contants";
import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

export default function SideBarOrdersFilter({ isOpen, setIsOpen }) {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const statusParam = searchParams.get("status") || "";
  const [searchFilterData, setSearchFilterData] = useState(
    statusParam ? statusParam.split("-") : []
  );

  useEffect(() => {
    if (!searchParams.get("page")) {
      searchParams.append("page", 1);
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams]);

  const handleCheckboxChange = (e) => {
    setSearchFilterData((prevState) => {
      if (e.target.value === "all") {
        if (e.target.checked) {
          return FILTER_STATUS;
        } else {
          return [];
        }
      } else {
        const updatedStatuses = e.target.checked
          ? [...prevState, e.target.value]
          : prevState.filter((status) => status !== e.target.value);

        const allStatuses = FILTER_STATUS.filter((status) => status !== "all");
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

  function handleApplyFilters() {
    searchFilterData.filter((filter) => filter !== "all").join("-");
    if (searchFilterData.length > 0) {
      if (searchFilterData.includes("all")) {
        searchParams.delete("status");
      } else {
        searchParams.set(
          "status",
          searchFilterData.filter((filter) => filter !== "all").join("-")
        );
        searchParams.set("page", 1);
      }
      setSearchParams(searchParams);
    } else {
      searchParams.delete("status");
      setSearchParams(searchParams);
    }
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
                checked={searchFilterData.includes(status)}
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
