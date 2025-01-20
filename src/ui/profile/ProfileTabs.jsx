import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import useUserServices from "../../hooks/services/useUserServices";
import useGetWorks from "../../hooks/works/useGetWorks";
import useGetUserProjects from "../../hooks/projects/useGetUserProjects";
import { deleteService } from "../../services/apiServices";
import { toast } from "react-toastify";
import { Tab, Tabs } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import ServiceCard from "../cards/ServiceCard";
import DataLoader from "../DataLoader";
import ProjectCard from "../cards/ProjectCard";
import { HiOutlineBadgeCheck } from "react-icons/hi";
import { BsPatchCheck } from "react-icons/bs";
import WorksTap from "./WorksTap";
import ConfirmationModal from "./ConfirmationModal";
import CertificatesTab from "./CertificatesTab";
function ProfileTabs({ user, isMyAccount }) {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const [serviceId, setServiceId] = useState(null);
  const [loading, setLoading] = useState(false);
  const { data: services } = useUserServices(user?.id);
  const { data: myProjects, isLoading } = useGetUserProjects(user?.id);
  const { data: works } = useGetWorks(user?.id);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDelete = (id) => {
    setShowConfirmation(true);
    setServiceId(id);
  };

  const handleDeleteService = async () => {
    setLoading(true);
    try {
      await deleteService(serviceId, queryClient);
      toast.success(t("addService.serviceDeleted"));
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      setShowConfirmation(false);
    }
  };
  return (
    <>
      <Tabs defaultActiveKey="about" id="uncontrolled-tab-example">
        {/* about me */}
        <Tab eventKey="about" title={t("profile.aboutMe")} className="tab_item">
          <div className="user_about">
            {user?.about ? (
              <p>{user?.about}</p>
            ) : (
              <>
                {isMyAccount && (
                  <Link to="/edit-profile">
                    <FaPlus stroke={1} /> {t("profile.noAbout")}
                  </Link>
                )}
              </>
            )}
          </div>
        </Tab>

        {/* services */}
        <Tab
          eventKey="service"
          title={t("profile.services")}
          className="tab_item"
        >
          <div className="services-container">
            {isMyAccount && (
              <Link to="/add-service" className="add-service">
                <FaCirclePlus stroke={2} /> {t("profile.addService")}
              </Link>
            )}

            <div className="services_grid">
              {services?.length === 0 ? (
                <div className="noDataFound">
                  <h4>{t("profile.noService")}</h4>
                </div>
              ) : (
                <>
                  {services?.map((service) => (
                    <ServiceCard
                      canEdit={isMyAccount}
                      key={service.id}
                      service={service}
                      handleDelete={handleDelete}
                      showPending={true}
                    />
                  ))}
                </>
              )}
            </div>
          </div>
        </Tab>

        {/* projects */}
        <Tab
          eventKey="projects"
          title={t("profile.projects")}
          className="tab_item"
        >
          <div className="services-container">
            {isMyAccount && (
              <Link to="/add-project" className="add-service mb-3">
                <FaCirclePlus stroke={2} /> {t("routes.add-project")}
              </Link>
            )}
            {isLoading ? (
              <DataLoader />
            ) : (
              <div className="projects_wrapper">
                {myProjects?.length === 0 ? (
                  <div className="noDataFound">
                    <h4>{t("profile.noProjects")}</h4>
                  </div>
                ) : (
                  <>
                    {myProjects?.map((project) => (
                      <ProjectCard key={project?.id} project={project} />
                    ))}
                  </>
                )}
              </div>
            )}
          </div>
        </Tab>

        {/* verifications */}
        <Tab
          eventKey="documentation"
          title={t("profile.verification")}
          className="tab_item"
        >
          <div className="tab-pane">
            <ul className="verify-list">
              <li className="d-flex gap-2">
                {user?.verified === 1 ? (
                  <BsPatchCheck stroke={2} />
                ) : (
                  <BsPatchCheck className="tabler-danger" stroke={2} />
                )}
                {t("profile.personalIdentification")}
              </li>
              <li className="d-flex gap-2">
                {user?.phone_verified === 1 ? (
                  <BsPatchCheck stroke={2} />
                ) : (
                  <BsPatchCheck className="tabler-danger" stroke={2} />
                )}
                {t("profile.phoneNumber")}
              </li>
              <li className="d-flex gap-2">
                <BsPatchCheck stroke={2} />
                {t("profile.emailAddress")}
              </li>
            </ul>
            {isMyAccount && (
              <>
                {(user?.verified === 0 || user?.phone_verified === 0) && (
                  <div className="unverified-box mb-3 d-block">
                    <h6>{t("profile.notVerified")}</h6>
                  </div>
                )}
                <div className="d-flex gap-2">
                  {user?.phone_verified === 0 && (
                    <div className="unverified-box">
                      <Link to="/verify-phone">{t("profile.verifyPhone")}</Link>
                    </div>
                  )}
                  {user?.verified === 0 && (
                    <div className="unverified-box">
                      <Link to="/verify-identity">
                        {t("profile.verifyYourIdentity")}
                      </Link>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </Tab>

        {/*  statistics */}
        <Tab
          eventKey="statistics"
          title={t("profile.statistics")}
          className="tab_item"
        >
          <div
            className="tab-pane"
            id="pills-statics"
            role="tabpanel"
            aria-labelledby="pills-statics-tab"
          >
            <ul className="statics-list p-2">
              <li className="d-flex justify-content-between">
                <h6>{t("profile.puplidhedServices")}</h6>
                <span>{user?.service_count}</span>
              </li>
              <li className="d-flex justify-content-between">
                <h6>{t("profile.clientsNumber")}</h6>
                <span>{user?.customer_count}</span>
              </li>
            </ul>
          </div>
        </Tab>

        {/* my works */}
        <Tab
          eventKey="My works"
          title={t("profile.myWorks")}
          className="tab_item"
        >
          <WorksTap works={works} isMyAccount={isMyAccount} />
        </Tab>

        {/* my certificates */}
        <Tab
          eventKey="My Certifications"
          title={t("profile.myCertificates")}
          className="tab_item"
        >
          <CertificatesTab user={user} isMyAccount={isMyAccount} />
        </Tab>
      </Tabs>
      <ConfirmationModal
        eventFun={handleDeleteService}
        showModal={showConfirmation}
        setShowModal={setShowConfirmation}
        loading={loading}
        text={t("profile.areYouSureWantToDeleteThisService")}
        buttonText={t("profile.deleteService")}
      />
    </>
  );
}

export default ProfileTabs;
