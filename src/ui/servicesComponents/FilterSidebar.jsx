import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoMdClose } from "react-icons/io";
import { useSearchParams } from "react-router";
import { handleApplyFilters } from "../../utils/helper";
import FormButton from "../form/FormButton";
import MultiSelect from "./MultiSelect";
import RangeInput from "./RangeInput";
import SearchInput from "./SearchInput";
import SectionsFilter from "./SectionsFilter";
import DataLoader from "../DataLoader";
import useGetSkills from "../../hooks/useGetSkills";
import useCategorieListWithSub from "../../hooks/categories/useCategorieListWithSub";

const FilterSidebar = ({ isOpen, setIsOpen }) => {
  const { t } = useTranslation();
  const { isLoading: categoriesIsLoading, data: categoriesWithSubCategories } =
    useCategorieListWithSub();
  const { data: skills } = useGetSkills();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    searchQuery: searchParams.get("search") || "",
    price_from: Number(searchParams.get("price_from")) || 5,
    price_to: Number(searchParams.get("price_to")) || 2000,
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

  const handleSearch = (query) => {
    setFilters((prev) => ({ ...prev, searchQuery: query }));
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
        <h2>Services</h2>
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
          <SearchInput
            value={filters.searchQuery}
            onSearch={handleSearch}
            aria-label="Search items"
          />
        </section>
        {categoriesIsLoading ? (
          <DataLoader />
        ) : (
          <section className="my-4">
            <h3>Sections</h3>
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
        <section className="my-4">
          <h3>Price Range</h3>
          <RangeInput
            label="$"
            min={1}
            max={1000}
            value={[filters.price_from, filters.price_to]}
            handleSlide={(value) => handleSliderChange("price", value)}
            aria-label="Select price range"
          />
        </section>
        <section className="my-4">
          <h3>Delivery Duration</h3>
          <RangeInput
            label="Days"
            min={1}
            max={360}
            value={[filters.duration_from, filters.duration_to]}
            handleSlide={(value) => handleSliderChange("duration", value)}
            aria-label="Select delivery duration"
          />
        </section>
        <footer className="d-flex align-item-center gap-2 justify-content-center p-0 pt-3">
          <FormButton
            content="Apply"
            style={{
              backgroundColor: "var(--main-color)",
              package: "0.5rem 0.75rem",
              margin: "0",
            }}
            type="submit"
          />

          <FormButton
            content="Reset"
            style={{
              backgroundColor: "var(--main-color)",
              package: "0.5rem 0.75rem",
              margin: "0",
            }}
            type="button"
            className="hover"
            onClick={resetFilters}
          />
        </footer>
      </form>
    </aside>
  );
};

export default FilterSidebar;
