import { DevTool } from "@hookform/devtools";
import { useTranslation } from "react-i18next";
import "react-international-phone/style.css";
import { useDispatch, useSelector } from "react-redux";
import { setStep } from "../../redux/slices/authModalSlice";
import FormButton from "../form/FormButton";
import BackButton from "./BackButton";
import { useFormContext } from "react-hook-form";
import RegisterStepOne from "./RegisterStepOne";
import RegisterStepTwo from "./RegisterStepTwo";
import axiosInstance from "../../utils/axios";
import { toast } from "react-toastify";
import { useState } from "react";
export default function RegistrationForm({ setOtpData, setRegister }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const currentStep = useSelector((state) => state.authModal.currentStep);
  const {
    handleSubmit,
    control,
    trigger,
    formState: { errors },
  } = useFormContext();
  const stepOneFields = [
    "name",
    "email",
    "password",
    "age",
    "country_id",
    "phone",
    "phone_code",
    "image",
  ];
  const stepTwoFields = ["job_title", "is_freelance", "categories", "skills"];
  console.log(errors);

  const next = async () => {
    const fieldsToValidate = currentStep === 5 ? stepOneFields : stepTwoFields;
    const valid = await trigger(fieldsToValidate);
    if (valid) dispatch(setStep(6));
  };

  const onSubmit = async (data) => {
    console.log("Form submitted:", data);
    setIsLoading(true);
    try {
      const formData = new FormData();

      for (const key in data) {
        if (Array.isArray(data[key])) {
          data[key].forEach((item) => formData.append(`${key}[]`, item));
        } else {
          formData.append(key, data[key]);
        }
      }
      console.log(formData);

      const res = await axiosInstance.post("/user/can_register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.code === 200) {
        toast.success(t("auth.otpSubTitle"));

        dispatch(setStep(4));
        setRegister(true);
        setOtpData((prev) => ({
          ...prev,
          hashed_code: res.data.data,
        }));
      } else {
        toast.error(res.data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Register error:", error);
      toast.error(error?.response?.data?.message || "Something went wrong");
      throw new Error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="left_side">
      {currentStep === 5 && <BackButton step={2} />}
      {currentStep === 6 && <BackButton step={5} />}
      {currentStep === 5 && (
        <header className="modal_header pb-3">
          <h1 className="text-center">{t("auth.registerPageSubTitle")}</h1>
        </header>
      )}
      {currentStep === 6 && (
        <header className="modal_header pb-3 ">
          <h1 className="text-center">{t("auth.completeRegister")}</h1>
        </header>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="user_data row g-2">
        {currentStep === 5 && <RegisterStepOne />}
        {currentStep === 6 && <RegisterStepTwo />}
        {currentStep === 5 && (
          <FormButton content={t("next")} type="button" onClick={next} />
        )}
        {currentStep === 6 && (
          <FormButton
            content={t("complaints.submit")}
            loading={isLoading}
            type="submit"
          />
        )}
        <DevTool control={control} />
      </form>
    </div>
  );
}
