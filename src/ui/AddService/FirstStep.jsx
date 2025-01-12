import { useEffect, useState } from "react";
import FormButton from "../form/FormButton";
import FormInput from "../form/FormInput";
import FormSelector from "../form/FormSelector";
import FormTextArea from "../form/FormTextArea";
import MultiSelect from "../form/MaltiSelect";
const categories = [
  {
    id: "1",
    name: "Category 1",
    value: "1",
    sub_categories: [
      { id: "1", name: "subCategory1" },
      { id: "2", name: "subCategory2" },
      { id: "3", name: "subCategory3" },
      { id: "4", name: "subCategory4" },
    ],
  },
  {
    id: "2",
    name: "Category 2",
    value: "2",
    sub_categories: [
      { id: "1", name: "subCategory5" },
      { id: "2", name: "subCategory6" },
    ],
  },
  {
    id: "3",
    name: "Category 3",
    value: "3",
    sub_categories: [
      { id: "1", name: "subCategory9" },
      { id: "2", name: "subCategory10" },
      { id: "3", name: "subCategory11" },
    ],
  },
];

export default function FirstStep({
  setStep,
  formData,
  setFormData,
  categoryId,
  setCategoryId,
  skills,
  selectedOptions,
  setSelectedOptions,
}) {
  const [formValid, setFormValid] = useState(false);
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    if (formData.title && formData.sub_category_id && formData.description) {
      setFormValid(true);
    }
  }, [formData]);

  useEffect(() => {
    if (categoryId) {
      setSubCategories(
        categories?.find(
          (category) => Number(category.id) === Number(categoryId)
        )?.sub_categories
      );
    }
  }, [categoryId, categories]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelect = (selectedItems) => {
    setSelectedOptions(selectedItems);
    const selectedValues = selectedItems
      ? selectedItems?.map((option) => option.value)
      : [];
    console.log(selectedValues);
    setFormData({
      ...formData,
      skills: selectedValues,
    });
  };

  const handleNext = (e) => {
    e.preventDefault();

    if (formValid) {
      setStep(2);
      window.scrollTo({
        top: 0,
      });
    }
  };
  return (
    <section>
      <FormInput
        className="mb-4"
        label="Service Title"
        placeholder="Add Service title"
        type="text"
        onChange={handleChange}
        value={formData.title}
        id="title"
        name="title"
      />
      {/* category */}
      <section className="mb-4">
        <FormSelector
          disabledOption="select"
          label="Category"
          id="category"
          value={categoryId}
          onChange={(e) => {
            setSubCategories(
              categories?.find(
                (category) => Number(category.id) === Number(e.target.value)
              )?.sub_categories
            );
            setCategoryId(e.target.value);
          }}
          options={categories?.map((category) => ({
            name: category.name,
            value: category.id,
          }))}
        />
      </section>
      {/* subcategories  */}
      <section className="mb-4">
        <FormSelector
          disabledOption="Choose Your Category"
          label="Subcategory"
          id="sub_category_id"
          name="sub_category_id"
          value={formData.sub_category_id}
          onChange={handleChange}
          options={subCategories?.map((subCategory) => ({
            name: subCategory.name,
            value: subCategory.id,
          }))}
        />
      </section>
      <MultiSelect
        className="mb-4"
        label="Skilles Used"
        id="skills"
        name="skills"
        selectedOptions={selectedOptions}
        handleChange={handleSelect}
        options={skills?.map((skill) => ({
          label: skill?.name,
          value: skill?.id,
        }))}
      />
      <section>
        <label className="mb-2 text-black">Service Description</label>
        <FormTextArea
          rows={8}
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </section>
      <FormButton
        content="Next"
        onClick={handleNext}
        className="add_service_button"
        style={{ width: "10rem" }}
      />
    </section>
  );
}
