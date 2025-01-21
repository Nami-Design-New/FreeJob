import { useTranslation } from "react-i18next";
import ContactForm from "../ui/form/ContactForm";
import DetailsHeader from "../ui/servicesComponents/serviceDetails/DetailsHeader";

const Contact = () => {
  const { t } = useTranslation();

  return (
    <section className="contactus">
      <section className="header_container mb-4">
        <div className="container-md">
          <DetailsHeader links={t("routes.contact")} />
        </div>
      </section>

      <section className="contact-content container my-5">
        <div className="row">
          {/* Left Side: Image */}
          <div className="col-md-6 d-none d-md-block">
            <img
              src="./images/contact.webp"
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
