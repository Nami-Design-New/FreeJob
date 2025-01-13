import { useLocation } from "react-router";
import { Container, Row, Col, Tabs, Tab, Card } from "react-bootstrap";
import StarsRate from "../ui/StartRate";
import "../assets/styles/Profile.css";

const ProfilePage = () => {
  const location = useLocation();
  const freelancer = location.state?.freelancer;

  if (!freelancer) {
    return (
      <div className="text-center mt-5">
        <p>No freelancer data found. Please go back and select a freelancer.</p>
      </div>
    );
  }

  return (
    <Container className="profile-page my-5">
      <Row className="justify-content-center">
        <Col md={4} className="position-relative ">
          <Card className="text-center shadow-sm rounded-4">
            <Card.Img
              variant="top"
              src="../images/bann.webp"
              alt="card_img"
              className="card-img-top"
            />
            <div
              className={`overlay-image ${
                freelancer.image ? "" : "overlay-initial"
              }`}
            >
              {freelancer.image ? (
                <img
                  src={freelancer.image}
                  alt="freelancer"
                  className="freelancer-image"
                />
              ) : (
                freelancer.name?.charAt(0)
              )}
            </div>

            <Card.Body className="card-body-adjust">
              <Card.Title>{freelancer.name}</Card.Title>
              <StarsRate rate={freelancer.rate} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          {/* Tabs Section */}
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
                  {freelancer.about || "No information provided."}
                </p>
              </div>
            </Tab>
            <Tab
              eventKey="services"
              title={<span className="text-success">Services</span>}
            >
              <div className="tab-content">
                {freelancer.services?.length > 0 ? (
                  <ul>
                    {freelancer.services.map((service, index) => (
                      <li key={index}>{service}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-center">
                    No services available for this freelancer.
                  </p>
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
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
