import { useTranslation } from "react-i18next";
import { FaFile, FaUsers } from "react-icons/fa";
import { Link } from "react-router";
import { useSelector } from "react-redux";
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
  const user = useSelector((state) => state.authedUser.user);
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
        {user?.id === project?.user?.id && (
          <div className="status_action">
            <span className="status">
              {project?.accepted === 0 && project?.refuse_reason !== null
                ? t("projects.refused")
                : project?.status}
            </span>
            {(project?.status === "جديد" || project?.status === "new") && (
              <>
                <Link to={`/edit-project/${project?.id}`}>
                  Edit
                </Link>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    // setShowModal(true);
                  }}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        )}
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
              {project?.requests_count > 0
                ? project?.requests_count + " " + t("projects.offer")
                : t("projects.addFirst")}
            </section>
          </section>{" "}
        </section>
      </Link>
    </section>
  );
}
