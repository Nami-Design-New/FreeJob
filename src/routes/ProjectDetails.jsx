import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { BsChat } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import useGetProject from "../hooks/projects/useGetProject";
import useGetProjectRequests from "../hooks/projects/useGetProjectRequests";
import DataLoader from "../ui/DataLoader";
import AddOffer from "../ui/projects/AddOffer";
import ProjectDetailsComponent from "../ui/projects/ProjectDetailsComponent";
import ProjectOwner from "../ui/projects/ProjectOwner";
import DetailsHeader from "../ui/servicesComponents/serviceDetails/DetailsHeader";
import OffersCard from "../ui/orders/OffersCard";
import ErrorPage from "./ErrorPage";

const ProjectDetails = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const user = useSelector((state) => state.authedUser.user);
  const { data: project, isLoading } = useGetProject();
  const { data: requests, isLoading: isLoadingRequests } =
    useGetProjectRequests(project?.id, "global");
  useEffect(() => {
    if (
      project?.accepted === 0 &&
      project?.refuse_reason !== null &&
      project?.user?.id !== user?.id
    ) {
      navigate("/projects");
    }
  }, [project, user, navigate]);

  if (isLoading || isLoadingRequests) {
    return <DataLoader />;
  }

  if (!isLoading && !project) {
    return <ErrorPage />;
  }
  return (
    <section>
      <section className="project_header_container ">
        <section className="container-md ">
          <DetailsHeader links={t("projects.title")} />
          <p>{project?.title}</p>
        </section>
      </section>

      <section className="container">
        <section className="row gy-5">
          {" "}
          <section className="col-lg-4">
            <ProjectOwner project={project} />
            <Link
              to={`/profile/${project?.user?.id}`}
              className="go_profile_btn"
            >
              {t("projects.gotoProfile")}
            </Link>
          </section>

          <section className="col-lg-8">
            <ProjectDetailsComponent project={project} />
            {!project?.is_my_project && !project?.added_request && (
              <>{!project?.added_request && <AddOffer id={project?.id} />}</>
            )}
          </section>
          
          {requests && requests.length > 0 && (
            <section className="row g-2  rating_container">
              <h6 className="header_rate d-flex align-items-center gap-3">
                <BsChat />
                {t("projects.offersMade")}
              </h6>
              {requests.map((request) => (
                <section key={request.id} className="col-md-6 ">
                  {
                    <OffersCard
                      request={request}
                      isMyProject={project?.is_my_project}
                    />
                  }
                </section>
              ))}
            </section>
          )}
        </section>
      </section>
    </section>
  );
};

export default ProjectDetails;
