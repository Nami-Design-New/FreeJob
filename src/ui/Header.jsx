import { useEffect, useState } from "react";
import { RiMenuUnfold4Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router";
import { useResponsiveState } from "../hooks/useResponsiveHook";
import { openModal } from "../redux/slices/authModalSlice";
import { useTranslation } from "react-i18next";
import Button from "./Button";
import HeaderSwiper from "./header/HeaderSwiper";
import Logo from "./header/Logo";
import SideMenu from "./header/SideMenu";
import UserDropDown from "./header/UserDropDown";
import LanguageToggle from "./LanguageToggle";
import AuthModal from "./modals/AuthModal";

export default function Header() {
  const isLogin = useSelector((state) => state.authedUser.isLogged);
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useResponsiveState("(min-width: 768px)");
  const dispatch = useDispatch();
  const show = useSelector((state) => state.authModal.show);
  const navigate = useNavigate();
  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    }
  }, [isMobile]);

  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  return (
    <header className="header">
      <nav>
        <Logo />
        {isLogin ? (
          <ul className="nav_links d-lg-flex d-none">
            <li>
              <NavLink to="/purchases">{t("routes.purchases")}</NavLink>
            </li>
            <li>
              <NavLink to="/recieved-orders">
                {t("routes.recieved-request")}
              </NavLink>
            </li>
            <li>
              <NavLink to="/projects-orders">
                {" "}
                {t("navbar.projectsOrders")}
              </NavLink>
            </li>
            <li className="d-flex align-items-center justify-content-center ">
              <LanguageToggle />
            </li>
          </ul>
        ) : (
          <ul className="nav_links d-lg-flex d-none">
            <li>
              <NavLink to={"/projects"}> {t("navbar.projects")}</NavLink>
            </li>
            <li>
              <NavLink to={"/services"}>{t("navbar.services")}</NavLink>
            </li>
            <li>
              <NavLink to={"/community"}>{t("communities.community")}</NavLink>
            </li>
            <li className="d-flex align-items-center justify-content-start ">
              <LanguageToggle />
            </li>
          </ul>
        )}{" "}
        <div className="d-flex align-items-center gap-2 justify-content-end flex-grow-1 ">
          {isLogin ? (
            <section className="button-group d-flex align-items-center gap-2 d-none  d-sm-flex ">
              <Button
                className=""
                content={t("routes.add-project")}
                onClick={() => navigate("add-project")}
              />
              <Button
                content={t("routes.add-service")}
                onClick={() => navigate("add-service")}
              />
            </section>
          ) : (
            <div className=" align-items-center gap-2 d-none d-sm-flex">
              <button className="btn " onClick={() => dispatch(openModal())}>
                {t("routes.login")}
              </button>
              {show && <AuthModal />}
              <Button content={t("navbar.join")} />
            </div>
          )}
          {isLogin && <UserDropDown />}
        </div>
        <button className="btn fs-4" onClick={toggleMenu}>
          <RiMenuUnfold4Fill />
        </button>
      </nav>
      <div className="header_swiper">
        <HeaderSwiper />
      </div>

      <SideMenu state={isOpen} onClose={() => setIsOpen(false)} />
    </header>
  );
}
