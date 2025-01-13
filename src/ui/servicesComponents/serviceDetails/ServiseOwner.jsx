import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { BsChatText, BsShare } from "react-icons/bs";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router";
import OwnerComponent from "./OwnerComponent";
import {
  FaClipboard,
  FaFacebook,
  FaInstagram,
  FaRegCopy,
  FaSnapchat,
  FaWhatsapp,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function ServiseOwner() {
  let instructions = true;
  const navigate = useNavigate();
  const { t } = useTranslation();

  const currentPageLink = window.location.href;
  const socialShareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${currentPageLink}`,
    instagram: `https://www.instagram.com/?url=${currentPageLink}`,
    twitter: `https://twitter.com/intent/tweet?url=${currentPageLink}`,
    snapchat: `https://www.snapchat.com/share?url=${currentPageLink}`,
    whatsapp: `https://wa.me/?text=${currentPageLink}`,
  };
  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(currentPageLink);
  };

  return (
    <section className="service_card_owner">
      <OwnerComponent />
      <ul className="card_ul">
        <li className="rate d-flex justify-content-between">
          <p>Puplish Date</p>3 jan
        </li>
        <li className="d-flex justify-content-between">
          <p>Buyers</p>
          <span>0</span>
        </li>
        <li className=" d-flex justify-content-between">
          <p>Orders in Progress</p>
          <span>0</span>
        </li>
        <li className=" d-flex justify-content-between">
          <p>Service Price Starts From</p>
          <span>$100</span>
        </li>
        <li className=" d-flex justify-content-between">
          <p>Delivery Time</p>
          <span>3 days</span>
        </li>
      </ul>
      {instructions && (
        <>
          <section className="label d-flex align-items-center gap-2 mt-3">
            <IoMdInformationCircleOutline />
            <p className="p-0 m-0">instructions</p>
          </section>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </>
      )}
      <section className="share_chat_buttons">
        <Dropdown>
          <Dropdown.Toggle className="butn" id="dropdown-basic">
            <BsShare />
            Share
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <h5>{t("services.share")}</h5>
            <ul className="social">
              <li>
                <a
                  href={socialShareLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebook />
                </a>
                {t("services.facebook")}
              </li>
              <li>
                <a
                  href={socialShareLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram />
                </a>
                {t("services.instagram")}
              </li>
              <li>
                <a
                  href={socialShareLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaXTwitter />
                </a>
                {t("services.twitter")}
              </li>
              <li>
                <a
                  href={socialShareLinks.snapchat}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaSnapchat />
                </a>
                {t("services.snapchat")}
              </li>
              <li>
                <a
                  href={socialShareLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp />
                </a>
                {t("services.whatsapp")}
              </li>
            </ul>
            <p className="text-center">{t("services.orCopyLink")}</p>
            <div className="link">
              <button onClick={handleCopy}>
                <FaRegCopy />
              </button>
              <span onClick={handleCopy} id="url">
                <span>{currentPageLink}</span>
              </span>
            </div>
          </Dropdown.Menu>
        </Dropdown>
        <button onClick={() => navigate("/chat")}>
          <BsChatText />
          Chat
        </button>
      </section>
    </section>
  );
}
