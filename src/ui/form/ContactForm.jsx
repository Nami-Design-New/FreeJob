import { useState } from "react";
import { useTranslation } from "react-i18next";
import { PhoneInput } from "react-international-phone";
import FormInput from "./FormInput";
import SubmitButton from "./SubmitButton";

const ContactForm = () => {
  const { t } = useTranslation();
  const [phone, setPhone] = useState();
  function handlePhoneChange(value) {
    setPhone(value);
  }
  return (
    <form className="">
      <div className="row mb-3">
        <FormInput
          label={t("auth.name")}
          style={{ backgroundColor: "#E8FAF4" }}
          type="text"
          className="form-control border-0"
        />

        <FormInput
          label={t("auth.email")}
          style={{ backgroundColor: "#E8FAF4" }}
          type="email"
          className="form-control border-0"
        />
      </div>
      <div className="mb-3">
        <PhoneInput
          required
          defaultCountry="sa"
          onChange={(value) => handlePhoneChange(value)}
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
      <div className="mb-3">
        <label className="form-label">{t("yourmessage")}</label>
        <textarea
          style={{ backgroundColor: "#E8FAF4" }}
          className="form-control border-0"
          rows="4"
        ></textarea>
      </div>
      <SubmitButton type="submit" name={t("auth.send")} className="order-now" />
    </form>
  );
};

export default ContactForm;
