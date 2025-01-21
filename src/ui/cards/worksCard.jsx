import { FaEdit, FaTrash } from "react-icons/fa";

const WorkCard = ({
  work,
  canEdit,
  onDeleteModalShow,
  onEditModalShow,
  onViewModalShow,
}) => {
  return (
    <div
      className="workCard"
      onClick={(e) => {
        e.stopPropagation();
        onViewModalShow(work);
      }}
    >
      <div className="img">
        <img src={work?.images?.[0]?.image} alt="" />
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
      <h4>{work?.title || "مشروع"}</h4>
    </div>
  );
};

export default WorkCard;
