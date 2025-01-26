import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import useSearchServicesList from "../../hooks/services/useSearchServicesList";
import ServiceCard from "../cards/ServiceCard";
import DataLoader from "../DataLoader";
import EmptyData from "../EmptyData";

export default function ServicesList() {
  const {
    data: searchServicesList,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useSearchServicesList();
  const { t } = useTranslation();
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1000
      ) {
        if (!isFetchingNextPage && hasNextPage) {
          fetchNextPage();
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFetchingNextPage, hasNextPage, fetchNextPage]);

  return isFetching ? (
    <DataLoader />
  ) : (
    <>
      {searchServicesList && searchServicesList.length > 0 ? (
        <section className="services_list">
          {searchServicesList.map((service) => (
            <section key={service.id} className="service_card_filter">
              <ServiceCard service={service} />
            </section>
          ))}
        </section>
      ) : (
        <EmptyData minHeight={"300px"}>
          {t("notFoundPlaceholder.noServicesFoundWithThisDetails")}
        </EmptyData>
      )}
    </>
  );
}
