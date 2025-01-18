import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import useGetProfile from "../profile/useGetUserProfile";
import UserProfileCard from "../profile/UserProfileCard";
import ProfileTabs from "../profile/ProfileTabs";

const ProfilePage = () => {
  const user = useGetProfile();

  if (!user) {
    return (
      <div className="text-center mt-5">
        <p>No user data found. Please go back and select a user.</p>
      </div>
    );
  }

  return (
    <Container className="profile-page my-5">
      <Row className="justify-content-center">
        <Col md={4} className="position-relative ">
          <UserProfileCard user={user} />
        </Col>
        <Col md={8}>
          <ProfileTabs user={user} />
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
