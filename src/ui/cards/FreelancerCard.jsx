import { useState } from "react";
import { Link } from "react-router-dom";
import StarsRate from "../StartRate";
import { useTranslation } from "react-i18next";
import { FaCubes } from "react-icons/fa";

function FreelancerCard({ freelancer }) {
  const { t } = useTranslation();
  const [imgError, setImgError] = useState(false);

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "?";
  };

  return (
    <Link to={`/profile/${freelancer.id}`} className="freelancerCard">
      <div
        className="card d-flex align-items-center p-3 rounded-3 shadow-sm"
        style={{ backgroundColor: "#fff", border: "1px solid #ddd" }}
      >
        <div className="d-flex align-items-center w-100">
          <div className="img me-3">
            {imgError || !freelancer.image ? (
              <div
                className="rounded-circle d-flex align-items-center justify-content-center"
                style={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "#6c757d",
                  color: "#fff",
                  fontSize: "20px",
                  fontWeight: "600",
                  border: "2px solid #6c757d",
                }}
              >
                {getInitial(freelancer.name)}
              </div>
            ) : (
              <img
                className="rounded-circle"
                style={{
                  width: "50px",
                  height: "50px",
                  objectFit: "cover",
                  border: "2px solid #6c757d",
                }}
                src={freelancer.image}
                alt={freelancer.name}
                onError={() => setImgError(true)}
              />
            )}
          </div>

          <div className="content flex-grow-1">
            <h6
              className="mb-1"
              style={{ fontWeight: "600", color: "#343a40", fontSize: "16px" }}
            >
              {freelancer.name}
            </h6>
            <p className="mb-0 text-muted" style={{ fontSize: "14px" }}>
              <FaCubes className="me-1 text-muted" />
              {t("servicesCount")}: {freelancer.service_count}
            </p>
          </div>

          <div className="rate" style={{ textAlign: "right" }}>
            <StarsRate rate={freelancer.rate} />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default FreelancerCard;
