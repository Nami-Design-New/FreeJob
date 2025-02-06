import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import useBlogDetails from "../hooks/blogs/useBlogsDetails";
import DetailsHeader from "../ui/servicesComponents/serviceDetails/DetailsHeader";
import DataLoader from "../ui/DataLoader";
import ErrorPage from "./ErrorPage";

function BlogDetails() {
  const { isLoading, data: blog } = useBlogDetails();
  const { t } = useTranslation();
  const { lang } = useSelector((state) => state.language);

  const renderHTML = (htmlContent) => {
    return { __html: htmlContent };
  };

  if (isLoading) {
    <DataLoader />;
  }

  if (!isLoading && !blog) {
    return <ErrorPage />;
  }

  return (
    <>
      <section className="header_container ">
        <section className="container-md ">
          <DetailsHeader links={t("routes.blogs")} />
        </section>
      </section>
      <section className="blogDetails">
        <div
          className="container"
          dangerouslySetInnerHTML={renderHTML(
            lang === "ar" ? blog?.html_ar : blog?.html_en
          )}
        ></div>
      </section>
    </>
  );
}

export default BlogDetails;
