import React, { useState } from "react";
import { useSearchParams } from "react-router";
import SearchInput from "./SearchInput";
import Sections from "./SectionsFilter";
import DropdownMenu from "./DropdownMenu";
import RangeInput from "./RangeInput";
import SectionsFilter from "./SectionsFilter";
import FormButton from "../form/FormButton";

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    searchQuery: searchParams.get("search") || "",
    selectedSections: searchParams.get("sections")
      ? searchParams.get("sections").split(",")
      : [],
    selectedSkill: searchParams.get("skill") || "",
    priceRange: [
      parseInt(searchParams.get("priceMin")) || 0,
      parseInt(searchParams.get("priceMax")) || 1000,
    ],
    deliveryDuration: [
      parseInt(searchParams.get("deliveryMin")) || 1,
      parseInt(searchParams.get("deliveryMax")) || 360,
    ],
  });

  // Apply filters: Update query parameters
  const applyFilters = () => {
    const params = {};
    if (filters.searchQuery) params.search = filters.searchQuery;
    if (filters.selectedSections.length > 0)
      params.sections = filters.selectedSections.join(",");
    if (filters.selectedSkill) params.skill = filters.selectedSkill;
    if (filters.priceRange) {
      params.priceMin = filters.priceRange[0];
      params.priceMax = filters.priceRange[1];
    }
    if (filters.deliveryDuration) {
      params.deliveryMin = filters.deliveryDuration[0];
      params.deliveryMax = filters.deliveryDuration[1];
    }
    setSearchParams(params);
  };

  const resetFilters = () => {
    setFilters({
      searchQuery: "",
      selectedSections: [],
      selectedSkill: "",
      priceRange: [0, 1000],
      deliveryDuration: [1, 360],
    });
    setSearchParams({});
  };

  const handleSearch = (query) => {
    setFilters((prev) => ({ ...prev, searchQuery: query }));
  };

  const handleSectionChange = (section) => {
    setFilters((prev) => ({
      ...prev,
      selectedSections: prev.selectedSections.includes(section)
        ? prev.selectedSections.filter((sec) => sec !== section)
        : [...prev.selectedSections, section],
    }));
  };

  const handleSkillChange = (skill) => {
    console.log(skill);

    setFilters((prev) => ({ ...prev, selectedSkill: skill }));
  };

  const handlePriceRangeChange = (range) => {
    setFilters((prev) => ({ ...prev, priceRange: range }));
  };

  const handleDeliveryRangeChange = (range) => {
    setFilters((prev) => ({ ...prev, deliveryDuration: range }));
  };

  return (
    <aside aria-labelledby="filter-sidebar-title" className="filter_sidebar">
      <form
        onSubmit={(e) => e.preventDefault()}
        aria-label="Filter options"
        className="filter-form "
      >
        <section className="my-3">
          <SearchInput
            value={filters.searchQuery}
            onSearch={handleSearch}
            aria-label="Search items"
          />
        </section>
        <section className="my-3">
          <h3>Sections</h3>
          <SectionsFilter
            selectedSections={filters.selectedSections}
            onSectionChange={handleSectionChange}
          />
        </section>
        <section className="my-3">
          <h3>Skills</h3>
          <DropdownMenu
            selectedSkill={filters.selectedSkill}
            onSelect={handleSkillChange}
          />
        </section>
        <section className="my-3">
          <h3>Price Range</h3>
          <RangeInput
            label="$"
            min={1}
            max={1000}
            value={filters.priceRange}
            onChange={handlePriceRangeChange}
            aria-label="Select price range"
          />
        </section>
        <section className="my-3">
          <h3>Delivery Duration</h3>
          <RangeInput
            label="Days"
            min={1}
            max={360}
            value={filters.deliveryDuration}
            onChange={handleDeliveryRangeChange}
            aria-label="Select delivery duration"
          />
        </section>
        <footer className="d-flex align-item-center gap-2 justify-content-center">
          <FormButton
            content="Apply"
            style={{
              backgroundColor: "var(--main-color)",
              package: "0.5rem 0.75rem",
              margin: "0",
            }}
            type="button"
            className=""
            onClick={applyFilters}
          >
            Apply
          </FormButton>
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
          >
            Reset
          </FormButton>
        </footer>
      </form>
    </aside>
  );
};

export default FilterSidebar;
