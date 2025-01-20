import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import CertificateCard from "./CertificateCard";
import { toast } from "react-toastify";
import { deleteCertificate } from "../services/apiCertificate";
import useGetCertificates from "../hooks/useCertificates";
import ConfirmationModal from "./ConfirmationModal";
import AddCertificateModal from "./AddCertificateModal";
import CertificateViewModal from "./CertificateViewModal";

export default function CertificatesTab({ user, isMyAccount }) {
  const queryClient = useQueryClient();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showAddCertificateModal, setShowAddCertificateModal] = useState(false);
  const [viewImgTarget, setViewImgTarget] = useState(null);
  const [targetId, setTargetId] = useState(null);
  const [targetCertificate, setTargetCertificate] = useState(null);
  const [showCertificateViewModal, setShowCertificateViewModal] =
    useState(false);
  const { t } = useTranslation();
  const { data: certificates } = useGetCertificates(user?.id);

  const onDeleteModalShow = (id) => {
    setShowConfirmation(true);
    setTargetId(id);
  };

  const onEditModalShow = (certificate) => {
    setShowAddCertificateModal(true);
    setTargetCertificate(certificate);
  };

  const handleDelete = async () => {
    try {
      await deleteCertificate(targetId, queryClient);
      toast.success(t("profile.certificateDeletedSuccessfully"));
    } catch (error) {
      throw new Error(error.message);
    } finally {
      setShowConfirmation(false);
    }
  };

  const viewCertificate = (targetCertificate) => {
    setShowCertificateViewModal(true);
    setViewImgTarget(targetCertificate);
  };
  return (
    <div className="tab-pane ">
      <div className="services-container">
        {isMyAccount && (
          <button
            onClick={() => setShowAddCertificateModal(true)}
            className="add-service"
          >
            {t("profile.addCertificate")}
          </button>
        )}
        <div className="services_grid">
          {certificates?.length === 0 ? (
            <div className="noDataFound">
              <h4>{t("profile.noCertificatesFound")}</h4>
            </div>
          ) : (
            <>
              {certificates?.map((cer) => (
                <CertificateCard
                  canEdit={isMyAccount}
                  key={cer.id}
                  certificate={cer}
                  onClick={viewCertificate}
                  onEditModalShow={onEditModalShow}
                  onDeleteModalShow={onDeleteModalShow}
                />
              ))}
            </>
          )}
        </div>
      </div>
      <ConfirmationModal
        showModal={showConfirmation}
        setShowModal={setShowConfirmation}
        type="delete"
        eventFun={handleDelete}
        buttonText={t("profile.delete")}
        text={t("profile.areYouSureYouWantToDeleteCertificate")}
      />
      <AddCertificateModal
        setTargetCertificate={setTargetCertificate}
        targetCertificate={targetCertificate}
        showModal={showAddCertificateModal}
        setShowModal={setShowAddCertificateModal}
      />
      <CertificateViewModal
        targetCertificate={viewImgTarget}
        showModal={showCertificateViewModal}
        setShowModal={setShowCertificateViewModal}
      />
    </div>
  );
}
