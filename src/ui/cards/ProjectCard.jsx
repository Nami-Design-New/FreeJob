import { useTranslation } from "react-i18next";
import { FaFile, FaUsers } from "react-icons/fa";
import { Link } from "react-router";
import { formatTimeDifference, getTimeDifference } from "../../utils/helper";
import useTruncateText from "../../hooks/helpers/useTruncateText";

export default function ProjectCard({ project }) {
  const { t } = useTranslation();
  const {
    title,
    requests_count,
    description,
    user: { image, name },
  } = project;

  const truncateText = useTruncateText(description, 150);
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
    <section className="project_card">
      <header className="project_content">
        <Link to={`/projects/${title}`}>
          <h1>{title}</h1>
          <p>{truncateText}</p>
        </Link>
      </header>
      <Link
        to={`/profile/${project?.user?.id}`}
        className="project_owner gap-3"
      >
        <section className="image_user_container">
          <img src={image} />
        </section>
        <section className="project_owner_info">
          <h4>{name}</h4>
          <section className="stats d-flex gap-1 ">
            <section className="gap-1  d-flex align-items-center justify-content-center">
              <FaFile />
              <span>{formattedTime}</span>
            </section>
            <section className="gap-1 d-flex align-items-center justify-content-center">
              <FaUsers />
              <span>{requests_count}</span>
              Offers
            </section>
          </section>
        </section>
      </Link>
    </section>
  );
}
