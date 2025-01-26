import { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { useDispatch } from "react-redux";
import { setStep } from "../../redux/slices/authModalSlice";
import FormButton from "../form/FormButton";
import BackButton from "./BackButton";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axios";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { setIsLogged, setUser } from "../../redux/slices/authedUserSlice";
import { useCookies } from "react-cookie";

export default function EmailVerification({
  otpData,
  setOtpData,
  register,
  setUserId,
  formData,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [timer, setTimer] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [, setCookie] = useCookies(["token"]);

  const handleChange = (otp) => {
    setOtpData((prevState) => ({
      ...prevState,
      code: otp,
    }));
  };

  const handleResend = () => {
    setTimer(30);
    setIsDisabled(true);
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
  console.log(formData, otpData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axiosInstance.request(checkCodeRequest);
      if (res.data.code === 200) {
        if (register) {
          toast.success(t("auth.registerSuccess"));
          if (res.data.code === 200) {
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
            toast.error(res.data.message);
          }
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

  return (
    <div className="left_side pt-4">
      <BackButton />
      <header className="modal_header pb-3 ">
        <h1>Confirm your email</h1>
        <p className="">
          Enter the verification code you Recived
          <button
            onClick={() => dispatch(setStep(3))}
            className="btn p-0 text-success"
          >
            (Use a different email)
          </button>
        </p>
      </header>
      <form onSubmit={handleSubmit} className="d-flex flex-column gap-2">
        <label className="mb-2 fw-semibold" htmlFor="">
          Enter The Code
        </label>
        <OTPInput
          containerStyle={{
            gap: "0.5rem",
            marginTop: "0.2rem",
            marginBottom: "2.5rem",
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
            height: "50px",
            borderRadius: "5px",
          }}
          renderInput={(props) => <input {...props} />}
        />
        {/* <div className="d-flex justify-conetent-center align-items-center flex-column">
          <p className="text-center"> {timer} sec</p>
          <button className="forget_pass btn " onClick={() => handleResend()}>
            code resent
          </button>
        </div> */}
        <FormButton content="Next" type="submit" />
      </form>
    </div>
  );
}
