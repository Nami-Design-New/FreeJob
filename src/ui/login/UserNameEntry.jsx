import React, { useState } from "react";
import FormInput from "../form/FormInput";
import { useDispatch } from "react-redux";
import { setStep } from "../../redux/slices/authModalSlice";
import FormButton from "../form/FormButton";
import { PhoneInput } from "react-international-phone";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axios";
import BackButton from "./BackButton";

export default function UserNameEntry({
  forgetPassformData,
  setForgetPassformData,
  setOtpData,
  setUserId,
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForgetPassformData({
      ...forgetPassformData,
      [e.target.name]: e.target.value,
    });
  };
  async function handleSubmit(e) {
    setIsLoading(true);
    e.preventDefault();
    try {
      const res = await axiosInstance.post(
        "/user/check_email",
        {
          ...forgetPassformData,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.data.code === 200) {
        setOtpData((prev) => ({
          ...prev,
          hashed_code: res.data.data.code,
        }));
        setUserId(res.data.data.user.id);
        dispatch(setStep(4));
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      throw new Error(error.message);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="left_side">
      <BackButton />
      <header className="modal_header ">
        <h1>{t("auth.forgetPasswordTitle")}</h1>
        <p className="">{t("auth.forgetPasswordSubTitle")}</p>
      </header>
      <form onSubmit={handleSubmit}>
        <FormInput
          label={t("auth.email")}
          placeholder="example@example.com"
          type="email"
          name="email"
          id="email"
          required
          value={forgetPassformData.email}
          onChange={(e) => handleChange(e)}
        />
        <button
          onClick={() => dispatch(setStep(2))}
          className="forget_pass btn"
        >
          {t("auth.alreadyRegistered")}
        </button>{" "}
        <FormButton content={t("next")} type="submit" disabled={isLoading} />
      </form>
    </div>
  );
}
