import { Fragment, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import useGetNotifications from "../../hooks/useGetNotifications";
import NotificationItem from "./NotificationItem";

export default function NotificationDropdown() {
  const { t } = useTranslation();
  const user = useSelector((state) => state.authedUser.user);
  const { data: notifications } = useGetNotifications();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dropdown
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      show={isOpen}
      style={{ position: "relative" }}
    >
      <Dropdown.Toggle
        style={{
          backgroundColor: "white",
          outline: "none",
          border: "none",
        }}
        id="dropdown-basic"
      >
        <i className="fa-regular fa-bell " style={{ color: "#000" }}></i>
        {/* <span className="num-count">{user?.receive_notification || 0}</span> */}
      </Dropdown.Toggle>
      <Dropdown.Menu align="start">
        <div className="scroll_menu">
          {notifications?.map((notification) => (
            <Fragment key={notification?.title}>
              <Dropdown.Item>
                <NotificationItem notification={notification} />
              </Dropdown.Item>
            </Fragment>
          ))}
        </div>
        <Link className="showall" to="/notifications">
          {t("navbar.allNotifications")}
        </Link>
      </Dropdown.Menu>
    </Dropdown>
  );
}
