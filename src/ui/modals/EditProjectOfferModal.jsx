import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { editProjectRequest } from "../../services/apiProjects";
import FormInput from "../form/FormInput";
import FormTextArea from "../form/FormTextArea";
import SubmitButton from "../form/SubmitButton";

const EditProjectOfferModal = ({ showModal, setShowModal, request }) => {
  const { data: settings } = useGetSettings();
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [formData, setFormData] = useState({
    id: request?.id,
    price: request?.price,
    description: request?.description,
    days: request?.days,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await editProjectRequest(formData, queryClient);
      toast.success(t("projects.offerUpdatedSuccessfully"));
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
      onHide={() => setShowModal(false)}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title className="fs-6">{t("projects.editOffer")}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="add-work">
        <form className="form" onSubmit={handleSubmit}>
          <div className="row m-0">
            <div className="col-lg-4 col-12 p-1">
              <FormInput
                label={t("projects.deliveryTime")}
                id="days"
                name="days"
                type="number"
                min={1}
                value={formData.days}
                onChange={handleChange}
                span={t("projects.days")}
              />
            </div>
            <div className="col-lg-4 col-12 p-1">
              <FormInput
                label={t("projects.price")}
                id="price"
                name="price"
                required
                type="number"
                value={formData.price}
                onChange={handleChange}
                span={"$"}
              />
            </div>
            <div className="col-lg-4 col-12 p-1">
              <FormInput
                required
                readonly
                label={`${t("projects.yourDuesAfterfees")} ( ${
                  settings?.data?.project_percentage
                }% )`}
                value={
                  (formData.price *
                    (100 - settings?.data?.project_percentage)) /
                  100
                }
              />
            </div>
            <div className="col-12 p-1">
              <label className="mb-2" htmlFor="des">
                {t("projects.oferrDescription")}
              </label>
              <FormTextArea
                id="des"
                name="description"
                rows={7}
                required
                onChange={handleChange}
                value={formData.description}
              />
            </div>
            <div className="col-12 p-1 mt-2 d-flex justify-content-end">
              <SubmitButton name={t("projects.confirm")} loading={loading} />
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default EditProjectOfferModal;
