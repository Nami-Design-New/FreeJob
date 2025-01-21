import React, { useState } from "react";
import FormInput from "../form/FormInput";
import { useDispatch } from "react-redux";
import { setStep } from "../../redux/slices/authModalSlice";
import FormButton from "../form/FormButton";
import { PhoneInput } from "react-international-phone";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axios";

export default function UserNameEntry({ setOtpData }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
  });
  function handlePhoneChange(value) {
    setFormData({
      ...formData,
      phone: value,
    });
  }
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  async function handleSubmit(e) {
    setIsLoading(true);
    e.preventDefault();
    try {
      const res = await axiosInstance.post(
        "/user/can_register",
        {
          ...formData,
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
          hashed_code: res.data.data,
        }));

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
      <header className="modal_header ">
        <h1>Enter your data to register</h1>
        <p className="">
          Add a unique Email that will make you stand out to others. You
          can&apos;t change your username, so choose wisely.
        </p>
      </header>
      <form onSubmit={handleSubmit}>
        {" "}
        <label className="fw-normal">Phone Number</label>
        <PhoneInput
          required
          defaultCountry="sa"
          onChange={(value) => handlePhoneChange(value)}
          style={{ width: "100%", marginTop: "0.5rem" }}
          inputStyle={{
            border: "none",
            width: "100%",
            marginLeft: "0.75rem",
            borderRadius: "0.5rem",
            backgroundColor: "#E8FAF4",
          }}
        />
        <FormInput
          label={t("auth.email")}
          placeholder="example@example.com"
          type="email"
          name="email"
          id="email"
          required
          formData={formData}
          onChange={(e) => handleChange(e)}
        />
        <button
          onClick={() => dispatch(setStep(2))}
          className="forget_pass btn"
        >
          Are you already registered?
        </button>{" "}
        <FormButton content="Next" type="submit" disabled={isLoading} />
      </form>
    </div>
  );
}
