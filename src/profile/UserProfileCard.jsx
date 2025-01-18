import { Card } from "react-bootstrap";
import StarsRate from "../ui/StartRate";
import "../assets/styles/profile.css";
const UserProfileCard = ({ user }) => {
  if (!user) {
    return null;
  }

  return (
    <Card className="text-center shadow-sm rounded-4">
      <Card.Img
        variant="top"
        src="../images/bann.webp"
        alt="card_img"
        className="card-img-top"
      />
      <div className={`overlay-image ${user.image ? "" : "overlay-initial"}`}>
        {user.image ? (
          <img src={user.image} alt="user" className="freelancer-image" />
        ) : (
          user.name?.charAt(0)
        )}
      </div>

      <Card.Body className="card-body-adjust">
        <Card.Title>{user.name}</Card.Title>
        <StarsRate rate={user.rate} />
      </Card.Body>
    </Card>
  );
};

export default UserProfileCard;
