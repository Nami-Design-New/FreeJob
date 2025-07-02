import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

import FormInput from "./FormInput";
import SubmitButton from "./SubmitButton";
import axiosInstance from "../../utils/axios";
import { toast } from "react-toastify";

const ContactForm = () => {
  const { t } = useTranslation();
  const [submitting, setSubmitting] = useState(false);

  // Yup validation schema
  const schema = yup.object().shape({
    name: yup.string().required(t("validation.name_required")),
    email: yup
      .string()
      .email(t("validation.invalid_email"))
      .required(t("validation.email_required")),
    phone: yup.string().required(t("validation.phone_required")),
    message: yup.string().required(t("validation.message_required")),
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);

      const response = await axiosInstance.post("/contact_us", data);

      if (response.status === 200 || response.status === 201) {
        toast.success(t("validation.contact_success"));
        reset();
      }
    } catch (error) {
      console.error("Submit error:", error);
      toast.error(t("validation.contact_error"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row mb-3">
        <FormInput
          label={t("auth.name")}
          style={{ backgroundColor: "#E8FAF4" }}
          type="text"
          {...register("name")}
          error={errors.name?.message}
        />

        <FormInput
          label={t("auth.email")}
          style={{ backgroundColor: "#E8FAF4" }}
          {...register("email")}
          error={errors.email?.message}
        />
      </div>

      <div className="mb-3">
        <Controller
          name="phone"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <PhoneInput
              {...field}
              defaultCountry="sa"
              style={{ width: "100%", marginTop: "0.5rem" }}
              inputStyle={{
                border: "none",
                width: "100%",
                marginLeft: "0.75rem",
                marginRight: "0.75rem",
                borderRadius: "0.5rem",
                backgroundColor: "#E8FAF4",
              }}
            />
          )}
        />
        {errors.phone && (
          <small className="text-danger">{errors.phone.message}</small>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label">{t("yourmessage")}</label>
        <textarea
          {...register("message")}
          style={{ backgroundColor: "#E8FAF4" }}
          className={`form-control border-0 ${
            errors.message ? "is-invalid" : ""
          }`}
          rows="4"
        ></textarea>
        {errors.message && (
          <small className="text-danger">{errors.message.message}</small>
        )}
      </div>

      <SubmitButton
        type="submit"
        loading={submitting}
        name={t("auth.send")}
        className="order-now"
      />
    </form>
  );
};

export default ContactForm;
