import { useTranslation } from "react-i18next";
import React from "react";
import { Card } from "react-bootstrap";
import "../../assets/styles/notifications.css";

export default function NotificationCard({ notification }) {
  const { t } = useTranslation();

  return (
    <Card className="my-3 border-0 bg-light shadow-sm"
    style={{
      height: "fit-content",
      border: "1px solid #ddd",
    }}>
      <Card.Body className="d-flex justify-content-between">
        <div className="d-flex">
          <div className="notification me-3">
            <img
              src="/images/bell.png"
              alt="Notification Icon"
              className="notification-icon "
            />
          </div>
          <div>
            <Card.Text className="fw-semibold">{t(notification.message)}</Card.Text>
            <Card.Text>{t(notification.content)}</Card.Text>
          </div>
        </div>
        <small className="notification-time ">
          <img
            src="./icons/simple-line-icons_calender.svg"
            alt="Clock Icon"
            className="me-1"
            style={{ width: "16px", height: "16px" }}
          />
          {notification.time}
        </small>
      </Card.Body>
    </Card>
  );
}
