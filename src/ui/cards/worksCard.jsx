import { FaEdit, FaEye, FaThumbsUp, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const WorkCard = ({ work, canEdit, onDeleteModalShow, onEditModalShow }) => {
  return (
    <div className="workCard">
      <Link to={`/portfolios/${work.title}`}>
        <div className="img">
          <img src={work?.images?.[0]?.image} alt="" />{" "}
        </div>
      </Link>
      <div className="main">
        <div className="work-info">
          <h4>{work?.title || "مشروع"}</h4>
          <div className="works_stats">
            <span>
              {" "}
              <FaEye /> {work?.view_count}
            </span>
            <span>
              <FaThumbsUp /> {work?.likes_count}
            </span>
          </div>
        </div>
        {canEdit && (
          <div className="icons">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEditModalShow(work);
              }}
            >
              <FaEdit />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteModalShow(work?.id);
              }}
            >
              <FaTrash />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkCard;
