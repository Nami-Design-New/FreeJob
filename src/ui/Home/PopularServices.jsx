import { useTranslation } from "react-i18next";
import SectionHeader from "../SectionHeader";
import DataLoader from "../DataLoader";
import Department from "./Department";
import useGetHomeServices from "../../hooks/home/useGetHomeServices";

export default function PopularServices() {
  const { data: popularServices, isLoading } = useGetHomeServices();
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
