import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import StarsRate from "../modals/StarsList";

function FreelancerCard({ freelancer, truncate }) {
  const { t } = useTranslation();
  const [imgError, setImgError] = useState(false);

  return (
    <Link to={`/profile/${freelancer?.id}`} className="freelancerCard">
      <div className="d-flex justify-content-between">
        <div className="info">
          <div className="img">
            <img
              src={
                imgError
                  ? "./images/avatar-placeholder-2.svg"
                  : freelancer.image
              }
              alt={freelancer?.name}
              onError={() => setImgError(true)}
            />
            {freelancer?.verified === 1 && <span className="status"></span>}
          </div>
          <div className="content">
            <h6>{freelancer?.name}</h6>
            <ul>
              <li>
                <i className="fa-regular fa-cubes"></i> {t("servicesCount")}:{" "}
                {freelancer?.service_count}
              </li>
            </ul>
          </div>
        </div>
        <StarsRate rate={freelancer?.rate} />
      </div>
      <p>{truncate(freelancer?.about)}</p>
    </Link>
  );
}

export default FreelancerCard;
