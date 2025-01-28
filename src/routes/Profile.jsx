import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import UserProfileCard from "../ui/profile/UserProfileCard";
import ErrorPage from "./ErrorPage";
import EmptyData from "../ui/EmptyData";
import DataLoader from "../ui/DataLoader";
import ProfileTabs from "./../ui/profile/ProfileTabs";
import useGetProfile from "../hooks/settings/useGeProfile";
import { FaEdit } from "react-icons/fa";
import StarsRate from "../ui/StartRate";
import { useTranslation } from "react-i18next";

const Profile = () => {
  const authedUser = useSelector((state) => state.authedUser.user);
  const [user, setUser] = useState({});
  const { id } = useParams();
  const { data: profile, isLoading } = useGetProfile(id);
  const { t } = useTranslation();

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
    <div>
      {" "}
      <div className="banner">
        {" "}
        <div className="userData">
          <div className="user-avatar">
            <img src={user?.image} alt="user-avatar" />

            <Link to={"/edit-profile"} className="status">
              <FaEdit />
            </Link>
          </div>
          <div className="name-rate">
            <h6 className="mb-2">{t(user?.name)}</h6>
            <StarsRate rate={user?.rate || 0} />
          </div>
        </div>
      </div>
      <Container className="profile-page my-5">
        <Row className="justify-content-center">
          <UserProfileCard isMyAccount={isMyAccount} user={user} />
          <ProfileTabs user={user} isMyAccount={isMyAccount} />
        </Row>
      </Container>
    </div>
  );
};

export default Profile;
