import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import UserProfileCard from "../ui/profile/UserProfileCard"
import ErrorPage from "./ErrorPage";
import EmptyData from "../ui/EmptyData";
import DataLoader from "../ui/DataLoader";
import ProfileTabs from './../ui/profile/ProfileTabs';

const Profile = () => {
  const authedUser = useSelector((state) => state.authedUser.user);
  const [user, setUser] = useState({});
  const { id } = useParams();
  const { data: profile, isLoading } = useGetProfile(id);

  const isMyAccount = !id || id === String(authedUser?.id);
  console.log(isMyAccount);

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
          <ProfileTabs user={user} isMyAccount={isMyAccount} />
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
