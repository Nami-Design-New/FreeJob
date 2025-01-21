import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { formatTimeDifference, getTimeDifference } from "../../utils/helper";

function BidCard({ bid }) {
  const { t } = useTranslation();

  const timeDifference = getTimeDifference(bid?.created_at);
  const formattedTime = formatTimeDifference(
    timeDifference.years,
    timeDifference.months,
    timeDifference.days,
    timeDifference.hours,
    timeDifference.minutes,
    t
  );

  return (
    <Link to={`/bids/${bid?.id}`} className="bid-card">
      <div className="d-flex align-items-center w-100 justify-content-between">
        <h4>{bid?.project?.title}</h4>
        <span className={`bid-status ${bid?.status}`}>
          {bid?.project?.status_name}
        </span>
      </div>
      <ul>
        <li>
          <i className="fa-user"></i>
          <span> {bid?.project?.user?.name}</span>
        </li>
        <li>
          <i className="faTime"></i>
          <span> {`${t("projects.publishedScience")} ${formattedTime}`}</span>
        </li>
        <li>
          <i className="fa-monybag"></i>
          <span>{`$${bid?.price}`}</span>
        </li>
        <li>
          <i className="fa-calender"></i>
          <span>{`${t("projects.deliveryTime")} ${bid?.days} ${t(
            "projects.days"
          )}`}</span>
        </li>
      </ul>
      <p>{bid?.project?.description}</p>
    </Link>
  );
}

export default BidCard;
