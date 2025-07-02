import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoMdClose } from "react-icons/io";
import { useSearchParams } from "react-router";
import useCategorieListWithSub from "../../hooks/categories/useCategorieListWithSub";
import useGetSkills from "../../hooks/settings/useGetSkills";
import { handleApplyFilters } from "../../utils/helper";
import DataLoader from "../DataLoader";
import FormButton from "../form/FormButton";
import FormInput from "../form/FormInput";
import MultiSelect from "./MultiSelect";
import RangeInput from "./RangeInput";
import RatingFilterBox from "./RatingFilterBox";
import SectionsFilter from "./SectionsFilter";
import useGetProjectPrice from "../../hooks/projects/useGetProjectPrice";
import useGetServicePrice from "../../hooks/services/useGetServicePrice";

const FilterSidebar = ({ isOpen, setIsOpen, type }) => {
  const { t } = useTranslation();
  const { isLoading: categoriesIsLoading, data: categoriesWithSubCategories } =
    useCategorieListWithSub();
  const { data: skills } = useGetSkills();
  const { data: priceRange } = useGetProjectPrice();
  const { data: servicePriceRange } = useGetServicePrice();
  console.log(servicePriceRange);
  useEffect(() => {
    const priceMin =
      type === "services" ? servicePriceRange?.min : priceRange?.min;
    const priceMax =
      type === "services" ? servicePriceRange?.max : priceRange?.max;

    if (priceMin !== undefined && priceMax !== undefined) {
      setFilters((prev) => ({
        ...prev,
        price_from: prev.price_from ?? priceMin,
        price_to: prev.price_to ?? priceMax,
      }));
    }
  }, [type, priceRange, servicePriceRange]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    searchQuery: searchParams.get("searchQuery") || "",
    price_from:
      Number(searchParams.get("price_from")) ||
      (type === "services" ? servicePriceRange?.min : priceRange?.min),
    price_to:
      Number(searchParams.get("price_to")) ||
      (type === "services" ? servicePriceRange?.max : priceRange?.max),
    duration_from: Number(searchParams.get("duration_from")) || 1,
    duration_to: Number(searchParams.get("duration_to")) || 360,
    page: Number(searchParams.get("page")) || null,
    categories: searchParams.get("categories")
      ? searchParams
          .get("categories")
          .split("-")
          .map((category) => Number(category))
      : [],
    sub_categories: searchParams.get("sub_categories")
      ? searchParams
          .get("sub_categories")
          .split("-")
          .map((subcategory) => Number(subcategory))
      : [],
    skills: searchParams.get("skills")
      ? searchParams.get("skills").split("-")
      : [],
  });

  useEffect(() => {
    const options = filters?.skills?.map((id) => {
      const skill = skills?.find((s) => s?.id === Number(id));
      return { value: id, label: skill?.name };
    });

    setSelectedOptions(options);
  }, [filters, skills]);
  function handleSubmit(e) {
    e.preventDefault();
    handleApplyFilters(setSearchParams, filters);
  }

  const resetFilters = () => {
    setFilters({
      searchQuery: "",
      price_from: 5,
      price_to: 2000,
      duration_from: 1,
      duration_to: 360,
      categories: [],
      sub_categories: [],
      skills: [],
    });
    setSearchParams({});
  };

  const handleSearch = (e) => {
    setFilters((prev) => ({ ...prev, searchQuery: e.target.value }));
  };
  const handleRatingChange = (e) => {
    setFilters((prev) => ({ ...prev, rate: e.target.value }));
    console.log("Selected Rating:", e.target.value);
  };
  const handleSkillChange = (selectedItems) => {
    const selectedValues = selectedItems
      ? selectedItems?.map((option) => option.value)
      : [];
    setFilters({
      ...filters,
      skills: selectedValues,
    });
  };

  const handleSliderChange = (name, value) => {
    if (name === "duration") {
      setFilters((prevState) => ({
        ...prevState,
        duration_from: value[0],
        duration_to: value[1],
      }));
    } else if (name === "price") {
      setFilters((prevState) => ({
        ...prevState,
        price_from: value[0],
        price_to: value[1],
      }));
    }
  };

  return (
    <aside
      aria-labelledby="filter-sidebar-title"
      className={`p-3 rounded border sidebar ${isOpen ? "active" : ""}`}
    >
      <header className="filter_sidebar_header">
        <h2>{t("routes.services")}</h2>
        <button onClick={() => setIsOpen(false)}>
          <IoMdClose />
        </button>
      </header>
      <form
        onSubmit={handleSubmit}
        aria-label="Filter options"
        className="filter-form "
      >
        <section className="mb-4">
          <FormInput
            value={filters.searchQuery}
            label={t("routes.search")}
            onChange={(e) => handleSearch(e)}
            aria-label="Search items"
            placeholder={t("search.searchFor")}
          />
        </section>
        {categoriesIsLoading ? (
          <DataLoader />
        ) : (
          <section className="my-4">
            <h3>{t("navbar.sections")}</h3>
            <SectionsFilter
              categoriesValue={filters.categories}
              sub_categoriesValue={filters.sub_categories}
              filters={filters}
              setFilters={setFilters}
              categoriesWithSubCategories={categoriesWithSubCategories}
            />
          </section>
        )}
        <section className="my-4">
          <MultiSelect
            label={t("search.skills")}
            handleChange={handleSkillChange}
            selectedOptions={selectedOptions}
            options={skills?.map((skill) => ({
              label: skill?.name,
              value: skill?.id,
            }))}
          />
        </section>
        {type === "projects" && (
          <>
            <section className="my-4">
              <h3>{t("projects.price")}</h3>
              <RangeInput
                label="$"
                min={priceRange?.min}
                max={priceRange?.max}
                value={[filters.price_from, filters.price_to]}
                handleSlide={(value) => handleSliderChange("price", value)}
                aria-label="Select price range"
              />
            </section>
            <section className="my-4">
              <h3>{t("services.deliveryTime")}</h3>
              <RangeInput
                label={t("search.days")}
                min={1}
                max={360}
                value={[filters.duration_from, filters.duration_to]}
                handleSlide={(value) => handleSliderChange("duration", value)}
                aria-label="Select delivery duration"
              />
            </section>
          </>
        )}
        {type === "services" && (
          <section className="my-4">
            <h3>{t("projects.price")}</h3>
            <RangeInput
              label="$"
              min={servicePriceRange?.min}
              max={servicePriceRange?.max}
              value={[filters.price_from, filters.price_to]}
              handleSlide={(value) => handleSliderChange("price", value)}
              aria-label="Select price range"
            />
          </section>
        )}
        {type === "services" && (
          <RatingFilterBox value={filters.rate} onChange={handleRatingChange} />
        )}
        <div className="d-flex align-item-center gap-2 justify-content-center p-0 pt-3">
          <FormButton
            content={t("search.apply")}
            style={{
              backgroundColor: "var(--main-color)",
              package: "0.5rem 0.75rem",
              margin: "0",
            }}
            type="submit"
          />

          <FormButton
            content={t("search.clear")}
            style={{
              backgroundColor: "var(--main-color)",
              package: "0.5rem 0.75rem",
              margin: "0",
            }}
            type="button"
            className="hover"
            onClick={resetFilters}
          />
        </div>
      </form>
    </aside>
  );
};

export default FilterSidebar;
