import { FaFile, FaUsers } from "react-icons/fa";

export default function ProjectCard({ project }) {
  const {
    name: projecteName,
    description,
    owner: { imageUrl: ownerImage, name: username, offers },
  } = project;

  return (
    <section className="project_card">
      <div className="project_content">
        <h1>{projecteName}</h1>
        <p>{description}</p>
      </div>
      <div className="project_owner">
        <div className="image_user_container">
          <img src={ownerImage} />
        </div>
        <div className="project_owner_info">
          <h4>{username}</h4>
          <div className="stats d-flex gap-1 ">
            <div className="gap-1  d-flex align-items-center justify-content-center">
              <FaFile />
              <span>3 months and 20 days ago</span>
            </div>
            <div className="gap-1 d-flex align-items-center justify-content-center">
              <FaUsers />
              <span>{offers}</span>
              Offers
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
