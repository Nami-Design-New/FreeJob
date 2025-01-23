import DetailsHeader from "../ui/servicesComponents/serviceDetails/DetailsHeader";
import DataLoader from "../ui/DataLoader";
import useGetSettings from "../hooks/settings/useGetSettings";
import { useTranslation } from "react-i18next";

const Terms = () => {
  const { data: settings, isLoading } = useGetSettings();
  const { t } = useTranslation();
  const renderHTML = (htmlContent) => {
    return { __html: htmlContent };
  };
  return (
    <>
      <section className="header_container ">
        <section className="container-md ">
          <DetailsHeader links={t("footer.terms")} />
        </section>
      </section>
      <section className="faqs">
        <div className="container">
          {isLoading ? (
            <div>
              <DataLoader />
            </div>
          ) : (
            <div dangerouslySetInnerHTML={renderHTML(settings?.data?.terms)} />
          )}
        </div>
      </section>
    </>
  );
};

export default Terms;
