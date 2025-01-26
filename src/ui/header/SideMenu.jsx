import { useRef, useState } from "react";
import { Link, NavLink } from "react-router";
import Button from "../Button";
import LanguageToggle from "../LanguageToggle";
import Logo from "./Logo";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import useGetCommunitiesList from "../../hooks/useGetCommunitiesList";
// import useGetAbout from "../../hooks/useGetAbout";
import { Accordion } from "react-bootstrap";
import useGetAbout from "../../hooks/about/useGetAbout";

export default function SideMenu({ state, onClose }) {
  const isLogin = useSelector((state) => state.authedUser.isLogged);
  const lang = useSelector((state) => state.language.lang);
  const { data: footerCategoriesList } = useGetAbout();
  const { data: communities } = useGetCommunitiesList();
  const [isOpen, setIsOpen] = useState();
  const { t } = useTranslation();
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
      className={`side_menu   d-md-hidden  ${lang === "ar" ? "ar" : ""}    `}
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
          <li>
            <NavLink to="/projects">{t("routes.projects")}</NavLink>
          </li>
          <li>
            <NavLink to="/services">{t("routes.services")}</NavLink>
          </li>
          <li>
            <NavLink to="/portfolios">{t("routes.portfolios")}</NavLink>
          </li>
          <li>
            <NavLink to="/freelancers">{t("routes.freelancers")}</NavLink>
          </li>
          <li
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <span>{t("navbar.ynjez")}</span>
                </Accordion.Header>
                <Accordion.Body>
                  <ul onClick={handleCloseMenu}>
                    {footerCategoriesList?.map((category) => (
                      <li key={category.id}>
                        <Link to={`/about/${category.id}`}>
                          {category.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Accordion.Body>
              </Accordion.Item>
              {communities && communities?.length > 0 && (
                <Accordion.Item eventKey="1">
                  <Accordion.Header>
                    <span>{t("navbar.communities")}</span>
                  </Accordion.Header>
                  <Accordion.Body>
                    <ul onClick={handleCloseMenu}>
                      {communities?.map((community) => (
                        <li key={community.id}>
                          <Link
                            to={`/community/${community.name}`}
                            onClick={() => setIsOpen(false)}
                          >
                            {community.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
              )}
            </Accordion>
          </li>

          <li>
            <NavLink to="/blogs">{t("routes.blogs")}</NavLink>
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
            <NavLink to="/projects">{t("routes.projects")}</NavLink>
          </li>
          <li>
            <NavLink to="/services">{t("routes.services")}</NavLink>
          </li>
          <li>
            <NavLink to="/portfolios">{t("routes.portfolios")}</NavLink>
          </li>
          <li>
            <NavLink to="/freelancers">{t("routes.freelancers")}</NavLink>
          </li>
          <li
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            {" "}
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <span>{t("navbar.ynjez")}</span>
                </Accordion.Header>
                <Accordion.Body>
                  <ul>
                    {footerCategoriesList?.map((category) => (
                      <li key={category.id}>
                        <Link
                          to={`/about/${category.id}`}
                          onClick={() => setIsOpen(false)}
                        >
                          {category.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Accordion.Body>
              </Accordion.Item>
              {communities && communities?.length > 0 && (
                <Accordion.Item eventKey="1">
                  <Accordion.Header>
                    <span>{t("navbar.communities")}</span>
                  </Accordion.Header>
                  <Accordion.Body>
                    <ul>
                      {communities?.map((community) => (
                        <li key={community.id}>
                          <Link
                            to={`/community/${community.name}`}
                            onClick={() => setIsOpen(false)}
                          >
                            {community.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
              )}
            </Accordion>
          </li>

          <li>
            <NavLink to="/blogs">{t("routes.blogs")}</NavLink>
          </li>
          <li className="d-flex align-items-center justify-content-start ">
            <LanguageToggle />
          </li>
        </ul>
      )}

      {isLogin ? (
        <div className="button-group d-sm-none d-flex gap-2 mt-2">
          <Button className=" me-2 mb-2 mb-xs-0" content="Add Project" />
          <Button content="Add Service" className="mb-2 mb-xs-0" />
        </div>
      ) : (
        <div className="button-group d-sm-none ms-2 mt-3">
          <button className="btn me-2 mb-2 mb-xs-0">Sign Up</button>
          <Button content="Join" />
        </div>
      )}
    </dialog>
  );
}
