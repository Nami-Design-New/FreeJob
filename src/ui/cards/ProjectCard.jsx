import { useTranslation } from "react-i18next";
import {
  FaArrowLeft,
  FaArrowRight,
  FaEdit,
  FaFile,
  FaTrash,
  FaUsers,
} from "react-icons/fa";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import { formatTimeDifference, getTimeDifference } from "../../utils/helper";
import useTruncateText from "../../hooks/helpers/useTruncateText";
import ConfirmationModal from "../profile/ConfirmationModal";
import { useState } from "react";
import { toast } from "react-toastify";
import { deleteProject } from "../../services/apiProjects";
import { useQueryClient } from "@tanstack/react-query";

export default function ProjectCard({ project, isProfile }) {
  const { t } = useTranslation();
  const {
    title,
    description,
    user: { image, name },
  } = project;
  const user = useSelector((state) => state.authedUser.user);
  const truncateText = useTruncateText(description, 150);
  const [showModal, setShowModal] = useState(false);
  const lang = useSelector((state) => state.language.lang);
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const timeDifference = getTimeDifference(project?.created_at);
  const formattedTime = formatTimeDifference(
    timeDifference.years,
    timeDifference.months,
    timeDifference.days,
    timeDifference.hours,
    timeDifference.minutes,
    t
  );
  const delteProject = async () => {
    setLoading(true);
    try {
      await deleteProject(project?.id, queryClient);
      setShowModal(false);
      toast.success(t("projects.projectDeleted"));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <section className="project_card">
        <div>
          {" "}
          <div className="project_content">
            <Link to={`/projects/${title}`}>
              <h1>{title}</h1>
              <p>{truncateText}</p>
            </Link>
          </div>
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
        </div>
        <div className="status_action">
          {user?.id === project?.user?.id &&
            (project?.status === "جديد" || project?.status === "new") && (
              <div className="projectCardSection">
                <Link to={`/edit-project/${project?.title}`}>
                  <FaEdit />
                </Link>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowModal(true);
                  }}
                >
                  <FaTrash />
                </button>
              </div>
            )}
          {!isProfile && (
            <button className="project_settings_button">
              {lang === "ar" ? <FaArrowLeft /> : <FaArrowRight />}
            </button>
          )}
        </div>
      </section>
      <ConfirmationModal
        showModal={showModal}
        setShowModal={setShowModal}
        buttonText={t("projects.deleteProject")}
        text={t("projects.areYouSureYouWantToDelete")}
        eventFun={delteProject}
        loading={loading}
      />
    </>
  );
}
