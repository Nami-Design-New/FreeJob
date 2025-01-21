import { Badge } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { formatTimeDifference, getTimeDifference } from "../../utils/helper";
import OwnerComponent from "../servicesComponents/serviceDetails/OwnerComponent";

export default function ServiseOwner({ project }) {
  console.log(project);

  const { t } = useTranslation();
  const timeDifference = getTimeDifference(project?.created_at);
  const formattedTime = formatTimeDifference(
    timeDifference.years,
    timeDifference.months,
    timeDifference.days,
    timeDifference.hours,
    timeDifference.minutes,
    t
  );
  return (
    <section className="service_card_owner">
      <OwnerComponent item={project} />
      <ul className="card_ul">
        <li className="rate d-flex justify-content-between">
          <p>{t("projects.status")}</p>
          <Badge bg="success" p>
            {project.status}
          </Badge>
        </li>
        <li className="rate d-flex justify-content-between">
          <p>{t("projects.publishTime")}</p>
          {formattedTime}
        </li>
        <li className="d-flex justify-content-between">
          <p>{t("projects.budget")}</p>
          <span> {project.price}$</span>
        </li>
        <li className=" d-flex justify-content-between">
          <p>{t("projects.deliveryTime")}</p>
          <span> {project.days} days</span>
        </li>
        <li className=" d-flex justify-content-between">
          <p>{t("projects.averageOffers")}</p>
          <span>{project?.request_average || 0} $</span>
        </li>
        <li className=" d-flex justify-content-between">
          <p>{t("projects.offers")}</p>
          <span>{project.requests_count || 0}</span>
        </li>
      </ul>
    </section>
  );
}
