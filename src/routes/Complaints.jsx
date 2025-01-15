import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import DetailsHeader from "../ui/servicesComponents/serviceDetails/DetailsHeader";
import { useLocation } from "react-router";

const Complaints = () => {
  const { t } = useTranslation();
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleFileRemove = () => {
    setUploadedFile(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(t("Complaint submitted successfully!"));
  };

  const { pathname } = useLocation();

  const segments = pathname
    .split("/")
    .filter((segment) => segment === "Report aproblem");

  const pageTitle = segments.length > 0 ? segments[0].split("-").join(" ") : "Report aproblem";

  return (
    <section className="complaints-page">
      <section className="collections_header_container mb-4">
        <div className="container-md">
          <DetailsHeader links={pageTitle} />
        </div>
      </section>

      <section className="container my-5">
      {/* Header */}
      <div className="text-center mb-4">
        <img
          src="./images/support.png"
          alt="hed-img"
          className="mb-3"
          style={{ maxWidth: "180px" }}
        />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className=" p-4 rounded">
        <div className="row mb-3 ">
          <div className="col-md-6">
            <label className="form-label ">{t("Title")}</label>
            <input
              style={{backgroundColor: "#E8FAF4"}}
              type="text"
              className="form-control border-0"
              placeholder={t("Enter the title of the issue")}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label ">{t("Issue Type")}</label>
            <input
            style={{backgroundColor: "#E8FAF4"}}
              type="text"
              className="form-control border-0"
              placeholder={t("Enter the type of issue")}
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">{t("Message")}</label>
          <textarea
          style={{backgroundColor: "#E8FAF4"}}
            className="form-control border-0"
            rows="5"
            placeholder={t("Describe the issue in detail")}
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">{t("Add Supporting Files")}</label>
          <div className="d-flex align-items-center">
            <input
              type="file"
              className="form-control border-0"
              onChange={handleFileUpload}
              style={{ backgroundColor: "#E8FAF4"}}
            />
            {uploadedFile && (
              <div className="ms-3 d-flex align-items-center">
                <span className="me-2">{uploadedFile.name}</span>
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={handleFileRemove}
                >
                  {t("Remove")}
                </button>
              </div>
            )}
          </div>
        </div>

        <button type="submit" className="btn btn-dark w-100">
          {t("Submit Complaint")}
        </button>
      </form>
    </section>
    </section>
  );
};

export default Complaints;
