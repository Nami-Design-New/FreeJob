import { useState } from "react";
import { useTranslation } from "react-i18next";
import { PhoneInput } from "react-international-phone";

const PhoneField = ({ formData, setFormData, id, value, icon }) => {
  const [phoneNumber, setPhoneNumber] = useState();
  const { t } = useTranslation();

  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value);
    setFormData({ ...formData, [id]: value });
  };

  return (
    <div className="input-field">
      <label htmlFor="phone">
        {icon} {t("auth.phone")}
      </label>
      <div className="phone-group">
        <PhoneInput
          placeholder="0XXXXXXXXXX"
          value={value || phoneNumber}
          onChange={handlePhoneNumberChange}
          countryOptionsOrder={["SA", "AE"]}
          defaultCountry="SA"
          id={id}
          name="phone"
          style={{ width: "100%", marginTop: "0.5rem" }}
          inputStyle={{
            border: "none",
            width: "100%",
            marginLeft: "0.75rem",
            borderRadius: "0.5rem",
            backgroundColor: "#E8FAF4",
          }}
        />
      </div>
    </div>
  );
};

export default PhoneField;
