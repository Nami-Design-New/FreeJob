import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import Otpcontainer from "../form/OtpContainer";
import SubmitButton from "../form/SubmitButton";

const VerifyStep2 = ({ setStep, formData, setFormData }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [resendDisabled, setResendDisabled] = useState(true);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post("/user/verify_phone", formData);
      if (res.data.code === 200) {
        queryClient.invalidateQueries(["profile"]);
        navigate("/profile");
      }
    } catch (error) {
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else {
      setResendDisabled(false);
    }
  }, [timer]);

  const handleResend = async () => {
    setResendDisabled(true);
    setTimer(60);
    try {
      const res = await axiosInstance.post("/user/sendOtpCode", formData);
      if (res.data.code === 200) {
        setFormData({
          ...formData,
          hashed_code: res.data.data,
        });
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div>
        <h6 className="text-center">{t("auth.verificationCode")}</h6>
        <p className="text-center mt-1 mb-3"> {formData?.phone} </p>
      </div>
      <Otpcontainer formData={formData} setFormData={setFormData} />

      <div className="resend-code">
        <span
          onClick={handleResend}
          className={`resend_link ${resendDisabled ? "disabled" : ""}`}
        >
          {t("auth.resendCode")}
        </span>
        <div className="timer">
          <span>
            {Math.floor(timer / 60)
              .toString()
              .padStart(2, "0")}
          </span>
          :<span>{(timer % 60).toString().padStart(2, "0")}</span>
        </div>
      </div>
      <div className="d-flex justify-content-between mt-4 w-100">
        <button
          className="back_btn phoneSubmitButton"
          onClick={(e) => {
            e.preventDefault();
            setStep(2);
          }}
        >
          {t("back")}
        </button>
        <SubmitButton
          name={t("next")}
          loading={loading}
          className=" phoneSubmitButton w-25"
        />
      </div>
    </form>
  );
};

export default VerifyStep2;
