import { useEffect, useState } from "react";
import FormInput from "../form/FormInput";
import FormSelector from "../form/FormSelector";
import FormTextArea from "../form/FormTextArea";
import MultiSelect from "../form/MaltiSelect";
import useCategorieListWithSub from "../../hooks/categories/useCategorieListWithSub";
import { useTranslation } from "react-i18next";
//
import FormButton from "../form/FormButton";

const WizardStep1 = ({
  formData,
  setFormData,
  setStep,
  categoryId,
  setCategoryId,
  skills,
  selectedOptions,
  setSelectedOptions
}) => {
  const [formValid, setFormValid] = useState(false);
  const { t } = useTranslation();
  const [subCategories, setSubCategories] = useState([]);
  const { data: categories } = useCategorieListWithSub();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    if (formData.title && formData.sub_category_id && formData.description) {
      setFormValid(true);
    }
  }, [formData]);

  const handleNext = (e) => {
    e.preventDefault();
    if (formValid) {
      setStep(2);
    }
  };

  const handleSelect = (selectedItems) => {
    setSelectedOptions(selectedItems);
    const selectedValues = selectedItems
      ? selectedItems?.map((option) => option.value)
      : [];
    setFormData({
      ...formData,
      skills: selectedValues
    });
  };

  useEffect(() => {
    if (categoryId) {
      setSubCategories(
        categories?.find(
          (category) => Number(category.id) === Number(categoryId)
        )?.sub_categories
      );
    }
  }, [categoryId, categories]);

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
};

export default WizardStep1;
