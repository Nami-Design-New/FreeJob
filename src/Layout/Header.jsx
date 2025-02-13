import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { RiMenuFold4Fill, RiMenuUnfold4Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router";
import { openModal } from "../redux/slices/authModalSlice";
import { useResponsiveState } from "./../hooks/helpers/useResponsiveHook";
import Button from "./../ui/Button";
import HeaderSwiper from "./../ui/header/HeaderSwiper";
import Logo from "./../ui/header/Logo";
import SideMenu from "./../ui/header/SideMenu";
import UserDropDown from "./../ui/header/UserDropDown";
import LanguageToggle from "./../ui/LanguageToggle";
import AuthModal from "./../ui/modals/AuthModal";
import NotificationDropdown from "../ui/header/NotificationDropdown";
import CommunityDropDown from "../ui/header/CommunityDropDown";

export default function Header() {
  const isLogin = useSelector((state) => state.authedUser.isLogged);
  const { t } = useTranslation();
  const lang = useSelector((state) => state.language.lang);
  const user = useSelector((state) => state.authedUser.user);
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
          <>
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
                  {t("navbar.projectsOrders")}
                </NavLink>
              </li>
              <li className="d-flex align-items-center justify-content-center ">
                <LanguageToggle />
              </li>
            </ul>
            <ul className="nav_icons d-lg-flex d-none">
              <li>
                <Link to="/cart" className="btn">
                  <i className="fa-light fa-cart-shopping"></i>
                  <span className="num-count">{user?.cart_count || 0}</span>
                </Link>
              </li>
              {/* Notifications */}
              <li
                className={` notifications ${lang === "en" ? "reverse" : ""}`}
              >
                <NotificationDropdown />
              </li>
            </ul>
          </>
        ) : (
          <ul className="nav_links d-lg-flex d-none">
            <li>
              <NavLink to={"/projects"}> {t("navbar.projects")}</NavLink>
            </li>
            <li>
              <NavLink to={"/services"}>{t("navbar.services")}</NavLink>
            </li>
            <CommunityDropDown />
            <li className="d-flex align-items-center justify-content-start ">
              <LanguageToggle />
            </li>
          </ul>
        )}{" "}
        <div className="d-flex align-items-center gap-2 justify-content-end">
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
            </div>
          )}
          {isLogin && <UserDropDown />}
        </div>
        <button className="btn fs-4 toggler" onClick={toggleMenu}>
          {lang === "en" ? <RiMenuUnfold4Fill /> : <RiMenuFold4Fill />}
        </button>
      </nav>
      <div className="header_swiper">
        <HeaderSwiper />
      </div>

      <SideMenu state={isOpen} onClose={() => setIsOpen(false)} />
    </header>
  );
}
