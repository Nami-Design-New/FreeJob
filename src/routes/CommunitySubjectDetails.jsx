import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaCalendarAlt } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useGetCommunityPostDetails from "../hooks/community/useGetCommunityPostDetails";
import { addComment } from "../services/apiCommunities";
import DataLoader from "../ui/DataLoader";
import EmptyData from "../ui/EmptyData";
import StarsRate from "../ui/StartRate";
import SubjectCommentCard from "../ui/cards/SubjectCommentCard";
import FormButton from "../ui/form/FormButton";
import FormTextArea from "../ui/form/FormTextArea";
import SubmitButton from "../ui/form/SubmitButton";
import DetailsHeader from "../ui/servicesComponents/serviceDetails/DetailsHeader";
import {
  calculateDate,
  formatTimeDifference,
  getTimeDifference,
} from "../utils/helper";

function CommunitySubjectDetails() {
  const { title } = useParams();
  const { t } = useTranslation();
  const { isLoading, data: post } = useGetCommunityPostDetails(title);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");

  const queryClient = useQueryClient();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addComment({ community_post_id: Number(id), comment }, queryClient);
      toast.success(t("communities.commentAddedSuccessfully"));
      setComment("");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const navigate = useNavigate();

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
            <div className="g-3 row">
              <div className="col-lg-8">
                <div className="box-item">
                  <h3>{post?.title}</h3>
                  <p>{post?.description}</p>
                </div>
              </div>
              <div className="community_userData col-lg-4">
                <div className="userBox">
                  <Link
                    to={`/profile/${post?.user?.id}`}
                    className="image-wrapper"
                  >
                    <img src={post?.user?.image} alt="" />
                  </Link>
                  <div className="info-wrapper">
                    <p>{post?.user?.name}</p>
                    <StarsRate rate={post?.user?.rate} />
                    <p>{calculateDate(post?.user?.created_at)}</p>
                  </div>
                </div>
                <div className="publishTime">
                  <p>
                    <FaCalendarAlt />
                    {t("communities.publishTime")}
                  </p>
                  <span>{publisherStartTime}</span>
                </div>
                <FormButton
                  style={{ backgroundColor: "var(--main-color)" }}
                  content={t("projects.gotoProfile")}
                  onClick={() => navigate(`/profile/${post?.user?.id}`)}
                />
              </div>
            </div>
            <div className="content-body">
              <div className="right-wrapper">
                <div className="subject-box">
                  <div className="box-header">
                    <h5>
                      {t("communities.comments")}{" "}
                      {`(${post?.comments?.length})`}
                    </h5>
                  </div>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="login-section community_comment ">
                        <form onSubmit={handleSubmit}>
                          <div className="row">
                            <div className="col-12 p-2">
                              <FormTextArea
                                name="comment"
                                onChange={(e) => setComment(e.target.value)}
                                value={comment}
                                placeholder={t("writeCommentHere")}
                                required={true}
                                rows={4}
                              />
                            </div>

                            <div className="col-12 p-2">
                              <SubmitButton
                                name={t("communities.add")}
                                loading={loading}
                                className={" submit-btn mt-0 me-auto"}
                              />
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                    {post?.comments?.length > 0 ? (
                      post?.comments?.map((comment) => (
                        <div className="col-md-6" key={comment.id}>
                          <SubjectCommentCard comment={comment} />
                        </div>
                      ))
                    ) : (
                      <EmptyData>
                        <div className="py-4">
                          {t("communities.noComments")}
                        </div>
                      </EmptyData>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default CommunitySubjectDetails;
