import React from "react";
import { useTranslation } from "react-i18next";
import DetailsHeader from "../ui/servicesComponents/serviceDetails/DetailsHeader";
import { useLocation } from "react-router";
import ContactForm from "../ui/form/ContactForm";

const Contact = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const segments = pathname
    .split("/")
    .filter((segment) => segment === "contact")[0]
    .split("-")
    .join(" ");

  return (
    <section className="contactus">
      <section className="header_container mb-4">
        <div className="container-md">
          <DetailsHeader links={segments} />
        </div>
      </section>

      <section className="contact-content container my-5">
        <div className="row">
          {/* Left Side: Image */}
          <div className="col-md-6">
            <img
              src="/images/contactus.png"
              alt="Contact Us"
              className="img-fluid rounded"
            />
          </div>

          {/* Right Side: Form */}
          <div className="col-md-6">
            <ContactForm /> 
          </div>
        </div>
      </section>
    </section>
  );
};

export default Contact;
