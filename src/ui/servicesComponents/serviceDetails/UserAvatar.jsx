import React from "react";
import { useTranslation } from "react-i18next";
import { FaFile } from "react-icons/fa";
import { formatTimeDifference, getTimeDifference } from "../../../utils/helper";
import StarsRate from "../../StartRate";

export default function UserAvatar({ request }) {
  const { t } = useTranslation();
  const timeDifference = getTimeDifference(request?.created_at);
  const formattedTime = formatTimeDifference(
    timeDifference.years,
    timeDifference.months,
    timeDifference.days,
    timeDifference.hours,
    timeDifference.minutes,
    t
  );

  return (
    <section className="user_rating_avatar">
      <section>
        <img className="user_img img-fluid" src={request.user.image} />
      </section>
      <section className="user_info">
        <h6>{request.user.name}</h6>
        <p>
          <FaFile /> {formattedTime}
        </p>
        <StarsRate rate={request.rate} />
      </section>
    </section>
  );
}
