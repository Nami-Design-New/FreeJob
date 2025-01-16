import { Link } from "react-router";
import SectionHeader from "../SectionHeader";
import ServiceCard from "../cards/ServiceCard";
import ShowAll from "../ShowAll";
import { useTranslation } from "react-i18next";
import useGetHomeServices from "../../hooks/services/useGetHomeServices";
import DataLoader from "../DataLoader";
import Department from "./Department";

export default function PopularServices() {
  const { data: popularServices, isLoading, error } = useGetHomeServices();
  const { t } = useTranslation();
  return (
    <section className="popular_services ">
      <SectionHeader
        title={t("home.bestServices")}
        description={t("home.bestServicesSubTitle")}
      />

      <div className="row g-4 my-4">
        {isLoading ? (
          <DataLoader />
        ) : (
          popularServices.map((category) => (
            <Department key={category.id} category={category} />
          ))
        )}
      </div>
    </section>
  );
}
