import FormInput from "../form/FormInput";
import SubmitButton from "../form/SubmitButton";
import { setStep } from "../../redux/slices/authModalSlice";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import axiosInstance from "../../utils/axios";
import BackButton from "./BackButton";

export default function ForgetPassword({ userId }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
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
      <BackButton step={4} />
      <header className="modal_header ">
        <h1>{t("auth.newPasswordTitle")}</h1>
        <p className="title">{t("auth.newPasswordSubTitle")}</p>
      </header>
      <form onSubmit={handleSubmit}>
        <FormInput
          label={t("auth.password")}
          placeholder={t("auth.passwordPlaceholder")}
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
