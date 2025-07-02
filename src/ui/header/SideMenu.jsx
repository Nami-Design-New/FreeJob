import { useRef, useEffect } from "react";
import { Link, NavLink } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Accordion } from "react-bootstrap";
import Button from "../Button";
import LanguageToggle from "../LanguageToggle";
import Logo from "./Logo";
import useGetCommunitiesList from "../../hooks/useGetCommunitiesList";
import useGetAbout from "../../hooks/about/useGetAbout";
import { openModal } from "../../redux/slices/authModalSlice";

export default function SideMenu({ state, onClose, menuButtonRef }) {
  const isLogin = useSelector((state) => state.authedUser.isLogged);
  const lang = useSelector((state) => state.language.lang);
  const dispatch = useDispatch();
  const { data: footerCategoriesList } = useGetAbout();
  const { data: communities } = useGetCommunitiesList();
  const { t } = useTranslation();
  const dialogRef = useRef(null);

  function handleCloseMenu() {
    onClose();
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dialogRef.current &&
        !dialogRef.current.contains(event.target) &&
        !menuButtonRef.current.contains(event.target)
      ) {
        handleCloseMenu();
      }
    };

    if (state) {
      dialogRef.current?.showModal();
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      dialogRef.current?.close();
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, menuButtonRef]);
  const handleBackdropClick = (event) => {
    if (event.target === dialogRef.current) {
      handleCloseMenu();
    }
  };
  return (
    <dialog
      ref={dialogRef}
      onClose={handleCloseMenu}
      onClick={handleBackdropClick}
      className={`side_menu d-md-hidden ${lang === "ar" ? "ar" : ""}`}
    >
      <header onClick={handleCloseMenu} className="py-3">
        <Logo />
        <button aria-label="Close Menu">&#10005;</button>
      </header>

      {isLogin ? (
        <ul
          className="d-flex flex-column align-items-start"
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

          <li onClick={(event) => event.stopPropagation()}>
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <span>{t("navbar.Ebday")}</span>
                </Accordion.Header>
                <Accordion.Body className="p-0 pt-3">
                  <ul onClick={handleCloseMenu} className="flex-column p-0">
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
              {communities?.length > 0 && (
                <Accordion.Item eventKey="1">
                  <Accordion.Header>
                    <span>{t("navbar.communities")}</span>
                  </Accordion.Header>
                  <Accordion.Body className="p-0 pt-3">
                    <ul onClick={handleCloseMenu} className="flex-column p-0">
                      {communities.map((community) => (
                        <li key={community.id}>
                          <Link to={`/community/${community.name}`}>
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
          <li className="d-flex align-items-center justify-content-start">
            <LanguageToggle />
          </li>
        </ul>
      ) : (
        <ul
          className="d-flex flex-column align-items-start"
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
          <li onClick={(event) => event.stopPropagation()}>
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <span>{t("navbar.Ebday")}</span>
                </Accordion.Header>
                <Accordion.Body className="p-0 pt-3">
                  <ul className="flex-column p-0">
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
              {communities?.length > 0 && (
                <Accordion.Item eventKey="1">
                  <Accordion.Header>
                    <span>{t("navbar.communities")}</span>
                  </Accordion.Header>
                  <Accordion.Body className="p-0 pt-3">
                    <ul className="flex-column p-0">
                      {communities.map((community) => (
                        <li key={community.id}>
                          <Link to={`/community/${community.name}`}>
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

          <li
            onClick={(event) => {
              event.stopPropagation();
              handleCloseMenu();
              dispatch(openModal());
            }}
          >
            <NavLink>{t("routes.login")}</NavLink>
          </li>
          <li className="d-flex align-items-center justify-content-start">
            <LanguageToggle />
          </li>
        </ul>
      )}

      {isLogin && (
        <div className="button-group d-sm-none d-flex gap-2 mt-2">
          <Button className="me-2 mb-2 mb-xs-0" content="Add Project" />
          <Button content="Add Service" className="mb-2 mb-xs-0" />
        </div>
      )}
    </dialog>
  );
}
