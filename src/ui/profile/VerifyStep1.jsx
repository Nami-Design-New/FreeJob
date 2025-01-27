import { useState } from "react";
import { useTranslation } from "react-i18next";
import axiosInstance from "../../utils/axios";
import SubmitButton from "../form/SubmitButton";

const VerifyStep1 = ({ setStep, formData, setFormData }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post("/user/sendOtpCode", formData);
      if (res.data.code === 200) {
        setStep(3);
        setFormData({
          ...formData,
          hashed_code: res.data.data,
        });
      }
    } catch (error) {
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      {/* <PhoneField
        formData={formData}
        setFormData={setFormData}
        value={formData?.phone}
        id="phone"
        // icon={<IconDeviceMobile stroke={2} />}
      /> */}
      <div className="d-flex justify-content-between mt-4 w-100">
        <button
          className="back_btn"
          onClick={(e) => {
            e.preventDefault();
            setStep(1);
          }}
        >
          {t("back")}
        </button>
        <SubmitButton name={t("next")} loading={loading} className={"w-25 "} />
      </div>
    </form>
  );
};

export default VerifyStep1;
