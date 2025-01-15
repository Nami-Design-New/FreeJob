import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { BiSupport } from "react-icons/bi";
import {
  BsBank2,
  BsBell,
  BsBoxArrowRight,
  BsCart,
  BsChat,
  BsSearch,
} from "react-icons/bs";
import { FaEdit, FaRegMoneyBillAlt, FaTrash, FaUser } from "react-icons/fa";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { MdCollections } from "react-icons/md";
import SearchModal from "../modals/SearchModal";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";

export default function UserDropDown() {
  const [show, setShow] = useState(false);
  const { t } = useTranslation();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Dropdown className="actions">
      <Dropdown.Toggle as="button" className="user_btn">
        <img src="https://placehold.co/48" alt="User Avatar" />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <section>
          <Dropdown.Item>
            <Link to="/profile">
              <FaUser /> Mahmoud Abbas
            </Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link to="/balance">
              <FaRegMoneyBillAlt /> {t("navbar.balance")}
            </Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link to="/manage-accounts">
              <BsBank2 />
              {t("navbar.manageAccounts")}
            </Link>
          </Dropdown.Item>
        </section>
        <section>
          <Dropdown.Item>
            <Link to="/edit-profile">
              <FaEdit /> {t("navbar.editProfile")}
            </Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link to="/contact">
              <BiSupport /> {t("navbar.contact")}
            </Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link to="/my-collections">
              <MdCollections /> {t("navbar.myCollections")}
            </Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link to="/complaints-suggestions">
              <IoMdInformationCircleOutline /> {t("navbar.report")}
            </Link>
          </Dropdown.Item>
          <Dropdown.Item>
            {" "}
            <Link to="/notifications">
              <BsBell /> {t("navbar.allNotifications")}
            </Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link to="/chat">
              <BsChat /> {t("chat.chats")}
            </Link>
          </Dropdown.Item>
          <Dropdown.Item>
            {" "}
            <Link to="/cart">
              <BsCart /> {t("navbar.cart")}
            </Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link to="/freelancers">
              <BsSearch /> {t("navbar.freelancers")}
            </Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link to="/profile">
              <FaTrash /> {t("navbar.deleteAccount")}
            </Link>
          </Dropdown.Item>
        </section>
        <section>
          <Dropdown.Item>
            <Link to="/profile">
              <BsBoxArrowRight /> {t("navbar.logout")}
            </Link>
          </Dropdown.Item>
        </section>
      </Dropdown.Menu>
    </Dropdown>
  );
}
