import { Container, Row, Col } from "react-bootstrap";
import UserProfileCard from "../profile/UserProfileCard";
import ProfileTabs from "../profile/ProfileTabs";
import EmptyData from "../ui/EmptyData";
import { useSelector } from "react-redux";
import useGetProfile from "../hooks/useGetProfile";
import DataLoader from "../ui/DataLoader";
import ErrorPage from "./ErrorPage";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const Profile = () => {
  const authedUser = useSelector((state) => state.authedUser.user);
  const [user, setUser] = useState({});
  const { id } = useParams();
  const { data: profile, isLoading } = useGetProfile(id);

  const isMyAccount = !id || id === String(authedUser?.id);
  useEffect(() => {
    if (isMyAccount) {
      setUser(authedUser);
    } else if (id && profile) {
      setUser(profile);
    }
  }, [isMyAccount, authedUser, profile, id]);

  if (isLoading) {
    <DataLoader />;
  }

  if (!isLoading && !user) {
    return <ErrorPage />;
  }

  if (!user) {
    return (
      <EmptyData minHeight={"calc(100vh - 120px)"}>
        No user data found. Please go back and select a user.
      </EmptyData>
    );
  }

  return (
    <Container className="profile-page my-5">
      <Row className="justify-content-center">
        <Col md={4} className="position-relative ">
          <UserProfileCard isMyAccount={isMyAccount} user={user} />
        </Col>
        <Col md={8}>
          <ProfileTabs user={user} />
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
