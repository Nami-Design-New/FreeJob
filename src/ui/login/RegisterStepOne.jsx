import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { PhoneInput } from "react-international-phone";
import FormSelector from "../form/FormSelector";
import FormInput from "../form/FormInput";
import useCountriesList from "../../hooks/settings/useCountries";
import ImageUpload from "./ImageUpload";
import { useTranslation } from "react-i18next";

export default function RegisterStepOne() {
  const { data: countries } = useCountriesList();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const handlePhoneChange = (value, { country }) => {
    const code = country.dialCode;
    const phone = value.slice(code.length + 1);
    setValue("phone", phone);
    setValue("phone_code", code);
  };

  const currentPhone = `${watch("phone_code") || ""}${watch("phone") || ""}`;
  return (
    <>
      <div className="col-12">
        <Controller
          name="image"
          control={control}
          render={({ field, fieldState }) => (
            <>
              <ImageUpload
                name={field.name}
                image={field.value}
                onChange={(e) => field.onChange(e.target.files[0])}
                error={fieldState.error?.message}
              />
            </>
          )}
        />
      </div>

      <div className="col-12">
        <FormInput
          label={t("auth.name")}
          name="name"
          placeholder={t("auth.nameAsInCard")}
          {...register("name")}
          error={errors.name?.message}
        />
      </div>

      <div className="col-12">
        <FormInput
          label={t("auth.email")}
          placeholder="example@example.com"
          type="email"
          {...register("email")}
          error={errors.email?.message}
        />
      </div>

      <div className="col-12">
        <FormInput
          label={t("auth.password")}
          type="password"
          {...register("password")}
          error={errors.password?.message}
        />
      </div>

      <div className="col-6">
        <FormInput
          label={t("auth.dateOfBirth")}
          type="date"
          {...register("age")}
          error={errors.age?.message}
        />
      </div>

      <div className="col-6">
        <FormSelector
          label={t("profile.country")}
          disabledOption={t("select")}
          {...register("country_id")}
          options={countries?.map((country) => ({
            name: country.name,
            value: country.id,
          }))}
          error={errors.country_id?.message}
        />
      </div>

      <div className="col-12 mt-3">
        <label className="fw-normal">{t("auth.phone")}</label>
        <Controller
          name="phone"
          control={control}
          render={() => (
            <>
              <PhoneInput
                defaultCountry="sa"
                value={currentPhone}
                onChange={handlePhoneChange}
                style={{ width: "100%", marginTop: "0.5rem" }}
                inputStyle={{
                  border: "none",
                  width: "100%",
                  marginLeft: "0.75rem",
                  marginRight: "0.75rem",
                  borderRadius: "0.5rem",
                  backgroundColor: "#E8FAF4",
                }}
                className="react-international-phone-list"
              />
              {errors.phone && (
                <p className="text-danger">{errors.phone.message}</p>
              )}
            </>
          )}
        />
      </div>
    </>
  );
}
