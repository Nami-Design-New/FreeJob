import { useState } from "react";
import { useTranslation } from "react-i18next";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { useDispatch } from "react-redux";
import useCountriesList from "../../hooks/useCountries";
import { setStep } from "../../redux/slices/authModalSlice";
import FormButton from "../form/FormButton";
import FormInput from "../form/FormInput";
import FormSelector from "../form/FormSelector";
import BackButton from "./BackButton";
import ImageUpload from "./ImageUpload";
export default function RegistrationForm({ formData, setFormData }) {
  const { t } = useTranslation();
  const { isLoading: isCountriesLoading, data: countries } = useCountriesList();
  const [countryId, setCountryId] = useState("");

  function handlePhoneChange(value, { country }) {
    let code = country.dialCode;
    setFormData({ ...formData, phone: value.slice(code.length), code });
  }
  const handleCountrytSelect = (e) => {
    setCountryId(e.target.value);
    setFormData({
      ...formData,
      country_id: e.target.value,
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();
    dispatch(setStep(6));
    console.log(formData);
  }

  return (
    <div className="left_side">
      <BackButton />
      <header className="modal_header pb-3 ">
        <h1 className="text-center">Complete your information</h1>
      </header>
      <form onSubmit={handleSubmit} className="user_data row g-2 ">
        <div className="col-12 ">
          <ImageUpload
            type="file"
            name="userImage"
            id="img-upload"
            accept="image/*"
            formData={formData}
            setFormData={setFormData}
          />
        </div>
        <div className="col-12">
          <FormInput
            label={t("auth.name")}
            placeholder={t("auth.nameAsInCard")}
            name="name"
            type="text"
            id="name"
            required={true}
            value={formData.name}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="col-12">
          <FormInput
            label={t("auth.email")}
            placeholder="example@example.com"
            type="email"
            name="email"
            id="email"
            required={true}
            formData={formData.email}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="col-12">
          <FormInput
            label={t("auth.password")}
            name={"password"}
            id={"password"}
            type="password"
            minLength={6}
            value={formData.password}
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className="col-6">
          <FormInput
            label={t("auth.age")}
            name={"age"}
            id={"age"}
            value={formData.age}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="col-6">
          <FormSelector
            label="Country"
            value={countryId}
            disabledOption={t("select")}
            options={countries?.map((country) => ({
              name: country.name,
              value: country.id,
            }))}
            onChange={handleCountrytSelect}
          />
        </div>
        <div className=" col-12 mt-3">
          <label className="fw-normal">Phone Number</label>
          <PhoneInput
            defaultCountry="sa"
            onChange={(value, country) => handlePhoneChange(value, country)}
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
        <FormButton content="Next" type="submit" />
      </form>
    </div>
  );
}
