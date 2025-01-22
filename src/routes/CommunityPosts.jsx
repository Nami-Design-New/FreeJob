import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useCommunityPosts from "../hooks/community/useCommunityPosts";
import { useSelector } from "react-redux";
import DataLoader from "../ui/DataLoader";
import DetailsHeader from "../ui/servicesComponents/serviceDetails/DetailsHeader";
import CommunitySubjectCard from "../ui/cards/CommunitySubjectCard";
import EmptyData from "../ui/EmptyData";
import AddSubjectModal from "../ui/modals/AddSubjectModal";

function CommunityPosts() {
  const { name } = useParams();
  const location = useLocation();
  const { t } = useTranslation();
  const [showAddSubjectModal, setShowAddSubjectModal] = useState(false);
  const { isLoading, data: posts } = useCommunityPosts(name);

  const isLogged = useSelector((state) => state.authedUser.isLogged);
  const navigate = useNavigate();

  function handleClickAddPost() {
    if (isLogged) {
      setShowAddSubjectModal(true);
    } else {
      navigate("/login");
    }
  }

  return (
    <>
      {" "}
      <section className="header_container ">
        <section className="container-md ">
          <DetailsHeader links={t("navbar.communities")} />
        </section>
      </section>
      {isLoading ? (
        <DataLoader />
      ) : posts && posts?.length > 0 ? (
        <section className="communityDetails">
          <div className="container">
            <div className="communityHeader">
              <h3>{posts[0]?.category_name}</h3>
              <button className="btn" onClick={handleClickAddPost}>
                <i className="far fa-plus"></i> {t("communities.newSubject")}
              </button>
            </div>
            <div className="content-body">
              {posts?.map((post) => (
                <CommunitySubjectCard
                  currentRoute={location.pathname}
                  key={post?.id}
                  post={post}
                />
              ))}
            </div>
          </div>
        </section>
      ) : (
        <EmptyData>{t("communities.noSubjects")}</EmptyData>
      )}
      <AddSubjectModal
        showModal={showAddSubjectModal}
        setShowModal={setShowAddSubjectModal}
      />
    </>
  );
}

export default CommunityPosts;
