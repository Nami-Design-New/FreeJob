import { useTranslation } from "react-i18next";
import NotificationCard from "../ui/cards/NotificationCard"; 
import DetailsHeader from "../ui/servicesComponents/serviceDetails/DetailsHeader";
import { useLocation } from "react-router";

export default function NotificationPage() {
  const { t } = useTranslation(); 
  const { pathname } = useLocation(); 
  const segments = pathname
    .split("/")
    .filter((segment) => segment === "notifications")[0]
    .split("-")
    .join(" ");
  
  const notifications = [
    {
      id: 1,
      message: "Request number 23342 has been accepted",
      content:
        "The GuitarRank tool that you proposed in the last workshop as the best tool for the AI-driven article writing market.",
      time: "An hour ago",
    },
    {
      id: 2,
      message: "Request number 23342 has been accepted",
      content:
        "Your proposal has been modified to include more details.",
      time: "Two hours ago",
    },
    {
      id: 3,
      message: "Request number 23342 has been accepted",
      content:
        "The content has been reviewed and sent to the team.",
      time: "Three hours ago",
    },
  ];

  return (
    <section className="notifications">
      <section className="header_container">
        <section className="container-md">
          <DetailsHeader links={segments} />
        </section>
      </section>
      <div className="container notifications-list my-5" >
        {notifications.map((notification) => (
          <NotificationCard key={notification.id} notification={notification} />   
        ))}
      </div>
      </section>

  );
}
