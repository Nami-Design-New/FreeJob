export default function SectionsFilter({
  setFilters,
  categoriesValue,
  sub_categoriesValue,
  categoriesWithSubCategories,
}) {
  const handleChange = (e) => {
    const { name, checked, value } = e.target;
    const categoryValue = Number(value);
    setFilters((prevState) => {
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
        const relatedSubCategories =
          categoriesWithSubCategories
            .find((category) => category.id === categoryValue)
            ?.sub_categories.map((subCategory) => subCategory.id) || [];
        updatedState["sub_categories"] = checked
          ? [
              ...new Set([
                ...prevState["sub_categories"],
                ...relatedSubCategories,
              ]),
            ]
          : prevState["sub_categories"].filter(
              (id) => !relatedSubCategories.includes(id)
            );
      } else if (name === "sub_categories") {
        updatedState[name] = updateList(
          prevState[name],
          categoryValue,
          checked
        );
        console.log(categoryValue);

        const parentCategory = categoriesWithSubCategories.find((category) =>
          category.sub_categories.some((subCategory) => {
            return subCategory.id !== categoryValue;
          })
        );

        const allChildIds = parentCategory.sub_categories.map(
          (subCategory) => subCategory.id
        );
        const areAllChildrenChecked = allChildIds.every((id) =>
          updatedState["sub_categories"].includes(id)
        );
        updatedState["categories"] = areAllChildrenChecked
          ? [...new Set([...prevState["categories"], parentCategory.id])]
          : prevState["categories"].filter(
              (categoryId) => categoryId !== parentCategory.id
            );
      }
      return updatedState;
    });
  };

  return (
    <section className="accordion" id="sectionsAccordion">
      {categoriesWithSubCategories.map((section) => (
        <section className="accordion-item" key={section.id}>
          <section className="department_header">
            <label htmlFor={section.id}>
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#accordion-${section.id}`}
                aria-expanded="false"
                aria-controls={`accordion-${section.id}`}
              >
                <span className="horizontal"></span>
                <span className="vertical"></span>{" "}
              </button>
              {section.name}
            </label>
            <input
              type="checkbox"
              name="categories"
              value={section.id}
              id={`section-${section.id}`}
              className="me-2"
              checked={
                categoriesValue?.includes(+section.id) ||
                section?.sub_categories.every((sub_category) =>
                  sub_categoriesValue?.includes(+sub_category.id)
                )
              }
              onChange={handleChange}
            />
          </section>

          <section
            id={`accordion-${section.id}`}
            className="accordion-collapse collapse"
            aria-labelledby={`heading-${section.id}`}
          >
            <section className="accordion-body">
              {section.sub_categories.map((subcategory) => (
                <section className="form-check" key={subcategory.id}>
                  <input
                    type="checkbox"
                    value={subcategory.id}
                    id={`sub_category-${subcategory.id}`}
                    name="sub_categories"
                    onChange={handleChange}
                    checked={
                      sub_categoriesValue?.includes(+subcategory.id) ||
                      categoriesValue?.includes(+section.id) ||
                      section?.sub_categories.every((sub_category) =>
                        sub_categoriesValue?.includes(+sub_category.id)
                      )
                    }
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`sub_category-${subcategory.id}`}
                  >
                    {subcategory.name}
                  </label>
                </section>
              ))}
            </section>
          </section>
        </section>
      ))}
    </section>
  );
}
