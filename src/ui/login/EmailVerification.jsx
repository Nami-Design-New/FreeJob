import { useState } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setStep } from "../../redux/slices/authModalSlice";
import { useCookies } from "react-cookie";
import { FaChevronLeft } from "react-icons/fa";
import { setIsLogged, setUser } from "../../redux/slices/authedUserSlice";
import FormButton from "../form/FormButton";
import OTPInput from "react-otp-input";
import axiosInstance from "../../utils/axios";

export default function EmailVerification({
  otpData,
  setOtpData,
  register,
  formData,
  setRegister,
  forgetPassformData,
}) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { previousStep } = useSelector((state) => state.authModal);
  const [isLoading, setIsLoading] = useState(false);
  const [, setCookie] = useCookies(["token"]);

  const handleChange = (otp) => {
    setOtpData((prevState) => ({
      ...prevState,
      code: otp,
    }));
  };

  const headers = {
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
  };

  const checkCodeRequest = {
    method: "POST",
    headers: headers,
    data: {
      ...otpData,
    },
    url: "/user/check_code",
  };

  const registerRequest = {
    method: "POST",
    headers: headers,
    data: {
      ...formData,
      is_freelance: formData.is_freelance === "Seller" ? 1 : 0,
    },
    url: "/user/register",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axiosInstance.request(checkCodeRequest);
      if (res.data.code === 200) {
        if (register) {
          const response = await axiosInstance.request(registerRequest);
          if (response.data.code === 200) {
            toast.success(t("auth.registerSuccess"));
            const login = await axiosInstance.post("/user/login", {
              email: formData.email,
              password: formData.password,
            });
            if (login.data.code === 200) {
              toast.success(t("auth.loginSuccess"));
              dispatch(setUser(login.data.data));
              dispatch(setIsLogged(true));
              setCookie("token", login.data.data.token, {
                path: "/",
                secure: true,
                sameSite: "Strict",
              });
              setCookie("id", login.data.data.id, {
                path: "/",
                secure: true,
                sameSite: "Strict",
              });
              axiosInstance.defaults.headers.common[
                "Authorization"
              ] = `${login.data.data.token}`;
            } else {
              toast.error(t("auth.emailOrPasswordWrong"));
            }
          } else {
            toast.error(response.data.message);
          }
          setRegister(false);
        } else {
          dispatch(setStep(7));
        }
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      throw new Error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  function handleBack() {
    if (previousStep !== null) {
      dispatch(setStep(previousStep));
    }
  }

  return (
    <div className="left_side pt-4">
      <button onClick={handleBack} className="back_button">
        <FaChevronLeft />
      </button>
      <header className="modal_header pb-3 ">
        <h1>{t("auth.otpTitle")}</h1>
        <p className="">
          {t("auth.otpSubTitle")}:{" "}
          {register ? formData.email : forgetPassformData.email}{" "}
          <button
            onClick={() => dispatch(setStep(3))}
            className="btn p-0 text-success"
          >
            ({t("auth.useAnthorEmail")})
          </button>
        </p>
      </header>
      <form onSubmit={handleSubmit} className="d-flex flex-column gap-2">
        <label className="mb-2 fw-semibold" htmlFor="">
          {t("auth.enterCode")}
        </label>
        <OTPInput
          containerStyle={{
            gap: "0.5rem",
            marginTop: "0.2rem",
            marginBottom: "2.5rem",
            direction: "ltr",
          }}
          value={otpData.code}
          onChange={handleChange}
          numInputs={6}
          inputType="number"
          inputStyle={{
            border: "none",
            backgroundColor: "#E8FAF4",
            justifyContent: "center",
            width: "100%",
            height: "70px",
            borderRadius: "5px",
          }}
          renderInput={(props) => <input {...props} />}
        />
        <FormButton content={t("next")} loading={isLoading} type="submit" />
      </form>
    </div>
  );
}
