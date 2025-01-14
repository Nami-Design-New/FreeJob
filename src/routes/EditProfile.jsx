import React, { useState } from "react";
import { useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import FormInput from "../ui/form/FormInput";
import SelectFeild from "../ui/form/SelectField";
import FormTextArea from "../ui/form/FormTextArea";
import MultiSelect from "../ui/form/MaltiSelect";
import PasswordField from "../ui/form/PasswordField";
import { FaRegEdit } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const EditProfile = () => {
  const { t } = useTranslation();
  const user = useSelector((state) => state.authedUser.user);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    about: user?.about || "",
    age: user?.age || "",
    country_id: user?.country_id || "",
    is_freelance: user?.is_freelance || 0,
    skills: user?.skills?.map((skill) => skill?.id) || [],
    password: "",
  });

  const [wantChangePassword, setWantChangePassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSkillsChange = (selectedSkills) => {
    setFormData({ ...formData, skills: selectedSkills });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({ ...formData, profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const countryOptions = [
    { value: "us", label: "United States" },
    { value: "uk", label: "United Kingdom" },
    { value: "in", label: "India" },
    { value: "eg", label: "Egypt" },
    { value: "sa", label: "Saudi Arabia" },
  ];

  const options = [
    { value: "+1", label: "+1 (USA)" },
    { value: "+44", label: "+44 (UK)" },
    { value: "+91", label: "+91 (India)" },
  ];

  const skillOptions = [
    { value: "html", label: "HTML" },
    { value: "css", label: "CSS" },
    { value: "javascript", label: "JavaScript" },
    { value: "react", label: "React" },
  ];

  return (
    <section className="edit-profile">
      <div className="container col-lg-8 my-5">
        <div className="profile-image-container text-center mb-4">
          <div className="profile-image-wrapper position-relative">
            <img
              src={formData.profileImage || "./images/avatar.jpg"}
              alt="Profile"
              className="profile-image rounded-circle"
              style={{
                width: "150px",
                height: "150px",
                objectFit: "cover",
              }}
            />
            <label
              htmlFor="imageUpload"
              className="image-upload-label position-absolute bg-white shadow-sm"
              style={{
                height: "26px",
                width: "26px",
                bottom: "10px",
                borderRadius: "50%",
                cursor: "pointer",
              }}
            >
              <FaRegEdit color="black" />
            </label>
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <section className="row m-0">
            <section className="col-lg-6 col-12 p-2">
              <FormInput
                label={t("auth.name")}
                placeholder={t("auth.nameAsInCard")}
                name="name"
                type="text"
                id="name"
                required={true}
                value={formData?.name}
                onChange={handleChange}
              />
            </section>
            <section className="col-lg-6 col-12 p-2">
              <FormInput
                label={t("auth.age")}
                name="age"
                type="number"
                id="age"
                required={true}
                value={formData?.age}
                onChange={handleChange}
              />
            </section>
            <section className="col-12 p-2">
              <FormInput
                label={t("auth.email")}
                placeholder="example@example.com"
                type="email"
                name="email"
                id="email"
                required={true}
                value={formData.email}
                onChange={handleChange}
              />
            </section>
            <section className="col-lg-6 col-12 p-2">
              <SelectFeild
                label="Country"
                name="country_id"
                value={formData.country_id}
                onChange={handleChange}
                options={countryOptions}
                disabledOption="Select your country"
              />
            </section>

            <section className="col-lg-6 col-12 p-2">
              <div className="d-flex">
                <section className="col-auto ">
                  <SelectFeild
                    label={t("auth.phone")}
                    name="phoneCountryCode"
                    value={formData.phoneCountryCode}
                    onChange={handleChange}
                    options={options}
                    disabledOption="code"
                  />
                </section>

                <section
                  className="flex-grow-1 p-2"
                  style={{ marginTop: "15px" }}
                >
                  <FormInput
                    // label={t("auth.phone")}
                    name="phoneNumber"
                    type="text"
                    id="phoneNumber"
                    value={formData?.phoneNumber}
                    onChange={handleChange}
                    required={true}
                  />
                </section>
              </div>
            </section>

            <section className="col-12 p-2">
              <FormTextArea
                required
                placeholder={t("writeHere")}
                name="about"
                id="about"
                value={formData?.about}
                onChange={handleChange}
                label={t("auth.about")}
              />
            </section>

            <section className="col-12 p-2">
              <MultiSelect
                label={t("auth.interestes")}
                id="interest"
                name="interest"
                options={[]}
                selectedOptions={formData.skills}
                handleChange={handleSkillsChange}
              />
            </section>

            <section className="col-12 p-2">
              <MultiSelect
                label={t("search.skills")}
                id="skills"
                name="skills"
                selectedOptions={formData.skills}
                handleChange={handleSkillsChange}
                options={skillOptions}
              />
            </section>

            {/* Are you a seller input */}
            <section className="col-12 p-2">
              <label htmlFor="isFreelancer" className="d-block mb-2">
                {t("auth.areYouSeller")}
              </label>
              <div
                className="btn-group w-100"
                role="group"
                aria-label="Seller toggle"
              >
                <button
                  type="button"
                  style={{
                    backgroundColor:
                      formData?.is_freelance === 0 ? "#157347" : "#E8FAF4",
                    color: formData?.is_freelance === 0 ? "#fff" : "#6c757d",
                  }}
                  className={`btn `}
                  onClick={() => setFormData({ ...formData, is_freelance: 0 })}
                >
                  {t("auth.NotSeller")}
                </button>
                <button
                  type="button"
                  style={{
                    backgroundColor:
                      formData?.is_freelance === 1 ? "#157347" : "#E8FAF4",
                    color: formData?.is_freelance === 1 ? "#fff" : "#6c757d",
                  }}
                  className={`btn`}
                  onClick={() => setFormData({ ...formData, is_freelance: 1 })}
                >
                  {t("auth.Seller")}
                </button>
              </div>
            </section>

            <section className="col-12 p-4 d-flex justify-content-center">
              <button
                type="button"
                className={`btn btn-link text-success text-decoration-none p-0`}
                onClick={() => setWantChangePassword(!wantChangePassword)}
              >
                {wantChangePassword
                  ? `${t("auth.newPasswordSuccess")}`
                  : `${t("auth.doYouWantChangePassword")}`}
              </button>
            </section>

            {wantChangePassword && (
              <section className="col-12 p-2">
                <PasswordField
                  label={t("auth.newPasswordTitle")}
                  name="password"
                  id="password"
                  minLength={6}
                  value={formData?.password}
                  onChange={handleChange}
                  style={{ backgroundColor: "#E8FAF4" }}
                />
                <p>{t("auth.newPasswordSubTitle")}</p>
              </section>
            )}

            <section className="col-12 p-2">
              <button type="submit" className="btn btn-success col-12">
                Save Changes
              </button>
            </section>
          </section>
        </form>
      </div>
    </section>
  );
};

export default EditProfile;
