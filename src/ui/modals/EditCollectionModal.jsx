import { useEffect, useState } from "react";

import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import FormInput from "../form/FormInput";
import FormTextArea from "../form/FormTextArea";
import { updateCollection } from "../../services/apiCollections";
import SubmitButton from "../form/SubmitButton";

const EditCollectionModal = ({ showModal, setShowModal, collection }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    setFormData({
      id: collection?.id,
      title: collection?.title,
      description: collection?.description,
    });
  }, [collection, showModal]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateCollection(formData, queryClient);
      toast.success(t("cart.collectionUpdated"));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setShowModal(false);
    }
  };

  return (
    <Modal
      show={showModal}
      onHide={() => {
        setShowModal(false);
      }}
      centered
    >
      <Modal.Header className="border-0" closeButton>
        <h5 className="m-0">{t("cart.editCollection")}</h5>
      </Modal.Header>
      <Modal.Body className="pay_modal collection_modal">
        <form className="form m-0" onSubmit={handleSubmit}>
          <div className="row m-0">
            <div className="col-12 p-2">
              <FormInput
                label={t("cart.collectionTitle")}
                name="title"
                type="text"
                id="title"
                required={true}
                value={formData.title}
                onChange={handleChange}
              />
            </div>
            <div className="col-12 p-2">
              <FormTextArea
                name="description"
                id="description"
                rows={5}
                value={formData.description}
                onChange={handleChange}
                label={t("cart.collectionDescription")}
              />
            </div>

            <div className="col-12 p-2 d-flex gap-3 mt-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowModal(false);
                }}
                className="cancel-btn"
              >
                {t("cancel")}
              </button>
              <SubmitButton
                name={t("cart.edit")}
                loading={loading}
                className={"order-now"}
              />
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default EditCollectionModal;
