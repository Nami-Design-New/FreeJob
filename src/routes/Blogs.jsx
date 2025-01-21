import DataLoader from "../ui/DataLoader";
import EmptyData from "../ui/EmptyData";
import DetailsHeader from "../ui/servicesComponents/serviceDetails/DetailsHeader";
import BlogCard from "../ui/cards/BlodCard";
import { useTranslation } from "react-i18next";
import useBlogsList from "../hooks/blogs/useBlogsList";

function Blogs() {
  const { isLoading, data: blogs } = useBlogsList();
  const { t } = useTranslation();

  return (
    <>
      <section className="header_container ">
        <section className="container-md ">
          <DetailsHeader links={t("routes.portfolios")} />
        </section>
      </section>
      {isLoading ? (
        <DataLoader />
      ) : (
        <section className="blogs">
          <div className="container">
            <div className="row">
              {blogs?.length > 0 ? (
                blogs?.map((blog) => (
                  <div className="col-lg-4 col-md-6 col-12 p-2" key={blog?.id}>
                    <BlogCard blog={blog} />
                  </div>
                ))
              ) : (
                <EmptyData>Sorry, there are no blogs right now.</EmptyData>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default Blogs;
