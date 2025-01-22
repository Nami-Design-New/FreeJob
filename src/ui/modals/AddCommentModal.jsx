import { Modal } from "react-bootstrap";
import FormInput from "../form/FormInput";
import SubmitButton from "../form/SubmitButton";
import { addComment } from "../../services/apiCommunities";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import FormTextArea from "../form/FormTextArea";

function AddCommentModal({ showModal, setShowModal }) {
  const { id } = useParams();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");

  const queryClient = useQueryClient();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addComment({ community_post_id: Number(id), comment }, queryClient);
      toast.success(t("communities.commentAddedSuccessfully"));
      setComment("");
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
        setComment("");
      }}
      centered
      size="md"
    >
      <Modal.Header className="border-0" closeButton>
        <Modal.Title>{t("communities.addComment")}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="add-work">
        <div className="login-section">
          <form className="form container m-0 w-100" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-12 p-2">
                <div className="col-12 p-2">
                  <label>{t("communities.commentBody")}</label>
                  <FormTextArea
                    name="comment"
                    onChange={(e) => setComment(e.target.value)}
                    value={comment}
                    placeholder={t("writeHere")}
                    required={true}
                    rows={6}
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

export default AddCommentModal;
