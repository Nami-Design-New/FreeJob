import { closeModal, setStep } from "../../redux/slices/authModalSlice";
import { setIsLogged, setUser } from "../../redux/slices/authedUserSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import FormInput from "../form/FormInput";
import FormButton from "../form/FormButton";
import axiosInstance from "../../utils/axios";
import BackButton from "./BackButton";

export default function EmailLogin() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [, setCookie] = useCookies(["token", "id"]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post("/user/login", formData);
      if (res.data.code === 200) {
        toast.success(t("auth.loginSuccess"));
        dispatch(setUser(res.data.data));
        dispatch(setIsLogged(true));

        setCookie("token", res.data.data.token, {
          path: "/",
          secure: true,
          sameSite: "Strict",
        });

        setCookie("id", res.data.data.id, {
          path: "/",
          secure: true,
          sameSite: "Strict",
        });

        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `${res.data.data.token}`;
        dispatch(closeModal());
      } else {
        toast.error(t("auth.emailOrPasswordWrong"));
      }
    } catch (error) {
      toast.error(t("auth.loginErorr"));
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="left_side">
      {" "}
      <BackButton  />
      <header className="modal_header ">
        <h1>Enter your data to register</h1>
        <p className="d-flex gap-1 align-items-center fs-6 flex-wrap">
          Don&apos;t have an account?
          <button
            onClick={() => dispatch(setStep(5))}
            className="btn p-0 text-success"
          >
            Create account now
          </button>
        </p>
      </header>
      <form onSubmit={handleSubmit} className="d-flex flex-column gap-2">
        <FormInput
          name="email"
          label="Email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
        />

        <FormInput
          name="password"
          label="Password"
          type="password"
          required
          value={formData.password}
          onChange={handleChange}
        />
        <button
          onClick={() => dispatch(setStep(3))}
          type="button"
          className="forget_pass btn"
        >
          Forget Your Password
        </button>

        <FormButton content="Login" type="submit" loading={loading} />
      </form>
    </div>
  );
}
