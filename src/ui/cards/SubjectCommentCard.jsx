import { useTranslation } from "react-i18next";
import { formatTimeDifference, getTimeDifference } from "../../utils/helper";

function SubjectCommentCard({ comment }) {
  const { t } = useTranslation();

  const commentTimeDifference = getTimeDifference(comment?.created_at);
  const commentStartTime = formatTimeDifference(
    commentTimeDifference.years,
    commentTimeDifference.months,
    commentTimeDifference.days,
    commentTimeDifference.hours,
    commentTimeDifference.minutes,
    t
  );

  return (
    <div className="commentCard column comment-item">
      <div className="userBox">
        <div className="image-wrapper">
          <img src={comment?.user?.image} alt={comment?.user?.name} />
        </div>
        <div className="info-wrapper">
          <p>{comment?.user?.name}</p>
          <div className="info-boxes-wrapper">
            <p className="info-box name m-0">
              <i className="fa-regular fa-timer"></i>
              {commentStartTime}
            </p>
          </div>
        </div>
      </div>
      <div className="comment-wrapper">
        <p>{comment?.comment} </p>
      </div>
    </div>
  );
}

export default SubjectCommentCard;
