import FormInput from "../form/FormInput";
import SubmitButton from "../form/SubmitButton";
import { setStep } from "../../redux/slices/authModalSlice";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import axiosInstance from "../../utils/axios";
import { useNavigate } from "react-router";

export default function ForgetPassword({ userId }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: userId,
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post("/user/update_password", formData);
      if (res.data.code === 200) {
        toast.success(t("auth.newPasswordSuccess"));
        dispatch(setStep(2));
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Forget password error:", error);
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="left_side">
      <header className="modal_header ">
        <h1>{t("auth.newPasswordTitle")}</h1>
        <p className="title">{t("auth.newPasswordSubTitle")}</p>
      </header>
      <form onSubmit={handleSubmit}>
        {/* {" "}
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
           /> */}
        <FormInput
          label={t("auth.password")}
          placeholder="Enter Yout Password"
          type="password"
          name="password"
          id="password"
          required
          formData={formData}
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        />
        <SubmitButton
          name={t("auth.confirm")}
          type="submit"
          loading={loading}
          className={"order-now mt-3"}
        />
      </form>
    </div>
  );
}
