import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useGetSkills from "../hooks/settings/useGetSkills";
import useSearchWorks from "../hooks/works/useSearchWorks";
import { useSearchParams } from "react-router-dom";
import DetailsHeader from "../ui/servicesComponents/serviceDetails/DetailsHeader";
import { handleApplyFilters } from "../utils/helper";
import FormInput from "../ui/form/FormInput";
import MultiSelect from "../ui/servicesComponents/MultiSelect";
import FormSelector from "../ui/form/FormSelector";
import DataLoader from "../ui/DataLoader";
import EmptyData from "../ui/EmptyData";
import WorkViewModal from "../ui/profile/WorkViewModal";
import PortfolioCard from "../ui/cards/PortfolioCard";

function Portfolios() {
  const { t } = useTranslation();
  const { data: skills } = useGetSkills();
  const { data: portfolios, isLoading } = useSearchWorks();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [row, setRow] = useState({});
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [searchFilterData, setSearchFilterData] = useState({
    search: searchParams.get("search") || "",
    duration: searchParams.get("duration") || "",
    skills: searchParams.get("skills")?.split("-") || [],
    sort: searchParams.get("sort") || "",
    page: Number(searchParams.get("page")) || null,
  });

  useEffect(() => {
    const options = searchFilterData?.skills?.map((id) => {
      const skill = skills?.find((s) => s?.id === Number(id));
      return { value: id, label: skill?.name };
    });

    setSelectedOptions(options);
  }, [searchFilterData, skills]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchFilterData({ ...searchFilterData, [name]: value });
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

  function handleSubmit(e) {
    e.preventDefault();
    handleApplyFilters(setSearchParams, searchFilterData);
  }

  function handleClearFilters() {
    setSearchParams({});
    setSearchFilterData({
      search: "",
      duration: "",
      skills: [],
      sort: "",
      page: null,
    });
  }

  return (
    <>
      <section className="header_container ">
        <section className="container-md ">
          <DetailsHeader links={t("routes.portfolios")} />
        </section>
      </section>
      <section className="portfolios search-section">
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
                  <MultiSelect
                    label={t("search.skills")}
                    id="skills"
                    name="skills"
                    selectedOptions={selectedOptions}
                    handleChange={handleSelect}
                    options={skills?.map((skill) => ({
                      label: skill?.name,
                      value: skill?.id,
                    }))}
                  />
                  <FormSelector
                    id="duration"
                    name="duration"
                    onChange={handleChange}
                    disabledOption={t("select")}
                    value={searchFilterData.duration}
                    label={t("search.addedDuring")}
                    options={[
                      { name: t("search.month"), value: 1 },
                      { name: t("search.3months"), value: 3 },
                      { name: t("search.6months"), value: 6 },
                      { name: t("search.year"), value: 12 },
                      { name: t("search.all"), value: "" },
                    ]}
                  />
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
            </aside>

            <div className="small-filter-header">
              <h6>{t("routes.portfolios")}</h6>
              <button
                className="openfilter"
                onClick={() => setIsFilterOpen(true)}
              >
                <i className="fa-light fa-sliders"></i>
              </button>
            </div>

            <div className="col-lg-8 ">
              {isLoading ? (
                <DataLoader />
              ) : (
                <>
                  {portfolios?.data?.length > 0 ? (
                    <div className="row">
                      {portfolios?.data?.map((portfolio) => (
                        <div
                          className="col-lg-4 col-md-6 col-12 px-2 py-4"
                          key={portfolio.id}
                        >
                          <PortfolioCard
                            portfolio={portfolio}
                            setRow={setRow}
                            setIsModalOpen={setIsModalOpen}
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <EmptyData>
                      {t("notFoundPlaceholder.noWorksFoundWithThisDetails")}
                    </EmptyData>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        <WorkViewModal
          showModal={isModalOpen}
          setShowModal={setIsModalOpen}
          targetWork={row}
        />
      </section>
    </>
  );
}

export default Portfolios;
