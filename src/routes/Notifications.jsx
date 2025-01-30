import { useTranslation } from "react-i18next";
import NotificationCard from "../ui/cards/NotificationCard";
import DetailsHeader from "../ui/servicesComponents/serviceDetails/DetailsHeader";
import { useLocation } from "react-router";
import useGetNotifications from "../hooks/useGetNotifications";
import DataLoader from "../ui/DataLoader";
import EmptyData from "../ui/EmptyData";

export default function NotificationPage() {
  const { t } = useTranslation();
  const { isLoading, data: notifications } = useGetNotifications();
  return (
    <section className="notifications">
      <section className="header_container">
        <section className="container-md">
          <DetailsHeader links={t("routes.notifications")} />
        </section>
      </section>
      <div className="container notifications-list my-5">
        {isLoading ? (
          <DataLoader />
        ) : notifications && notifications.length > 0 ? (
          notifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
            />
          ))
        ) : (
          <EmptyData>{t("noNotifications")}</EmptyData>
        )}
      </div>
    </section>
  );
}
