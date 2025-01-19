import { IconEdit, IconTrash } from "@tabler/icons-react";

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
              <IconEdit stroke={2} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteModalShow(work?.id);
              }}
            >
              <IconTrash stroke={2} />
            </button>
          </div>
        )}
      </div>
      <h4>{work?.title || "مشروع"}</h4>
    </div>
  );
};

export default WorkCard;
