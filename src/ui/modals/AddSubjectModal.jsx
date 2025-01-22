import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { addSubject } from "../../services/apiCommunities";
import useGetCommunitiesList from "../../hooks/community/useGetCommunitiesList";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import FormInput from "../form/FormInput";
import SubmitButton from "../form/SubmitButton";
import FormTextArea from "../form/FormTextArea";
import FormSelector from "../form/FormSelector";

function AddSubjectModal({ showModal, setShowModal }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [communityId, setCommunityId] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const queryClient = useQueryClient();

  const { data: communities } = useGetCommunitiesList();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addSubject(
        { ...formData, community_category_id: Number(communityId) },
        queryClient
      );
      toast.success(t("communities.subjectAddedSuccessfully"));
      setFormData({
        title: "",
        community_category_id: "",
        description: "",
      });
      setShowModal(false);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      show={showModal}
      onHide={() => {
        setShowModal(false);
        setFormData({
          title: "",
          community: "",
          description: "",
        });
      }}
      centered
      size="lg"
    >
      <Modal.Header className="border-0" closeButton>
        <Modal.Title>{t("communities.addSubject")}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="add-work">
        <div className="login-section">
          <form className="form container m-0 w-100" onSubmit={handleSubmit}>
            <div className="row">
              <div className=" col-12 p-2">
                <FormInput
                  label={t("communities.subjectTitle")}
                  type="text"
                  name="title"
                  required={true}
                  onChange={handleChange}
                  value={formData.title}
                />
              </div>
              <div className=" col-12 p-2">
                <FormSelector
                  label={t("communities.community")}
                  id="category"
                  name="category"
                  disabledOption={t("select")}
                  value={communityId}
                  required={true}
                  onChange={(e) => {
                    setCommunityId(e.target.value);
                  }}
                  options={communities?.map((option) => ({
                    name: option.name,
                    value: option.id,
                  }))}
                />
              </div>
              <div className="col-12 p-2">
                <div className="col-12 p-2">
                  <label className="mb-3">
                    {t("communities.subjectDescription")}
                  </label>
                  <FormTextArea
                    name="description"
                    onChange={handleChange}
                    required={true}
                    rows={5}
                    value={formData.description}
                  />
                </div>
              </div>
              <div className="col-12 p-2">
                <SubmitButton name={t("communities.add")} loading={loading} />
              </div>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default AddSubjectModal;
