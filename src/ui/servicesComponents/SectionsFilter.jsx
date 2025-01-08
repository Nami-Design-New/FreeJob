import React from "react";

export default function SectionsFilter({ selectedSections, onSectionChange }) {
  const sectionsData = [
    {
      id: "section1",
      label: "Section 1",
      subcategories: [
        { id: "sub1", label: "Subcategory 1" },
        { id: "sub2", label: "Subcategory 2" },
      ],
    },
    {
      id: "section2",
      label: "Section 2",
      subcategories: [
        { id: "sub3", label: "Subcategory 3" },
        { id: "sub4", label: "Subcategory 4" },
      ],
    },
  ];

  const isSectionFullySelected = (section) => {
    const allSubcategories = section.subcategories.map(
      (subcategory) => `${section.id}-${subcategory.id}`
    );
    return allSubcategories.every((sub) => selectedSections.includes(sub));
  };

  const handleSectionToggle = (section) => {
    const allSubcategories = section.subcategories.map(
      (subcategory) => `${section.id}-${subcategory.id}`
    );

    if (isSectionFullySelected(section)) {
      // Uncheck all: remove parent and all children
      onSectionChange(
        selectedSections.filter(
          (item) => item !== section.id && !allSubcategories.includes(item)
        )
      );
    } else {
      // Check all: add parent and all children
      onSectionChange([
        ...new Set([...selectedSections, section.id, ...allSubcategories]),
      ]);
    }
  };

  const handleSubcategoryChange = (sectionId, subId) => {
    const subKey = `${sectionId}-${subId}`;
    if (selectedSections.includes(subKey)) {
      // Uncheck subcategory
      onSectionChange(
        selectedSections.filter((item) => item !== subKey && item !== sectionId)
      );
    } else {
      // Check subcategory
      onSectionChange([...new Set([...selectedSections, subKey])]);
    }
  };

  return (
    <div className="accordion" id="sectionsAccordion">
      {sectionsData.map((section) => (
        <div className="accordion-item" key={section.id}>
          <div className="department_header">
            <label htmlFor={section.id}>
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse-${section.id}`}
                aria-expanded="false"
                aria-controls={`collapse-${section.id}`}
              >
                <span className="horizontal"></span>
                <span className="vertical"></span>{" "}
              </button>
              {section.label}
            </label>
            <input
              type="checkbox"
              id={`section-checkbox-${section.id}`}
              className="form-check-input me-2"
              checked={isSectionFullySelected(section)}
              onChange={() => handleSectionToggle(section)}
            />
          </div>

          <div
            id={`collapse-${section.id}`}
            className="accordion-collapse collapse"
            aria-labelledby={`heading-${section.id}`}
          >
            <div className="accordion-body">
              {section.subcategories.map((subcategory) => (
                <div className="form-check" key={subcategory.id}>
                  <input
                    type="checkbox"
                    id={`subcategory-checkbox-${subcategory.id}`}
                    className="form-check-input"
                    checked={selectedSections.includes(
                      `${section.id}-${subcategory.id}`
                    )}
                    onChange={() =>
                      handleSubcategoryChange(section.id, subcategory.id)
                    }
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`subcategory-checkbox-${subcategory.id}`}
                  >
                    {subcategory.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
