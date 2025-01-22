import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import DataLoader from "../ui/DataLoader";
import ErrorPage from "./ErrorPage";
import useGetAboutAppCategory from "../hooks/about/useGetAboutAppCategory";
import DetailsHeader from "../ui/servicesComponents/serviceDetails/DetailsHeader";
import { useTranslation } from "react-i18next";

const About = () => {
  const { data: aboutCategoriesList, isLoading } = useGetAboutAppCategory();
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();
  useEffect(() => {
    if (aboutCategoriesList && !searchParams.get("category")) {
      setSearchParams({ category: aboutCategoriesList[0].name });
    }
  }, [aboutCategoriesList, searchParams, setSearchParams]);

  const selectedCategory = searchParams.get("category");

  if (isLoading) {
    return <DataLoader />;
  }

  if (!isLoading && !aboutCategoriesList) {
    return <ErrorPage />;
  }

  return (
    <>
      {" "}
      <section className="header_container ">
        <section className="container-md ">
          <DetailsHeader links={t("routes.about")} />
        </section>
      </section>
      <section className="faqs">
        <div className="container">
          <ul
            className="nav nav-pills w-100 mb-3"
            id="pills-tab"
            role="tablist"
          >
            {aboutCategoriesList?.map((category) => (
              <li className="nav-item" key={category.id}>
                <button
                  onClick={() => setSearchParams({ category: category.name })}
                  className={`nav-link ${
                    category.name === selectedCategory ? "active" : ""
                  }`}
                >
                  {category.name}
                </button>
              </li>
            ))}
          </ul>
          <div className="about_links">
            {aboutCategoriesList
              ?.find((category) => category?.name === selectedCategory)
              ?.sub_categories?.map((subcategory) => (
                <Link
                  key={subcategory.id}
                  to={`/about/preview/${subcategory?.id}`}
                >
                  {subcategory?.name}
                  <i className="fa-light fa-angle-left"></i>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
