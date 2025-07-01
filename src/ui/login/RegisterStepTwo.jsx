import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import useCategoriesList from "../../hooks/categories/useCategoriesList";
import useGetSkills from "../../hooks/settings/useGetSkills";
import FormInput from "../form/FormInput";
import MultiSelect from "../servicesComponents/MultiSelect";
import TabSelector from "./TapSelector";

export default function RegisterStepTwo() {
  const { t } = useTranslation();
  const {
    register,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const { categories } = useCategoriesList();
  const { data: skills } = useGetSkills();

  const categoryOptions =
    categories?.map((cat) => ({
      label: cat.name,
      value: cat.id,
    })) || [];

  const skillsOptions =
    skills?.map((skill) => ({
      label: skill.name,
      value: skill.id,
    })) || [];

  const selected = watch("is_freelance")
    ? t("auth.Seller")
    : t("auth.NotSeller");

  const handleTabSelect = (value) => {
    setValue("is_freelance", value === t("auth.Seller"));
  };

  return (
    <>
      <div className="col-12 p-0">
        <FormInput
          label={t("auth.jobTitle")}
          placeholder={t("auth.jobTitle")}
          type="text"
          id="job_title"
          {...register("job_title")}
          error={errors.job_title?.message}
        />
      </div>

      <div className="col-12 p-0">
        <Controller
          name="categories"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <MultiSelect
              label={t("auth.interestes")}
              id="categories"
              options={categoryOptions}
              selectedOptions={field.value || []}
              handleChange={field.onChange}
              error={error?.message}
            />
          )}
        />
        {errors.categories && (
          <small className="text-danger">{errors.categories.message}</small>
        )}
      </div>

      <div className="col-12 p-0">
        <Controller
          name="skills"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <MultiSelect
              label={t("search.skills")}
              id="skills"
              options={skillsOptions}
              selectedOptions={field.value || []}
              handleChange={field.onChange}
              error={error?.message}
            />
          )}
        />
        {errors.skills && (
          <small className="text-danger">{errors.skills.message}</small>
        )}
      </div>

      <div className="p-0 col-12">
        <label className="mb-2" htmlFor="is_freelance">
          {t("auth.areYouSeller")}
        </label>
        <TabSelector
          selected={selected}
          title1={t("auth.Seller")}
          title2={t("auth.NotSeller")}
          onSelect={handleTabSelect}
        />
        {errors.is_freelance && (
          <small className="text-danger">{errors.is_freelance.message}</small>
        )}
      </div>
    </>
  );
}
