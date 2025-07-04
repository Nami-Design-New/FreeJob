import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FormTextArea from "../form/FormTextArea";
import SubmitButton from "../form/SubmitButton";
import { createRate } from "../../services/apiServices";
import { Modal } from "react-bootstrap";

export default function AddRateModal({ showModal, setShowModal, order }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    rate: 0,
    comment: "",
    service_id: order?.service?.id,
    service_order_id: order?.id,
  });

  const handleRatingChange = (value) => {
    setFormData({ ...formData, rate: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { code, message } = await createRate(formData);
      if (code === 200) {
        toast.success(t("comments.createSuccess"));
        navigate("/purchases");
      } else {
        toast.error(message);
      }
      setShowModal(false);
    } catch (error) {
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      className="rate_modal"
      show={showModal}
      onHide={() => setShowModal(false)}
      centered
    >
      <Modal.Header className="border-0" closeButton>
        <Modal.Title>{t("comments.addComment")}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="add-work ">
        <div className="login-section p-3 pt-0">
          <form className="form align-items-stretch" onSubmit={handleSubmit}>
            <div className="stars">
              <div className="star-rating-service">
                {[5, 4, 3, 2, 1].map((star) => (
                  <React.Fragment key={star}>
                    <input
                      type="radio"
                      id={`star${star}`}
                      name="rating"
                      value={star}
                      checked={formData.rate === star}
                      onChange={() => handleRatingChange(star)}
                    />
                    <label
                      htmlFor={`star${star}`}
                      title={`${star} stars`}
                      className={formData.rate >= star ? "active" : ""}
                    >
                      <i className="fa-sharp fa-solid fa-star"></i>
                    </label>
                  </React.Fragment>
                ))}
              </div>
            </div>
            <FormTextArea
              label={t("comments.addComment")}
              value={formData.comment}
              rows={5}
              onChange={(e) =>
                setFormData({ ...formData, comment: e.target.value })
              }
            />
            <SubmitButton name={t("comments.publish")} loading={loading} />
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
}
