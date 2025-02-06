import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import axiosInstance from "../../utils/axios";
import SubmitButton from "../form/SubmitButton";

const VerifyStep3 = ({ setStep }) => {
  const { t } = useTranslation();
  const frontIdImage = useRef(null);
  const backIdImage = useRef(null);
  const selfieImage = useRef(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    images: [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post(
        "/user/verify_user",
        {
          images: formData.images,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res?.data?.code === 200) {
        setStep(3);
      }
    } catch (error) {
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      images: [...prevFormData.images, e.target.files[0]],
    }));

    if (e.target.id === "id-image-front") {
      frontIdImage.current.src = URL.createObjectURL(e.target.files[0]);
    } else if (e.target.id === "id-image-back") {
      backIdImage.current.src = URL.createObjectURL(e.target.files[0]);
    } else if (e.target.id === "id-image-selfie") {
      selfieImage.current.src = URL.createObjectURL(e.target.files[0]);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="advice">
        <div className="icon">
          <img src="/images/id.svg" alt="icon" />
        </div>
        <h6>{t("auth.idAdvice")}</h6>
        <ul>
          <li>
            <i className="fa-solid fa-check"></i> {t("auth.advice1")}
          </li>
          <li>
            <i className="fa-solid fa-check"></i> {t("auth.advice2")}
          </li>
        </ul>
      </div>
      <div className="image_field">
        <label htmlFor="id-image-front">
          <i className="fa-solid fa-id-card"></i> {t("auth.idFront")}
        </label>
        <label htmlFor="id-image-front" className="imagewrap">
          <input
            type="file"
            required={true}
            name="image"
            id="id-image-front"
            accept="image/*"
            onChange={handleChange}
          />
          <div className="img">
            <img src="/images/fileup1.svg" ref={frontIdImage} alt="gallery" />
          </div>
        </label>
      </div>
      <div className="image_field">
        <label htmlFor="id-image-back">
          <i className="fa-solid fa-id-card"></i> {t("auth.idBack")}
        </label>
        <label htmlFor="id-image-back" className="imagewrap">
          <input
            type="file"
            required={true}
            name="image"
            id="id-image-back"
            accept="image/*"
            onChange={handleChange}
          />
          <div className="img">
            <img src="/images/fileup1.svg" ref={backIdImage} alt="gallery" />
          </div>
        </label>
      </div>
      <div className="image_field">
        <label htmlFor="id-image-selfie">
          <i className="fa-solid fa-id-card"></i> {t("auth.idSelfie")}
        </label>
        <label htmlFor="id-image-selfie" className="imagewrap">
          <input
            type="file"
            required={true}
            name="image"
            id="id-image-selfie"
            accept="image/*"
            onChange={handleChange}
          />
          <div className="img">
            <img src="/images/fileup1.svg" ref={selfieImage} alt="gallery" />
          </div>
        </label>
      </div>
      <div className="d-flex justify-content-between mt-4 w-100">
        <button
          className="phoneSubmitButton"
          onClick={(e) => {
            e.preventDefault();
            setStep(1);
          }}
        >
          {t("back")}
        </button>
        <SubmitButton
          name={t("next")}
          loading={loading}
          className="w-25 phoneSubmitButton"
        />
      </div>
    </form>
  );
};

export default VerifyStep3;
