import { useState } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { setStep } from "../../redux/slices/authModalSlice";
import FormButton from "../form/FormButton";
import FormInput from "../form/FormInput";
import BackButton from "./BackButton";
import { useDispatch } from "react-redux";
import ImageUpload from "./ImageUpload";
import useCountriesList from "../../hooks/useCountries";
import FormSelector from "../form/FormSelector";
import { useTranslation } from "react-i18next";
export default function RegistrationForm({ formData, setFormData }) {
  const { t } = useTranslation();
  const { isLoading: isCountriesLoading, data: countries } = useCountriesList();
  const [countryId, setCountryId] = useState("");
  const [phoneData, setPhoneData] = useState({
    phone_code: "",
    phone: "",
  });
  function handleChange(value, { country }) {
    setPhoneData({
      phone_code: country.dialCode,
      phone: value.slice(country.dialCode.length),
    });
  }
  const handleCountrytSelect = (e) => {
    setCountryId(e.target.value);
    setFormData({
      ...formData,
      country_id: e.target.value,
    });
  };

  const handleChangeInput = (e) => {
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
      <form onSubmit={handleSubmit} className="user_data row row-gap-2 ">
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
            onChange={(e) => handleChangeInput(e)}
          />
        </div>

        <div className="col-6">
          <FormInput
            label={t("auth.email")}
            placeholder="example@example.com"
            type="email"
            name="email"
            id="email"
            required={true}
            formData={formData.email}
            onChange={(e) => handleChangeInput(e)}
          />
        </div>
        <div className="col-6">
          <FormInput
            label={t("auth.password")}
            name={"password"}
            id={"password"}
            minLength={6}
            value={formData.password}
            onChange={(e) => handleChangeInput(e)}
          />
        </div>

        <div className="col-6">
          <FormInput
            label={t("auth.age")}
            name={"age"}
            id={"age"}
            value={formData.age}
            onChange={(e) => handleChangeInput(e)}
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
            defaultCountry="ua"
            onChange={(value, country) => handleChange(value, country)}
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
