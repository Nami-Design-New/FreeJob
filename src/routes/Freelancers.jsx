import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useSearchParams } from "react-router";
import DetailsHeader from "../ui/servicesComponents/serviceDetails/DetailsHeader";
import FreelancerCard from "../ui/cards/FreelancerCard";
import avatarPlaceholder from "../../public/images/avatar-placeholder-2.svg";
import StarsList from "../ui/modals/StarsList";

const Freelancers = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [searchFilterData, setSearchFilterData] = useState({
    search: searchParams.get("search") || "",
    page: Number(searchParams.get("page")) || null,
    rate: Number(searchParams.get("rate")) || null,
    verified: Number(searchParams.get("verified")) || null,
    job_title: searchParams.get("job_title") || "",
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

  const segments = pathname
    .split("/")
    .filter((segment) => segment === "freelancers")[0]
    ?.split("-")
    ?.join(" ");

  const freelancers = [
    {
      id: 1,
      name: "Mariam Samir",
      image: avatarPlaceholder,
      verified: 1,
      service_count: 5,
      rate: 4.5,
    },
    {
      id: 1,
      name: "Mariam Samir",
      image: "",
      verified: 1,
      service_count: 5,
      rate: 4.5,
    },
    {
      id: 2,
      name: "jihad ahmed",
      image: avatarPlaceholder,
      verified: 2,
      service_count: 6,
      rate: 5,
    },
    {
      id: 2,
      name: "Ahmed Ali",
      image: avatarPlaceholder,
      verified: 2,
      service_count: 6,
      rate: 5,
    },
    {
      id: 2,
      name: "Ahmed Ali",
      image: "",
      verified: 2,
      service_count: 6,
      rate: 5,
    },
    {
      id: 2,
      name: "Ali",
      image: "",
      verified: 2,
      service_count: 6,
      rate: 5,
    },
    {
      id: 2,
      name: "Ahmed Ali",
      image: avatarPlaceholder,
      verified: 2,
      service_count: 6,
      rate: 5,
    },
    {
      id: 2,
      name: "mostafa samir",
      image: avatarPlaceholder,
      verified: 2,
      service_count: 6,
      rate: 5,
    },
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedFreelancers = freelancers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const totalPages = Math.ceil(freelancers.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setSearchFilterData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    }));
  };

  const handleRatingChange = (star) => {
    setSearchFilterData((prev) => ({ ...prev, rate: star }));
  };

  const handleSelect = (selected) => {
    setSelectedOptions(selected);
    setSearchFilterData((prev) => ({
      ...prev,
      skills: selected.map((option) => option.value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchParams({
      ...searchFilterData,
      skills: searchFilterData.skills.join("-"),
      categories: searchFilterData.categories.join("-"),
    });
  };

  const handleClearFilters = () => {
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
    setSelectedOptions([]);
  };

  return (
    <section className="freelancers">
      {/* Header Section */}
      <section className="header_container">
        <section className="container-md">
          <DetailsHeader links={segments} />
        </section>
      </section>

      {/* Main Content */}
      <div className="container my-5">
        <div className="row">
          {/* Sidebar */}
          <aside
            className={`col-lg-3 p-4 side-menu mt-2 rounded-3 shadow-sm ${
              isFilterOpen ? "active" : ""
            }`}
            style={{
              backgroundColor: "#fff",
              position: "sticky",
              height: "fit-content",
              border: "1px solid #ddd",
            }}
          >
            <div className="filter-wrap">
              <h4
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  marginBottom: "20px",
                }}
              >
                {t("search.search")}
              </h4>
              <form className="form" onSubmit={handleSubmit}>
                {/* Search Input */}
                <div className="mb-3">
                  <label
                    htmlFor="search"
                    className="form-label"
                    style={{ fontSize: "14px", fontWeight: "500" }}
                  >
                    {t("search.search")}
                  </label>
                  <input
                    id="search"
                    name="search"
                    value={searchFilterData.search}
                    onChange={handleChange}
                    className="form-control"
                    style={{
                      backgroundColor: "#f9f9f9",
                      border: "1px solid #ddd",
                      borderRadius: "5px",
                    }}
                    placeholder={t("search.searchFor")}
                  />
                </div>

                {/* Categories */}
                <div className="mb-3">
                  <label
                    className="form-label"
                    style={{ fontSize: "14px", fontWeight: "500" }}
                  >
                    {t("categories")}
                  </label>
                  {[
                    "Animation Video",
                    "Design",
                    "Social Marketing",
                    "Development & Programming",
                  ].map((category, index) => (
                    <div key={index} className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`category-${index}`}
                        name="categories"
                        value={index + 1}
                        checked={searchFilterData.categories.includes(
                          index + 1
                        )}
                        onChange={(e) => {
                          const value = Number(e.target.value);
                          setSearchFilterData((prev) => ({
                            ...prev,
                            categories: e.target.checked
                              ? [...prev.categories, value]
                              : prev.categories.filter((cat) => cat !== value),
                          }));
                        }}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`category-${index}`}
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>

                {/* Job Title */}
                <div className="mb-3">
                  <label
                    htmlFor="job_title"
                    className="form-label"
                    style={{ fontSize: "14px", fontWeight: "500" }}
                  >
                    {t("search.jobTitle")}
                  </label>
                  <input
                    id="job_title"
                    name="job_title"
                    value={searchFilterData.job_title}
                    onChange={handleChange}
                    className="form-control"
                    style={{
                      backgroundColor: "#f9f9f9",
                      border: "1px solid #ddd",
                      borderRadius: "5px",
                    }}
                    placeholder={t("search.jobTitle")}
                  />
                </div>

                {/* Rating */}
                <div className="mb-3">
                  <label
                    className="form-label"
                    style={{ fontSize: "16px", fontWeight: "500" }}
                  >
                    {t("search.rating")}
                  </label>
                  <StarsList
                    rate={searchFilterData.rate || 0}
                    onRateChange={(star) => handleRatingChange(star)}
                  />
                </div>

                {/* Seller Status */}
                <div className="mb-3">
                  <label
                    className="form-label"
                    style={{ fontSize: "14px", fontWeight: "500" }}
                  >
                    {t("search.sellerStatus")}
                  </label>
                  <div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="verified"
                        name="verified"
                        checked={searchFilterData.verified === 1}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="verified">
                        {t("search.verificated")}
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="last_login"
                        name="last_login"
                        checked={searchFilterData.last_login === 1}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="last_login">
                        {t("search.onlineNow")}
                      </label>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="d-flex gap-2 ">
                  <button
                    type="submit"
                    className="btn btn-success w-100 border-0 rounded-3"
                    style={{}}
                  >
                    {t("search.apply")}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary w-100 border-0 rounded-3"
                    onClick={handleClearFilters}
                    style={{
                      backgroundColor: "#ddd",
                      color: "#000",
                    }}
                  >
                    {t("search.clear")}
                  </button>
                </div>
              </form>
            </div>
          </aside>

          {/* Freelancer Cards */}
          <div className="col-lg-9 col-12">
            <div className="row">
              {paginatedFreelancers.map((freelancer) => (
                <div className="col-12 p-2" key={freelancer.id}>
                  <FreelancerCard freelancer={freelancer} />
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="pagination mt-3">
              <button
                className="btn btn-secondary mx-2"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                {t("Previous")}
              </button>
              {[...Array(totalPages).keys()].map((_, index) => (
                <button
                  key={index}
                  className={`btn ${
                    currentPage === index + 1 ? "btn-success" : "btn-secondary"
                  } mx-1`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
              <button
                className="btn btn-secondary mx-2"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                {t("Next")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Freelancers;
