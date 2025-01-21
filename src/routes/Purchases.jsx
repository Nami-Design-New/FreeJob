import { useState } from "react";
import { CiFilter } from "react-icons/ci";
import { useTranslation } from "react-i18next";
import DataLoader from "../ui/DataLoader";
import EmptyData from "../ui/EmptyData";
import PurchaseCard from "../ui/cards/PurchasesCard";
import SideBarOrdersFilter from "../ui/orders/SideBarOrdersFilter";
import useGetPurchases from "../hooks/orders/useGetPurchases";
import CustomPagination from "../ui/CustomPagination";

const Purchases = () => {
  const { t } = useTranslation();
  const { data: purchases, isLoading } = useGetPurchases();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  function toggleMenu() {
    setIsFilterOpen((open) => !open);
  }

  return (
    <main>
      <section className=" container my-4">
        <section className="small_header_filter d-md-none">
          <h6>Purchases</h6>
          <CiFilter className=" my-3 fs-3" onClick={toggleMenu} />
        </section>
        <div className="row ">
          <section className=" col-md-3">
            <SideBarOrdersFilter
              isOpen={isFilterOpen}
              setIsOpen={setIsFilterOpen}
            />
          </section>
          <section className="col-md-9 ">
            {isLoading ? (
              <DataLoader />
            ) : (
              <>
                {purchases?.data?.length === 0 ? (
                  <EmptyData>
                    {purchases?.total === 0
                      ? t("recievedOrders.emptyPurchasesWithThisState")
                      : t("recievedOrders.emptyPurchases")}
                  </EmptyData>
                ) : (
                  <>
                    <div className="row g-3">
                      {purchases?.data?.map((purchase) => (
                        <div key={purchase.id}>
                          <PurchaseCard purchase={purchase} />
                        </div>
                      ))}
                    </div>
                    {purchases && purchases?.total > 10 && (
                      <CustomPagination
                        count={purchases?.total}
                        pageSize={10}
                      />
                    )}
                  </>
                )}
              </>
            )}
          </section>
        </div>
      </section>
    </main>
  );
};

export default Purchases;
