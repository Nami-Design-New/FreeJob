import React from "react";
import { Tabs, Tab } from "react-bootstrap";

const ProfileTabs = ({ user }) => (
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
        <p className="text-center">{user.about || "No information provided."}</p>
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
);

export default ProfileTabs;
