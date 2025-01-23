import { useTranslation } from "react-i18next";
import useGetSettings from "../hooks/settings/useGetSettings";
import DataLoader from "../ui/DataLoader";
import DetailsHeader from "../ui/servicesComponents/serviceDetails/DetailsHeader";

const Privacy = () => {
  const { data: settings, isLoading } = useGetSettings();
  const { t } = useTranslation();

  const renderHTML = (htmlContent) => {
    return { __html: htmlContent };
  };
  return (
    <>
      <section className="header_container ">
        <section className="container-md ">
          <DetailsHeader links={t("footer.privacy")} />
        </section>
      </section>
      <section className="faqs">
        <div className="container">
          {isLoading ? (
            <DataLoader />
          ) : (
            <div
              dangerouslySetInnerHTML={renderHTML(settings?.data?.privacy)}
            />
          )}
        </div>
      </section>
    </>
  );
};

export default Privacy;
