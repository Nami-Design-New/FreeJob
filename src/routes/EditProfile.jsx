import React, { useState } from "react";
import { useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import FormInput from "../ui/form/FormInput";
import FormSelector from "../ui/form/FormSelector";
import FormTextArea from "../ui/form/FormTextArea";
import MultiSelect from "../ui/form/MaltiSelect";
import { FaRegEdit } from "react-icons/fa";
import { useTranslation } from "react-i18next";
// import Vector from "../../public/images/Vector.svg";

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
      <div className="container my-5">
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
              className="image-upload-label position-absolute bg-white shadow-lg"
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
              <FormSelector
                label={t("manageAccounts.country")}
                name="country_id"
                value={formData?.country_id}
                onChange={handleChange}
                options={[]}
              />
            </section>

            <section className="col-lg-6 col-12 p-2">
              <div className="d-flex">
                <section className="col-auto " style={{ marginTop: "35px" }}>
                  <FormSelector
                    name="phoneCountryCode"
                    value={formData?.phoneCountryCode}
                    onChange={handleChange}
                    options={options}
                  />
                </section>

                <section className="flex-grow-1 ">
                  <FormInput
                    label={t("auth.phone")}
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
              <label className="form-label">{t("auth.areYouSeller")}</label>
              <div className="question p-0">
              <Form.Switch
                id="isFreelancer"
                name="isFreelancer"
                checked={formData?.is_freelance === 1 ? true : false}
                onChange={() =>
                  setFormData({
                    ...formData,
                    is_freelance: formData?.is_freelance === 1 ? 0 : 1
                  })
                }
              />
            </div>
            <div className="question p-0 pt-2">
              <label htmlFor="wantChangePassword" className="quest">
                {t("auth.doYouWantChangePassword")}
              </label>
              <Form.Switch
                id="wantChangePassword"
                name="wantChangePassword"
                checked={wantChangePassword}
                onChange={() => setWantChangePassword(!wantChangePassword)}
              />
            </div>
            </section>

            <section className="p-2 d-flex justify-content-center">
              <button type="submit" className="btn btn-success col-6 ">
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
