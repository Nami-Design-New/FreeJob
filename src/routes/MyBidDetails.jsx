// import useGetProject from "../features/projects/useGetProject";
import { useTranslation } from "react-i18next";
import useGetProject from "../hooks/projects/useGetProject";
import DetailsHeader from "../ui/servicesComponents/serviceDetails/DetailsHeader";

function MyBidDetails() {
  const { data: project, isLoading } = useGetProject();
  const { t } = useTranslation();
  return (
    <>
      <section className="header_container ">
        <section className="container-md ">
          <DetailsHeader links={t("routes.bids")} />
          <p>{project?.title} </p>
        </section>
      </section>
      <section style={{ height: "100vh" }}></section>
    </>
  );
}

export default MyBidDetails;
