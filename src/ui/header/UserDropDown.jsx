import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { useTranslation } from "react-i18next";
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
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import {
  logout,
  setIsLogged,
  setUser,
} from "../../redux/slices/authedUserSlice";
import { deleteAccount } from "../../services/apiAuth";
import axiosInstance from "../../utils/axios";
import DeleteAcountModal from "../modals/DeleteAcountModal";

export default function UserDropDown() {
  const { t } = useTranslation();
  const user = useSelector((state) => state.authedUser.user);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] =
    useState(false);
  const [, , deleteCookie] = useCookies();
  const [cookies] = useCookies(["token"]);
  const token = cookies?.token;
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleShowDeleteAccountModal() {
    setIsDeleteAccountModalOpen(true);
  }

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
  const handleDeleteAccount = async () => {
    try {
      setDeleteLoading(true);
      const res = await deleteAccount();
      if (res.data.code === 200) {
        delete axiosInstance.defaults.headers.common["Authorization"];
        toast.success(t("cart.orderSuccess"));
        dispatch(setUser({}));
        dispatch(setIsLogged(false));
        dispatch(logout());
        navigate("/");
      } else {
        toast.error(res.message);
        console.error(res.message);
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setDeleteLoading(false);
      setIsDeleteAccountModalOpen(false);
    }
  };
  return (
    <>
      <Dropdown className="actions">
        <Dropdown.Toggle as="button" className="user_btn">
          <img src={user.image} alt={`${user.name} 's Avatar`} />
        </Dropdown.Toggle>

        <Dropdown.Menu >
          <section>
            <Dropdown.Item as={"p"}>
              <Link to="/profile">
                <FaUser /> {user.name}
              </Link>
            </Dropdown.Item>
            <Dropdown.Item as={"p"}>
              <Link to="/balance">
                <FaRegMoneyBillAlt /> {t("navbar.balance")}
              </Link>
            </Dropdown.Item>
            <Dropdown.Item as={"p"}>
              <Link to="/manage-accounts">
                <BsBank2 />
                {t("navbar.manageAccounts")}
              </Link>
            </Dropdown.Item>
          </section>
          <section>
            <Dropdown.Item as={"p"}>
              <Link to="/edit-profile">
                <FaEdit /> {t("navbar.editProfile")}
              </Link>
            </Dropdown.Item>
            <Dropdown.Item as={"p"}>
              <Link to="/contact">
                <BiSupport /> {t("navbar.contact")}
              </Link>
            </Dropdown.Item>
            <Dropdown.Item as={"p"}>
              <Link to="/my-collections">
                <MdCollections /> {t("navbar.myCollections")}
              </Link>
            </Dropdown.Item>
            <Dropdown.Item as={"p"}>
              <Link to="/complaints-suggestions">
                <IoMdInformationCircleOutline /> {t("navbar.report")}
              </Link>
            </Dropdown.Item>
            <Dropdown.Item as={"p"}>
              {" "}
              <Link to="/notifications">
                <BsBell /> {t("navbar.allNotifications")}
              </Link>
            </Dropdown.Item>
            <Dropdown.Item as={"p"}>
              <Link to="/chat">
                <BsChat /> {t("chat.chats")}
              </Link>
            </Dropdown.Item>
            <Dropdown.Item as={"p"}>
              {" "}
              <Link to="/cart">
                <BsCart /> {t("navbar.cart")}
              </Link>
            </Dropdown.Item>
            <Dropdown.Item as={"p"}>
              <Link to="/freelancers">
                <BsSearch /> {t("navbar.freelancers")}
              </Link>
            </Dropdown.Item>
            <Dropdown.Item as={"p"}>
              <Link to="/bids">
                <BsSearch /> {t("navbar.bids")}
              </Link>
            </Dropdown.Item>
            <Dropdown.Item as={"p"}>
              <Link to={"/edit-profile"} onClick={handleShowDeleteAccountModal}>
                <FaTrash /> {t("navbar.deleteAccount")}
              </Link>
            </Dropdown.Item>
          </section>
          <section>
            <Dropdown.Item as={"p"}>
              <Link onClick={performLogout}>
                <BsBoxArrowRight /> {t("navbar.logout")}
              </Link>
            </Dropdown.Item>
          </section>
        </Dropdown.Menu>
      </Dropdown>
      <DeleteAcountModal
        showModal={isDeleteAccountModalOpen}
        setShowModal={setIsDeleteAccountModalOpen}
        loading={deleteLoading}
        text={t("navbar.areYouSureYouWantToDeleteYourAccount")}
        eventFunction={handleDeleteAccount}
      />
    </>
  );
}
