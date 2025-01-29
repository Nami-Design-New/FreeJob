import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import useGetSkills from "../hooks/settings/useGetSkills";
import useCategorieListWithSub from "../hooks/categories/useCategorieListWithSub";
import useGetBestFreelancers from "../hooks/useGetBestFreelancers";
import { handleApplyFilters } from "../utils/helper";
import DataLoader from "../ui/DataLoader";
import DetailsHeader from "../ui/servicesComponents/serviceDetails/DetailsHeader";
import FormInput from "../ui/form/FormInput";
import MultiSelect from "../ui/servicesComponents/MultiSelect";
import CustomPagination from "../ui/CustomPagination";
import EmptyData from "../ui/EmptyData";
import FreelancerCard from "../ui/cards/FreelancerCard";
import DepartmentFilterBox from "../ui/DepartmentFilterBox";

const BestFreeLancers = () => {
  const { t } = useTranslation();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchFilterData, setSearchFilterData] = useState({
    search: searchParams.get("search") || "",
    page: Number(searchParams.get("page")) || null,
    rate: Number(searchParams.get("rate")) || null,
    verified: Number(searchParams.get("verified")) || null,
    job_title: Number(searchParams.get("job_title")) || "",
    last_login: Number(searchParams.get("last_login")) || null,
    add_request_in_my_projects:
      Number(searchParams.get("add_request_in_my_projects")) || null,
    skills: searchParams.get("skills")
      ? searchParams
          .get("skills")
          .split("-")
          .map((skill) => skill)
      : [],
    categories: searchParams.get("categories")
      ? searchParams
          .get("categories")
          .split("-")
          .map((category) => Number(category))
      : [],
  });

  const { data: skills } = useGetSkills();
  const { isLoading, data: categoriesWithSubCategories } =
    useCategorieListWithSub();
  const { data: freelancers, isLoading: isFreelancingLoading } =
    useGetBestFreelancers();

  function truncate(inputString) {
    let truncateStringResult;
    if (inputString?.length > 280) {
      truncateStringResult = inputString.substring(0, 280) + "...";
    } else {
      truncateStringResult = inputString;
    }
    return truncateStringResult;
  }

  useEffect(() => {
    const options = searchFilterData?.skills?.map((id) => {
      const skill = skills?.find((s) => s?.id === Number(id));
      return { value: id, label: skill?.name };
    });

    setSelectedOptions(options);
  }, [searchFilterData, skills]);

  const handleChange = (e) => {
    const { name, checked, type, value } = e.target;
    const parsedValue = type === "checkbox" ? (checked ? 1 : 0) : value;
    if (name !== "categories" && name !== "sub_categories") {
      setSearchFilterData((prevState) => ({
        ...prevState,
        [name]: parsedValue,
      }));
      return;
    }
    const categoryValue = Number(value);
    setSearchFilterData((prevState) => {
      const updatedState = { ...prevState };
      const updateList = (list, value, add) => {
        return add ? [...list, value] : list.filter((id) => id !== value);
      };
      if (name === "categories") {
        updatedState[name] = updateList(
          prevState[name],
          categoryValue,
          checked
        );
      }
      return updatedState;
    });
  };

  const handleSelect = (selectedItems) => {
    setSelectedOptions(selectedItems);
    const selectedValues = selectedItems
      ? selectedItems?.map((option) => option.value)
      : [];
    setSearchFilterData({
      ...searchFilterData,
      skills: selectedValues,
    });
  };

  const handleRatingChange = (value) => {
    setSearchFilterData({ ...searchFilterData, rate: value });
  };

  function handleSubmit(e) {
    e.preventDefault();
    handleApplyFilters(setSearchParams, searchFilterData);
  }

  function handleClearFilters() {
    setSearchParams({});
    setSearchFilterData({
      search: "",
      page: null,
      rate: null,
      verified: null,
      job_title: "",
      last_login: null,
      add_request_in_my_projects: null,
      skills: [],
      categories: [],
    });
  }

  if ((isLoading || isFreelancingLoading) && freelancers?.length < 12) {
    return <DataLoader />;
  }

  return (
    <>
      <section className="header_container ">
        <section className="container-md ">
          <DetailsHeader links={t("routes.freelancers")} />
        </section>
      </section>
      {isLoading ? (
        <DataLoader />
      ) : (
        <section className="best-freelancers search-section">
          <div className="container">
            <div className="row">
              <aside
                className={`col-lg-4 p-2 pt-3 side-menu ${
                  isFilterOpen ? "active" : ""
                }`}
              >
                <div className="filter-wrap">
                  <div className="colse" onClick={() => setIsFilterOpen(false)}>
                    <i className="fa-light fa-xmark"></i>
                  </div>
                  <form className="form" onSubmit={handleSubmit}>
                    <FormInput
                      id="search"
                      name="search"
                      value={searchFilterData.search}
                      onChange={handleChange}
                      label={t("search.search")}
                      placeholder={t("search.searchFor")}
                    />
                    <DepartmentFilterBox
                      categoriesValue={searchFilterData.categories}
                      onChange={handleChange}
                      categoriesWithSubCategories={categoriesWithSubCategories}
                    />
                    <FormInput
                      id="job_title"
                      name="job_title"
                      value={searchFilterData.job_title}
                      onChange={handleChange}
                      label={t("search.jobTitle")}
                      placeholder={t("search.jobTitle")}
                    />
                    <MultiSelect
                      label={t("search.skills")}
                      id="skills"
                      name="skills"
                      options={skills?.map((skill) => ({
                        value: skill?.id,
                        label: skill?.name,
                      }))}
                      selectedOptions={selectedOptions}
                      handleChange={handleSelect}
                    />
                    <div className="form_input">
                      <label htmlFor="rate">{t("search.rating")}</label>
                      <div className="stars">
                        <div className="star-rating-service">
                          {[5, 4, 3, 2, 1].map((star) => (
                            <React.Fragment key={star}>
                              <input
                                type="radio"
                                id={`star${star}`}
                                name="rating"
                                value={star}
                                checked={searchFilterData.rate === star}
                                onChange={() => handleRatingChange(star)}
                              />
                              <label
                                htmlFor={`star${star}`}
                                title={`${star} stars`}
                                className={
                                  searchFilterData.rate >= star ? "active" : ""
                                }
                              >
                                <i className="fa-sharp fa-solid fa-star"></i>
                              </label>
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    </div>
                    <ul className="seller-level w-100">
                      <h6>{t("search.sellerStatus")}</h6>
                      <ul>
                        <li>
                          <input
                            type="checkbox"
                            id="verified"
                            name="verified"
                            checked={searchFilterData.verified === 1}
                            onChange={handleChange}
                          />
                          <label htmlFor="verified">
                            {t("search.verificated")}
                          </label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="last_login"
                            name="last_login"
                            checked={searchFilterData.last_login === 1}
                            onChange={handleChange}
                          />
                          <label htmlFor="last_login">
                            {t("search.onlineNow")}
                          </label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="add_request_in_my_projects"
                            name="add_request_in_my_projects"
                            checked={
                              searchFilterData.add_request_in_my_projects === 1
                            }
                            onChange={handleChange}
                          />
                          <label htmlFor="add_request_in_my_projects">
                            {t("search.addedOffers")}
                          </label>
                        </li>
                      </ul>
                    </ul>{" "}
                    <div className="d-flex gap-2 w-100">
                      <div className="search-btn">
                        <button style={{ height: "44px" }}>
                          {t("search.apply")}
                        </button>
                      </div>
                      <div className="search-btn">
                        <button
                          style={{ height: "44px" }}
                          type="button"
                          onClick={handleClearFilters}
                        >
                          {t("search.clear")}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </aside>{" "}
              <div className="small-filter-header">
                <h6>{t("routes.freelancers")}</h6>
                <button
                  className="openfilter"
                  onClick={() => setIsFilterOpen(true)}
                >
                  <i className="fa-light fa-sliders"></i>
                </button>
              </div>
              <div className="col-lg-8 col-12 p-2">
                <div className="row">
                  {isFreelancingLoading ? (
                    <DataLoader />
                  ) : (
                    <>
                      {freelancers?.data?.length > 0 ? (
                        <>
                          {freelancers?.data?.map((freelancer) => (
                            <div className="col-md-4 py-4" key={freelancer?.id}>
                              <FreelancerCard
                                freelancer={freelancer}
                                truncate={truncate}
                              />
                            </div>
                          ))}
                          {freelancers && freelancers?.total > 10 && (
                            <CustomPagination
                              count={freelancers?.total}
                              pageSize={10}
                            />
                          )}
                        </>
                      ) : (
                        <EmptyData>{t("noFreelancers")}</EmptyData>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default BestFreeLancers;
