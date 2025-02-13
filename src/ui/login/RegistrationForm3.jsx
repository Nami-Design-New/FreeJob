import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { setStep } from "../../redux/slices/authModalSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import useGetSkills from "./../../hooks/settings/useGetSkills";
import useCategoriesList from "../../hooks/categories/useCategoriesList";
import FormButton from "../form/FormButton";
import MultiSelect from "../servicesComponents/MultiSelect";
import BackButton from "./BackButton";
import TabSelector from "./TapSelector";
import axiosInstance from "../../utils/axios";
import FormInput from "../form/FormInput";
import "react-international-phone/style.css";

export default function RegistrationForm3({
  formData,
  setFormData,
  setOtpData,
  setRegister,
}) {
  const [selected, setSelected] = useState("Seller");
  const { t } = useTranslation();
  const { categories } = useCategoriesList();
  const { data: skills } = useGetSkills();
  const [isLoading, setIsLoading] = useState("");
  const [options, setOptions] = useState([]);
  const [skillsSelectedOptisons, setSkillsSelectedOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (categories) {
      const options = categories?.map((category) => ({
        value: category.id,
        label: category.name,
      }));
      setOptions(options);
    }
  }, [categories]);

  useEffect(() => {
    if (options.length > 0 && formData.categories?.length > 0) {
      const selectedOptions = formData.categories.map((categoryId) => {
        const option = options.find((opt) => opt.value === categoryId);
        return {
          value: option?.value,
          label: option?.label,
        };
      });
      setSelectedOptions(selectedOptions);
    }
  }, [formData.categories, options]);

  const handleChangeInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectSkills = (selectedItems) => {
    setSkillsSelectedOptions(selectedItems);
    const selectedValues = selectedItems
      ? selectedItems?.map((option) => option.value)
      : [];
    setFormData({
      ...formData,
      skills: selectedValues,
    });
  };

  const handleSelect = (selectedItems) => {
    setSelectedOptions(selectedItems);
    const selectedValues = selectedItems
      ? selectedItems.map((option) => option.value)
      : [];
    setFormData({
      ...formData,
      categories: selectedValues,
    });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axiosInstance.post(
        "/user/can_register",
        {
          ...formData,
          is_freelance: selected === "Seller" ? 1 : 0,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.data.code === 200) {
        toast.success(t("auth.otpSubTitle"));

        dispatch(setStep(4));
        setRegister(true);
        setOtpData((prev) => ({
          ...prev,
          hashed_code: res.data.data,
        }));
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Register error:", error);
      throw new Error(error.message);
    } finally {
      setIsLoading(false);
      console.log(formData);
    }
  };

  return (
    <div className="left_side">
      <BackButton />
      <header className="modal_header pb-3 ">
        <h1 className="text-center">{t("auth.completeRegister")}</h1>
      </header>
      <form onSubmit={handleSubmit} className="user_data row row-gap-2 ">
        <div className="col-12 p-0">
          <FormInput
            label={t("auth.jobTitle")}
            name="job_title"
            type="text"
            id="job_title"
            required={true}
            value={formData.job_title}
            onChange={(e) => handleChangeInput(e)}
          />
        </div>
        <div className="col-12 p-0">
          <MultiSelect
            label={t("auth.interestes")}
            id="interest"
            name="interest"
            options={options}
            selectedOptions={selectedOptions}
            handleChange={handleSelect}
          />
        </div>
        <div className="col-12 p-0">
          <MultiSelect
            label={t("search.skills")}
            id="skills"
            name="skills"
            selectedOptions={skillsSelectedOptisons}
            handleChange={handleSelectSkills}
            options={skills?.map((skill) => ({
              label: skill?.name,
              value: skill?.id,
            }))}
          />
        </div>
        <div className="p-0 col-12">
          <label className="mb-2" htmlFor="">
            {t("auth.areYouSeller")}
          </label>
          <TabSelector
            selected={selected}
            title1={t("auth.Seller")}
            title2={t("auth.NotSeller")}
            onSelect={setSelected}
          />
        </div>

        <FormButton content={t("complaints.submit")} loading={isLoading} type="submit" />
      </form>
    </div>
  );
}
