import React, { useState } from "react";
import EmptyData from "../ui/EmptyData";
import { Link, useNavigate, useParams } from "react-router-dom";
import DataLoader from "../ui/DataLoader";
import DetailsHeader from "../ui/servicesComponents/serviceDetails/DetailsHeader";
import { formatTimeDifference, getTimeDifference } from "../utils/helper";
import { useSelector } from "react-redux";
import useGetCommunityPostDetails from "../hooks/community/useGetCommunityPostDetails";
import { useTranslation } from "react-i18next";
import SubjectCommentCard from "../ui/cards/SubjectCommentCard";
import AddCommentModal from "../ui/modals/AddCommentModal";

function CommunitySubjectDetails() {
  const { title } = useParams();
  const { t } = useTranslation();
  const [showAddCommentModal, setShowAddCommentModal] = useState(false);
  const { isLoading, data: post } = useGetCommunityPostDetails(title);

  const isLogged = useSelector((state) => state.authedUser.isLogged);
  const navigate = useNavigate();

  function handleClickAddPost() {
    if (isLogged) {
      setShowAddCommentModal(true);
    } else {
      navigate("/login");
    }
  }

  const publisherTimeDifference = getTimeDifference(post?.user?.created_at);
  const publisherStartTime = formatTimeDifference(
    publisherTimeDifference.years,
    publisherTimeDifference.months,
    publisherTimeDifference.days,
    publisherTimeDifference.hours,
    publisherTimeDifference.minutes,
    t
  );

  return (
    <>
      <section className="header_container ">
        <section className="container-md ">
          <DetailsHeader links={t("navbar.communities")} />
        </section>
      </section>
      {isLoading ? (
        <DataLoader />
      ) : (
        <section className="communityDetails communitySubjectDetails">
          <div className="container">
            <div className="communityHeader">
              <h3>{post?.title}</h3>
              <button className="btn" onClick={handleClickAddPost}>
                <i className="far fa-plus"></i> {t("communities.addComment")}
              </button>
            </div>
            <div className="content-body">
              <div className="right-wrapper">
                <div className="subject-box">
                  <div className="box-item">
                    <p>{post?.description}</p>
                  </div>
                </div>
                <div className="subject-box">
                  <div className="box-header">
                    <h5>
                      {t("communities.comments")}{" "}
                      {`(${post?.comments?.length})`}
                    </h5>
                  </div>
                  {post?.comments?.length > 0 ? (
                    post?.comments?.map((comment) => (
                      <SubjectCommentCard key={comment.id} comment={comment} />
                    ))
                  ) : (
                    <EmptyData>
                      <div className="py-4">{t("communities.noComments")}</div>
                    </EmptyData>
                  )}
                </div>
              </div>
              <div className="left-wrapper">
                <div className="subject-box">
                  <div className="box-header">
                    <h5>{t("communities.aboutSubject")}</h5>
                  </div>
                  <div className="box-item">
                    <p>{t("communities.publishTime")}</p>
                    <span>{publisherStartTime}</span>
                  </div>
                  <div className="box-item column">
                    <h6>{t("communities.subjectPublisher")}</h6>
                    <div className="userBox">
                      <Link
                        to={`/profile/${post?.user?.id}`}
                        className="image-wrapper"
                      >
                        <img src={post?.user?.image} alt="" />
                      </Link>
                      <div className="info-wrapper">
                        <p>{post?.user?.name}</p>
                      </div>
                    </div>
                  </div>
                </div>
                {post?.similar_posts && (
                  <div className="subject-box">
                    <div className="box-header">
                      <h5>{t("communities.similarSubjects")}</h5>
                    </div>
                    {post?.similar_posts?.length ? (
                      post?.similar_posts?.map((post) => (
                        <Link
                          to={`/community/${post?.category_name}/${post?.id}`}
                          className="box-item no-border"
                          key={post.id}
                        >
                          <div className="image-wrapper mini">
                            <img src={post?.user?.image} alt="" />
                          </div>
                          <div className="info-wrapper">
                            <p>{post?.title}</p>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <EmptyData>
                        <div className="py-4">
                          {t("communities.noSimilarSubjects")}
                        </div>
                      </EmptyData>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
      <AddCommentModal
        showModal={showAddCommentModal}
        setShowModal={setShowAddCommentModal}
      />
    </>
  );
}

export default CommunitySubjectDetails;
