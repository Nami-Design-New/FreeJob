import { useState } from "react";
import { useTranslation } from "react-i18next";
import { PhoneInput } from "react-international-phone";
import axiosInstance from "../../utils/axios";
import SubmitButton from "../form/SubmitButton";

const VerifyStep1 = ({ setStep, formData, setFormData }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  function handlePhoneChange(value, { country }) {
    let code = country.dialCode;
    setFormData({
      ...formData,
      phone: value.slice(code.length),
      phone_code: code,
    });
    console.log(formData);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post("/user/sendOtpCode", formData);
      if (res.data.code === 200) {
        setStep(3);
        setFormData({
          ...formData,
          hashed_code: res.data.data,
        });
      }
    } catch (error) {
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="form"
      style={{ alignItems: "start" }}
      onSubmit={handleSubmit}
    >
      {/* <FormInput
        formData={formData}
        setFormData={setFormData}
        value={formData?.phone}
        id="phone"
        // icon={<IconDeviceMobile stroke={2} />}
      /> */}
      <div className="w-100">
        <label className="phone_label">{t("auth.phone")} </label>
        <PhoneInput
          defaultCountry="sa"
          onChange={(value, country) => handlePhoneChange(value, country)}
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
      </div>

      <div className="d-flex justify-content-between mt-4 w-100">
        <button
          className="back_btn phoneSubmitButton"
          onClick={(e) => {
            e.preventDefault();
            setStep(1);
          }}
        >
          {t("back")}
        </button>
        <SubmitButton
          className=" w-25 phoneSubmitButton"
          name={t("next")}
          loading={loading}
        />
      </div>
    </form>
  );
};

export default VerifyStep1;
