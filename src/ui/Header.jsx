import { useEffect, useState } from "react";
import { BsGlobe } from "react-icons/bs";
import { RiMenuUnfold4Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router";
import { useResponsiveState } from "../hooks/useResponsiveHook";
import { openModal } from "../redux/slices/authModalSlice";
import Button from "./Button";
import HeaderSwiper from "./header/HeaderSwiper";
import Logo from "./header/Logo";
import SideMenu from "./header/SideMenu";
import UserDropDown from "./header/UserDropDown";
import LanguageToggle from "./LanguageToggle";
import AuthModal from "./modals/AuthModal";

export default function Header() {
  const isLogin = useSelector((state) => state.authedUser.isLogged);

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
      <nav className="container-md">
        <Logo />
        {isLogin ? (
          <ul className="nav_links d-lg-flex d-none">
            <li>
              <NavLink to="/">Purchases</NavLink>
            </li>
            <li>
              <NavLink to="/">Incoming Requests</NavLink>
            </li>
            <li>
              <NavLink to="/">In Progress</NavLink>
            </li>
            <li className="d-flex align-items-center justify-content-center ">
              <LanguageToggle />
            </li>
          </ul>
        ) : (
          <ul className="nav_links d-lg-flex d-none">
            <li>
              <NavLink>Projects</NavLink>
            </li>
            <li>
              <NavLink>Services</NavLink>
            </li>
            <li>
              <NavLink>Community</NavLink>
            </li>
            <li className="d-flex align-items-center justify-content-start ">
              <LanguageToggle />
            </li>
          </ul>
        )}{" "}
        <div className="d-flex align-items-center gap-2 justify-content-end flex-grow-1 ">
          {isLogin ? (
            <div className="button-group d-flex align-items-center gap-2 d-none  d-sm-flex ">
              <Button className="" content="Add Project" />
              <Button
                content="Add Service"
                onClick={() => navigate("add-service")}
              />
            </div>
          ) : (
            <div className=" align-items-center gap-2 d-none d-sm-flex">
              <button className="btn " onClick={() => dispatch(openModal())}>
                Sign Up
              </button>
              {show && <AuthModal />}
              <Button content="Join" />
            </div>
          )}
          {isLogin && <UserDropDown />}
        </div>
        <button className="btn fs-4 d-lg-none" onClick={toggleMenu}>
          <RiMenuUnfold4Fill />
        </button>
      </nav>
      <div className="container-md">
        <HeaderSwiper />
      </div>
      <SideMenu state={isOpen} onClose={() => setIsOpen(false)} />
    </header>
  );
}
