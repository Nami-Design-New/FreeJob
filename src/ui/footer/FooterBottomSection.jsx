import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
  FaTiktok,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { RxAccessibility } from "react-icons/rx";
import { Link } from "react-router";
import Logo from "../header/Logo";
import LanguageToggle from "../LanguageToggle";

export default function FooterBottomSection() {
  return (
    <section className="footer_bottom_sec row gy-3 gx-3 ">
      <div className="copy_rights col col-md-12 col-lg-5 ">
        <Logo />
        <p>
          &copy; <Link to="/"> tet International Ltd. </Link>{" "}
          {new Date().getFullYear()}
        </p>
      </div>
      <div className="social_media_links col-md-4 ">
        <Link>
          <FaTiktok />
        </Link>
        <Link>
          <FaInstagram />
        </Link>
        <Link>
          <FaLinkedin />
        </Link>
        <Link>
          <FaFacebook />
        </Link>
        <Link>
          <FaPinterest />
        </Link>
        <Link>
          <FaXTwitter />
        </Link>
      </div>
      <div className="d-flex align-items-center gap-2 col-md-3 ">
        <div className="d-flex align-items-center justify-content-center">
          <LanguageToggle />
        </div>
        <p className="m-0">$USD</p>
        <Link className="accessibility">
          <RxAccessibility />
        </Link>
      </div>
    </section>
  );
}
