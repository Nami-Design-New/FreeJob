import { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { FaRegEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setUser } from "../redux/slices/authedUserSlice";
import useCountriesList from "../hooks/settings/useCountries";
import useGetSkills from "../hooks/settings/useGetSkills";
import FormInput from "../ui/form/FormInput";
import FormSelector from "../ui/form/FormSelector";
import FormTextArea from "../ui/form/FormTextArea";
import MultiSelect from "../ui/form/MaltiSelect";
import PasswordField from "../ui/form/PasswordField";
import PhoneField from "../ui/form/PhoneField";
import SubmitButton from "../ui/form/SubmitButton";
import axiosInstance from "../utils/axios";
import useCategoriesList from "../hooks/categories/useCategoriesList";

const EditProfile = () => {
  const { t } = useTranslation();
  const user = useSelector((state) => state.authedUser.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [skillsSelectedOptions, setSkillsSelectedOptions] = useState([]);
  const [wantChangePassword, setWantChangePassword] = useState(false);

  const { data: skills } = useGetSkills();
  const { data: categories } = useCategoriesList();
  const { data: countries } = useCountriesList();

  useEffect(() => {
    setFormData({
      image: "",
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      about: user?.about || "",
      age: user?.age || "",
      country_id: user?.country_id || "",
      is_freelance: user?.is_freelance || 0,
      skills: user?.skills?.map((skill) => skill?.id) || [],
      categories: user?.categories?.map((category) => category?.id) || [],
    });
    if (wantChangePassword) {
      setFormData((prev) => ({
        ...prev,
        password: "",
      }));
    }
  }, [user, wantChangePassword]);

  const imgView = useRef(null);

  useEffect(() => {
    if (user.image) {
      imgView.current.src = user.image;
    }
  }, [user.image]);

  const handleUpload = (e) => {
    imgView.current.src = URL.createObjectURL(e.target.files[0]);
    setFormData({ ...formData, image: e.target.files[0] });
  };

  useEffect(() => {
    if (formData.categories?.length > 0) {
      const selectedOptions = formData.categories?.map((categoryId) => {
        const option = categories?.find((opt) => opt.id === categoryId);
        return {
          value: option?.id,
          label: option?.name,
        };
      });
      setSelectedOptions(selectedOptions);
    }

    if (formData.skills?.length > 0) {
      const selectedOptions = formData.skills?.map((skillId) => {
        const option = skills?.find((opt) => opt.id === skillId);
        return {
          value: option?.id,
          label: option?.name,
        };
      });
      setSkillsSelectedOptions(selectedOptions);
    }
  }, [formData.categories, formData.skills, categories, skills]);

  const handleSelect = (selectedItems) => {
    setSelectedOptions(selectedItems);
    const selectedValues = selectedItems
      ? selectedItems?.map((option) => option.value)
      : [];
    setFormData({
      ...formData,
      categories: selectedValues,
    });
  };

  const handleSelectSkills = (selectedItems) => {
    setSkillsSelectedOptions(selectedItems);
    const selectedValues = selectedItems
      ? selectedItems?.map((option) => option.value)
      : [];
    setFormData({
      ...formData,
      skills: selectedValues,
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post("/user/update_profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.code === 200) {
        toast.success(t("profile.profileEditedSuccessfully"));
        dispatch(setUser(res.data.data));
        navigate("/profile");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Register error:", error);
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="edit-profile">
      <div className="container col-lg-8 my-5">
        <div className="profile-image-container text-center mb-4">
          <div className="profile-image-wrapper position-relative">
            <img
              ref={imgView}
              src={formData.profileImage || "/images/avatar.jpg"}
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
                left: "56%",
              }}
            >
              <FaRegEdit color="black" />
            </label>
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleUpload}
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
                onChange={(e) => handleChange(e)}
              />
            </section>
            <section className="col-lg-6 col-12 p-2">
              <FormInput
                label={t("auth.age")}
                name="age"
                type="date"
                id="age"
                required={true}
                value={formData?.age}
                onChange={(e) => handleChange(e)}
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
                disabled={user?.login_from !== "user"}
                value={formData?.email}
                onChange={(e) => handleChange(e)}
              />
            </section>
            <section className="col-lg-6 col-12 p-2">
              <FormSelector
                label={t("manageAccounts.country")}
                id="country_id"
                name="country_id"
                disabledOption={t("select")}
                value={formData?.country_id}
                onChange={(e) => handleChange(e)}
                options={countries?.map((country) => ({
                  name: country.name,
                  value: country.id,
                }))}
              />
            </section>

            <section className="col-lg-6 col-12 p-2">
              <PhoneField
                formData={formData}
                setFormData={setFormData}
                value={`+${user?.phone_code}${user?.phone}`}
                id="phone"
              />
            </section>

            <section className="col-12 p-2">
              <FormTextArea
                required
                placeholder={t("writeHere")}
                name="about"
                id="about"
                value={formData?.about}
                onChange={(e) => handleChange(e)}
                label={t("auth.about")}
                rows={6}
              />
            </section>

            <section className="col-12 p-2">
              <MultiSelect
                label={t("auth.interestes")}
                id="interest"
                name="interest"
                options={categories?.map((category) => ({
                  value: category.id,
                  label: category.name,
                }))}
                selectedOptions={selectedOptions}
                handleChange={handleSelect}
              />
            </section>

            <section className="col-12 p-2">
              <MultiSelect
                label={t("search.skills")}
                id="skills"
                name="skills"
                selectedOptions={skillsSelectedOptions}
                handleChange={handleSelectSkills}
                options={skills?.map((skill) => ({
                  label: skill?.name,
                  value: skill?.id,
                }))}
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
                      formData?.is_freelance === 0
                        ? "var(--main-color)"
                        : "#E8FAF4",
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
                      formData?.is_freelance === 1
                        ? "var(--main-color)"
                        : "#E8FAF4",
                    color: formData?.is_freelance === 1 ? "#fff" : "#6c757d",
                  }}
                  className={`btn`}
                  onClick={() => setFormData({ ...formData, is_freelance: 1 })}
                >
                  {t("auth.Seller")}
                </button>
              </div>
            </section>

            <section className="col-12 d-flex justify-content-center">
              {" "}
              <div className="question p-0 pt-2">
                <label htmlFor="wantChangePassword" className="quest">
                  <img src="/images/Vector.svg" alt="isSeller" />
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
                <p className="mt-3">{t("auth.newPasswordSubTitle")}</p>
              </section>
            )}

            <section className="col-12 p-2">
              <SubmitButton
                className="edit_pofile_button"
                loading={loading}
                name={t("auth.edit")}
              />
            </section>
          </section>
        </form>
      </div>
    </section>
  );
};

export default EditProfile;
