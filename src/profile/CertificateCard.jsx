import { FaEdit, FaTrash } from "react-icons/fa";

const CertificateCard = ({
  certificate,
  canEdit,
  onDeleteModalShow,
  onEditModalShow,
  onClick,
}) => {
  return (
    <div className="workCard">
      <div className="img">
        <img
          src={certificate?.image}
          alt={certificate?.title}
          onClick={() => onClick(certificate)}
        />
        {canEdit && (
          <div className="icons certificate_icons">
            <button onClick={() => onEditModalShow(certificate)}>
              <FaEdit />
            </button>
            <button onClick={() => onDeleteModalShow(certificate?.id)}>
              <FaTrash />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificateCard;
