import React from "react";
import { Tabs, Tab } from "react-bootstrap";

function ProfileTabs({ user }) {
  return (
    <Tabs
      defaultActiveKey="about"
      id="profile-tabs"
      className="mb-3 bg-light tabs-container"
      justify
    >
      <Tab
        eventKey="about"
        title={<span className="text-success">About Me</span>}
      >
        <div className="tab-content">
          <p className="text-center">
            {user.about || "No information provided."}
          </p>
        </div>
      </Tab>
      <Tab
        eventKey="services"
        title={<span className="text-success">Services</span>}
      >
        <div className="tab-content">
          {user.services?.length > 0 ? (
            <ul>
              {user.services.map((service, index) => (
                <li key={index}>{service}</li>
              ))}
            </ul>
          ) : (
            <p className="text-center">No services available for this user.</p>
          )}
        </div>
      </Tab>
      <Tab
        eventKey="projects"
        title={<span className="text-success">Projects</span>}
      >
        <div className="tab-content">
          <p className="text-center">No projects to display.</p>
        </div>
      </Tab>
      <Tab
        eventKey="certificates"
        title={<span className="text-success">My Certificates</span>}
      >
        <div className="tab-content">
          <p className="text-center">No certificates available.</p>
        </div>
      </Tab>
    </Tabs>

    // <>
    //   <Tabs defaultActiveKey="about" id="uncontrolled-tab-example">
    //     {/* about me */}
    //     <Tab eventKey="about" title={t("profile.aboutMe")} className="tab_item">
    //       <div className="user_about">
    //         {user?.about ? (
    //           <p>{user?.about}</p>
    //         ) : (
    //           <>
    //             {isMyAccount && (
    //               <Link to="/edit-profile">
    //                 <IconPlus stroke={1} /> {t("profile.noAbout")}
    //               </Link>
    //             )}
    //           </>
    //         )}
    //       </div>
    //     </Tab>

    //     {/* services */}
    //     <Tab
    //       eventKey="service"
    //       title={t("profile.services")}
    //       className="tab_item"
    //     >
    //       <div className="services-container">
    //         {isMyAccount && (
    //           <Link to="/add-service" className="add-service">
    //             <IconCirclePlus stroke={2} /> {t("profile.addService")}
    //           </Link>
    //         )}

    //         <div className="services_grid">
    //           {services?.length === 0 ? (
    //             <div className="noDataFound">
    //               <h4>{t("profile.noService")}</h4>
    //             </div>
    //           ) : (
    //             <>
    //               {services?.map((service) => (
    //                 <ServiceCard
    //                   canEdit={isMyAccount}
    //                   key={service.id}
    //                   service={service}
    //                   handleDelete={handleDelete}
    //                   showPending={true}
    //                 />
    //               ))}
    //             </>
    //           )}
    //         </div>
    //       </div>
    //     </Tab>

    //     {/* projects */}
    //     <Tab
    //       eventKey="projects"
    //       title={t("profile.projects")}
    //       className="tab_item"
    //     >
    //       <div className="services-container">
    //         {isMyAccount && (
    //           <Link to="/add-project" className="add-service mb-3">
    //             <IconCirclePlus stroke={2} /> {t("routes.add-project")}
    //           </Link>
    //         )}
    //         {isLoading ? (
    //           <DataLoader />
    //         ) : (
    //           <div className="projects_wrapper">
    //             {myProjects?.length === 0 ? (
    //               <div className="noDataFound">
    //                 <h4>{t("profile.noProjects")}</h4>
    //               </div>
    //             ) : (
    //               <>
    //                 {myProjects?.map((project) => (
    //                   <ProjectCard key={project?.id} project={project} />
    //                 ))}
    //               </>
    //             )}
    //           </div>
    //         )}
    //       </div>
    //     </Tab>

    //     {/* verifications */}
    //     <Tab
    //       eventKey="documentation"
    //       title={t("profile.verification")}
    //       className="tab_item"
    //     >
    //       <div className="tab-pane">
    //         <ul className="verify-list">
    //           <li className="d-flex gap-2">
    //             {user?.verified === 1 ? (
    //               <IconRosetteDiscountCheck stroke={2} />
    //             ) : (
    //               <IconBrandXamarin className="tabler-danger" stroke={2} />
    //             )}
    //             {t("profile.personalIdentification")}
    //           </li>
    //           <li className="d-flex gap-2">
    //             {user?.phone_verified === 1 ? (
    //               <IconRosetteDiscountCheck stroke={2} />
    //             ) : (
    //               <IconBrandXamarin className="tabler-danger" stroke={2} />
    //             )}
    //             {t("profile.phoneNumber")}
    //           </li>
    //           <li className="d-flex gap-2">
    //             <IconRosetteDiscountCheck stroke={2} />
    //             {t("profile.emailAddress")}
    //           </li>
    //         </ul>
    //         {isMyAccount && (
    //           <>
    //             {(user?.verified === 0 || user?.phone_verified === 0) && (
    //               <div className="unverified-box mb-3 d-block">
    //                 <h6>{t("profile.notVerified")}</h6>
    //               </div>
    //             )}
    //             <div className="d-flex gap-2">
    //               {user?.phone_verified === 0 && (
    //                 <div className="unverified-box">
    //                   <Link to="/verify-phone">{t("profile.verifyPhone")}</Link>
    //                 </div>
    //               )}
    //               {user?.verified === 0 && (
    //                 <div className="unverified-box">
    //                   <Link to="/verify-identity">
    //                     {t("profile.verifyYourIdentity")}
    //                   </Link>
    //                 </div>
    //               )}
    //             </div>
    //           </>
    //         )}
    //       </div>
    //     </Tab>

    //     {/*  statistics */}
    //     <Tab
    //       eventKey="statistics"
    //       title={t("profile.statistics")}
    //       className="tab_item"
    //     >
    //       <div
    //         className="tab-pane"
    //         id="pills-statics"
    //         role="tabpanel"
    //         aria-labelledby="pills-statics-tab"
    //       >
    //         <ul className="statics-list p-2">
    //           <li className="d-flex justify-content-between">
    //             <h6>{t("profile.puplidhedServices")}</h6>
    //             <span>{user?.service_count}</span>
    //           </li>
    //           <li className="d-flex justify-content-between">
    //             <h6>{t("profile.clientsNumber")}</h6>
    //             <span>{user?.customer_count}</span>
    //           </li>
    //         </ul>
    //       </div>
    //     </Tab>

    //     {/* my works */}
    //     <Tab
    //       eventKey="My works"
    //       title={t("profile.myWorks")}
    //       className="tab_item"
    //     >
    //       <WorksTab works={works} isMyAccount={isMyAccount} />
    //     </Tab>

    //     {/* my certificates */}
    //     <Tab
    //       eventKey="My Certifications"
    //       title={t("profile.myCertificates")}
    //       className="tab_item"
    //     >
    //       <CertificatesTab user={user} isMyAccount={isMyAccount} />
    //     </Tab>
    //   </Tabs>
    //  <ConfirmationModal
    //     eventFun={handleDeleteService}
    //     showModal={showConfirmation}
    //     setShowModal={setShowConfirmation}
    //     loading={loading}
    //     text={t("profile.areYouSureWantToDeleteThisService")}
    //     buttonText={t("profile.deleteService")}
    //   />
    // </>
  );
}

export default ProfileTabs;
