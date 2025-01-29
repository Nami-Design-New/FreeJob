import { useTranslation } from "react-i18next";
import { BsChatText, BsShare } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import OwnerComponent from "./OwnerComponent";
import { calculateDate } from "../../../utils/helper";

export default function ServiseOwner({ service }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const authedUser = useSelector((state) => state.authedUser.user);

  const handleCreateRoom = () => {
    sessionStorage.setItem("request_type", "service");
    sessionStorage.setItem("request_id", service?.id);
    sessionStorage.setItem("owner_id", service?.user?.id);
    sessionStorage.setItem("applied_id", authedUser?.id);
    navigate(`/chat`);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: service.title,
          url: window.location.href,
        })
        .then(() => t("Shared successfully"))
        .catch((error) => t("Error sharing:", error));
    } else {
      alert(t("share_not_supported"));
    }
  };

  return (
    <section className="service_card_owner">
      <OwnerComponent item={service} />
      <ul className="card_ul">
        <li className="rate d-flex justify-content-between">
          <p>{t("addService.puplishDate")}</p>
          {calculateDate(service.created_at)}
        </li>
        <li className="d-flex justify-content-between">
          <p>{t("services.buyers")}</p>
          <span>{service?.orders_count || 0}</span>
        </li>
        <li className=" d-flex justify-content-between">
          <p>{t("services.oredersInProgress")}</p>
          <span>{service?.current_orders_count || 0}</span>
        </li>
        <li className=" d-flex justify-content-between">
          <p>{t("services.serviceMinimumPrice")}</p>
          <span>${service?.price}</span>
        </li>
        <li className=" d-flex justify-content-between">
          <p>{t("services.deliveryTime")}</p>
          <span>
            {service?.days} {t("day")}
          </span>
        </li>
      </ul>

      <section className="share_chat_buttons mt-4">
        <button className="butn" onClick={handleShare}>
          <BsShare /> {t("services.share")}
        </button>
        <Link
          onClick={(e) => {
            if (e.button === 1 || e.ctrlKey || e.metaKey) {
              console.log("middle click");
              return;
            }
            console.log("left click");
            e.preventDefault();
            handleCreateRoom();
            navigate(`/chat`);
          }}
          onAuxClick={(e) => {
            e.preventDefault();
            if (e.button === 1) {
              console.log("wheel click");
              handleCreateRoom();
              const newTab = window.open("/chat", "_blank");
              if (newTab) {
                newTab.focus();
              }
            }
          }}
        >
          <BsChatText /> {t("routes.chat")}
        </Link>
      </section>
    </section>
  );
}
