import FormInput from "../form/FormInput";
import FormButton from "../form/FormButton";
import { useDispatch } from "react-redux";
import { closeModal, setStep } from "../../redux/slices/authModalSlice";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import axiosInstance from "../../utils/axios";
import { toast } from "react-toastify";
import { setIsLogged, setUser } from "../../redux/slices/authedUserSlice";
import { Modal } from "react-bootstrap";

export default function EmailLogin() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      } else {
        toast.error(t("auth.emailOrPasswordWrong"));
      }
    } catch (error) {
      toast.error(t("auth.loginErorr"));
      throw new Error(error.message);
    } finally {
      setLoading(false);
      dispatch(closeModal());
    }
  };
  return (
    <div className="left_side">
      <header className="modal_header ">
        <h1>Enter your data to register</h1>
        <p className="d-flex gap-1 align-items-center fs-6">
          Don&apos;t have an account?
          <button
            onClick={() => dispatch(setStep(3))}
            className="btn p-0 text-success"
          >
            Create account now
          </button>
        </p>
      </header>
      <form onSubmit={handleSubmit} className="">
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
        <button type="button" className="forget_pass btn">
          Forget Your Password
        </button>
        <FormButton content="Login" type="submit" />
      </form>
    </div>
  );
}
