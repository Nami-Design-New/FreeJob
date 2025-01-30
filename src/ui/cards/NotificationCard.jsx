import { Card } from "react-bootstrap";
import "../../assets/styles/notifications.css";
import { calculateDate } from "../../utils/helper";

export default function NotificationCard({ notification }) {
  return (
    <Card
      className="my-3 border-0 bg-light shadow-sm"
      style={{
        height: "fit-content",
        border: "1px solid #ddd",
      }}
    >
      <Card.Body className="d-flex justify-content-between">
        <div className="d-flex gap-3">
          <div className="notification me-3">
            <img
              src="/images/bell.png"
              alt="Notification Icon"
              className="notification-icon "
            />
          </div>
          <div>
            <Card.Text className="fw-semibold">
              {notification?.title}{" "}
            </Card.Text>
            <Card.Text>{notification?.description}</Card.Text>
          </div>
        </div>
        <small className="notification-time ">
          <img
            src="./icons/simple-line-icons_calender.svg"
            alt="Clock Icon"
            className="me-1"
            style={{ width: "16px", height: "16px" }}
          />
          {calculateDate(notification?.created_at)}{" "}
        </small>
      </Card.Body>
    </Card>
  );
}
