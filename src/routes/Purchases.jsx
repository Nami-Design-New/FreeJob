// import React, { useState } from "react";
// import { useTranslation } from "react-i18next";
// import PurchaseCard from "../ui/cards/PurchaseCard";
// import useGetPurchases from "./../features/purchases/useGetPurchases";
// import CustomPagination from "../ui/CustomPagination";
// import EmptyData from "../ui/EmptyData";
// import DataLoader from "./../ui/DataLoader";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import DataLoader from "../ui/DataLoader";
import EmptyData from "../ui/EmptyData";
import PurchaseCard from "../ui/cards/PurchasesCard";
import SideBarOrdersFilter from "../ui/orders/SideBarOrdersFilter";

const purchases = {
  data: [
    {
      id: 1,
      service: {
        id: 101,
        image: "https://placehold.co/130x90",
        title: "Web Design Service",
        user: {
          id: 10,
          name: "John Doe",
          image: "./images/avatar.jpg",
        },
      },
      status: "received",
      created_at: "2024-01-01T10:00:00Z",
      price: 120.5,
    },
    {
      id: 2,
      service: {
        id: 102,
        image: "https://placehold.co/130x90",
        title: "SEO Service",
        user: {
          id: 11,
          name: "Jane Smith",
          image: "./images/avatar.jpg",
        },
      },
      status: "in_progress",
      created_at: "2024-01-05T08:00:00Z",
      price: 250,
    },
    {
      id: 3,
      service: {
        id: 103,
        image: "https://placehold.co/130x90",
        title: "SEO Service",
        user: {
          id: 11,
          name: "Jane Smith",
          image: "./images/avatar.jpg",
        },
      },
      status: "in_progress",
      created_at: "2024-01-05T08:00:00Z",
      price: 250,
    },
  ],
  total: 5,
};
const Purchases = () => {
  const { t } = useTranslation();
  const isLoading = false;
  // const { data: purchases, isLoading } = useGetPurchases();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  console.log(purchases.total);

  function handleTogglingFilter() {
    setIsFilterOpen((open) => !open);
  }

  return (
    <main>
      <section className="cart-section container">
        <div className="row ">
          <section className=" col-md-3">
            <SideBarOrdersFilter />
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
                    {/* {purchases && purchases?.total > 10 && (
                      <CustomPagination
                        count={purchases?.total}
                        pageSize={10}
                      />
                    )} */}
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
