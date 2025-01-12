import { useRef, useState } from "react";
import { NavLink } from "react-router";
import Button from "../Button";
import LanguageToggle from "../LanguageToggle";
import Logo from "./Logo";
import { useSelector } from "react-redux";

export default function SideMenu({ state, onClose }) {
  const isLogin = useSelector((state) => state.authedUser.isLogged);
  const lang = useSelector((state) => state.language.lang);
  const dialogRef = useRef(null);
  function handleCloseMenu() {
    onClose();
  }
  if (state) {
    dialogRef.current?.showModal();
  } else {
    dialogRef.current?.close();
  }
  return (
    <dialog
      ref={dialogRef}
      onClose={handleCloseMenu}
      className={`"d-md-hidden"  ${lang === "ar" ? "ar" : ""}    `}
    >
      <header onClick={handleCloseMenu} className="py-3">
        <Logo />
        <button aria-label="Close Menu">&#10005;</button>
      </header>
      {isLogin ? (
        <ul
          className=" d-flex flex-column align-items-start"
          onClick={handleCloseMenu}
        >
          <li>
            <NavLink to="/">Purchases</NavLink>
          </li>
          <li>
            <NavLink to="/">Incoming Requests</NavLink>
          </li>
          <li>
            <NavLink to="/">In Progress</NavLink>
          </li>
          <li className="d-flex align-items-center justify-content-start ">
            <LanguageToggle />
          </li>
        </ul>
      ) : (
        <ul
          className=" d-flex flex-column align-items-start"
          onClick={handleCloseMenu}
        >
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
      )}

      {isLogin ? (
        <div className="button-group d-sm-none ms-2">
          <Button className=" me-2 mb-2 mb-xs-0" content="Add Project" />
          <Button content="Add Service" className="mb-2 mb-xs-0" />
        </div>
      ) : (
        <div className="button-group d-sm-none ms-2">
          <button className="btn me-2 mb-2 mb-xs-0">Sign Up</button>
          <Button content="Join" />
        </div>
      )}
    </dialog>
  );
}
