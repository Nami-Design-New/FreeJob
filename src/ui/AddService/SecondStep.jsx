import { useEffect, useState } from "react";
import { FaChevronRight, FaPlusCircle } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import FormButton from "../form/FormButton";
import FormInput from "../form/FormInput";
import FormTextArea from "../form/FormTextArea";
import AddMoreDevelopCard from "./AddMoreDevelep";
import useGetSettings from "../../hooks/settings/useGetSettings";
import SubmitButton from "../form/SubmitButton";

export default function SecondStep({
  formData,
  setFormData,
  isEdit,
  setStep,
  loading,
}) {
  const { data: settings } = useGetSettings();
  const [, setFormValid] = useState(false);
  const lang = useSelector((state) => state.language.lang);
  const { t } = useTranslation();
  const developmentInitial = {
    description: "",
    price: "",
    duration: "",
  };

  useEffect(() => {
    if (
      formData.images.length > 0 &&
      formData.price &&
      formData.days &&
      formData.price > 0 &&
      formData.days > 0 &&
      formData.instructions
    ) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [formData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImagesChange = (e) => {
    e.preventDefault();
    const newImages = Array.from(e.target.files);
    if (formData.images.length + newImages.length > 10) {
      alert("Maximum 10 images allowed");
      return;
    }
    setFormData((prevState) => ({
      ...prevState,
      images: [...prevState.images, ...newImages],
    }));
  };

  const handleRemoveImage = (index, image) => {
    if (image.id) {
      setFormData((prevState) => ({
        ...prevState,
        images: prevState?.images.filter((_, i) => i !== index),
        delete_images: [...prevState.delete_images, image.id],
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        images: prevState.images.filter((_, i) => i !== index),
      }));
    }
  };

  const handleAddDev = (e) => {
    e.preventDefault();
    setFormData((prev) => ({
      ...prev,
      developments: [...prev.developments, developmentInitial],
    }));
  };

  const handleRemoveDev = (dev, index) => {
    if (dev.id) {
      setFormData((prevState) => ({
        ...prevState,
        developments: prevState?.developments?.filter((_, i) => i !== index),
        delete_developments: [...prevState.delete_developments, dev.id],
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        developments: prevState.developments.filter((_, i) => i !== index),
      }));
    }
  };

  const onDevChange = (e, index) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      developments: prev.developments.map((dev, i) =>
        i === index ? { ...dev, [name]: value } : dev
      ),
    }));
  };

  return (
    <section>
      {/* images */}
      <section className="input_field_img">
        <label htmlFor="info-htmlFor-customer">
          <section className="d-flex justify-content-between align-items-center">
            <span className="mb-2">{t("addService.serviceGallery")}</span>
          </section>
          <small>{t("addService.imagesHint")}</small>
        </label>
        <section className="images_grid_upload">
          <section className="file_upload">
            <label htmlFor="file_upload">
              <input
                type="file"
                id="file_upload"
                accept="image/*"
                name="images"
                multiple
                onChange={(e) => handleImagesChange(e)}
              />
              <img src="./images/galleryIcon.svg" alt="upload" />
            </label>
          </section>
          {formData?.images && (
            <>
              {formData?.images?.map((image, index) => (
                <section className="uploaded_file" key={index}>
                  <img
                    src={
                      image?.type?.startsWith("image/")
                        ? URL.createObjectURL(image)
                        : image?.image
                    }
                    alt="file"
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleRemoveImage(index, image);
                    }}
                  >
                    <IoCloseOutline />
                  </button>
                </section>
              ))}
            </>
          )}
        </section>
      </section>

      <section className="row my-3">
        <FormInput
          type="number"
          className="col-md-6 mb-3"
          label={t("addService.servicePrice")}
          name="price"
          min={0}
          value={formData.price}
          onChange={handleChange}
        />{" "}
        <FormInput
          readOnly
          className="col-md-6 mb-3"
          type="number"
          label={
            t("addService.yourDuesAfterfees") +
            "  (" +
            settings?.data?.service_percentage +
            "%)"
          }
          style={{ userSelect: "none" }}
          value={
            formData.price && settings?.data?.service_percentage
              ? (formData.price * (100 - settings?.data?.service_percentage)) /
                100
              : 0
          }
        />
      </section>
      <FormInput
        type="number"
        id="days"
        name="days"
        min={0}
        value={formData.days}
        onChange={handleChange}
        className="mb-3"
        label={t("addService.serviceDays")}
      />
      <section>
        <label className="mb-2">{t("addService.instructions")}</label>
        <FormTextArea
          name="instructions"
          id="instructions"
          value={formData.instructions}
          onChange={handleChange}
          placeholder={t("addService.instructionsPlaceholder")}
          rows="8"
          label="Buyer Inster"
        />
      </section>

      <section className="add_more_devlop">
        <label className="mb-2" htmlFor="add_more_devlop">
          {t("addService.addMoreDevelopment")}
        </label>
        <FormButton
          onClick={(e) => handleAddDev(e)}
          className="add_develop_button"
          content={t("addService.addMoreDevelopment")}
        >
          <FaPlusCircle />
        </FormButton>
        <section className="w-100">
          {formData?.developments?.map((dev, index) => (
            <AddMoreDevelopCard
              key={index}
              index={index}
              development={dev}
              handleRemoveDev={handleRemoveDev}
              onDevChange={onDevChange}
            />
          ))}
        </section>
      </section>

      <section className="buttons_Container">
        <FormButton
          className="back_button"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({
              top: 0,
            });
            setStep(1);
          }}
        >
          {lang === "ar" ? <FaChevronRight /> : <FaChevronLeft />}
        </FormButton>{" "}
        <SubmitButton
          loading={loading}
          className={"add_service_button flex-grow-1"}
          name={
            isEdit
              ? t("addService.updateService")
              : t("addService.addAndConfirm")
          }
        />
      </section>
    </section>
  );
}
