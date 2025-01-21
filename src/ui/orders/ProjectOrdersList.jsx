import { useTranslation } from "react-i18next";
import OrderCard from "../cards/OrderCard";
import CustomPagination from "./../CustomPagination";
import EmptyData from "./../EmptyData";

export default function ProjectOrdersList({ serviceOrders }) {
  const { t } = useTranslation();

  return (
    <>
      {serviceOrders && serviceOrders?.data?.length > 0 ? (
        <>
          <section className="row g-4">
            {serviceOrders?.data?.map((order) => (
              <section key={order?.id}>
                <OrderCard order={order} />
              </section>
            ))}

            {serviceOrders && serviceOrders?.total > 10 && (
              <CustomPagination count={serviceOrders?.total} pageSize={10} />
            )}
          </section>
        </>
      ) : (
        <EmptyData>
          {serviceOrders?.total === 0
            ? t("recievedOrders.emptyOrders")
            : t("recievedOrders.noOrders")}
        </EmptyData>
      )}
    </>
  );
}
