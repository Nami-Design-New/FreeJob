import { IconCirclePlus } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { deleteWork } from "../services/apiWorks";
import WorkCard from "../ui/cards/worksCard";
import AddWorkModal from "./AddWorkModal";
import ConfirmationModal from "./ConfirmationModal";
import WorkViewModal from "./WorkViewModal";

export default function WorksTap({ works, isMyAccount }) {
  const { t } = useTranslation();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showAddWorkModal, setShowAddWorkModal] = useState(false);
  const [showWorkViewModal, setShowWorkViewModal] = useState(false);
  const [targetId, setTargetId] = useState(null);
  const [targetWork, setTargetWork] = useState(null);
  const queryClient = useQueryClient();

  const onDeleteModalShow = (id) => {
    setShowConfirmation(true);
    setTargetId(id);
  };

  const onEditModalShow = (work) => {
    setShowAddWorkModal(true);
    setTargetWork(work);
  };

  const onViewModalShow = (work) => {
    setShowWorkViewModal(true);
    setTargetWork(work);
  };

  const handleDelete = async () => {
    try {
      await deleteWork(targetId, queryClient);
      toast.success(t("profile.workDeletedSuccessfully"));
    } catch (error) {
      toast.error(t("profile.errorDeletingWork"));
      throw new Error(error.message);
    } finally {
      setShowConfirmation(false);
    }
  };

  return (
    <>
      <div className="tab-pane ">
        <div className="services-container">
          {isMyAccount && (
            <button
              onClick={() => setShowAddWorkModal(true)}
              className="add-service"
            >
              <IconCirclePlus stroke={2} /> {t("profile.addWork")}
            </button>
          )}
          <div className="services_grid">
            {works?.length === 0 ? (
              <div className="noDataFound">
                <h4>{t("profile.noWorksFound")}</h4>
              </div>
            ) : (
              <>
                {works?.map((work) => (
                  <WorkCard
                    canEdit={isMyAccount}
                    key={work.id}
                    work={work}
                    onEditModalShow={onEditModalShow}
                    onDeleteModalShow={onDeleteModalShow}
                    onViewModalShow={onViewModalShow}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      </div>{" "}
      <ConfirmationModal
        showModal={showConfirmation}
        setShowModal={setShowConfirmation}
        type="delete"
        eventFun={handleDelete}
        buttonText={t("profile.delete")}
        text={t("profile.areYouSureYouWantToDelete")}
      />
      <AddWorkModal
        targetWork={targetWork}
        setTargetWork={setTargetWork}
        showModal={showAddWorkModal}
        setShowModal={setShowAddWorkModal}
      />
      <WorkViewModal
        showModal={showWorkViewModal}
        setShowModal={setShowWorkViewModal}
        targetWork={targetWork}
        setTargetWork={setTargetWork}
      />
    </>
  );
}
