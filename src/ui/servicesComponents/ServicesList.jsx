import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import useSearchServicesList from "../../hooks/services/useSearchServicesList";
import ServiceCard from "../cards/ServiceCard";
import DataLoader from "../DataLoader";
import EmptyData from "../EmptyData";
import CustomPagination from "../CustomPagination";

export default function ServicesList() {
  const { data: searchServicesList, isLoading } = useSearchServicesList();
  const { t } = useTranslation();

  return isLoading ? (
    <DataLoader />
  ) : (
    <>
      {searchServicesList && searchServicesList?.data?.length > 0 ? (
        <section className="services_list">
          {searchServicesList?.data?.map((service) => (
            <section key={service.id} className="service_card_filter">
              <ServiceCard service={service} />
            </section>
          ))}
          {searchServicesList && searchServicesList?.total > 10 && (
            <CustomPagination count={searchServicesList?.total} pageSize={10} />
          )}
        </section>
      ) : (
        <EmptyData minHeight={"300px"}>
          {t("notFoundPlaceholder.noServicesFoundWithThisDetails")}
        </EmptyData>
      )}
    </>
  );
}
