import { IconCheck, IconPencil, IconX } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { updateRequestStatus } from "../../services/apiProjects";
import ChargeModal from "../modals/ChargrModal";
import EditProjectOfferModal from "../modals/EditProjectOfferModal";
import OrderModal from "../modals/OrderModal";
import UserAvatar from "../servicesComponents/serviceDetails/UserAvatar";
import useTruncateText from "../../hooks/helpers/useTruncateText";

export default function OffersCard({ request, isMyProject }) {
  const description = useTruncateText(request.description, 150);
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showConfirmPayModel, setShowConfirmPayModel] = useState(false);
  const [showChargeModal, setShowChargeModal] = useState(false);
  const { user } = useSelector((state) => state.authedUser);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreateRoom = () => {
    sessionStorage.setItem("request_type", "project");
    sessionStorage.setItem("request_id", request?.project_id);
    sessionStorage.setItem("owner_id", user?.id);
    sessionStorage.setItem("applied_id", request?.user?.id);
    navigate(`/chat`);
  };

  const handleRefuseOffer = async () => {
    try {
      await updateRequestStatus(request?.id, "refused", queryClient);
      toast.success(t("projects.requestRefused"));
    } catch (error) {
      console.log(error?.message);
    }
  };

  const handleAcceptOffer = async () => {
    try {
      setLoading(true);
      await updateRequestStatus(request?.id, "accepted", queryClient);
      toast.success(t("projects.requestAccepted"));
      setShowConfirmPayModel(false);
    } catch (error) {
      console.log(error?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="offers_card">
      <div className="row_head" data-aos="fade-up">
        <UserAvatar request={request} />
        <div>
          {isMyProject && (
            <button className="chat_button" onClick={handleCreateRoom}>
              <i className="fa-regular fa-message-lines"></i>
            </button>
          )}
        </div>
      </div>
      {(isMyProject || user?.id === request?.user?.id) && (
        <div className="about_offer">
          <div className="block">
            <h6>{t("projects.price")}:</h6>
            <p>${request?.price}</p>
          </div>
          <div className="block">
            <h6>{t("projects.deliveryTime")}:</h6>
            <p>
              {request?.days} {t("projects.days")}
            </p>
          </div>
        </div>
      )}{" "}
      {(isMyProject || user?.id === request?.user?.id) && (
        <div
          className="d-flex gap-3 align-items-center justify-content-center"
          style={{ height: "fit-content" }}
        >
          {request?.status === "in_progress" && (
            <div className="setting">
              {user?.id === request?.user?.id ? (
                <button
                  className="refuse_btn"
                  onClick={() => setShowEditModal(true)}
                >
                  <IconPencil stroke={2} /> {t("projects.editOffer")}
                </button>
              ) : (
                <>
                  <button
                    className="edit_btn"
                    onClick={() =>
                      user?.wallet < request?.price
                        ? setShowChargeModal(true)
                        : setShowConfirmPayModel(true)
                    }
                  >
                    <IconCheck stroke={1.25} /> {t("projects.acceptOffer")}
                  </button>
                  <button className="refuse_btn" onClick={handleRefuseOffer}>
                    <IconX stroke={1.25} /> {t("projects.refuseOffer")}
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      )}
      <p>{description}</p>{" "}
      <EditProjectOfferModal
        request={request}
        showModal={showEditModal}
        setShowModal={setShowEditModal}
      />
      <OrderModal
        setShowModal={setShowConfirmPayModel}
        loading={loading}
        showModal={showConfirmPayModel}
        ballance={user?.wallet}
        cartTotalPrice={request?.price}
        eventFunction={handleAcceptOffer}
      />
      <ChargeModal
        showModal={showChargeModal}
        setShowModal={setShowChargeModal}
        cartTotalPrice={request?.price}
      />
    </section>
  );
}
