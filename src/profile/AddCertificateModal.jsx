import { Modal } from "react-bootstrap";
import FormInput from "../ui/form/FormInput";
import SubmitButton from "../ui/form/SubmitButton";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { addCertificate, updateCertificate } from "../services/apiCertificate";

const AddCertificateModal = ({
  showModal,
  setShowModal,
  targetCertificate,
  setTargetCertificate,
}) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const imgRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    image: "",
  });

  useEffect(() => {
    if (targetCertificate?.id) {
      setFormData({
        title: targetCertificate?.title,
        image: targetCertificate?.image,
        id: targetCertificate?.id,
      });
      imgRef.current.src = targetCertificate?.image || "/icons/galleryIcon.svg";
    }
  }, [targetCertificate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "image") {
      imgRef.current.src = URL.createObjectURL(e.target.files[0]);
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      targetCertificate?.id
        ? await updateCertificate(formData, queryClient)
        : await addCertificate(formData, queryClient);
    } catch (error) {
      throw new Error(error.message);
    } finally {
      setLoading(false);
      setShowModal(false);
      setFormData({
        title: "",
        image: "",
      });
      imgRef.current.src = "/icons/galleryIcon.svg";
      toast.success(
        targetCertificate?.id
          ? t("profile.certificateUpdatedSuccessfully")
          : t("profile.certificateAddedSuccessfully")
      );
    }
  };

  return (
    <Modal
      show={showModal}
      onHide={() => {
        setShowModal(false);
        setFormData({
          title: "",
          image: "",
        });
        setTargetCertificate(null);
      }}
      centered
    >
      <Modal.Header className="" closeButton>
        <Modal.Title>{t("profile.addCertificate")}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="add-work">
        <div className="login-section">
          <form className="form container m-0 w-100" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-12 p-2">
                <FormInput
                  label={t("profile.certificateTitle")}
                  type="text"
                  name="title"
                  required={true}
                  onChange={handleChange}
                  value={formData.title}
                />
              </div>
              <div className="col-12 p-2">
                <div className="image_field">
                  <label htmlFor="certificate-image">
                    {t("profile.imageGallery")}
                  </label>
                  <label htmlFor="certificate-image" className="imagewrap">
                    <input
                      type="file"
                      required={true}
                      name="image"
                      id="certificate-image"
                      accept="image/*"
                      onChange={handleChange}
                    />
                    <div className="img">
                      <img
                        src="/icons/galleryIcon.svg"
                        ref={imgRef}
                        alt="gallery"
                      />
                    </div>
                  </label>
                </div>
              </div>
              <div className="col-12 p-2">
                <SubmitButton
                  name={
                    targetCertificate?.id ? t("profile.edit") : t("profile.add")
                  }
                  loading={loading}
                />
              </div>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddCertificateModal;
