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
import { Link, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../utils/axios";
import { useCookies } from "react-cookie";
import { useQueryClient } from "@tanstack/react-query";
import { setIsLogged, setUser } from "../../redux/slices/authedUserSlice";

export default function UserDropDown() {
  const [show, setShow] = useState(false);
  const { t } = useTranslation();
  const user = useSelector((state) => state.authedUser.user);

  const [, , deleteCookie] = useCookies();
  const [cookies] = useCookies(["token"]);
  const token = cookies?.token;
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const performLogout = async () => {
    try {
      const deleteToken = await axiosInstance.post("/user/logout", {
        token: token,
      });
      if (deleteToken.data.code === 200) {
        deleteCookie("token");
        deleteCookie("id");
        delete axiosInstance.defaults.headers.common["Authorization"];
        dispatch(setUser({}));
        dispatch(setIsLogged(false));
        navigate("/");
        queryClient.clear();
        sessionStorage.clear();
      }
    } catch (error) {
      console.error("Error during logout:", error);
      throw new Error(error.message);
    }
  };
  // const
  return (
    <Dropdown className="actions">
      <Dropdown.Toggle as="button" className="user_btn">
        <img src={user.image} alt={`${user.name} 's Avatar`} />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <section>
          <Dropdown.Item>
            <Link to="/profile">
              <FaUser /> {user.name}
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
            <Link onClick={performLogout}>
              <BsBoxArrowRight /> {t("navbar.logout")}
            </Link>
          </Dropdown.Item>
        </section>
      </Dropdown.Menu>
    </Dropdown>
  );
}
